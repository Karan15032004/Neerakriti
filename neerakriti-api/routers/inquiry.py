# neerakriti-api/routers/inquiry.py
# WhatsApp links are now generated directly in the frontend (product detail page).
# This router is kept as a stub so main.py doesn't break.

from fastapi import APIRouter

router = APIRouter(prefix="/inquiry", tags=["Inquiry"])

# WhatsApp deep links are built client-side in app/products/[id]/page.js
# using the wa.me URL format directly — no backend call needed.