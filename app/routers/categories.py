from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app import models
from app.schemas import CategoryCreate, CategoryResponse

category_router = APIRouter(
    prefix="/categories",
    tags=["Categories"]
)


# Get all categories
@category_router.get("/getall", response_model=list[CategoryResponse])
def get_all_categories(
    db: Session = Depends(get_db)
):
    categories = (
        db.query(models.Category)
        .all()
    )

    return categories


# Create a category
@category_router.post(
    "/create",
    response_model=CategoryResponse,
    status_code=status.HTTP_201_CREATED
)
def create_category(
    category: CategoryCreate,
    db: Session = Depends(get_db)
):
    # Check whether category already exists
    existing_category = (
        db.query(models.Category)
        .filter(
            models.Category.name == category.name,
            models.Category.type == category.type.value
        )
        .first()
    )

    if existing_category:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Category already exists"
        )

    # Create SQLAlchemy model instance
    new_category = models.Category(
        name=category.name,
        type=category.type.value,
        is_default=False
    )

    # Save to database
    db.add(new_category)
    db.commit()
    db.refresh(new_category)

    return new_category