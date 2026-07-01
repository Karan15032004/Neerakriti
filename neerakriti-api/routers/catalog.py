# neerakriti-api/routers/catalog.py
# CATALOG SERVICE

from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from mock_data import PRODUCTS

router = APIRouter(prefix="/products", tags=["Catalog"])


@router.get("")
async def get_all_products(
    category: Optional[str] = Query(None),
    tag: Optional[str] = Query(None),
    min_price: int = Query(0),
    max_price: int = Query(999999),
):
    """
    GET /products
    GET /products?category=Wall Decor
    GET /products?tag=Best Seller
    GET /products?min_price=1000&max_price=3000
    """
    results = PRODUCTS

    if category:
        results = [p for p in results if p["category"] == category]

    if tag:
        results = [p for p in results if tag in p.get("tags", [])]

    results = [p for p in results if min_price <= p["price"] <= max_price]

    return results


@router.get("/new")
async def get_new_arrivals():
    """
    GET /products/new
    Returns up to 8 products sorted by createdAt, newest first.
    Homepage 'Newly Added' section hits this.
    """
    sorted_products = sorted(PRODUCTS, key=lambda p: p["createdAt"], reverse=True)
    return sorted_products[:8]


@router.get("/best-sellers")
async def get_best_sellers():
    """
    GET /products/best-sellers
    Returns all products tagged 'Best Seller'.
    Homepage 'Best Sellers' section hits this.
    """
    return [p for p in PRODUCTS if "Best Seller" in p.get("tags", [])]


@router.get("/categories")
async def get_categories():
    """
    GET /products/categories
    Returns a deduplicated list of all categories.
    Used by the filter dropdown on the catalogue page.
    """
    categories = sorted(set(p["category"] for p in PRODUCTS))
    return {"categories": categories}


# ⚠️ THIS MUST BE LAST.
# FastAPI reads routes top to bottom. If /{product_id} was above /new,
# a request to /products/new would match product_id="new" and return 404.
@router.get("/{product_id}")
async def get_product(product_id: str):
    """
    GET /products/p001
    Returns a single product by ID.
    Product detail page hits this.
    """
    for product in PRODUCTS:
        if product["id"] == product_id:
            return product

    raise HTTPException(status_code=404, detail=f"Product '{product_id}' not found")
    