from datetime import datetime, date

from sqlalchemy import (
    String,
    Date,
    DateTime,
    Numeric,
    ForeignKey,
    CheckConstraint
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Transaction(Base):
    __tablename__ = "transactions"

    __table_args__ = (
        CheckConstraint(
            "type IN ('INCOME', 'EXPENSE')",
            name="check_transaction_type"
        ),
        CheckConstraint(
            "amount > 0",
            name="check_transaction_amount"
        ),
    )

    # Primary key
    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )

    # Transaction type
    type: Mapped[str] = mapped_column(
        String(10),
        nullable=False
    )

    # Transaction amount in INR
    amount: Mapped[float] = mapped_column(
        Numeric(12, 2),
        nullable=False
    )

    # Foreign key referencing categories table
    category_id: Mapped[int] = mapped_column(
        ForeignKey("categories.id"),
        nullable=False,
        index=True
    )

    # Transaction description
    description: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )

    # Date of transaction
    transaction_date: Mapped[date] = mapped_column(
        Date,
        nullable=False
    )

    # Record creation timestamp
    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    # Record modification timestamp
    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )

    # Relationship with Category
    category: Mapped["Category"] = relationship(
        back_populates="transactions"
    )