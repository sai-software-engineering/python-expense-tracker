
// =====================================
// Configuration
// =====================================

const API_BASE_URL = "http://127.0.0.1:8000";

const currencyFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2
});


// =====================================
// Dashboard Summary
// =====================================

async function loadDashboardSummary() {
    try {
        const response = await fetch(`${API_BASE_URL}/dashboard/summary`);

        if (!response.ok) {
            throw new Error("Failed to fetch dashboard summary");
        }

        const data = await response.json();

        document.getElementById("total-income").textContent =
            currencyFormatter.format(data.total_income);

        document.getElementById("total-expenses").textContent =
            currencyFormatter.format(data.total_expenses);

        document.getElementById("balance").textContent =
            currencyFormatter.format(data.balance);

    } catch (error) {
        console.error("Dashboard Summary Error:", error);
    }
}


// =====================================
// Monthly Expenses Chart
// =====================================

async function loadMonthlyExpenses() {
    try {
        const response = await fetch(`${API_BASE_URL}/dashboard/monthly-expenses`);

        if (!response.ok) {
            throw new Error("Failed to fetch monthly expenses");
        }

        const data = await response.json();

        const months = [
            "January", "February", "March",
            "April", "May", "June",
            "July", "August", "September",
            "October", "November", "December"
        ];

        const labels = data.map(item => months[item.month - 1]);

        const amounts = data.map(item => item.total_expenses);

        const ctx = document.getElementById("monthlyExpensesChart");

        new Chart(ctx, {
            type: "bar",

            data: {
                labels: labels,

                datasets: [{
                    label: "Monthly Expenses (₹)",
                    data: amounts,
                    backgroundColor: "#dc2626",
                    borderRadius: 6
                }]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,

                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

    } catch (error) {
        console.error("Monthly Expenses Error:", error);
    }
}


// =====================================
// Category-wise Spending Chart
// =====================================

async function loadCategorySpending() {
    try {
        const response = await fetch(
            `${API_BASE_URL}/dashboard/category-wise-spending`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch category spending");
        }

        const data = await response.json();

        const labels = data.map(item => item.category);

        const amounts = data.map(item => item.total_spending);

        const ctx = document.getElementById("categorySpendingChart");

        new Chart(ctx, {
            type: "doughnut",

            data: {
                labels: labels,

                datasets: [{
                    label: "Category Spending (₹)",
                    data: amounts,
                    backgroundColor: [
                        "#2563eb",
                        "#16a34a",
                        "#f59e0b",
                        "#dc2626",
                        "#9333ea",
                        "#0891b2",
                        "#db2777",
                        "#64748b"
                    ],
                    borderWidth: 2
                }]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                    legend: {
                        position: "bottom"
                    }
                }
            }
        });

    } catch (error) {
        console.error("Category Spending Error:", error);
    }
}


// =====================================
// Income vs Expenses Chart
// =====================================

async function loadIncomeVsExpenses() {
    try {
        const response = await fetch(
            `${API_BASE_URL}/dashboard/income-vs-expenses`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch income vs expenses");
        }

        const data = await response.json();

        const months = [
            "January", "February", "March",
            "April", "May", "June",
            "July", "August", "September",
            "October", "November", "December"
        ];

        const labels = data.map(item => months[item.month - 1]);

        const income = data.map(item => item.income);

        const expenses = data.map(item => item.expenses);

        const ctx = document.getElementById("incomeVsExpensesChart");

        new Chart(ctx, {
            type: "bar",

            data: {
                labels: labels,

                datasets: [
                    {
                        label: "Income (₹)",
                        data: income,
                        backgroundColor: "#16a34a",
                        borderRadius: 5
                    },
                    {
                        label: "Expenses (₹)",
                        data: expenses,
                        backgroundColor: "#dc2626",
                        borderRadius: 5
                    }
                ]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,

                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

    } catch (error) {
        console.error("Income vs Expenses Error:", error);
    }
}


// =====================================
// Initialize Dashboard
// =====================================

async function initializeDashboard() {

    await Promise.all([
        loadDashboardSummary(),
        loadMonthlyExpenses(),
        loadCategorySpending(),
        loadIncomeVsExpenses()
    ]);

}

document.addEventListener("DOMContentLoaded", initializeDashboard);
