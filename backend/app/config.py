from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache

class Settings(BaseSettings):
    mongodb_uri: str = "mongodb://localhost:27017"
    database_name: str = "marathi_voice_writer"
    frontend_url: str = "http://localhost:3000"
    environment: str = "development"
    secret_key: str = "your-super-secret-key-change-in-production"
    
    whisper_model_size: str = "small"
    whisper_device: str = "auto"
    whisper_compute_type: str = "default"
    max_audio_size_mb: int = 25
    transcription_language: str = "mr"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

@lru_cache
def get_settings():
    return Settings()
