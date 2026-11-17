# Python Expense Tracker
## Project Charter — Version 1.0

### 1. Project Overview

Python Expense Tracker is a single-user web application designed to help users record, organize, monitor, and analyze their personal income and expenses.

The application will use FastAPI for the backend and HTML, CSS, and JavaScript for the frontend. SQLite will serve as the initial database.

Project documentation will be maintained alongside the source code using Markdown, PlantUML, Mermaid, and MkDocs, and published through GitLab Pages.

### 2. Project Objectives

- Record and manage daily income and expenses.
- Organize transactions using predefined and custom categories.
- Monitor income, expenses, and available balance.
- Visualize spending patterns through interactive charts.
- Maintain accurate transaction history.
- Build a maintainable application with clear technical documentation.

### 3. Scope

#### 3.1 In Scope

**Dashboard**
- Display total income.
- Display total expenses.
- Display current balance.
- Display monthly expense trends.
- Display category-wise spending.
- Display income versus expenses.

**Expense Management**
- Add expenses.
- View expenses.
- Edit expenses.
- Delete expenses.
- Filter expenses by date and category.

**Income Management**
- Add income.
- View income.
- Edit income.
- Delete income.

**Category Management**
- Provide predefined expense and income categories.
- Allow users to create custom categories.
- Allow users to edit and delete custom categories.

**Reporting**
- Monthly expense reports.
- Category-wise spending reports.
- Income versus expense reports.

#### 3.2 Out of Scope — Initial Version

- User authentication and authorization.
- Multiple currencies.
- Bank account integration.
- Automatic transaction imports.
- Multi-user access.
- Cloud synchronization.

### 4. Technology Stack

| Component | Technology |
|---|---|
| Backend | Python, FastAPI |
| Frontend | HTML, CSS, JavaScript |
| Database | SQLite |
| ORM | SQLAlchemy |
| Validation | Pydantic |
| API Documentation | Swagger UI / OpenAPI |
| Diagrams | PlantUML, Mermaid |
| Documentation | Markdown, MkDocs |
| Documentation Hosting | GitLab Pages |
| Version Control | Git, GitLab |

### 5. Currency and Category Decisions

- The application will support INR (₹) exclusively.
- Predefined categories will be available when the application is initialized.
- Users can create their own custom categories.
- Transactions will be associated with appropriate categories.

### 6. Reporting and Visualization

The application will provide three primary visualizations:

1. Monthly Expenses — Shows how expenses change over time.
2. Category-wise Spending — Shows how spending is distributed across categories.
3. Income vs. Expenses — Compares income and expenses over a selected period.

### 7. Documentation Strategy

Documentation will be developed alongside implementation.

Planned documents:

- Project Charter
- Software Requirements Specification (SRS)
- Functional and Non-Functional Requirements
- System Architecture Document
- Database Design Document
- API Reference
- UML Use Case Diagram
- UML Class Diagram
- UML Sequence Diagrams
- Mermaid Workflow Diagrams
- Test Plan and Test Cases
- User Guide
- Changelog

### 8. Development Approach

The project will be developed incrementally:

1. Requirements gathering and documentation.
2. System architecture and UML diagrams.
3. Database design and implementation.
4. FastAPI backend development.
5. Frontend development.
6. Integration and testing.
7. Documentation review and GitLab Pages deployment.

### 9. Initial Success Criteria

The initial version will be considered successful when:

- Users can create, view, update, and delete income and expense records.
- Users can organize transactions using predefined and custom categories.
- The dashboard displays accurate financial summaries.
- All three visualizations work correctly.
- API endpoints are documented using OpenAPI.
- Technical documentation is published through GitLab Pages.
- The application works as a single-user application without authentication.