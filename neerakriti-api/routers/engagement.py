# routers/engagement.py
# ---------------------
# Handles feedback form submissions and notify-me signups.
#
# BEFORE (Phase 2): received data but didn't save it anywhere permanent.
# AFTER  (Phase 3): saves to MongoDB — feedback collection and subscribers collection.

from fastapi import APIRouter, HTTPException
from datetime import datetime

# Import the two collections we need from database.py
from database import feedback_collection, subscribers_collection

# Import the Pydantic models that define what shape the incoming data must be.
# FastAPI uses these to auto-validate every request — if someone sends
# a feedback form without a "name" field, FastAPI rejects it with a
# clear error BEFORE our code even runs.
from models import Feedback, Subscriber


router = APIRouter(prefix="/engagement", tags=["engagement"])


# ---- Endpoint 1: Submit feedback ----
# URL: POST /engagement/feedback
# Body: {"name": "Priya", "message": "Beautiful work!", "rating": 5}
#
# What happens:
#   1. FastAPI validates the body against the Feedback model
#   2. We convert it to a dict and add a timestamp
#   3. We insert it into the "feedback" collection in MongoDB
#   4. We return the generated _id as confirmation

@router.post("/feedback")
async def submit_feedback(feedback: Feedback):
    """Save a customer feedback submission to MongoDB."""

    # .model_dump() converts the Pydantic model to a plain Python dict.
    # This is needed because Motor expects a dict, not a Pydantic object.
    #
    # Example result:
    # {"name": "Priya", "message": "Beautiful work!", "rating": 5}
    doc = feedback.model_dump()

    # Add a server-generated timestamp. We don't trust the client to send
    # the time — the server knows the real time.
    doc["createdAt"] = datetime.utcnow()

    # insert_one() saves this one document to the feedback collection.
    # It returns an InsertOneResult, which contains the auto-generated _id.
    result = await feedback_collection.insert_one(doc)

    # Return the new document's _id so the frontend knows it worked.
    # str() converts ObjectId to a regular string.
    return {
        "status": "success",
        "message": "Thank you for your feedback!",
        "id": str(result.inserted_id),
    }


# ---- Endpoint 2: Notify-me signup ----
# URL: POST /engagement/subscribe
# Body: {"contact": "priya@gmail.com", "contactType": "email"}
#
# What happens:
#   1. FastAPI validates the body against the Subscriber model
#   2. We check if this email/number is already subscribed (prevent duplicates)
#   3. If not, we insert it into the "subscribers" collection
#   4. We return confirmation

@router.post("/subscribe")
async def subscribe(subscriber: Subscriber):
    """Save a notify-me signup. Prevents duplicate contacts."""

    doc = subscriber.model_dump()

    # Check if this contact already exists in the subscribers collection.
    # find_one() returns the document if found, or None if not.
    # This prevents the same person from signing up twice.
    existing = await subscribers_collection.find_one({"contact": doc["contact"]})

    if existing:
        # 409 = "Conflict" — the standard HTTP code for "this already exists"
        raise HTTPException(
            status_code=409,
            detail="This contact is already subscribed!"
        )

    # Not a duplicate — add timestamp and save
    doc["createdAt"] = datetime.utcnow()
    result = await subscribers_collection.insert_one(doc)

    return {
        "status": "success",
        "message": "You'll be notified about new products!",
        "id": str(result.inserted_id),
    }