import logging
import time

from flask import Blueprint, request, jsonify

from app.config import get_settings
from app.services.stt import transcribe_audio
from app.utils.audio import (
    cleanup_files,
    convert_to_wav,
    get_extension_for_content_type,
    is_supported_content_type,
    save_upload_to_tempfile,
)

logger = logging.getLogger("api")
bp = Blueprint("transcription", __name__)

@bp.route("/transcription", methods=["POST"])
def transcribe():
    """Accept a browser-recorded audio file and return Marathi text."""
    settings = get_settings()
    max_bytes = settings.max_audio_size_mb * 1024 * 1024

    if "file" not in request.files:
        return jsonify({"detail": "No file provided."}), 400
    
    file = request.files["file"]

    # --- Validate file exists / is not empty ---
    if file.filename == "":
        return jsonify({"detail": "No file provided."}), 400

    # --- Validate content type ---
    if not is_supported_content_type(file.mimetype):
        logger.warning("Rejected upload: unsupported content type %s", file.mimetype)
        return jsonify({
            "detail": f"Unsupported audio type: {file.mimetype}. "
            "Please record in a supported format (webm, ogg, mp4, wav)."
        }), 400

    # --- Read the body and validate size ---
    body = file.read()

    if len(body) == 0:
        return jsonify({"detail": "Uploaded audio file is empty."}), 400

    if len(body) > max_bytes:
        return jsonify({
            "detail": f"Audio file exceeds the maximum allowed size of "
            f"{settings.max_audio_size_mb} MB."
        }), 413

    logger.info(
        "Transcription request: filename=%s, content_type=%s, size=%d bytes",
        file.filename,
        file.mimetype,
        len(body),
    )

    # --- Save to temp file ---
    extension = get_extension_for_content_type(file.mimetype)
    tmp_path = save_upload_to_tempfile(body, extension)
    converted_path = None

    try:
        request_start = time.perf_counter()

        # Attempt conversion to WAV when the source format may not be
        # natively readable by the model (e.g. webm/opus from mobile Chrome).
        try:
            converted_path = convert_to_wav(tmp_path)
            audio_path = converted_path
        except RuntimeError:
            # FFmpeg not available try the file as-is.
            logger.info("FFmpeg unavailable; attempting transcription on raw upload.")
            audio_path = tmp_path

        # --- Transcribe ---
        result = transcribe_audio(
            file_path=audio_path,
            language=settings.transcription_language,
        )

        processing_time = round(time.perf_counter() - request_start, 2)

        return jsonify({
            "success": True,
            "text": result.text,
            "language": result.language,
            "duration_seconds": result.audio_duration,
            "processing_time_seconds": processing_time,
        })

    except RuntimeError as exc:
        logger.error("Transcription runtime error: %s", exc)
        return jsonify({"detail": "Transcription failed. Please try again."}), 500
    except Exception as exc:
        logger.exception("Unexpected error during transcription")
        return jsonify({"detail": "An unexpected error occurred during transcription."}), 500
    finally:
        # Always clean up temporary files.
        cleanup_files(tmp_path, converted_path or "")
