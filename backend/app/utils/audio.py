import os
import shutil
import subprocess
import tempfile
import logging

logger = logging.getLogger("api")

# Audio MIME types the browser's MediaRecorder may produce.
SUPPORTED_AUDIO_TYPES = {
    "audio/webm",
    "audio/webm;codecs=opus",
    "audio/ogg",
    "audio/ogg;codecs=opus",
    "audio/mp4",
    "audio/mp4;codecs=aac",
    "audio/mpeg",
    "audio/wav",
    "audio/x-wav",
    "audio/aac",
    "audio/flac",
    "audio/x-m4a",
}

# File extensions that faster-whisper (via FFmpeg/ctranslate2) can typically
# read directly.  If the uploaded file has one of these extensions we skip
# the explicit conversion step.
NATIVE_EXTENSIONS = {".wav", ".mp3", ".flac", ".ogg", ".m4a", ".mp4", ".webm"}


def _ffmpeg_available() -> bool:
    """Return True if ffmpeg is on PATH."""
    return shutil.which("ffmpeg") is not None


def is_supported_content_type(content_type: str | None) -> bool:
    """Check whether the provided Content-Type header value is an audio type
    we expect from browser MediaRecorder."""
    if not content_type:
        return False
    # Strip parameters like charset/boundary — but keep codec params which
    # are part of the supported set.
    normalised = content_type.strip().lower()
    if normalised in SUPPORTED_AUDIO_TYPES:
        return True
    # Fall back: accept anything that starts with "audio/"
    return normalised.startswith("audio/")


def get_extension_for_content_type(content_type: str | None) -> str:
    """Map a MIME Content-Type to a reasonable file extension."""
    mapping = {
        "audio/webm": ".webm",
        "audio/ogg": ".ogg",
        "audio/mp4": ".mp4",
        "audio/mpeg": ".mp3",
        "audio/wav": ".wav",
        "audio/x-wav": ".wav",
        "audio/aac": ".aac",
        "audio/flac": ".flac",
        "audio/x-m4a": ".m4a",
    }
    if content_type:
        base = content_type.split(";")[0].strip().lower()
        if base in mapping:
            return mapping[base]
    return ".webm"  # sensible default for browser recordings


def convert_to_wav(input_path: str) -> str:
    """Convert *input_path* to a 16 kHz mono WAV file using FFmpeg.

    Returns the path to the newly created WAV file.  The caller is
    responsible for cleaning up both the input and output files.

    Raises ``RuntimeError`` if FFmpeg is not installed.
    """
    if not _ffmpeg_available():
        raise RuntimeError(
            "FFmpeg is not installed or not found on PATH.  "
            "Install FFmpeg to enable audio format conversion: "
            "https://ffmpeg.org/download.html"
        )

    output_path = input_path + ".converted.wav"
    cmd = [
        "ffmpeg",
        "-y",            # overwrite output
        "-i", input_path,
        "-ar", "16000",  # 16 kHz — ideal for Whisper
        "-ac", "1",      # mono
        "-c:a", "pcm_s16le",
        output_path,
    ]
    logger.info("Converting audio with FFmpeg: %s -> %s", input_path, output_path)
    result = subprocess.run(
        cmd,
        capture_output=True,
        text=True,
        timeout=60,
    )
    if result.returncode != 0:
        logger.error("FFmpeg conversion failed: %s", result.stderr)
        raise RuntimeError(f"FFmpeg audio conversion failed: {result.stderr[:300]}")

    return output_path


def save_upload_to_tempfile(file_bytes: bytes, extension: str) -> str:
    """Write *file_bytes* to a temporary file and return its path.

    The caller is responsible for deleting the file when done.
    """
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=extension)
    try:
        tmp.write(file_bytes)
    finally:
        tmp.close()
    return tmp.name


def cleanup_files(*paths: str) -> None:
    """Silently remove each file in *paths* if it exists."""
    for path in paths:
        try:
            if path and os.path.exists(path):
                os.remove(path)
        except OSError as exc:
            logger.warning("Failed to delete temporary file %s: %s", path, exc)
