from datetime import datetime

from sqlalchemy import String, Boolean, DateTime, CheckConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Category(Base):
    __tablename__ = "categories"

    __table_args__ = (
        CheckConstraint(
            "type IN ('INCOME', 'EXPENSE')",
            name="check_category_type"
        ),
    )

    # Primary key
    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )

    # Category name
    name: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    # Category type: INCOME or EXPENSE
    type: Mapped[str] = mapped_column(
        String(10),
        nullable=False
    )

    # Indicates whether the category is predefined
    is_default: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False
    )

    # Category creation timestamp
    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    # Relationship with transactions
    transactions: Mapped[list["Transaction"]] = relationship(
        back_populates="category"
    )