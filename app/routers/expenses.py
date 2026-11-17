from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app import models
from app.schemas import TransactionCreate, TransactionUpdate, TransactionResponse

expense_router = APIRouter(
    prefix="/expenses",
    tags=["Expenses"]
)


# GET ALL EXPENSES
@expense_router.get("/", response_model=list[TransactionResponse])
def get_all_expenses(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    return (
        db.query(models.Transaction)
        .filter(models.Transaction.type == "EXPENSE")
        .offset(skip)
        .limit(limit)
        .all()
    )


# GET EXPENSE BY ID
@expense_router.get("/{expense_id}", response_model=TransactionResponse)
def get_expense(
    expense_id: int,
    db: Session = Depends(get_db)
):
    expense = db.query(models.Transaction).filter(
        models.Transaction.id == expense_id,
        models.Transaction.type == "EXPENSE"
    ).first()

    if not expense:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Expense not found"
        )

    return expense


# CREATE EXPENSE
@expense_router.post(
    "/",
    response_model=TransactionResponse,
    status_code=status.HTTP_201_CREATED
)
def create_expense(
    expense: TransactionCreate,
    db: Session = Depends(get_db)
):
    if expense.type.value != "EXPENSE":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only EXPENSE transactions are allowed"
        )

    category = db.query(models.Category).filter(
        models.Category.id == expense.category_id
    ).first()

    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )

    if category.type != "EXPENSE":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Selected category is not an expense category"
        )

    new_expense = models.Transaction(
        type="EXPENSE",
        amount=expense.amount,
        category_id=expense.category_id,
        description=expense.description,
        transaction_date=expense.transaction_date
    )

    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)

    return new_expense


# UPDATE EXPENSE
@expense_router.put(
    "/{expense_id}",
    response_model=TransactionResponse
)
def update_expense(
    expense_id: int,
    expense_data: TransactionUpdate,
    db: Session = Depends(get_db)
):
    expense = db.query(models.Transaction).filter(
        models.Transaction.id == expense_id,
        models.Transaction.type == "EXPENSE"
    ).first()

    if not expense:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Expense not found"
        )

    updates = expense_data.model_dump(exclude_unset=True)

    if updates.get("type") not in (None, "EXPENSE"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Expense type cannot be changed to INCOME"
        )

    category_id = updates.get("category_id", expense.category_id)

    category = db.query(models.Category).filter(
        models.Category.id == category_id
    ).first()

    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )

    if category.type != "EXPENSE":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Selected category is not an expense category"
        )

    updates.pop("type", None)

    for field, value in updates.items():
        setattr(expense, field, value)

    db.commit()
    db.refresh(expense)

    return expense


# DELETE EXPENSE
@expense_router.delete("/{expense_id}")
def delete_expense(
    expense_id: int,
    db: Session = Depends(get_db)
):
    expense = db.query(models.Transaction).filter(
        models.Transaction.id == expense_id,
        models.Transaction.type == "EXPENSE"
    ).first()

    if not expense:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Expense not found"
        )

    db.delete(expense)
    db.commit()

    return {
        "message": "Expense deleted successfully"
    }