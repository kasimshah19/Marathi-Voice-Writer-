import logging
import time

from fastapi import APIRouter, UploadFile, File, HTTPException

from app.config import get_settings
from app.schemas.transcription import TranscriptionResponse
from app.services.stt import transcribe_audio
from app.utils.audio import (
    cleanup_files,
    convert_to_wav,
    get_extension_for_content_type,
    is_supported_content_type,
    save_upload_to_tempfile,
)

logger = logging.getLogger("api")
router = APIRouter(tags=["Transcription"])


@router.post(
    "/transcription",
    response_model=TranscriptionResponse,
    summary="Transcribe audio to Marathi text",
    responses={
        400: {"description": "Invalid or empty audio file"},
        413: {"description": "Audio file too large"},
        500: {"description": "Transcription failed"},
    },
)
async def transcribe(file: UploadFile = File(...)):
    """Accept a browser-recorded audio file and return Marathi text."""
    settings = get_settings()
    max_bytes = settings.max_audio_size_mb * 1024 * 1024

    # --- Validate file exists / is not empty ---
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided.")

    # --- Validate content type ---
    if not is_supported_content_type(file.content_type):
        logger.warning(
            "Rejected upload: unsupported content type %s", file.content_type
        )
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported audio type: {file.content_type}. "
            "Please record in a supported format (webm, ogg, mp4, wav).",
        )

    # --- Read the body and validate size ---
    body = await file.read()

    if len(body) == 0:
        raise HTTPException(status_code=400, detail="Uploaded audio file is empty.")

    if len(body) > max_bytes:
        raise HTTPException(
            status_code=413,
            detail=f"Audio file exceeds the maximum allowed size of "
            f"{settings.max_audio_size_mb} MB.",
        )

    logger.info(
        "Transcription request: filename=%s, content_type=%s, size=%d bytes",
        file.filename,
        file.content_type,
        len(body),
    )

    # --- Save to temp file ---
    extension = get_extension_for_content_type(file.content_type)
    tmp_path = save_upload_to_tempfile(body, extension)
    converted_path: str | None = None

    try:
        request_start = time.perf_counter()

        # Attempt conversion to WAV when the source format may not be
        # natively readable by the model (e.g. webm/opus from mobile Chrome).
        try:
            converted_path = convert_to_wav(tmp_path)
            audio_path = converted_path
        except RuntimeError:
            # FFmpeg not available — try the file as-is.
            logger.info(
                "FFmpeg unavailable; attempting transcription on raw upload."
            )
            audio_path = tmp_path

        # --- Transcribe ---
        result = transcribe_audio(
            file_path=audio_path,
            language=settings.transcription_language,
        )

        processing_time = round(time.perf_counter() - request_start, 2)

        return TranscriptionResponse(
            success=True,
            text=result.text,
            language=result.language,
            duration_seconds=result.audio_duration,
            processing_time_seconds=processing_time,
        )

    except RuntimeError as exc:
        logger.error("Transcription runtime error: %s", exc)
        raise HTTPException(
            status_code=500,
            detail="Transcription failed. Please try again.",
        )
    except Exception as exc:
        logger.exception("Unexpected error during transcription")
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred during transcription.",
        )
    finally:
        # Always clean up temporary files.
        cleanup_files(tmp_path, converted_path or "")
