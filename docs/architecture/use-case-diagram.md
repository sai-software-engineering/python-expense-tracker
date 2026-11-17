# Use Case Diagram

## Purpose

This diagram illustrates the interactions between the user
and the Python Expense Tracker application.

## Diagram

```mermaid
usecase-beta
direction TB

actor User

systemBoundary ExpenseTracker

    ViewDashboard("View Dashboard")

    AddExpense("Add Expense")
    ViewExpenses("View Expenses")
    UpdateExpense("Update Expense")
    DeleteExpense("Delete Expense")

    AddIncome("Add Income")
    ViewIncome("View Income")
    UpdateIncome("Update Income")
    DeleteIncome("Delete Income")

    ManageCategories("Manage Categories")

    ViewReports("View Reports")

    SelectCategory("Select Category")

end

User --> ViewDashboard

User --> AddExpense
User --> ViewExpenses
User --> UpdateExpense
User --> DeleteExpense

User --> AddIncome
User --> ViewIncome
User --> UpdateIncome
User --> DeleteIncome

User --> ManageCategories
User --> ViewReports

AddExpense ..> : include SelectCategory
AddIncome ..> : include SelectCategory

```

## Actor

**User:** The individual who manages personal income and expenses.

## Use Cases

| Use Case | Description |
|---|---|
| View Dashboard | View financial summaries |
| Manage Expenses | Add, view, update, and delete expenses |
| Manage Income | Manage income records |
| Manage Categories | Manage predefined and custom categories |
| View Reports | Analyze financial activity |