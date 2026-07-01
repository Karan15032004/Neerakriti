# neerakriti-api/models.py

from pydantic import BaseModel, Field
from typing import List, Optional


class Feedback(BaseModel):
    """Shape of the feedback form submission."""
    name: str = Field(..., min_length=1)
    message: str = Field(..., min_length=5)
    rating: int = Field(..., ge=1, le=5)   # ge = min, le = max — rating must be 1–5


class Subscriber(BaseModel):
    """Shape of the notify-me signup."""
    contact: str = Field(..., min_length=3)      # email or WhatsApp number
    contactType: str = Field(...)                # "email" or "whatsapp"
    