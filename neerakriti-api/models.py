# neerakriti-api/models.py

from pydantic import BaseModel, Field
from typing import List, Optional


class Feedback(BaseModel):
    """Shape of the feedback form submission."""
    name: str = Field(..., min_length=1)
    email: str = Field(..., min_length=3)   # ← add this — frontend sends it
    message: str = Field(..., min_length=5)
    rating: Optional[int] = Field(None, ge=1, le=5)
    # 👆 make rating optional with default None
    # The form doesn't have a star rating UI yet
    # When you add one in V2, this field is ready — just remove Optional


class Subscriber(BaseModel):
    """Shape of the notify-me signup."""
    contact: str = Field(..., min_length=3)      # email or WhatsApp number
    contactType: str = Field(...)                # "email" or "whatsapp"
    