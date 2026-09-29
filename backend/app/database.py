import logging
from pymongo import MongoClient
from app.config import get_settings

logger = logging.getLogger("api")

class Database:
    client: MongoClient = None
    db = None

db_instance = Database()

def connect_to_mongo():
    settings = get_settings()
    logger.info("Connecting to MongoDB...")
    db_instance.client = MongoClient(settings.mongodb_uri)
    db_instance.db = db_instance.client[settings.database_name]
    logger.info("Connected to MongoDB!")

def close_mongo_connection():
    logger.info("Closing MongoDB connection...")
    if db_instance.client:
        db_instance.client.close()
        logger.info("MongoDB connection closed.")

def get_database():
    return db_instance.db
