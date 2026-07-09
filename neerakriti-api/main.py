# neerakriti-api/main.py
# Entry point. Run with: uvicorn main:app --reload
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.catalog import router as catalog_router
from routers.inquiry import router as inquiry_router
from routers.engagement import router as engagement_router

app = FastAPI(
    title="Neerakriti API",
    description="Backend for Neerakriti — handmade dot mandala art store",
    version="2.0.0",
)

# ─────────────────────────────────────────────
# CORS — MUST come before app.include_router()
# Without this, every fetch() from Next.js is
# blocked by the browser, even on localhost.
# ─────────────────────────────────────────────
allowed_origins_str = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000")
allowed_origins = [origin.strip() for origin in allowed_origins_str.split(",")]
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount the three service routers
app.include_router(catalog_router)      # /products/*
app.include_router(inquiry_router)      # /inquiry/*
app.include_router(engagement_router)   # /engagement/*


@app.get("/", tags=["Health"])
async def health_check():
    return {
        "status": "running",
        "phase": "Neerakriti API — Production",
    }