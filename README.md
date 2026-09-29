# 📊 Placement Prediction

An interactive **Data Science Lab** that I built to explore the complete machine learning workflow — from cleaning and analyzing student data to training a model and making predictions.

## 🚀 Live Demo

👉 [View the Live Application](https://placement-prediction-delta.vercel.app/)

## 📌 About

This project demonstrates a simple end-to-end machine learning workflow using student placement data.

The application takes users through six stages:

**Raw Data → Data Cleaning → Data Analysis → Visualization → Machine Learning → Prediction**

Instead of showing only the final prediction, the project lets users see what happens at each stage.

## ✨ Features

* 📂 Explore **150 student records**
* 🧹 Remove duplicates and handle missing values
* 🔎 Perform basic data analysis
* 📈 View interactive visualizations
* 🤖 Train a **Logistic Regression** model
* 📊 View model accuracy and confusion matrix
* 🎯 Make a placement prediction using student details

## 🧠 Machine Learning

The project uses **Logistic Regression** for binary classification.

```text
Dataset
   ↓
Data Cleaning
   ↓
Feature Preparation
   ↓
Train / Test Split
   ↓
Logistic Regression
   ↓
Evaluation
   ↓
Prediction
```

The model uses an **80/20 train-test split**.

The machine learning logic is implemented in **TypeScript**, without a separate Python backend.

## 🛠️ Tech Stack

* **Next.js**
* **TypeScript**
* **Tailwind CSS**
* **Supabase / PostgreSQL**
* **Logistic Regression**
* **Git & GitHub**
* **Vercel**

## 📁 Project Structure

```text
Placement-Prediction/
│
├── app/
│   └── api/
│       ├── dataset/
│       ├── analysis/
│       ├── charts/
│       ├── model/
│       └── prediction/
│
├── components/
│   └── UI components
│
├── lib/
│   ├── analytics/
│   ├── data-processing/
│   └── ml/
│
├── supabase/
│   ├── schema/
│   └── seed/
│
├── public/
├── README.md
└── package.json
```

* **app/** — pages and API routes
* **components/** — reusable UI components
* **lib/** — analytics, data processing and ML logic
* **supabase/** — database schema and seed data
* **public/** — static files

## 💻 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/sreya-git/Placement-Prediction.git
cd Placement-Prediction
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## 🔮 Future Improvements

* Add more ML algorithms
* Compare different models
* Add more evaluation metrics
* Improve the dataset
* Add a Python/scikit-learn version

## 👩‍💻 Author

**Sreya Kumari Panigrahi**

B.Tech — Computer Science & Engineering

Interested in **Data Science, Machine Learning & AI**

* GitHub: [sreya-git](https://github.com/sreya-git)
* LinkedIn: [Sreya Kumari Panigrahi](https://www.linkedin.com/in/sreya-kumari-panigrahi/)

---

⭐ **Project Status:** Active Development
