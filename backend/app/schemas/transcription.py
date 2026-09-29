from pydantic import BaseModel
from typing import Optional


class TranscriptionResponse(BaseModel):
    """Response schema for a successful transcription request."""
    success: bool = True
    text: str
    language: str = "mr"
    duration_seconds: Optional[float] = None
    processing_time_seconds: Optional[float] = None


class TranscriptionErrorResponse(BaseModel):
    """Response schema for a failed transcription request."""
    success: bool = False
    error: str
    detail: Optional[str] = None
