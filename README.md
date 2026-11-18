# Python Expense Tracker

A personal finance management web application built with **Python, FastAPI, HTML, CSS, and JavaScript**.

The application aims to help users record income and expenses, organize transactions, monitor their financial activity, and visualize spending patterns through an interactive dashboard.

**Project Status:** 🚧 Under Development

**Try the expense tracker: ** [Live demo](https://python-expense-tracker-4kus.onrender.com/)
---

## Project Objectives

- Track daily income and expenses.
- Organize transactions using predefined and custom categories.
- Monitor total income, expenses, and balance.
- Analyze monthly spending patterns.
- Visualize category-wise expenses.
- Compare income against expenses.

## Planned Features

### Dashboard
- Total income
- Total expenses
- Current balance
- Monthly expense visualization
- Category-wise spending visualization
- Income vs. expenses visualization

### Expense Management
- Add expenses
- View expenses
- Update expenses
- Delete expenses

### Income Management
- Add income
- View income
- Update income
- Delete income

### Category Management
- Predefined categories
- Custom categories
- Category management

### Reports
- Monthly expense reports
- Category-wise spending reports
- Income vs. expenses reports

## Technology Stack

| Component | Technology |
|---|---|
| Backend | Python, FastAPI |
| Frontend | HTML, CSS, JavaScript |
| Database | SQLite |
| ORM | SQLAlchemy |
| Data Validation | Pydantic |
| API Documentation | Swagger UI / OpenAPI |
| Diagrams | PlantUML, Mermaid |
| Documentation | Markdown, MkDocs |
| Documentation Hosting | GitLab Pages |
| Version Control | Git, GitLab |

## Project Structure

```text
python-expense-tracker/
│
├── docs/
│   ├── requirements/
│   │   └── software-requirements-specification.md
│   │
│   └── architecture/
│       ├── diagrams/
│       │   └── use-case-diagram.puml
│       └── use-case-diagram.md
│
├── app/
│
├── tests/
│
├── README.md
└── mkdocs.yml
```

*The project structure will evolve as development progresses.*

## Currency Support

The application will initially support **Indian Rupees (INR ₹)** only.

## Application Design

The application will follow a layered architecture:

1. Frontend — User interface.
2. Backend — Business logic and REST APIs.
3. Database — Persistent transaction and category storage.

Technical architecture and UML diagrams will be maintained in the `docs/` directory.

## Documentation

Project documentation is maintained alongside the source code.

Planned documentation includes:

- Project Charter
- Software Requirements Specification (SRS)
- UML diagrams
- System Architecture
- Database Design
- API Documentation
- Test Documentation
- User Guide

Documentation will be published using MkDocs and GitLab Pages.

## Getting Started

The application is currently under development. Setup and execution instructions will be added once the initial application implementation is complete.

## Project Constraints

- Single-user application.
- No authentication in the initial version.
- INR currency support only.
- SQLite as the initial database.

## Future Enhancements

- Budget management
- CSV/PDF report exports
- Recurring transactions
- Data backup and restore

## Author

Developed as a practical project to explore Python backend development, API design, software documentation, UML, and Git-based workflows.
