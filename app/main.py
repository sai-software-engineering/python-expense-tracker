from fastapi import FastAPI

# Initialize FastAPI application
app = FastAPI(
    title="Expense Tracker API",
    description="REST API for managing personal income and expenses.",
    version="1.0.0"
)


# Root endpoint
@app.get("/")
def root():
    return {
        "message": "Welcome to Expense Tracker API",
        "status": "running"
    }


# Health check endpoint
@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }