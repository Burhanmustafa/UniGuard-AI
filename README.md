# 🧠 UniGuard AI – Student Burnout Risk Predictor

**UniGuard** is a full-stack AI-powered web application that helps students identify their risk of academic burnout through predictive analytics and anomaly detection. Built with a Flask + React stack, the app leverages Logistic Regression and Isolation Forests to analyze behavior patterns and flag early signs of burnout.

Designed for both technical rigor and visual appeal, UniGuard features a sleek responsive UI with dynamic progress animations, a dark/light mode toggle, and a clean, intuitive form interface.

---

## ✨ Features

- 🔍 **Burnout prediction** via logistic regression  
- ⚠️ **Behavioral anomaly detection** using Isolation Forest  
- 🌙 **Dark/light theme toggle**  
- 📊 **Animated progress bar** showing risk level %  
- ⏳ **3-second loading animation** for dramatic effect  
- 🌐 Full REST API with Flask backend  
- 🎯 Fully interactive React frontend

---

## 🧱 Tech Stack

| Layer     | Tech                          |
|-----------|-------------------------------|
| Frontend  | React.js                      |
| Backend   | Python (Flask)                |
| Machine Learning | scikit-learn           |
| Styling   | CSS, animated transitions     |
| Data      | Custom CSV (student burnout)  |

---

## ⚙️ How to Run

### 🧠 Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

### 🎨 Frontend
```bash
cd frontend
npm install
npm start
```

---

## 🧪 Example Inputs

| Field             | Example Value |
|------------------|---------------|
| Sleep Hours       | 5             |
| Study Hours       | 35            |
| Expenses ($)      | 500           |
| Social Events     | 1             |
| Mood Score (1–5)  | 2             |

---

## 🔍 Demo

![UniGuard Demo](media/Dark%20Mode.png)
![Light Mode](media/Light%20Mode.png)

---

## 👨‍💻 Author

**Burhan Mustafa**  
📫 [burhanmustafa808@gmail.com](mailto:burhanmustafa808@gmail.com)  
🌐 [LinkedIn](https://www.linkedin.com/in/burhan-mustafa-15899319a/)
🧠 Built with love and late-night debugging.

---

## 🏷️ License

MIT License. Feel free to use, remix, or build on it — just give credit.
