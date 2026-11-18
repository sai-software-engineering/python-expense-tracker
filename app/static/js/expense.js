
// =====================================
// Configuration
// =====================================

const API_BASE_URL = window.location.origin;

const expenseForm = document.getElementById("expense-form");
const expenseTableBody = document.getElementById("expense-table-body");
const expenseMessage = document.getElementById("expense-message");

const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const descriptionInput = document.getElementById("description");
const dateInput = document.getElementById("transaction-date");
const expenseIdInput = document.getElementById("expense-id");

const cancelEditButton = document.getElementById("cancel-edit");

let expenseCategories = [];


// =====================================
// Utility Functions
// =====================================

function formatCurrency(amount) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2
    }).format(amount);
}


function displayMessage(message, isError = false) {
    expenseMessage.textContent = message;
    expenseMessage.style.color = isError ? "#dc2626" : "#16a34a";
}


async function getErrorMessage(response) {
    try {
        const data = await response.json();
        return data.detail || "Something went wrong.";
    } catch {
        return "Something went wrong.";
    }
}


// =====================================
// Load Expense Categories
// =====================================

async function loadCategories() {
    try {
        const response = await fetch(`${API_BASE_URL}/categories/`);

        if (!response.ok) {
            throw new Error("Failed to load categories");
        }

        const categories = await response.json();

        expenseCategories = categories.filter(
            category => category.type === "EXPENSE"
        );

        categoryInput.innerHTML = '<option value="">Select Category</option>';

        expenseCategories.forEach(category => {
            const option = document.createElement("option");

            option.value = category.id;
            option.textContent = category.name;

            categoryInput.appendChild(option);
        });

    } catch (error) {
        console.error("Category Loading Error:", error);
        displayMessage("Unable to load expense categories.", true);
    }
}


// =====================================
// Load All Expenses
// =====================================

async function loadExpenses() {
    try {
        const response = await fetch(`${API_BASE_URL}/expenses/`);

        if (!response.ok) {
            throw new Error("Failed to load expenses");
        }

        const expenses = await response.json();

        expenseTableBody.replaceChildren();

        if (expenses.length === 0) {
            const row = document.createElement("tr");
            const cell = document.createElement("td");

            cell.colSpan = 6;
            cell.textContent = "No expenses found.";

            row.appendChild(cell);
            expenseTableBody.appendChild(row);

            return;
        }

        expenses.forEach(expense => {
            const row = document.createElement("tr");

            const category = expenseCategories.find(
                item => item.id === expense.category_id
            );

            const values = [
                expense.id,
                formatCurrency(expense.amount),
                category ? category.name : "Unknown",
                expense.description || "-",
                expense.transaction_date
            ];

            values.forEach(value => {
                const cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            });

            const actionsCell = document.createElement("td");

            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.className = "btn btn-primary";
            editButton.dataset.action = "edit";
            editButton.dataset.id = expense.id;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "btn btn-secondary";
            deleteButton.dataset.action = "delete";
            deleteButton.dataset.id = expense.id;

            actionsCell.append(editButton, deleteButton);
            row.appendChild(actionsCell);

            expenseTableBody.appendChild(row);
        });

    } catch (error) {
        console.error("Expense Loading Error:", error);
        displayMessage("Unable to load expenses.", true);
    }
}


// =====================================
// Add / Update Expense
// =====================================

expenseForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const expenseId = expenseIdInput.value;

    const expenseData = {
        type: "EXPENSE",
        amount: Number(amountInput.value),
        category_id: Number(categoryInput.value),
        description: descriptionInput.value.trim() || null,
        transaction_date: dateInput.value
    };

    const url = expenseId
        ? `${API_BASE_URL}/expenses/${expenseId}`
        : `${API_BASE_URL}/expenses/`;

    const method = expenseId ? "PUT" : "POST";

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(expenseData)
        });

        if (!response.ok) {
            throw new Error(await getErrorMessage(response));
        }

        displayMessage(
            expenseId
                ? "Expense updated successfully!"
                : "Expense added successfully!"
        );

        resetExpenseForm();

        await loadExpenses();

    } catch (error) {
        console.error("Expense Save Error:", error);
        displayMessage(error.message, true);
    }
});


// =====================================
// Edit Expense
// =====================================

function editExpense(expenseId) {
    fetch(`${API_BASE_URL}/expenses/${expenseId}`)
        .then(async response => {
            if (!response.ok) {
                throw new Error(await getErrorMessage(response));
            }

            return response.json();
        })
        .then(expense => {
            expenseIdInput.value = expense.id;
            amountInput.value = expense.amount;
            categoryInput.value = expense.category_id;
            descriptionInput.value = expense.description || "";
            dateInput.value = expense.transaction_date;

            document.getElementById("expense-form-title").textContent =
                "Edit Expense";

            expenseForm.querySelector(
                'button[type="submit"]'
            ).textContent = "Update Expense";

            cancelEditButton.hidden = false;

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        })
        .catch(error => {
            console.error("Expense Edit Error:", error);
            displayMessage(error.message, true);
        });
}


// =====================================
// Delete Expense
// =====================================

async function deleteExpense(expenseId) {
    if (!confirm("Are you sure you want to delete this expense?")) {
        return;
    }

    try {
        const response = await fetch(
            `${API_BASE_URL}/expenses/${expenseId}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error(await getErrorMessage(response));
        }

        displayMessage("Expense deleted successfully!");

        await loadExpenses();

    } catch (error) {
        console.error("Expense Delete Error:", error);
        displayMessage(error.message, true);
    }
}


// =====================================
// Handle Table Actions
// =====================================

expenseTableBody.addEventListener("click", function (event) {
    const button = event.target.closest("button[data-action]");

    if (!button) {
        return;
    }

    const expenseId = Number(button.dataset.id);

    if (button.dataset.action === "edit") {
        editExpense(expenseId);
    }

    if (button.dataset.action === "delete") {
        deleteExpense(expenseId);
    }
});


// =====================================
// Reset Expense Form
// =====================================

function resetExpenseForm() {
    expenseForm.reset();

    expenseIdInput.value = "";

    document.getElementById("expense-form-title").textContent =
        "Add New Expense";

    expenseForm.querySelector(
        'button[type="submit"]'
    ).textContent = "Save Expense";

    cancelEditButton.hidden = true;
}


// =====================================
// Cancel Edit
// =====================================

cancelEditButton.addEventListener("click", function () {
    resetExpenseForm();
    displayMessage("");
});


// =====================================
// Initialize Expense Page
// =====================================

async function initializeExpensePage() {
    dateInput.value = new Date().toLocaleDateString("en-CA");

    await loadCategories();
    await loadExpenses();
}

document.addEventListener("DOMContentLoaded", initializeExpensePage);

