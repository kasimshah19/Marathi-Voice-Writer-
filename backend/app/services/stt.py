import logging
import time
from faster_whisper import WhisperModel
from app.config import get_settings

logger = logging.getLogger("api")

# ---------------------------------------------------------------------------
# Model singleton — loaded once at module import so every request reuses it.
# ---------------------------------------------------------------------------
_model: WhisperModel | None = None
_model_load_error: str | None = None


def _load_model() -> None:
    """Attempt to load the Whisper model based on current settings."""
    global _model, _model_load_error
    settings = get_settings()
    logger.info(
        "Loading Whisper model: size=%s, device=%s, compute_type=%s",
        settings.whisper_model_size,
        settings.whisper_device,
        settings.whisper_compute_type,
    )
    try:
        _model = WhisperModel(
            model_size_or_path=settings.whisper_model_size,
            device=settings.whisper_device,
            compute_type=settings.whisper_compute_type,
        )
        logger.info("Whisper model loaded successfully.")
    except Exception as exc:
        _model_load_error = str(exc)
        logger.error("Failed to load Whisper model: %s", exc)


# Eagerly load on import so the model is warm when the first request arrives.
_load_model()


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------


class TranscriptionResult:
    """Simple value object returned by :func:`transcribe_audio`."""

    __slots__ = ("text", "language", "audio_duration")

    def __init__(self, text: str, language: str, audio_duration: float | None):
        self.text = text
        self.language = language
        self.audio_duration = audio_duration


def transcribe_audio(file_path: str, language: str = "mr") -> TranscriptionResult:
    """Transcribe the audio at *file_path* into text.

    Parameters
    ----------
    file_path:
        Absolute path to the audio file (WAV, WebM, etc.).
    language:
        BCP-47 language code to force.  Defaults to ``"mr"`` (Marathi).

    Returns
    -------
    TranscriptionResult
        Contains the recognised text, language code, and audio duration.

    Raises
    ------
    RuntimeError
        If the model is not loaded or transcription fails.
    """
    if _model is None:
        raise RuntimeError(
            f"Whisper model is not initialised. Load error: {_model_load_error}"
        )

    logger.info("Starting transcription: file=%s, language=%s", file_path, language)
    start = time.perf_counter()

    segments, info = _model.transcribe(file_path, language=language)

    text_parts: list[str] = []
    for segment in segments:
        stripped = segment.text.strip()
        if stripped:
            text_parts.append(stripped)

    elapsed = time.perf_counter() - start
    final_text = " ".join(text_parts).strip()

    logger.info(
        "Transcription complete: duration=%.1fs, processing=%.2fs, chars=%d",
        info.duration,
        elapsed,
        len(final_text),
    )

    return TranscriptionResult(
        text=final_text,
        language=language,
        audio_duration=round(info.duration, 2) if info.duration else None,
    )
