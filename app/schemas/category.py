from datetime import datetime
from enum import Enum

from pydantic import BaseModel, ConfigDict, Field


# Allowed category types
class CategoryType(str, Enum):
    INCOME = "INCOME"
    EXPENSE = "EXPENSE"


# Common category fields
class CategoryBase(BaseModel):
    name: str = Field(
        ...,
        min_length=1,
        max_length=100,
        description="Name of the category"
    )

    type: CategoryType


# Schema for creating a category
class CategoryCreate(CategoryBase):
    pass


# Schema for updating a category
class CategoryUpdate(BaseModel):
    name: str | None = Field(
        default=None,
        min_length=1,
        max_length=100
    )

    type: CategoryType | None = None


# Schema for returning category information
class CategoryResponse(CategoryBase):
    id: int
    is_default: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)