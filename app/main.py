from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.database import Base, engine
from app import models
from app.routers import category_router


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

# Register routers
app.include_router(category_router)


@app.get("/")
def root():
    return {
        "message": "Welcome to Expense Tracker API",
        "status": "running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }