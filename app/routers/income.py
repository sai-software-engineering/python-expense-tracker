from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app import models
from app.schemas import TransactionCreate, TransactionUpdate, TransactionResponse

income_router = APIRouter(
    prefix="/income",
    tags=["Income"]
)


# GET ALL INCOME RECORDS
@income_router.get("/", response_model=list[TransactionResponse])
def get_all_income(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    return (
        db.query(models.Transaction)
        .filter(models.Transaction.type == "INCOME")
        .offset(skip)
        .limit(limit)
        .all()
    )


# GET INCOME BY ID
@income_router.get("/{income_id}", response_model=TransactionResponse)
def get_income(
    income_id: int,
    db: Session = Depends(get_db)
):
    income = db.query(models.Transaction).filter(
        models.Transaction.id == income_id,
        models.Transaction.type == "INCOME"
    ).first()

    if not income:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Income record not found"
        )

    return income


# CREATE INCOME
@income_router.post(
    "/",
    response_model=TransactionResponse,
    status_code=status.HTTP_201_CREATED
)
def create_income(
    income: TransactionCreate,
    db: Session = Depends(get_db)
):
    if income.type.value != "INCOME":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only INCOME transactions are allowed"
        )

    category = db.query(models.Category).filter(
        models.Category.id == income.category_id
    ).first()

    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )

    if category.type != "INCOME":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Selected category is not an income category"
        )

    new_income = models.Transaction(
        type="INCOME",
        amount=income.amount,
        category_id=income.category_id,
        description=income.description,
        transaction_date=income.transaction_date
    )

    db.add(new_income)
    db.commit()
    db.refresh(new_income)

    return new_income


# UPDATE INCOME
@income_router.put(
    "/{income_id}",
    response_model=TransactionResponse
)
def update_income(
    income_id: int,
    income_data: TransactionUpdate,
    db: Session = Depends(get_db)
):
    income = db.query(models.Transaction).filter(
        models.Transaction.id == income_id,
        models.Transaction.type == "INCOME"
    ).first()

    if not income:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Income record not found"
        )

    updates = income_data.model_dump(exclude_unset=True)

    if updates.get("type") not in (None, "INCOME", TransactionType.INCOME):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Income type cannot be changed to EXPENSE"
        )

    category_id = updates.get("category_id", income.category_id)

    category = db.query(models.Category).filter(
        models.Category.id == category_id
    ).first()

    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )

    if category.type != "INCOME":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Selected category is not an income category"
        )

    updates.pop("type", None)

    for field, value in updates.items():
        setattr(income, field, value)

    db.commit()
    db.refresh(income)

    return income


# DELETE INCOME
@income_router.delete("/{income_id}")
def delete_income(
    income_id: int,
    db: Session = Depends(get_db)
):
    income = db.query(models.Transaction).filter(
        models.Transaction.id == income_id,
        models.Transaction.type == "INCOME"
    ).first()

    if not income:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Income record not found"
        )

    db.delete(income)
    db.commit()

    return {
        "message": "Income record deleted successfully"
    }