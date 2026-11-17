# System Architecture

## 1. Introduction

This document describes the high-level architecture of the Python Expense Tracker application.

The application follows a layered architecture that separates presentation, API handling, business logic, and data access responsibilities.

## 2. Architecture Overview

The application consists of the following layers:

### 2.1 Presentation Layer

Technologies: HTML, CSS, JavaScript.

Responsibilities:
- Display the application interface.
- Accept user input.
- Send HTTP requests to backend APIs.
- Display API responses and validation errors.
- Render financial charts.

### 2.2 Application Layer

Technology: FastAPI.

Responsibilities:
- Expose REST API endpoints.
- Validate incoming requests using Pydantic.
- Coordinate business operations.
- Return appropriate HTTP responses.

### 2.3 Business Logic Layer

Responsibilities:
- Manage income transactions.
- Manage expense transactions.
- Manage categories.
- Generate financial summaries and reports.

### 2.4 Data Access Layer

Technologies: SQLAlchemy and SQLite.

Responsibilities:
- Execute database operations.
- Retrieve transaction records.
- Store income, expenses, and categories.
- Maintain data relationships.

## 3. Request Processing Flow

Example: Adding an Expense.

1. The user enters expense information.
2. The frontend sends a POST request.
3. FastAPI receives the request.
4. Pydantic validates the request data.
5. The transaction service processes the request.
6. SQLAlchemy interacts with SQLite.
7. The API returns the response.
8. The frontend displays the result.

## 4. Architecture Diagram

![System Architecture](diagrams/system-architecture.png)

## 5. Technology Stack

| Layer | Technology |
|---|---|
| Presentation | HTML, CSS, JavaScript |
| API | FastAPI |
| Validation | Pydantic |
| Business Logic | Python |
| ORM | SQLAlchemy |
| Database | SQLite |

## 6. Design Considerations

- Separation of concerns.
- Modular application structure.
- Reusable business logic.
- Centralized request validation.
- Maintainable database access.
- Clear API contracts.