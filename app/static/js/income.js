
// =====================================
// Configuration
// =====================================

const API_BASE_URL = window.location.origin;

const incomeForm = document.getElementById("income-form");
const incomeTableBody = document.getElementById("income-table-body");
const incomeMessage = document.getElementById("income-message");

const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const descriptionInput = document.getElementById("description");
const dateInput = document.getElementById("transaction-date");
const incomeIdInput = document.getElementById("income-id");

const cancelEditButton = document.getElementById("cancel-edit");

let incomeCategories = [];


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
    incomeMessage.textContent = message;
    incomeMessage.style.color = isError ? "#dc2626" : "#16a34a";
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
// Load Income Categories
// =====================================

async function loadCategories() {
    try {
        const response = await fetch(`${API_BASE_URL}/categories/`);

        if (!response.ok) {
            throw new Error("Failed to load categories");
        }

        const categories = await response.json();

        incomeCategories = categories.filter(
            category => category.type === "INCOME"
        );

        categoryInput.innerHTML =
            '<option value="">Select Category</option>';

        incomeCategories.forEach(category => {
            const option = document.createElement("option");

            option.value = category.id;
            option.textContent = category.name;

            categoryInput.appendChild(option);
        });

    } catch (error) {
        console.error("Category Loading Error:", error);
        displayMessage("Unable to load income categories.", true);
    }
}


// =====================================
// Load All Income Records
// =====================================

async function loadIncome() {
    try {
        const response = await fetch(`${API_BASE_URL}/income/`);

        if (!response.ok) {
            throw new Error("Failed to load income records");
        }

        const incomeRecords = await response.json();

        incomeTableBody.replaceChildren();

        if (incomeRecords.length === 0) {
            const row = document.createElement("tr");
            const cell = document.createElement("td");

            cell.colSpan = 6;
            cell.textContent = "No income records found.";

            row.appendChild(cell);
            incomeTableBody.appendChild(row);

            return;
        }

        incomeRecords.forEach(income => {
            const row = document.createElement("tr");

            const category = incomeCategories.find(
                item => item.id === income.category_id
            );

            const values = [
                income.id,
                formatCurrency(income.amount),
                category ? category.name : "Unknown",
                income.description || "-",
                income.transaction_date
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
            editButton.dataset.id = income.id;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "btn btn-secondary";
            deleteButton.dataset.action = "delete";
            deleteButton.dataset.id = income.id;

            actionsCell.append(editButton, deleteButton);
            row.appendChild(actionsCell);

            incomeTableBody.appendChild(row);
        });

    } catch (error) {
        console.error("Income Loading Error:", error);
        displayMessage("Unable to load income records.", true);
    }
}


// =====================================
// Add / Update Income
// =====================================

incomeForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const incomeId = incomeIdInput.value;

    const incomeData = {
        type: "INCOME",
        amount: Number(amountInput.value),
        category_id: Number(categoryInput.value),
        description: descriptionInput.value.trim() || null,
        transaction_date: dateInput.value
    };

    const url = incomeId
        ? `${API_BASE_URL}/income/${incomeId}`
        : `${API_BASE_URL}/income/`;

    const method = incomeId ? "PUT" : "POST";

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(incomeData)
        });

        if (!response.ok) {
            throw new Error(await getErrorMessage(response));
        }

        displayMessage(
            incomeId
                ? "Income updated successfully!"
                : "Income added successfully!"
        );

        resetIncomeForm();

        await loadIncome();

    } catch (error) {
        console.error("Income Save Error:", error);
        displayMessage(error.message, true);
    }
});


// =====================================
// Edit Income
// =====================================

async function editIncome(incomeId) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/income/${incomeId}`
        );

        if (!response.ok) {
            throw new Error(await getErrorMessage(response));
        }

        const income = await response.json();

        incomeIdInput.value = income.id;
        amountInput.value = income.amount;
        categoryInput.value = income.category_id;
        descriptionInput.value = income.description || "";
        dateInput.value = income.transaction_date;

        document.getElementById("income-form-title").textContent =
            "Edit Income";

        incomeForm.querySelector(
            'button[type="submit"]'
        ).textContent = "Update Income";

        cancelEditButton.hidden = false;

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } catch (error) {
        console.error("Income Edit Error:", error);
        displayMessage(error.message, true);
    }
}


// =====================================
// Delete Income
// =====================================

async function deleteIncome(incomeId) {
    if (!confirm("Are you sure you want to delete this income record?")) {
        return;
    }

    try {
        const response = await fetch(
            `${API_BASE_URL}/income/${incomeId}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error(await getErrorMessage(response));
        }

        displayMessage("Income deleted successfully!");

        await loadIncome();

    } catch (error) {
        console.error("Income Delete Error:", error);
        displayMessage(error.message, true);
    }
}


// =====================================
// Handle Table Actions
// =====================================

incomeTableBody.addEventListener("click", function (event) {
    const button = event.target.closest("button[data-action]");

    if (!button) {
        return;
    }

    const incomeId = Number(button.dataset.id);

    if (button.dataset.action === "edit") {
        editIncome(incomeId);
    }

    if (button.dataset.action === "delete") {
        deleteIncome(incomeId);
    }
});


// =====================================
// Reset Income Form
// =====================================

function resetIncomeForm() {
    incomeForm.reset();

    incomeIdInput.value = "";

    document.getElementById("income-form-title").textContent =
        "Add New Income";

    incomeForm.querySelector(
        'button[type="submit"]'
    ).textContent = "Save Income";

    cancelEditButton.hidden = true;
}


// =====================================
// Cancel Edit
// =====================================

cancelEditButton.addEventListener("click", function () {
    resetIncomeForm();
    displayMessage("");
});


// =====================================
// Initialize Income Page
// =====================================

async function initializeIncomePage() {
    dateInput.value = new Date().toLocaleDateString("en-CA");

    await loadCategories();
    await loadIncome();
}

document.addEventListener("DOMContentLoaded", initializeIncomePage);
