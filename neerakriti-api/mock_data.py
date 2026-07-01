# neerakriti-api/mock_data.py
# In-memory product data for Phase 2.
# Every field matches the locked MongoDB schema exactly.
# In Phase 3, this entire file is deleted and replaced with real MongoDB queries.

PRODUCTS = [
    {
        "id": "p001",
        "name": "Seven Chakras Mandala Plate",
        "price": 2400,
        "description": (
            "A hand-painted dot mandala plate tracing the seven energy chakras "
            "in harmonious, vibrant colour. Each dot is placed by hand — no stencils, "
            "no shortcuts. A meditative piece of art and a striking wall accent."
        ),
        "images": ["/images/placeholder.jpg"],
        "category": "Wall Decor",
        "size": "12in",
        "tags": ["Best Seller", "Best Under Personalised Gifts"],
        "careInstructions": "Wipe gently with a dry, soft cloth. Avoid direct sunlight and moisture.",
        "isBundle": False,
        "isCustomizable": True,
        "createdAt": "2024-01-15",
    },
    {
        "id": "p002",
        "name": "Evil Eye Mandala Plate",
        "price": 1800,
        "description": (
            "An evil eye motif rendered in deep blues and turquoise through the "
            "meditative art of dot mandala painting. A protective talisman that doubles as wall art."
        ),
        "images": ["/images/placeholder.jpg"],
        "category": "Wall Decor",
        "size": "10in",
        "tags": ["Best Seller"],
        "careInstructions": "Wipe gently with a dry, soft cloth. Avoid direct sunlight.",
        "isBundle": False,
        "isCustomizable": False,
        "createdAt": "2024-01-20",
    },
    {
        "id": "p003",
        "name": "Bridal Mirror Frame",
        "price": 3500,
        "description": (
            "An exquisite mirror frame with intricate dot mandala patterns in gold, ivory, "
            "and rose. A timeless wedding or housewarming gift, hand-crafted start to finish."
        ),
        "images": ["/images/placeholder.jpg"],
        "category": "Photo Frames",
        "size": "8x10in",
        "tags": ["Best Under Personalised Gifts"],
        "careInstructions": "Wipe gently with a dry cloth. Keep away from moisture.",
        "isBundle": False,
        "isCustomizable": True,
        "createdAt": "2024-02-01",
    },
    {
        "id": "p004",
        "name": "Diwali Gift Hamper",
        "price": 2800,
        "description": (
            "A curated Diwali hamper: two small mandala plates, hand-painted diyas, "
            "and a decorative tray — all made by the artist. Gift-wrapped and ready."
        ),
        "images": ["/images/placeholder.jpg"],
        "category": "Gift Bundles",
        "size": "N/A",
        "tags": ["Diwali"],
        "careInstructions": "Wipe individual items with a dry cloth. Keep away from moisture.",
        "isBundle": True,
        "isCustomizable": True,
        "createdAt": "2024-02-10",
    },
    {
        "id": "p005",
        "name": "Jharokha Wall Panel",
        "price": 4200,
        "description": (
            "A traditional Rajasthani jharokha arch transformed into a wall hanging "
            "with dot mandala art. Brings architectural grandeur to any space."
        ),
        "images": ["/images/placeholder.jpg"],
        "category": "Jharokhas",
        "size": "14in",
        "tags": ["Best Seller"],
        "careInstructions": "Dust with a soft brush. Avoid moisture and direct sunlight.",
        "isBundle": False,
        "isCustomizable": True,
        "createdAt": "2024-02-15",
    },
    {
        "id": "p006",
        "name": "Wedding Season Gifting Set",
        "price": 3200,
        "description": (
            "A curated set for wedding season — a personalized mandala frame and a "
            "decorative plate, each made solo, with care and intention."
        ),
        "images": ["/images/placeholder.jpg"],
        "category": "Gift Bundles",
        "size": "N/A",
        "tags": ["Wedding Season", "Best Under Personalised Gifts"],
        "careInstructions": "Handle with care. Wipe individual pieces with a soft dry cloth.",
        "isBundle": True,
        "isCustomizable": True,
        "createdAt": "2024-02-20",
    },
]