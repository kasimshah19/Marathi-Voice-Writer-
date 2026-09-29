import shutil
import tempfile
import os
from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.stt import transcribe_audio

router = APIRouter(prefix="/audio", tags=["audio"])

@router.post("/transcribe")
async def transcribe_audio_legacy(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")

    try:
        # Create a temporary file to save the uploaded audio
        with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.filename)[1]) as tmp:
            shutil.copyfileobj(file.file, tmp)
            tmp_path = tmp.name

        try:
            # Process the audio file to get text
            result = transcribe_audio(tmp_path)
            return {"text": result.text}

        finally:
            # Ensure the temporary file is deleted even if processing fails
            if os.path.exists(tmp_path):
                os.remove(tmp_path)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
