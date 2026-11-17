# Software Requirements Specification (SRS)

**Project:** Python Expense Tracker  
**Document Version:** 1.0  
**Status:** Initial Draft

## 1. Introduction

### 1.1 Purpose

This document defines the functional and non-functional requirements of the Python Expense Tracker application.

It serves as a reference for application design, development, testing, and maintenance.

### 1.2 Product Scope

Python Expense Tracker is a single-user web application that allows users to manage personal income and expenses, organize transactions into categories, and analyze financial activity through a dashboard and reports.

The application will support INR (₹) only.

### 1.3 Intended Audience

- Developers
- Testers
- Project reviewers
- Future maintainers

## 2. Overall Description

### 2.1 Product Perspective

The application consists of:

- Frontend: HTML, CSS, JavaScript
- Backend: Python with FastAPI
- Database: SQLite
- ORM: SQLAlchemy

The frontend communicates with the backend through REST APIs.

### 2.2 User Characteristics

The application is designed for a single user managing personal financial records.

Authentication and multi-user functionality are excluded from the initial version.

### 2.3 Operating Environment

- Operating System: Windows/Linux
- Backend Runtime: Python
- Database: SQLite
- Browser: Modern web browser
- Deployment: Local environment initially

## 3. Functional Requirements

### FR-01: Dashboard

The system shall:

- Display total income.
- Display total expenses.
- Display the current balance.
- Display monthly expense trends.
- Display category-wise spending.
- Display income versus expenses.

### FR-02: Expense Management

The system shall allow users to:

- Add an expense.
- View all expenses.
- View an individual expense.
- Update an existing expense.
- Delete an expense.
- Filter expenses by date and category.

Each expense shall contain:

- Transaction ID
- Amount
- Category
- Description
- Transaction date
- Creation timestamp
- Last updated timestamp

### FR-03: Income Management

The system shall allow users to:

- Add income.
- View all income records.
- View an individual income record.
- Update income records.
- Delete income records.
- Filter income by date and category.

### FR-04: Category Management

The system shall:

- Provide predefined categories.
- Allow users to create custom categories.
- Allow users to view categories.
- Allow users to update custom categories.
- Allow users to delete custom categories.
- Associate transactions with appropriate categories.

### FR-05: Reports and Visualizations

The system shall provide:

1. Monthly expense visualization.
2. Category-wise spending visualization.
3. Income versus expenses visualization.

Reports shall use transaction data stored in the database.

### FR-06: Transaction Validation

The system shall:

- Reject missing mandatory fields.
- Reject zero or negative transaction amounts.
- Validate transaction dates.
- Ensure the selected category exists.
- Accept only supported transaction types.

### FR-07: API Documentation

The backend shall expose API documentation through FastAPI's Swagger UI and OpenAPI specification.

## 4. Non-Functional Requirements

### NFR-01: Usability

The application shall provide a simple and understandable interface.

### NFR-02: Performance

Common operations such as adding, viewing, updating, and deleting transactions should complete within a reasonable response time under normal local usage.

### NFR-03: Reliability

The system shall maintain transaction consistency and avoid unintended data loss during normal operations.

### NFR-04: Maintainability

The application shall use modular code organization and clear separation between frontend, backend, and database responsibilities.

### NFR-05: Documentation

Technical documentation shall be maintained using Markdown, PlantUML, Mermaid, and MkDocs.

### NFR-06: Data Integrity

The system shall validate transaction data before storing it in the database.

## 5. Data Requirements

The initial application will use SQLite.

The proposed database entities are:

- Transaction
- Category

Income and expenses will be represented in a single Transaction table, distinguished by a transaction type field.

### Proposed Transaction Attributes

| Attribute | Description |
|---|---|
| id | Unique transaction identifier |
| type | INCOME or EXPENSE |
| amount | Transaction amount in INR |
| category_id | Associated category |
| description | Transaction description |
| transaction_date | Date of transaction |
| created_at | Record creation timestamp |
| updated_at | Last modification timestamp |

### Proposed Category Attributes

| Attribute | Description |
|---|---|
| id | Unique category identifier |
| name | Category name |
| type | INCOME or EXPENSE |
| is_default | Identifies predefined categories |
| created_at | Category creation timestamp |

## 6. Constraints

- The application will support INR only.
- The initial version will support one user.
- Authentication is not required.
- SQLite will be used as the initial database.
- The application will initially run locally.

## 7. Assumptions

- The user will manually enter income and expense transactions.
- Predefined categories will be available when the application is initialized.
- Custom categories will be stored in the database.
- Financial summaries will be calculated using stored transaction records.

## 8. Future Enhancements

The following features may be considered in future versions:

- Monthly budgets.
- Export reports to CSV or PDF.
- Recurring transactions.
- Data backup and restore.
- Authentication and multi-user support.

## 9. Document Revision History

| Version | Date | Description |
|---|---|---|
| 1.0 | 17-Nov-2026 | Initial SRS draft |