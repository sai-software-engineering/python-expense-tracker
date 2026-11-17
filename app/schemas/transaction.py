from datetime import date, datetime
from decimal import Decimal
from enum import Enum

from pydantic import BaseModel, ConfigDict, Field


# Allowed transaction types
class TransactionType(str, Enum):
    INCOME = "INCOME"
    EXPENSE = "EXPENSE"


# Common transaction fields
class TransactionBase(BaseModel):
    type: TransactionType

    amount: Decimal = Field(
        ...,
        gt=0,
        max_digits=12,
        decimal_places=2,
        description="Transaction amount in INR"
    )

    category_id: int = Field(
        ...,
        gt=0
    )

    description: str | None = Field(
        default=None,
        max_length=255
    )

    transaction_date: date


# Schema for creating a transaction
class TransactionCreate(TransactionBase):
    pass


# Schema for updating a transaction
class TransactionUpdate(BaseModel):
    type: TransactionType | None = None

    amount: Decimal | None = Field(
        default=None,
        gt=0,
        max_digits=12,
        decimal_places=2
    )

    category_id: int | None = Field(
        default=None,
        gt=0
    )

    description: str | None = Field(
        default=None,
        max_length=255
    )

    transaction_date: date | None = None


# Schema for returning transaction information
class TransactionResponse(TransactionBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)