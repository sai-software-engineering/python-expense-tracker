from .categories import category_router as category_router
from .expenses import expense_router as expense_router
from .income import income_router as income_router
from .dashboard import dashboard_router
__all__ = [
    "category_router",
    "expense_router",
    "income_router",
    "dashboard_router"
]