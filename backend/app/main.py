import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import get_settings
from app.database import connect_to_mongo, close_mongo_connection
from app.routes import health, audio, transcription

# Setup basic logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup logic
    await connect_to_mongo()
    yield
    # Shutdown logic
    await close_mongo_connection()

app = FastAPI(
    title="Marathi Voice Writer API",
    description="Backend API for Marathi Voice Writer PWA",
    version="1.0.0",
    lifespan=lifespan
)

settings = get_settings()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Versioning and Routers
app.include_router(health.router, prefix="/api/v1", tags=["Health"])
app.include_router(audio.router, prefix="/api/v1")
app.include_router(transcription.router, prefix="/api/v1")
