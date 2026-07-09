# seed.py
# -------
# Seeds your MongoDB database with all current Neerakriti products.
#
# Run from PowerShell inside neerakriti-api/:
#   python seed.py
#
# ═══════════════════════════════════════════════════════════════════
# HOW TO ADD A NEW PRODUCT IN THE FUTURE (3 steps, no code hunting)
# ═══════════════════════════════════════════════════════════════════
#
# STEP 1 — Add your image to the right folder:
#   neerakriti/public/images/<category-folder>/<image-name>.jpeg
#   Example: neerakriti/public/images/diwali-tealights/diwali-tealight-8.jpeg
#
# STEP 2 — Add ONE entry to the PRODUCTS list below.
#   Copy any nearby entry in the same category, then change:
#     • "name"      → new product name
#     • "images"    → ["/images/<folder>/<filename>.jpeg"]
#     • "createdAt" → today's date
#   Everything else (description, careInstructions, etc.) can stay
#   the same within a category or be tweaked as needed.
#
# STEP 3 — Run:  python seed.py
#   That's it. The product appears in the catalogue automatically.
#
# ═══════════════════════════════════════════════════════════════════
# HOW CATEGORIES WORK (the "auto-mapping" you asked about)
# ═══════════════════════════════════════════════════════════════════
#
# The "category" string in each product entry IS the category.
# The frontend filter dropdown calls /catalog/categories, which runs
# MongoDB's .distinct("category"), which returns every unique category
# string that exists in the database at that moment.
#
# ► New product in EXISTING category (e.g. "Tea Light Holders"):
#   Use the exact same "category" string as the other products in
#   that group. It goes into that group automatically on the frontend.
#
# ► New product in a BRAND NEW category (e.g. "Wall Hangings"):
#   Use a new "category" string. It AUTOMATICALLY appears as a new
#   filter option on the frontend — zero code changes needed anywhere.
#
# ═══════════════════════════════════════════════════════════════════
# IMAGE PATH FORMAT
# ═══════════════════════════════════════════════════════════════════
#
# Always use forward slashes, starting with /images/
# Example: "/images/photo-frames/photo-frame-2.jpeg"
#
# Next.js serves everything inside public/ as static files.
# So public/images/photo-frames/photo-frame-2.jpeg
# becomes the URL: /images/photo-frames/photo-frame-2.jpeg
# which is exactly what you store here.
#
# ⚠️  CASE SENSITIVE on Linux (production/Railway):
#     The folder "Jharokha" must be written as "Jharokha" (capital J),
#     not "jharokha" — match the actual folder name exactly.
#     File extensions: .jpeg must be uppercase if that's how the file
#     is saved. Check your actual filenames when adding new products.
#
# ═══════════════════════════════════════════════════════════════════
# SAFE TO RE-RUN: Wipes the products collection first, then re-inserts
# everything fresh. No duplicates ever possible.
# ═══════════════════════════════════════════════════════════════════

import asyncio
from datetime import datetime
from database import products_collection


