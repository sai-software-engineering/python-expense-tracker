from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.database import Base, engine

from app.routers import *
from fastapi import Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create database tables
    Base.metadata.create_all(bind=engine)

    yield


app = FastAPI(
    title="Expense Tracker API",
    description="REST API for managing personal income and expenses.",
    version="1.0.0",
    lifespan=lifespan
)

app.mount(
    "/static",
    StaticFiles(directory="app/static"),
    name="static"
)

templates = Jinja2Templates(directory="app/templates")


# Register routers
app.include_router(category_router)
app.include_router(expense_router)
app.include_router(income_router)
app.include_router(dashboard_router)


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }

@app.get("/", response_class=HTMLResponse)
def home(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="home.html",
        context={}
    )


@app.get("/expenses", response_class=HTMLResponse)
def expenses_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="expense.html",
        context={}
    )


@app.get("/income", response_class=HTMLResponse)
def income_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="income.html",
        context={}
    )


@app.get("/categories", response_class=HTMLResponse)
def categories_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="categories.html",
        context={}
    )
