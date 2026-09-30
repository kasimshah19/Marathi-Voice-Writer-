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

    # Create indexes for documents
    try:
        from pymongo import IndexModel, DESCENDING, TEXT
        db_instance.db.documents.create_indexes([
            IndexModel([("updated_at", DESCENDING)]),
            IndexModel([("created_at", DESCENDING)]),
            IndexModel([("title", TEXT), ("content", TEXT)])
        ])
        logger.info("Created indexes for documents collection.")
    except Exception as e:
        logger.error(f"Failed to create indexes: {e}")

def close_mongo_connection():
    logger.info("Closing MongoDB connection...")
    if db_instance.client:
        db_instance.client.close()
        logger.info("MongoDB connection closed.")

def get_database():
    return db_instance.db
