# 💰 Python Expense Tracker

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.13-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI">
  <img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite">
  <img src="https://img.shields.io/badge/SQLAlchemy-ORM-D71F00?style=for-the-badge" alt="SQLAlchemy">
  <img src="https://img.shields.io/badge/Render-Deployed-46E3B7?style=for-the-badge&logo=render&logoColor=black" alt="Render">
</p>

<p align="center">
  A personal finance management application built with FastAPI and Python.
</p>

---

## 📋 Project Overview

Python Expense Tracker helps users manage their personal finances through an intuitive web interface.

### Key Features

- 📈 Track income and expenses
- 🏷️ Organize transactions using categories
- 💰 Monitor financial activity
- 📊 Generate dashboards and summaries
- 🗄️ Store data using SQLite
- ⚡ Fast and lightweight FastAPI backend

---

## 🚀 Live Demo

<p>
  <a href="https://python-expense-tracker-4kus.onrender.com/"
     target="_blank"
     rel="noopener noreferrer"
     style="background:teal;color:white;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;">
     🚀 Launch Live Demo
  </a>
</p>

<br>

<div style="background:#fff3cd;color:#400606FF;border-left:6px solid #ffc107;padding:15px;border-radius:6px;">

<strong>⚠️ Important</strong>

<ul>
<li>First-time users will see zero values on the dashboard.</li>

<li>Create your categories first, then add income and expense records in their respective tabs.</li>

<li>The application is hosted on Render's Free Tier and may take a few moments to start after periods of inactivity.</li>

<li>Data persistence is not guaranteed on the free tier.</li>

</ul>

</div>

---

## 🛠️ Technology Stack

| Component | Technology |
|-----------|------------|
| Backend | Python, FastAPI |
| Frontend | HTML, CSS, JavaScript |
| Database | SQLite |
| ORM | SQLAlchemy |
| Validation | Pydantic |
| API Documentation | Swagger UI |
| Diagrams | Mermaid |
| Documentation | Markdown, GitHub Pages |
| Hosting | Render |

---

## 📂 Project Structure

```text
python-expense-tracker/
├── app/
│   ├── models/
│   ├── routers/
│   ├── schemas/
│   ├── static/
│   ├── templates/
│   ├── database.py
│   └── main.py
│
├── docs/
│   ├── architecture/
│   ├── requirements/
│   ├── index.md
│   └── project-charter.md
│
├── README.md
├── requirements.txt
└── _config.yml
```

---

## 📚 Documentation

### Project Documents

- 📋 [Project Charter](./project-charter.html)
- 📝 [Software Requirement Specification](./requirements/software-requirement-specification.html)

### Architecture Documents

- 🏗️ [System Architecture](./architecture/system-architecture.html)
- 👤 [Use Case Diagram](./architecture/use-case-diagram.html)
- 🗄️ [Database Design (ER Diagram)](./architecture/ER-diagram.html)

---

## 📖 API Documentation

Once the application is running locally:

| Documentation | URL |
|---------------|-----|
| Swagger UI | `/docs` |
| ReDoc | `/redoc` |

Example:

```text
http://localhost:8000/docs
```

---

## ⚙️ Local Setup

### Clone Repository

```bash
git clone https://github.com/sai-software-engineering/python-expense-tracker.git
cd python-expense-tracker
```

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Environment

#### Windows

```bash
venv\Scripts\activate
```

#### Linux/macOS

```bash
source venv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Run Application

```bash
uvicorn app.main:app --reload
```

Open:

```text
http://localhost:8000
```

---

## 🚀 Project Status

> [!NOTE]
> The application is currently hosted on Render's Free Tier. Initial page loads may take a few seconds if the service has been inactive.

### Current Status

✅ Active Development  
✅ Live Deployment Available  
✅ Technical Documentation Available  
✅ Architecture Documentation Available  

---

## 🤝 Contributing

Contributions are always welcome.

You can help by:

- 🐛 Reporting bugs
- 💡 Suggesting new features
- 📖 Improving documentation
- 🔧 Refactoring code
- 🚀 Submitting pull requests

---

## 📬 Feedback

Have suggestions or found a bug?

Feel free to open an Issue or submit a Pull Request.

⭐ If you find this project useful, consider giving it a star.