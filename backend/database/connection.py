from motor.motor_asyncio import AsyncIOMotorClient
from core.config import MONGO_URI, DB_NAME
import logging

client: AsyncIOMotorClient = None
db = None

logger = logging.getLogger(__name__)

async def connect_db():
    global client, db
    try:
        # Include connection pooling parameters for production handling
        client = AsyncIOMotorClient(
            MONGO_URI,
            serverSelectionTimeoutMS=5000,
            maxPoolSize=50,
            minPoolSize=10
        )
        
        # Explicitly verify the connection during startup using a ping command
        await client.admin.command('ping')
        db = client[DB_NAME]
        print(f"[AgriSen] [SUCCESS] Successfully connected to MongoDB: {DB_NAME}")
        
    except Exception as e:
        print(f"[AgriSen] [ERROR] Failed to connect to MongoDB! Error: {e}")
        # In a real app we might raise the exception to stop startup,
        # but failing silently lets the rest of the API attempt to start up anyway.


async def close_db():
    global client
    if client:
        client.close()
        print("[AgriSen] [WARN] MongoDB connection closed")


from fastapi import HTTPException

def get_db():
    if db is None:
        logger.error("Database connection requested but db is None.")
        raise HTTPException(status_code=503, detail="Database connection is unavailable. Please try again later.")
    return db
