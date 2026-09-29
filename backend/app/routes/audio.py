import shutil
import tempfile
import os
from flask import Blueprint, request, jsonify
from app.services.stt import transcribe_audio

bp = Blueprint("audio", __name__, url_prefix="/audio")

@bp.route("/transcribe", methods=["POST"])
def transcribe_audio_legacy():
    if "file" not in request.files:
        return jsonify({"detail": "No file provided"}), 400
    
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"detail": "No file provided"}), 400

    try:
        # Create a temporary file to save the uploaded audio
        ext = os.path.splitext(file.filename)[1]
        with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as tmp:
            file.save(tmp.name)
            tmp_path = tmp.name

        try:
            # Process the audio file to get text
            result = transcribe_audio(tmp_path)
            return jsonify({"text": result.text})

        finally:
            # Ensure the temporary file is deleted even if processing fails
            if os.path.exists(tmp_path):
                os.remove(tmp_path)

    except Exception as e:
        return jsonify({"detail": str(e)}), 500
