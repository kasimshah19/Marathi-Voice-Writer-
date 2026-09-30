import logging
from flask import Flask
from flask_cors import CORS
from app.config import get_settings

# Setup basic logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)

def create_app():
    app = Flask(__name__)
    settings = get_settings()

    # CORS configuration
    CORS(app, resources={r"/api/*": {"origins": settings.frontend_url}})

    # Register Blueprints
    from app.routes.health import bp as health_bp
    from app.routes.transcription import bp as transcription_bp
    from app.routes.audio import bp as audio_bp
    from app.routes.documents import bp as documents_bp

    app.register_blueprint(health_bp, url_prefix="/api/v1")
    app.register_blueprint(transcription_bp, url_prefix="/api/v1")
    app.register_blueprint(audio_bp, url_prefix="/api/v1")
    app.register_blueprint(documents_bp, url_prefix="/api/v1")

    return app
