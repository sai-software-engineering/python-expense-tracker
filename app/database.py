from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

# SQLite database configuration
DATABASE_URL = "sqlite:///./expense_tracker.db"

# Create database engine
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

# Create database session factory
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


# Base class for all database models
class Base(DeclarativeBase):
    pass


# Database dependency
def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()