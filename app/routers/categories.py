from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app import models
from app.schemas import CategoryCreate, CategoryUpdate, CategoryResponse

category_router = APIRouter(
    prefix="/categories",
    tags=["Categories"]
)


# GET ALL CATEGORIES
@category_router.get("/", response_model=list[CategoryResponse])
def get_all_categories(

    db: Session = Depends(get_db)
):
    return (
        db.query(models.Category)
        .all()
    )


# GET CATEGORY BY ID
@category_router.get("/{category_id}", response_model=CategoryResponse)
def get_category(
    category_id: int,
    db: Session = Depends(get_db)
):
    category = db.query(models.Category).filter(
        models.Category.id == category_id
    ).first()

    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )

    return category


# CREATE CATEGORY
@category_router.post(
    "/",
    response_model=CategoryResponse,
    status_code=status.HTTP_201_CREATED
)
def create_category(
    category: CategoryCreate,
    db: Session = Depends(get_db)
):
    existing_category = db.query(models.Category).filter(
        models.Category.name == category.name,
        models.Category.type == category.type.value
    ).first()

    if existing_category:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Category already exists"
        )

    new_category = models.Category(
        name=category.name,
        type=category.type.value,
        is_default=False
    )

    db.add(new_category)
    db.commit()
    db.refresh(new_category)

    return new_category


# UPDATE CATEGORY
@category_router.put(
    "/{category_id}",
    response_model=CategoryResponse
)
def update_category(
    category_id: int,
    category_data: CategoryUpdate,
    db: Session = Depends(get_db)
):
    category = db.query(models.Category).filter(
        models.Category.id == category_id
    ).first()

    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )

    if category.is_default:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Default categories cannot be modified"
        )

    updates = category_data.model_dump(exclude_unset=True)

    new_name = updates.get("name", category.name)
    new_type = updates.get("type", category.type)

    if new_type is not None:
        new_type = new_type.value

    # Check duplicate category
    duplicate = db.query(models.Category).filter(
        models.Category.id != category_id,
        models.Category.name == new_name,
        models.Category.type == new_type
    ).first()

    if duplicate:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Category already exists"
        )

    # Validate category type against existing transactions
    if new_type != category.type and category.transactions:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot change category type while transactions exist"
        )

    if new_name is not None:
        category.name = new_name

    if new_type is not None:
        category.type = new_type

    db.commit()
    db.refresh(category)

    return category


# DELETE CATEGORY
@category_router.delete("/{category_id}")
def delete_category(
    category_id: int,
    db: Session = Depends(get_db)
):
    category = db.query(models.Category).filter(
        models.Category.id == category_id
    ).first()

    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )

    if category.is_default:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Default categories cannot be deleted"
        )

    if category.transactions:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete a category associated with transactions"
        )

    db.delete(category)
    db.commit()

    return {
        "message": "Category deleted successfully"
    }