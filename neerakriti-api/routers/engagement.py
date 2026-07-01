# neerakriti-api/routers/engagement.py
# ENGAGEMENT SERVICE

from fastapi import APIRouter, HTTPException
from models import Feedback, Subscriber
from datetime import datetime

router = APIRouter(prefix="/engagement", tags=["Engagement"])

# Temporary in-memory storage — replaced with MongoDB in Phase 3
feedback_store = []
subscriber_store = []


@router.post("/feedback")
async def submit_feedback(feedback: Feedback):
    """
    POST /engagement/feedback
    Body: { "name": "Riya", "message": "Beautiful work!", "rating": 5 }
    FastAPI validates the body against the Feedback model before this runs.
    If rating is 6 or message is missing → automatic 422 error, this code never runs.
    """
    record = feedback.model_dump()                         # Pydantic model → plain dict
    record["submittedAt"] = datetime.now().isoformat()     # add timestamp
    feedback_store.append(record)                          # save in memory

    print(f"[Feedback] {feedback.name} | {feedback.rating}/5 | '{feedback.message}'")

    return {"status": "success", "message": "Thank you for your feedback!"}


@router.post("/subscribe")
async def subscribe(subscriber: Subscriber):
    """
    POST /engagement/subscribe
    Body: { "contact": "9876543210", "contactType": "whatsapp" }
    """
    if subscriber.contactType not in ["email", "whatsapp"]:
        raise HTTPException(
            status_code=400,
            detail="contactType must be 'email' or 'whatsapp'"
        )

    record = subscriber.model_dump()
    record["subscribedAt"] = datetime.now().isoformat()
    subscriber_store.append(record)

    print(f"[Subscriber] {subscriber.contactType}: {subscriber.contact}")

    return {"status": "success", "message": "You'll be the first to know about new arrivals!"}


@router.get("/feedback")
async def get_all_feedback():
    """GET /engagement/feedback — see all submitted feedback (for testing)."""
    return {"count": len(feedback_store), "feedback": feedback_store}


@router.get("/subscribers")
async def get_all_subscribers():
    """GET /engagement/subscribers — see all signups (for testing)."""
    return {"count": len(subscriber_store), "subscribers": subscriber_store}