PRODUCTS = [

    # ───────────────────────────────────────────────────────────────
    # CATEGORY: Photo Frames  (₹1200 each, all isCustomizable)
    # Folder: neerakriti/public/images/photo-frames/
    # To add Design 9 later: drop photo-frame-10.jpeg in this folder,
    # add an entry below with "category": "Photo Frames". Done.
    # ───────────────────────────────────────────────────────────────
    {
        "name": "Photo Frame — Design 1",
        "price": 1200,
        "description": "A custom dot mandala photo frame hand-painted around your favourite photograph. Send us any photo — family portrait, couple shot, or a solo picture — and we'll create a one-of-a-kind mandala border. Every piece is unique, just like your memories.",
        "images": ["/images/photo-frames/photo-frame-2.jpeg"],
        "category": "Photo Frames",
        "size": "10in",
        "tags": ["Best Seller", "Best Under Personalised Gifts"],
        "careInstructions": "Wipe gently with a dry cloth. Avoid moisture and direct sunlight. Handle with care — each dot is hand-painted.",
        "isBundle": False,
        "isCustomizable": True,
        "createdAt": datetime(2025, 6, 1, 10, 0, 0),
    },
    {
        "name": "Photo Frame — Design 2",
        "price": 1200,
        "description": "A custom dot mandala photo frame hand-painted around your favourite photograph. Send us any photo — family portrait, couple shot, or a solo picture — and we'll create a one-of-a-kind mandala border. Every piece is unique, just like your memories.",
        "images": ["/images/photo-frames/photo-frame-3.jpeg"],
        "category": "Photo Frames",
        "size": "10in",
        "tags": ["Best Under Personalised Gifts"],
        "careInstructions": "Wipe gently with a dry cloth. Avoid moisture and direct sunlight. Handle with care — each dot is hand-painted.",
        "isBundle": False,
        "isCustomizable": True,
        "createdAt": datetime(2025, 6, 2, 10, 0, 0),
    },
    {
        "name": "Photo Frame — Design 3",
        "price": 1200,
        "description": "A custom dot mandala photo frame hand-painted around your favourite photograph. Send us any photo — family portrait, couple shot, or a solo picture — and we'll create a one-of-a-kind mandala border. Every piece is unique, just like your memories.",
        "images": ["/images/photo-frames/photo-frame-4.jpeg"],
        "category": "Photo Frames",
        "size": "10in",
        "tags": ["Best Under Personalised Gifts"],
        "careInstructions": "Wipe gently with a dry cloth. Avoid moisture and direct sunlight. Handle with care — each dot is hand-painted.",
        "isBundle": False,
        "isCustomizable": True,
        "createdAt": datetime(2025, 6, 3, 10, 0, 0),
    },
    {
        "name": "Photo Frame — Design 4",
        "price": 1200,
        "description": "A custom dot mandala photo frame hand-painted around your favourite photograph. Send us any photo — family portrait, couple shot, or a solo picture — and we'll create a one-of-a-kind mandala border. Every piece is unique, just like your memories.",
        "images": ["/images/photo-frames/photo-frame-5.jpeg"],
        "category": "Photo Frames",
        "size": "10in",
        "tags": ["Best Under Personalised Gifts"],
        "careInstructions": "Wipe gently with a dry cloth. Avoid moisture and direct sunlight. Handle with care — each dot is hand-painted.",
        "isBundle": False,
        "isCustomizable": True,
        "createdAt": datetime(2025, 6, 4, 10, 0, 0),
    },
    {
        "name": "Photo Frame — Design 5",
        "price": 1200,
        "description": "A custom dot mandala photo frame hand-painted around your favourite photograph. Send us any photo — family portrait, couple shot, or a solo picture — and we'll create a one-of-a-kind mandala border. Every piece is unique, just like your memories.",
        "images": ["/images/photo-frames/photo-frame-6.jpeg"],
        "category": "Photo Frames",
        "size": "10in",
        "tags": ["Best Under Personalised Gifts"],
        "careInstructions": "Wipe gently with a dry cloth. Avoid moisture and direct sunlight. Handle with care — each dot is hand-painted.",
        "isBundle": False,
        "isCustomizable": True,
        "createdAt": datetime(2025, 6, 5, 10, 0, 0),
    },
    {
        "name": "Photo Frame — Design 6",
        "price": 1200,
        "description": "A custom dot mandala photo frame hand-painted around your favourite photograph. Send us any photo — family portrait, couple shot, or a solo picture — and we'll create a one-of-a-kind mandala border. Every piece is unique, just like your memories.",
        "images": ["/images/photo-frames/photo-frame-7.jpeg"],
        "category": "Photo Frames",
        "size": "10in",
        "tags": ["Best Under Personalised Gifts"],
        "careInstructions": "Wipe gently with a dry cloth. Avoid moisture and direct sunlight. Handle with care — each dot is hand-painted.",
        "isBundle": False,
        "isCustomizable": True,
        "createdAt": datetime(2025, 6, 6, 10, 0, 0),
    },
    {
        "name": "Photo Frame — Design 7",
        "price": 1200,
        "description": "A custom dot mandala photo frame hand-painted around your favourite photograph. Send us any photo — family portrait, couple shot, or a solo picture — and we'll create a one-of-a-kind mandala border. Every piece is unique, just like your memories.",
        "images": ["/images/photo-frames/photo-frame-8.jpeg"],
        "category": "Photo Frames",
        "size": "10in",
        "tags": ["Best Under Personalised Gifts"],
        "careInstructions": "Wipe gently with a dry cloth. Avoid moisture and direct sunlight. Handle with care — each dot is hand-painted.",
        "isBundle": False,
        "isCustomizable": True,
        "createdAt": datetime(2025, 6, 7, 10, 0, 0),
    },
    {
        "name": "Photo Frame — Design 8",
        "price": 1200,
        "description": "A custom dot mandala photo frame hand-painted around your favourite photograph. Send us any photo — family portrait, couple shot, or a solo picture — and we'll create a one-of-a-kind mandala border. Every piece is unique, just like your memories.",
        "images": ["/images/photo-frames/photo-frame-9.jpeg"],
        "category": "Photo Frames",
        "size": "10in",
        "tags": ["Best Under Personalised Gifts"],
        "careInstructions": "Wipe gently with a dry cloth. Avoid moisture and direct sunlight. Handle with care — each dot is hand-painted.",
        "isBundle": False,
        "isCustomizable": True,
        "createdAt": datetime(2025, 6, 8, 10, 0, 0),
    },

    # ───────────────────────────────────────────────────────────────
    # CATEGORY: Jharokhas  (₹1000 each)
    # Folder: neerakriti/public/images/Jharokha/   ← capital J, match exactly
    # ───────────────────────────────────────────────────────────────
    {
        "name": "Jharokha — Design 1",
        "price": 1000,
        "description": "A handcrafted Jharokha (traditional Indian arch window frame) adorned with intricate dot mandala art. Inspired by the ornate window frames of Rajasthani palaces, this piece adds warmth and heritage to your home decor.",
        "images": ["/images/jharokha/jharokha1.jpeg"],
        "category": "Jharokhas",
        "size": "12in",
        "tags": ["Best Seller"],
        "careInstructions": "Dust with a soft dry cloth. Keep away from moisture. Best displayed indoors on a wall away from direct sunlight.",
        "isBundle": False,
        "isCustomizable": True,
        "createdAt": datetime(2025, 5, 20, 10, 0, 0),
    },
    {
        "name": "Jharokha — Design 2",
        "price": 1000,
        "description": "A classic Jharokha wall panel adorned with vibrant dot mandala art. Inspired by the ornate window frames of Rajasthani palaces, this piece adds warmth and heritage to your home decor.",
        "images": ["/images/jharokha/jharokha2.jpeg"],
        "category": "Jharokhas",
        "size": "12in",
        "tags": [],
        "careInstructions": "Dust with a soft dry cloth. Keep away from moisture. Best displayed indoors on a wall away from direct sunlight.",
        "isBundle": False,
        "isCustomizable": True,
        "createdAt": datetime(2025, 5, 25, 10, 0, 0),
    },

    # ───────────────────────────────────────────────────────────────
    # CATEGORY: Tea Light Holders  (₹300 each)
    # Folder: neerakriti/public/images/diwali-tealights/
    # Note: first image is diwali-tealight.jpeg (no number),
    #       then diwali-tealight-2.jpeg through diwali-tealight-7.jpeg
    # To add Design 8 later: save as diwali-tealight-8.jpeg,
    # add entry below with "category": "Tea Light Holders". Done.
    # ───────────────────────────────────────────────────────────────
    {
        "name": "Diwali Tea Light Holder — Design 1",
        "price": 300,
        "description": "Hand-painted dot mandala tea light holder that doubles as festive rangoli art. Place a tea light candle inside and watch the colours glow. Perfect for Diwali decoration or as a thoughtful festive gift.",
        "images": ["/images/diwali-tealights/diwali-tealight.jpeg"],
        "category": "Tea Light Holders",
        "size": "4in",
        "tags": ["Diwali", "Best Seller"],
        "careInstructions": "Keep on a flat surface. Wipe with a dry cloth. Use standard tea light candles only. Do not leave burning candles unattended.",
        "isBundle": False,
        "isCustomizable": True,
        "createdAt": datetime(2025, 7, 1, 10, 0, 0),
    },
    {
        "name": "Diwali Tea Light Holder — Design 2",
        "price": 300,
        "description": "Hand-painted dot mandala tea light holder that doubles as festive rangoli art. Place a tea light candle inside and watch the colours glow. Perfect for Diwali decoration or as a thoughtful festive gift.",
        "images": ["/images/diwali-tealights/diwali-tealight-2.jpeg"],
        "category": "Tea Light Holders",
        "size": "4in",
        "tags": ["Diwali"],
        "careInstructions": "Keep on a flat surface. Wipe with a dry cloth. Use standard tea light candles only. Do not leave burning candles unattended.",
        "isBundle": False,
        "isCustomizable": True,
        "createdAt": datetime(2025, 7, 1, 11, 0, 0),
    },
    {
        "name": "Diwali Tea Light Holder — Design 3",
        "price": 300,
        "description": "Hand-painted dot mandala tea light holder that doubles as festive rangoli art. Place a tea light candle inside and watch the colours glow. Perfect for Diwali decoration or as a thoughtful festive gift.",
        "images": ["/images/diwali-tealights/diwali-tealight-3.jpeg"],
        "category": "Tea Light Holders",
        "size": "4in",
        "tags": ["Diwali"],
        "careInstructions": "Keep on a flat surface. Wipe with a dry cloth. Use standard tea light candles only. Do not leave burning candles unattended.",
        "isBundle": False,
        "isCustomizable": True,
        "createdAt": datetime(2025, 7, 1, 12, 0, 0),
    },
    {
        "name": "Diwali Tea Light Holder — Design 4",
        "price": 300,
        "description": "Hand-painted dot mandala tea light holder that doubles as festive rangoli art. Place a tea light candle inside and watch the colours glow. Perfect for Diwali decoration or as a thoughtful festive gift.",
        "images": ["/images/diwali-tealights/diwali-tealight-4.jpeg"],
        "category": "Tea Light Holders",
        "size": "4in",
        "tags": ["Diwali"],
        "careInstructions": "Keep on a flat surface. Wipe with a dry cloth. Use standard tea light candles only. Do not leave burning candles unattended.",
        "isBundle": False,
        "isCustomizable": True,
        "createdAt": datetime(2025, 7, 1, 13, 0, 0),
    },
    {
        "name": "Diwali Tea Light Holder — Design 5",
        "price": 300,
        "description": "Hand-painted dot mandala tea light holder that doubles as festive rangoli art. Place a tea light candle inside and watch the colours glow. Perfect for Diwali decoration or as a thoughtful festive gift.",
        "images": ["/images/diwali-tealights/diwali-tealight-5.jpeg"],
        "category": "Tea Light Holders",
        "size": "4in",
        "tags": ["Diwali"],
        "careInstructions": "Keep on a flat surface. Wipe with a dry cloth. Use standard tea light candles only. Do not leave burning candles unattended.",
        "isBundle": False,
        "isCustomizable": True,
        "createdAt": datetime(2025, 7, 1, 14, 0, 0),
    },
    {
        "name": "Diwali Tea Light Holder — Design 6",
        "price": 300,
        "description": "Hand-painted dot mandala tea light holder that doubles as festive rangoli art. Place a tea light candle inside and watch the colours glow. Perfect for Diwali decoration or as a thoughtful festive gift.",
        "images": ["/images/diwali-tealights/diwali-tealight-6.jpeg"],
        "category": "Tea Light Holders",
        "size": "4in",
        "tags": ["Diwali"],
        "careInstructions": "Keep on a flat surface. Wipe with a dry cloth. Use standard tea light candles only. Do not leave burning candles unattended.",
        "isBundle": False,
        "isCustomizable": True,
        "createdAt": datetime(2025, 7, 1, 15, 0, 0),
    },
    {
        "name": "Diwali Tea Light Holder — Design 7",
        "price": 300,
        "description": "Hand-painted dot mandala tea light holder that doubles as festive rangoli art. Place a tea light candle inside and watch the colours glow. Perfect for Diwali decoration or as a thoughtful festive gift.",
        "images": ["/images/diwali-tealights/diwali-tealight-7.jpeg"],
        "category": "Tea Light Holders",
        "size": "4in",
        "tags": ["Diwali"],
        "careInstructions": "Keep on a flat surface. Wipe with a dry cloth. Use standard tea light candles only. Do not leave burning candles unattended.",
        "isBundle": False,
        "isCustomizable": True,
        "createdAt": datetime(2025, 7, 1, 16, 0, 0),
    },

    # ───────────────────────────────────────────────────────────────
    # CATEGORY: Key Holders  (₹500 each)
    # Folder: neerakriti/public/images/keyholder/
    # ───────────────────────────────────────────────────────────────
    {
        "name": "Mandala Key Holder",
        "price": 500,
        "description": "A practical yet artistic key holder hand-painted with dot mandala patterns. Mount it near your door and never lose your keys again — all while adding a splash of handmade art to your entryway.",
        "images": ["/images/keyholder/keyholder-1.jpeg"],
        "category": "Key Holders",
        "size": "8in",
        "tags": ["Newly Added"],
        "careInstructions": "Wipe with a dry cloth. Avoid hanging excessively heavy keychains to protect the hooks.",
        "isBundle": False,
        "isCustomizable": True,
        "createdAt": datetime(2025, 7, 5, 10, 0, 0),
    },

    # ───────────────────────────────────────────────────────────────
    # CATEGORY: Coasters  (₹400 each)
    # Folder: neerakriti/public/images/coasters/
    # Note: first image is coaster-set.jpeg, second is coaster-set-1.jpeg
    # ───────────────────────────────────────────────────────────────
    {
        "name": "Mandala Coaster Set — Design 1",
        "price": 400,
        "description": "A set of hand-painted dot mandala coasters that protect your furniture in style. Each coaster features a unique mandala pattern in vibrant colours. Sealed with a protective coating to handle everyday use.",
        "images": ["/images/coasters/coaset-set.jpeg"],
        "category": "Coasters",
        "size": "4in",
        "tags": ["Newly Added"],
        "careInstructions": "Wipe spills immediately with a dry cloth. Do not soak in water. The protective coating handles condensation but prolonged moisture should be avoided.",
        "isBundle": False,
        "isCustomizable": True,
        "createdAt": datetime(2025, 7, 6, 10, 0, 0),
    },
    {
        "name": "Mandala Coaster Set — Design 2",
        "price": 400,
        "description": "A set of hand-painted dot mandala coasters that protect your furniture in style. Each coaster features a unique mandala pattern in vibrant colours. Sealed with a protective coating to handle everyday use.",
        "images": ["/images/coasters/coaster-set-1.jpeg"],
        "category": "Coasters",
        "size": "4in",
        "tags": [],
        "careInstructions": "Wipe spills immediately with a dry cloth. Do not soak in water. The protective coating handles condensation but prolonged moisture should be avoided.",
        "isBundle": False,
        "isCustomizable": True,
        "createdAt": datetime(2025, 7, 6, 11, 0, 0),
    },

    # ───────────────────────────────────────────────────────────────
    # CATEGORY: Diwali Collection
    # Covers: Shree Laxmi Charan (₹350) + Shubh Labh sets (₹300)
    # These are grouped under one "Diwali Collection" category because
    # they are thematically the same — festive decorative pieces for Diwali.
    # Folders:
    #   neerakriti/public/images/diwali-shreelaxmicharan/
    #   neerakriti/public/images/diwali-shubhlabh/
    # ───────────────────────────────────────────────────────────────
    {
        "name": "Shree Laxmi Charan — Design 1",
        "price": 350,
        "description": "A hand-painted Shree Laxmi Charan (sacred footprints of Goddess Lakshmi) in dot mandala art. Traditionally placed at the entrance of homes during Diwali to welcome prosperity and good fortune.",
        "images": ["/images/diwali-shreelaxmicharan/Diwali-ShreeLaxmiCharan-1.jpeg"],
        "category": "Diwali Collection",
        "size": "6in",
        "tags": ["Diwali"],
        "careInstructions": "Handle with care. Wipe with a dry cloth. Store safely after the festive season.",
        "isBundle": False,
        "isCustomizable": True,
        "createdAt": datetime(2025, 7, 2, 10, 0, 0),
    },
    {
        "name": "Shubh Labh Set — Design 1",
        "price": 300,
        "description": "A decorative Shubh Labh set hand-painted with dot mandala art. 'Shubh' means auspicious and 'Labh' means profit — traditionally hung on doors or walls during Diwali for blessings of prosperity.",
        "images": ["/images/diwali-shubhlabh/Diwali-shubhlabh-1.jpeg"],
        "category": "Diwali Collection",
        "size": "6in",
        "tags": ["Diwali"],
        "careInstructions": "Handle with care. Wipe with a dry cloth. Store safely after the festive season.",
        "isBundle": False,
        "isCustomizable": True,
        "createdAt": datetime(2025, 7, 3, 10, 0, 0),
    },
    {
        "name": "Shubh Labh Set — Design 2",
        "price": 300,
        "description": "A decorative Shubh Labh set hand-painted with dot mandala art. 'Shubh' means auspicious and 'Labh' means profit — traditionally hung on doors or walls during Diwali for blessings of prosperity.",
        "images": ["/images/diwali-shubhlabh/Diwali-shubhlabh-2.jpeg"],
        "category": "Diwali Collection",
        "size": "6in",
        "tags": ["Diwali"],
        "careInstructions": "Handle with care. Wipe with a dry cloth. Store safely after the festive season.",
        "isBundle": False,
        "isCustomizable": True,
        "createdAt": datetime(2025, 7, 3, 11, 0, 0),
    },
    {
        "name": "Shubh Labh Set — Design 3",
        "price": 300,
        "description": "A decorative Shubh Labh set hand-painted with dot mandala art. 'Shubh' means auspicious and 'Labh' means profit — traditionally hung on doors or walls during Diwali for blessings of prosperity.",
        "images": ["/images/diwali-shubhlabh/Diwali-shubhlabh-3.jpeg"],
        "category": "Diwali Collection",
        "size": "6in",
        "tags": ["Diwali"],
        "careInstructions": "Handle with care. Wipe with a dry cloth. Store safely after the festive season.",
        "isBundle": False,
        "isCustomizable": True,
        "createdAt": datetime(2025, 7, 3, 12, 0, 0),
    },

    # ───────────────────────────────────────────────────────────────
    # CATEGORY: Wall Decor  (₹1200 each)
    # Folder: neerakriti/public/images/wall-decors/
    # Both products here are Swastik designs — named Design 1 and 2
    # to keep cards distinguishable on the catalogue page.
    # ───────────────────────────────────────────────────────────────
    {
        "name": "Wall Decor Swastik — Design 1",
        "price": 1200,
        "description": "A hand-painted dot mandala Swastik wall decor piece. The Swastik is one of the oldest and most auspicious symbols in Indian culture — rendered here in intricate dot work, it makes for a meaningful and beautiful addition to any home.",
        "images": ["/images/wall-decors/wall-decor-1.jpeg"],
        "category": "Wall Decor",
        "size": "12in",
        "tags": ["Best Seller"],
        "careInstructions": "Wipe with a dry cloth. Avoid moisture and direct sunlight. Use appropriate wall hooks for secure mounting.",
        "isBundle": False,
        "isCustomizable": True,
        "createdAt": datetime(2025, 6, 15, 10, 0, 0),
    },
    {
        "name": "Wall Decor Swastik — Design 2",
        "price": 1200,
        "description": "A hand-painted dot mandala Swastik wall decor piece. The Swastik is one of the oldest and most auspicious symbols in Indian culture — rendered here in intricate dot work, it makes for a meaningful and beautiful addition to any home.",
        "images": ["/images/wall-decors/wall-decor-2.jpeg"],
        "category": "Wall Decor",
        "size": "12in",
        "tags": ["Newly Added"],
        "careInstructions": "Wipe with a dry cloth. Avoid moisture and direct sunlight. Use appropriate wall hooks for secure mounting.",
        "isBundle": False,
        "isCustomizable": True,
        "createdAt": datetime(2025, 6, 20, 10, 0, 0),
    },

]  # ← End of PRODUCTS list. Add new entries above this line.


async def seed():
    """Wipes all existing products and inserts the fresh list above."""

    # Step 1: Delete everything currently in the products collection
    # This prevents duplicates if you re-run the script after making changes
    result = await products_collection.delete_many({})
    print(f"Cleared {result.deleted_count} existing products.")

    # Step 2: Insert every product in the PRODUCTS list
    inserted = await products_collection.insert_many(PRODUCTS)
    print(f"Inserted {len(inserted.inserted_ids)} products.")
    print("\nDone! Verify in MongoDB Atlas → Browse Collections → neerakriti → products")
    print("You should see 26 documents.")


if __name__ == "__main__":
    asyncio.run(seed())