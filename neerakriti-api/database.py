# database.py
# -----------
# This is the ONLY file that connects to MongoDB.
# Every router imports from here — nobody else needs to know
# the password, the URL, or how the connection works.

import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import certifi

# ---- Step 1: Read secrets from .env ----
# load_dotenv() opens the .env file and loads each line
# into the operating system's environment variables.
# After this runs, os.getenv("MONGODB_URL") returns the
# connection string we wrote in .env.
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")           # ← was MONGODB_URL
DB_NAME = os.getenv("DB_NAME", "neerakriti") 

# ---- Step 2: Create the MongoDB client ----
# This opens a connection to your Atlas cluster.
# Motor manages a "pool" of connections internally —
# think of it like a highway with multiple lanes.
# We create ONE client here, and every request reuses it.
# We do NOT create a new connection per request — that
# would be like building a new highway for every car.
client = AsyncIOMotorClient(MONGO_URI, tlsCAFile=certifi.where())

# ---- Step 3: Pick the specific database ----
# Your Atlas cluster can hold many databases.
# Right now it has "sample_mflix" (the Atlas demo data).
# This line says "use the database called neerakriti".
# If it doesn't exist yet, MongoDB creates it automatically
# the first time we insert data — we don't need a
# "CREATE DATABASE" command like in SQL.
db = client[DB_NAME]

# ---- Step 4: Get handles to each collection ----
# A "collection" in MongoDB = a "table" in SQL.
# Each one holds a specific type of document.
# We create a shortcut variable for each so our routers
# can just import these instead of writing db["products"]
# everywhere.
products_collection = db["products"]       # all 6+ art products
feedback_collection = db["feedback"]       # customer feedback form submissions
subscribers_collection = db["subscribers"] # "notify me" email signups