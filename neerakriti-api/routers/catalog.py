# routers/catalog.py
# -------------------
# Handles all "give me products" requests.
# 
# BEFORE (Phase 2): imported a Python list, looped through it manually.
# AFTER  (Phase 3): queries MongoDB via Motor. Same URLs, same responses,
#                   but data now lives in a real database.

from fastapi import APIRouter, HTTPException, Query
from bson import ObjectId  # MongoDB uses ObjectId for _id — this converts between string and ObjectId

# Import the products collection from our database connection file.
# This is the "shortcut" we set up in database.py — instead of writing
# db["products"] everywhere, we just import this one variable.
from database import products_collection


router = APIRouter(prefix="/catalog", tags=["catalog"])


# ---- Helper function ----
# MongoDB stores _id as an ObjectId (a special 24-character hex string).
# JSON can't handle ObjectId — it would crash if we tried to send it
# to the frontend as-is. This function converts _id to a regular string.
#
# Example:
#   BEFORE: {"_id": ObjectId("665a1b2c3d4e5f6g7h8i9j0k"), "name": "..."}
#   AFTER:  {"_id": "665a1b2c3d4e5f6g7h8i9j0k", "name": "..."}

def serialize_product(doc):
    """Convert a MongoDB document's _id from ObjectId to string."""
    doc["_id"] = str(doc["_id"])
    return doc


# ---- Endpoint 1: Get all products ----
# URL: GET /catalog/products
# Optional filters: ?category=Wall+Decor  or  ?tag=Best+Seller
#
# How it worked in Phase 2:
#   - Looped through mock_data list with Python "if" statements
#
# How it works now:
#   - Builds a MongoDB query dict and passes it to .find()
#   - MongoDB does the filtering on its server, not in Python

@router.get("/products")
async def get_all_products(
    category: str | None = Query(None),    # ?category=Wall+Decor
    tag: str | None = Query(None),          # ?tag=Best+Seller
    sort_by: str | None = Query(None),      # ?sort_by=price_asc / price_desc / newest
    search: str | None = Query(None),       # ?search=chakra  ← NEW
):
    """Return products, optionally filtered by category, tag, or search term."""

    query = {}

    # ---- Category filter (same as before) ----
    if category:
        query["category"] = category

    # ---- Tag filter (same as before) ----
    if tag:
        query["tags"] = tag

    # ---- Search filter (NEW) ----
    # $or means "match if ANY of these conditions are true"
    # $regex means "match if the field CONTAINS this text" (like SQL's LIKE '%chakra%')
    # $options: "i" means case-insensitive (so "Chakra", "chakra", "CHAKRA" all match)
    #
    # Example: if search = "chakra", this becomes:
    # { "$or": [
    #     { "name": { "$regex": "chakra", "$options": "i" } },
    #     { "description": { "$regex": "chakra", "$options": "i" } },
    #     { "tags": { "$regex": "chakra", "$options": "i" } }
    # ]}
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}},
            {"tags": {"$regex": search, "$options": "i"}},
        ]

    cursor = products_collection.find(query)

    # ---- Sorting ----
    if sort_by == "price_asc":
        cursor = cursor.sort("price", 1)       # cheapest first
    elif sort_by == "price_desc":
        cursor = cursor.sort("price", -1)      # most expensive first
    elif sort_by == "newest":
        cursor = cursor.sort("createdAt", -1)  # newest first
    # If no sort_by is specified, MongoDB returns in insertion order (default)

    products = await cursor.to_list(length=100)

    return [serialize_product(p) for p in products]
# ---- Endpoint 2: Get newly added products ----
# URL: GET /catalog/products/newly-added
# Optional: ?limit=4 (default is 4)
#
# This powers the "Newly Added" row on your homepage.
# It sorts by createdAt descending (newest first) and returns the top N.

@router.get("/products/newly-added")
async def get_newly_added(limit: int = Query(4)):
    """Return the N most recently added products, newest first."""

    # .find({}) = get all products (no filter)
    # .sort("createdAt", -1) = sort by createdAt descending (newest first)
    # .limit(limit) = only return this many results
    cursor = products_collection.find({}).sort("createdAt", -1).limit(limit)
    products = await cursor.to_list(length=limit)

    return [serialize_product(p) for p in products]

# ---- Endpoint: Get all distinct categories ----
# URL: GET /catalog/categories
#
# This powers the category filter buttons on the catalogue page.
# Instead of hardcoding ["Wall Decor", "Photo Frames", ...] in the frontend,
# we pull the real, live list straight from MongoDB. Add a product with a
# new category tomorrow, and the filter button appears automatically.
#
# .distinct("category") is a MongoDB command that returns every UNIQUE
# value of the "category" field across all products — no duplicates.
# Example: if 5 products are "Photo Frames", it returns "Photo Frames" once.

@router.get("/categories")
async def get_categories():
    """Return a sorted list of all unique product categories."""

    # distinct() gathers every unique "category" value from all products
    categories = await products_collection.distinct("category")

    # sorted() puts them in alphabetical order so the buttons appear consistently
    return {"categories": sorted(categories)}
# ---- Endpoint 3: Get one product by ID ----
# URL: GET /catalog/products/665a1b2c3d4e5f6g7h8i9j0k
#
# This powers the individual product detail page (/products/[id]).
# The ID in the URL is a string like "665a1b2c3d4e5f6g7h8i9j0k".
# We need to convert it to an ObjectId before querying MongoDB.

@router.get("/products/{product_id}")
async def get_product_by_id(product_id: str):
    """Return one product by its MongoDB _id."""

    # Guard: check if the string is a valid ObjectId format.
    # ObjectIds are exactly 24 hex characters. If someone sends
    # "/products/banana", this catches it and returns a clean error
    # instead of crashing.
    if not ObjectId.is_valid(product_id):
        raise HTTPException(status_code=400, detail="Invalid product ID format")

    # find_one() returns a single document (dict), or None if nothing matches.
    # We convert the string to ObjectId("...") because that's how MongoDB stores it.
    product = await products_collection.find_one({"_id": ObjectId(product_id)})

    # If no product was found with that ID, return a 404 error
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")

    return serialize_product(product)


# ---- Endpoint 4: Get products by tag ----
# URL: GET /catalog/products/tag/Best+Seller
#
# A convenience endpoint — the frontend could also use
# /catalog/products?tag=Best+Seller, but this is cleaner for
# dedicated pages like "Best Sellers" or "Diwali Collection"

@router.get("/products/tag/{tag_name}")
async def get_products_by_tag(tag_name: str):
    """Return all products that have a specific tag."""

    # Same as the ?tag= filter above, but as a path parameter
    cursor = products_collection.find({"tags": tag_name})
    products = await cursor.to_list(length=100)

    return [serialize_product(p) for p in products]