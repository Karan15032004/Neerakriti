# seed.py
# -------
# A one-time script to fill your MongoDB database with starter products.
# Run it from PowerShell with: python seed.py
# You can re-run it anytime — it wipes the collection first,
# so you'll always end up with exactly these 6 products, no duplicates.

import asyncio
from datetime import datetime
from database import products_collection


# ---- Your 6 starter products ----
# These are the same products from neerakriti/lib/mockProducts.js,
# converted from JavaScript to Python.
#
# KEY DIFFERENCES from the JS version:
#   - true/false  →  True/False  (Python capitalizes booleans)
#   - No "id" field — MongoDB auto-generates a unique "_id" for each product
#   - createdAt is a Python datetime object, not a string

mock_products = [
    # ---- Product 1: Seven Chakras Mandala Plate ----
    {
        "name": "Seven Chakras Mandala Plate",
        "price": 2400,
        "description": (
            "A hand-painted dot mandala representing all seven chakras in vibrant gem hues. "
            "Each dot is placed by hand — no stencils, no shortcuts. Makes for a meaningful "
            "meditative piece or a striking wall accent."
        ),
        "images": [],               # Real image URLs go here in Phase 4
        "category": "Wall Decor",
        "size": "12in",
        "tags": ["Best Seller", "Best Under Personalised Gifts"],
        "careInstructions": "Wipe gently with a dry, soft cloth. Avoid direct sunlight and moisture.",
        "isBundle": False,
        "isCustomizable": True,
        "createdAt": datetime(2024, 1, 15),
    },

    # ---- Product 2: Evil Eye Mandala Plate ----
    {
        "name": "Evil Eye Mandala Plate",
        "price": 1800,
        "description": (
            "An evil eye motif rendered in deep blues and turquoise through the meditative "
            "art of dot mandala painting. A protective talisman that doubles as wall art."
        ),
        "images": [],
        "category": "Wall Decor",
        "size": "10in",
        "tags": ["Best Seller"],
        "careInstructions": "Wipe gently with a dry, soft cloth. Avoid direct sunlight.",
        "isBundle": False,
        "isCustomizable": False,
        "createdAt": datetime(2024, 1, 20),
    },

    # ---- Product 3: Bridal Mirror Frame ----
    {
        "name": "Bridal Mirror Frame",
        "price": 3500,
        "description": (
            "An exquisite mirror frame with intricate dot mandala patterns in gold, ivory, "
            "and rose. A timeless wedding or housewarming gift, hand-crafted start to finish."
        ),
        "images": [],
        "category": "Photo Frames",
        "size": "8x10in",
        "tags": ["Best Under Personalised Gifts"],
        "careInstructions": "Wipe gently with a dry cloth. Keep away from moisture.",
        "isBundle": False,
        "isCustomizable": True,
        "createdAt": datetime(2024, 2, 1),
    },

    # ---- Product 4: Diwali Gift Hamper ----
    {
        "name": "Diwali Gift Hamper",
        "price": 2800,
        "description": (
            "A curated Diwali hamper: two small mandala plates, hand-painted diyas, "
            "and a decorative tray — all made by the artist. Gift-wrapped and ready."
        ),
        "images": [],
        "category": "Gift Bundles",
        "size": "N/A",
        "tags": ["Diwali"],
        "careInstructions": "Wipe individual items with a dry cloth. Keep away from moisture.",
        "isBundle": True,            # This is a bundle/hamper, not a single product
        "isCustomizable": False,
        "createdAt": datetime(2024, 2, 10),
    },

    # ---- Product 5: Jharokha Wall Panel ----
    {
        "name": "Jharokha Wall Panel",
        "price": 4200,
        "description": (
            "A traditional Rajasthani jharokha arch transformed into a wall hanging "
            "with dot mandala art. Brings architectural grandeur to any space."
        ),
        "images": [],
        "category": "Jharokhas",
        "size": "14in",
        "tags": ["Best Seller"],
        "careInstructions": "Dust with a soft brush. Avoid moisture and direct sunlight.",
        "isBundle": False,
        "isCustomizable": False,
        "createdAt": datetime(2024, 2, 15),
    },

    # ---- Product 6: Wedding Season Gifting Set ----
    {
        "name": "Wedding Season Gifting Set",
        "price": 3200,
        "description": (
            "A curated set for wedding season — a personalized mandala frame and a "
            "decorative plate, each made solo, with care and intention."
        ),
        "images": [],
        "category": "Gift Bundles",
        "size": "N/A",
        "tags": ["Wedding Season", "Best Under Personalised Gifts"],
        "careInstructions": "Handle with care. Wipe individual pieces with a soft dry cloth.",
        "isBundle": True,
        "isCustomizable": True,
        "createdAt": datetime(2024, 2, 20),
    },
]


async def seed():
    """Wipe the products collection and insert all starter products."""

    # Step 1: Delete everything currently in the products collection.
    # delete_many({}) means "delete all documents that match this filter"
    # and an empty filter {} means "match everything" — so it clears the table.
    await products_collection.delete_many({})
    print("Cleared existing products.")

    # Step 2: Insert all 6 products at once.
    # insert_many() is faster than calling insert_one() six times
    # because it sends everything in a single network trip to Atlas.
    result = await products_collection.insert_many(mock_products)

    # result.inserted_ids is a list of the 6 auto-generated _id values
    print(f"Inserted {len(result.inserted_ids)} products.")


# ---- This is how Python runs an async function from a regular script ----
# Our seed() function uses "await" (because Motor is async),
# so we can't just call seed() directly — Python would complain.
# asyncio.run() sets up the async machinery and runs it for us.
if __name__ == "__main__":
    asyncio.run(seed())