# neerakriti-api/routers/inquiry.py
# INQUIRY SERVICE

from fastapi import APIRouter, HTTPException
from urllib.parse import quote
from mock_data import PRODUCTS

router = APIRouter(prefix="/inquiry", tags=["Inquiry"])

# ← Replace with the actual WhatsApp number before going live
# Format: country code + number, no spaces, no +
WHATSAPP_NUMBER = "919876543210"


def find_product_or_404(product_id: str):
    """Helper: find a product by ID or raise a 404."""
    for p in PRODUCTS:
        if p["id"] == product_id:
            return p
    raise HTTPException(status_code=404, detail=f"Product '{product_id}' not found")


@router.get("/whatsapp/{product_id}")
async def get_inquiry_link(product_id: str):
    """
    GET /inquiry/whatsapp/p001
    Returns a pre-filled WhatsApp link for a general inquiry.
    The 'Enquire via WhatsApp' button on every product hits this.
    """
    product = find_product_or_404(product_id)

    message = (
        f"Hi! I came across Neerakriti and I'm interested in "
        f"'{product['name']}' (₹{product['price']}). "
        f"Could you please share more details?"
    )

    # quote() encodes special characters so the URL doesn't break
    # ₹ becomes %E2%82%B9, spaces become %20, etc.
    encoded_message = quote(message)

    return {
        "whatsapp_url": f"https://wa.me/{WHATSAPP_NUMBER}?text={encoded_message}",
        "product_name": product["name"],
        "product_price": product["price"],
    }


@router.get("/customize/{product_id}")
async def get_customize_link(product_id: str):
    """
    GET /inquiry/customize/p001
    Returns a customize-specific WhatsApp link.
    Only shown when product.isCustomizable === true.
    """
    product = find_product_or_404(product_id)

    if not product["isCustomizable"]:
        raise HTTPException(
            status_code=400,
            detail=f"'{product['name']}' is not available for customization."
        )

    message = (
        f"Hi! I'd love to customize your '{product['name']}' (₹{product['price']}). "
        f"Could you tell me what personalization options are available? "
        f"(e.g. colour palette, size, name/initials)"
    )

    return {
        "whatsapp_url": f"https://wa.me/{WHATSAPP_NUMBER}?text={quote(message)}",
        "product_name": product["name"],
        "product_price": product["price"],
    }