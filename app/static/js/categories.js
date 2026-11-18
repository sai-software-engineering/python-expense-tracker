
// =====================================
// Configuration
// =====================================

const API_BASE_URL = window.location.origin;

const categoryForm = document.getElementById("category-form");
const categoryTableBody = document.getElementById("category-table-body");
const categoryMessage = document.getElementById("category-message");

const categoryIdInput = document.getElementById("category-id");
const categoryNameInput = document.getElementById("category-name");
const categoryTypeInput = document.getElementById("category-type");

const cancelEditButton = document.getElementById("cancel-edit");


// =====================================
// Utility Functions
// =====================================

function displayMessage(message, isError = false) {
    categoryMessage.textContent = message;
    categoryMessage.style.color = isError ? "#dc2626" : "#16a34a";
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
// Load All Categories
// =====================================

async function loadCategories() {
    try {
        const response = await fetch(`${API_BASE_URL}/categories/`);

        if (!response.ok) {
            throw new Error("Failed to load categories.");
        }

        const categories = await response.json();

        categoryTableBody.replaceChildren();

        if (categories.length === 0) {
            const row = document.createElement("tr");
            const cell = document.createElement("td");

            cell.colSpan = 5;
            cell.textContent = "No categories found.";

            row.appendChild(cell);
            categoryTableBody.appendChild(row);

            return;
        }

        categories.forEach(category => {
            const row = document.createElement("tr");

            // Category ID
            const idCell = document.createElement("td");
            idCell.textContent = category.id;

            // Category Name
            const nameCell = document.createElement("td");
            nameCell.textContent = category.name;

            // Category Type
            const typeCell = document.createElement("td");
            typeCell.textContent = category.type;

            // Category Source
            const sourceCell = document.createElement("td");
            sourceCell.textContent = category.is_default
                ? "Predefined"
                : "Custom";

            // Actions
            const actionsCell = document.createElement("td");

            if (category.is_default) {
                actionsCell.textContent = "Protected";
            } else {
                const editButton = document.createElement("button");

                editButton.textContent = "Edit";
                editButton.className = "btn btn-primary";
                editButton.dataset.action = "edit";
                editButton.dataset.id = category.id;

                const deleteButton = document.createElement("button");

                deleteButton.textContent = "Delete";
                deleteButton.className = "btn btn-secondary";
                deleteButton.dataset.action = "delete";
                deleteButton.dataset.id = category.id;

                actionsCell.append(editButton, deleteButton);
            }

            row.append(
                idCell,
                nameCell,
                typeCell,
                sourceCell,
                actionsCell
            );

            categoryTableBody.appendChild(row);
        });

    } catch (error) {
        console.error("Category Loading Error:", error);
        displayMessage(error.message, true);
    }
}


// =====================================
// Add / Update Category
// =====================================

categoryForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const categoryId = categoryIdInput.value;

    const categoryData = {
        name: categoryNameInput.value.trim(),
        type: categoryTypeInput.value
    };

    const url = categoryId
        ? `${API_BASE_URL}/categories/${categoryId}`
        : `${API_BASE_URL}/categories/`;

    const method = categoryId ? "PUT" : "POST";

    try {
        const response = await fetch(url, {
            method: method,

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(categoryData)
        });

        if (!response.ok) {
            throw new Error(await getErrorMessage(response));
        }

        displayMessage(
            categoryId
                ? "Category updated successfully!"
                : "Category added successfully!"
        );

        resetCategoryForm();

        await loadCategories();

    } catch (error) {
        console.error("Category Save Error:", error);
        displayMessage(error.message, true);
    }
});


// =====================================
// Edit Category
// =====================================

function editCategory(categoryId) {
    fetch(`${API_BASE_URL}/categories/${categoryId}`)
        .then(async response => {
            if (!response.ok) {
                throw new Error(await getErrorMessage(response));
            }

            return response.json();
        })

        .then(category => {
            if (category.is_default) {
                throw new Error("Predefined categories cannot be modified.");
            }

            categoryIdInput.value = category.id;
            categoryNameInput.value = category.name;
            categoryTypeInput.value = category.type;

            document.getElementById("category-form-title").textContent =
                "Edit Category";

            categoryForm.querySelector(
                'button[type="submit"]'
            ).textContent = "Update Category";

            cancelEditButton.hidden = false;

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        })

        .catch(error => {
            console.error("Category Edit Error:", error);
            displayMessage(error.message, true);
        });
}


// =====================================
// Delete Category
// =====================================

async function deleteCategory(categoryId) {
    if (!confirm("Are you sure you want to delete this category?")) {
        return;
    }

    try {
        const response = await fetch(
            `${API_BASE_URL}/categories/${categoryId}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error(await getErrorMessage(response));
        }

        displayMessage("Category deleted successfully!");

        await loadCategories();

    } catch (error) {
        console.error("Category Delete Error:", error);
        displayMessage(error.message, true);
    }
}


// =====================================
// Handle Table Actions
// =====================================

categoryTableBody.addEventListener("click", function (event) {
    const button = event.target.closest("button[data-action]");

    if (!button) {
        return;
    }

    const categoryId = Number(button.dataset.id);

    if (button.dataset.action === "edit") {
        editCategory(categoryId);
    }

    if (button.dataset.action === "delete") {
        deleteCategory(categoryId);
    }
});


// =====================================
// Reset Category Form
// =====================================

function resetCategoryForm() {
    categoryForm.reset();

    categoryIdInput.value = "";

    document.getElementById("category-form-title").textContent =
        "Add New Category";

    categoryForm.querySelector(
        'button[type="submit"]'
    ).textContent = "Save Category";

    cancelEditButton.hidden = true;
}


// =====================================
// Cancel Edit
// =====================================

cancelEditButton.addEventListener("click", function () {
    resetCategoryForm();
    displayMessage("");
});


// =====================================
// Initialize Category Page
// =====================================

document.addEventListener("DOMContentLoaded", loadCategories);
