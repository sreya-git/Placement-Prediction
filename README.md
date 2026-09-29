# 📊 Placement Prediction

A simple interactive Data Science project that demonstrates the complete machine learning workflow, from data cleaning and analysis to model training and prediction.

## 🚀 Live Demo

👉 [View the Live Application](https://placement-prediction-delta.vercel.app/)

## 📌 About

A hands-on Data Science Lab that I built to demonstrate the complete machine learning workflow, from exploring and cleaning student data to training a Logistic Regression model and making predictions.

The project takes a student dataset through these steps:

**Raw Data → Cleaning → Analysis → Visualization → Machine Learning → Prediction**

Instead of showing only the final prediction, the application lets users explore the different stages of the process.

## ✨ Features

* 📂 Explore a dataset of 150 student records
* 🧹 Remove duplicates and handle missing values
* 🔎 Perform basic data analysis
* 📈 View interactive charts
* 🤖 Train a Logistic Regression model
* 📊 Check model accuracy and confusion matrix
* 🎯 Make a placement prediction using student details

## 🧠 Machine Learning

The project uses **Logistic Regression** for binary classification.

The basic workflow is:

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

## 🛠️ Tech Stack

* **Next.js**
* **TypeScript**
* **Tailwind CSS**
* **Supabase / PostgreSQL**
* **Logistic Regression**
* **Git & GitHub**
* **Vercel**

The machine learning logic is implemented in **TypeScript**, without a separate Python backend.

## 📁 Project Structure

```text
Placement-Prediction/
│
├── app/
├── components/
├── lib/
├── supabase/
├── public/
├── README.md
└── package.json
```

## 💻 Run Locally

```bash
git clone https://github.com/sreya-git/Placement-Prediction.git
cd Placement-Prediction
npm install
npm run dev
```

Then open:

```text
http://localhost:3000
```

## 🔮 Future Improvements

* Add more ML algorithms
* Compare different models
* Add more evaluation metrics
* Improve the dataset
* Add a Python/scikit-learn ML version

* ## 📁 Project Structure

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

## 👩‍💻 Author

**Sreya Kumari Panigrahi**

B.Tech — Computer Science & Engineering

Interested in **Data Science, Machine Learning & AI**

* GitHub: [sreya-git](https://github.com/sreya-git)
* LinkedIn: [Sreya Kumari Panigrahi](https://www.linkedin.com/in/sreya-kumari-panigrahi/)

---

⭐ **Project Status:** Active Development
