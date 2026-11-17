from datetime import date

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app import models

dashboard_router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@dashboard_router.get("/monthly-expenses")
def get_monthly_expenses(
    year: int = date.today().year,
    db: Session = Depends(get_db)
):
    results = (
        db.query(
            func.strftime("%m", models.Transaction.transaction_date).label("month"),
            func.sum(models.Transaction.amount).label("total")
        )
        .filter(
            models.Transaction.type == "EXPENSE",
            func.strftime("%Y", models.Transaction.transaction_date) == str(year)
        )
        .group_by(
            func.strftime("%m", models.Transaction.transaction_date)
        )
        .order_by(
            func.strftime("%m", models.Transaction.transaction_date)
        )
        .all()
    )

    return [
        {
            "month": int(row.month),
            "total_expenses": float(row.total)
        }
        for row in results
    ]


@dashboard_router.get("/category-wise-spending")
def get_category_wise_spending(
    db: Session = Depends(get_db)
):
    results = (
        db.query(
            models.Category.name.label("category"),
            func.sum(models.Transaction.amount).label("total")
        )
        .join(
            models.Transaction,
            models.Transaction.category_id == models.Category.id
        )
        .filter(
            models.Transaction.type == "EXPENSE"
        )
        .group_by(
            models.Category.id,
            models.Category.name
        )
        .order_by(
            func.sum(models.Transaction.amount).desc()
        )
        .all()
    )

    return [
        {
            "category": row.category,
            "total_spending": float(row.total)
        }
        for row in results
    ]


@dashboard_router.get("/income-vs-expenses")
def get_income_vs_expenses(
    year: int = date.today().year,
    db: Session = Depends(get_db)
):
    results = (
        db.query(
            func.strftime("%m", models.Transaction.transaction_date).label("month"),
            models.Transaction.type.label("type"),
            func.sum(models.Transaction.amount).label("total")
        )
        .filter(
            func.strftime("%Y", models.Transaction.transaction_date) == str(year)
        )
        .group_by(
            func.strftime("%m", models.Transaction.transaction_date),
            models.Transaction.type
        )
        .order_by(
            func.strftime("%m", models.Transaction.transaction_date)
        )
        .all()
    )

    monthly_data = {}

    for row in results:
        month = int(row.month)

        if month not in monthly_data:
            monthly_data[month] = {
                "month": month,
                "income": 0.0,
                "expenses": 0.0
            }

        monthly_data[month][
            "income" if row.type == "INCOME" else "expenses"
        ] = float(row.total)

    return list(monthly_data.values())


@dashboard_router.get("/summary")
def get_dashboard_summary(
    db: Session = Depends(get_db)
):
    total_income = (
        db.query(func.sum(models.Transaction.amount))
        .filter(models.Transaction.type == "INCOME")
        .scalar()
    ) or 0

    total_expenses = (
        db.query(func.sum(models.Transaction.amount))
        .filter(models.Transaction.type == "EXPENSE")
        .scalar()
    ) or 0

    balance = total_income - total_expenses

    return {
        "total_income": float(total_income),
        "total_expenses": float(total_expenses),
        "balance": float(balance)
    }