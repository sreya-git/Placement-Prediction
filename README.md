# 📊 Placement Prediction — Interactive Data Science Lab

> An interactive machine-learning learning platform that demonstrates the complete data science workflow — from raw student data to preprocessing, analysis, visualization, model training, and real-time prediction.

### 🚀 Live Demo

**[View the Live Application](https://placement-prediction-delta.vercel.app/)**

### 📌 Overview

**Placement Prediction** is an interactive web-based Data Science Lab designed to demonstrate how a machine-learning workflow can be implemented as an end-to-end application.

The project takes users through six stages:

**Raw Data → Data Cleaning → Data Analysis → Visualization → Machine Learning → Prediction**

Instead of presenting only a final prediction, the application allows users to explore how data is transformed and used throughout the complete ML pipeline.

---

## ✨ Key Features

### 1. 📂 Raw Dataset

* Interactive student dataset containing **150 records**
* Displays dataset size, features, missing values, and duplicate records
* Allows users to inspect the initial state of the data

### 2. 🧹 Data Cleaning

* Detects duplicate records
* Removes duplicate entries
* Handles missing values using **mean imputation**
* Displays the transformation from raw to cleaned data

### 3. 🔎 Data Analysis

Provides interactive analysis of student-related features through multiple analytical questions.

The analysis demonstrates how exploratory data analysis can be used to identify patterns and relationships within the dataset.

### 4. 📈 Data Visualization

Interactive visualizations are used to make the dataset easier to understand.

The application includes multiple charts covering different aspects of the student data.

### 5. 🤖 Machine Learning

The project implements a **Logistic Regression classification model** using a custom server-side machine-learning engine.

The ML workflow includes:

* Feature preparation
* Train/test splitting
* Model training
* Prediction
* Accuracy evaluation
* Confusion matrix generation

The application uses an **80/20 train-test split** to evaluate the model.

### 6. 🎯 Real-Time Prediction

Users can enter student-related feature values and receive a probabilistic prediction from the trained classification model.

The prediction stage demonstrates how a trained ML model can be integrated into an interactive application.

---

## 🏗️ System Architecture

```text
                    ┌──────────────────┐
                    │   Raw Dataset    │
                    │   150 Records    │
                    └────────┬─────────┘
                             ↓
                    ┌──────────────────┐
                    │  Data Cleaning   │
                    │ Duplicates +     │
                    │ Missing Values   │
                    └────────┬─────────┘
                             ↓
                    ┌──────────────────┐
                    │  Data Analysis   │
                    │      + EDA       │
                    └────────┬─────────┘
                             ↓
                    ┌──────────────────┐
                    │ Visualization    │
                    │ Interactive      │
                    │ Charts           │
                    └────────┬─────────┘
                             ↓
                    ┌──────────────────┐
                    │ Machine Learning│
                    │ Logistic        │
                    │ Regression      │
                    └────────┬─────────┘
                             ↓
                    ┌──────────────────┐
                    │   Prediction     │
                    │ Probability +   │
                    │ Classification  │
                    └──────────────────┘
```

---

## 🧠 Machine Learning Workflow

The project follows a simplified supervised-learning workflow:

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
Model Evaluation
   ↓
Prediction
```

### Evaluation

The application provides:

* Test accuracy
* Confusion matrix
* Prediction output
* Probability-based classification

> **Note:** The reported evaluation result depends on the dataset and train/test split used by the application.

---

## 🛠️ Tech Stack

| Category         | Technologies                      |
| ---------------- | --------------------------------- |
| Frontend         | Next.js, TypeScript, Tailwind CSS |
| Data Processing  | TypeScript-based data processing  |
| Machine Learning | Logistic Regression               |
| Database         | Supabase / PostgreSQL             |
| Deployment       | Vercel                            |
| Visualization    | Interactive SVG-based charts      |
| Security         | Supabase Row Level Security       |
| Version Control  | Git & GitHub                      |

---

## 🏛️ Architecture

```text
Frontend
   │
   ├── Data Exploration
   ├── Data Cleaning
   ├── Analysis
   ├── Visualization
   ├── ML Training
   └── Prediction
          │
          ↓
   Server-Side TypeScript
          │
          ├── Data Processing
          ├── Logistic Regression
          └── Prediction Engine
          │
          ↓
   Supabase / PostgreSQL
```

The project does not depend on a separate Python backend. The machine-learning calculations are implemented using **TypeScript**, allowing the application to run as a web-based interactive learning platform.

---

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
│   └── UI Components
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
│
├── README.md
└── package.json
```

---

## 🎓 Learning Objectives

This project was developed to demonstrate practical understanding of:

* Data preprocessing
* Missing-value handling
* Duplicate detection
* Exploratory Data Analysis
* Data visualization
* Classification
* Logistic Regression
* Train-test splitting
* Model evaluation
* Confusion matrices
* Probability-based prediction
* Full-stack application development
* Database integration
* Deployment

---

## 🔬 What Makes This Project Different?

Most basic placement-prediction projects focus only on:

```text
Input → Model → Prediction
```

This project demonstrates the broader workflow:

```text
Raw Data
   ↓
Clean
   ↓
Analyze
   ↓
Visualize
   ↓
Train
   ↓
Evaluate
   ↓
Predict
```

The goal is to make the complete **Data Science lifecycle** visible and interactive rather than hiding the data-processing and model-training stages behind a single prediction form.

---

## 🔮 Future Improvements

Planned improvements include:

* [ ] Add multiple ML algorithms
* [ ] Compare model performance
* [ ] Add cross-validation
* [ ] Add hyperparameter tuning
* [ ] Add ROC-AUC and precision/recall metrics
* [ ] Add feature importance
* [ ] Add SHAP-based model explainability
* [ ] Improve dataset size and diversity
* [ ] Add downloadable analysis reports
* [ ] Add Python/scikit-learn ML pipeline
* [ ] Add automated model comparison

---

## 💻 Run Locally

### Prerequisites

* Node.js
* npm
* Git
* Supabase account/project

### Clone the repository

```bash
git clone https://github.com/sreya-git/Placement-Prediction.git
cd Placement-Prediction
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env.local` file and add the required Supabase configuration.

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🌐 Deployment

The application is deployed using **Vercel**.

**Live Application:**
https://placement-prediction-delta.vercel.app/

The project can be continuously deployed from the GitHub repository through Vercel's Git integration. Vercel also supports production domains and deployment management directly from the project dashboard.

---

## 📚 Skills Demonstrated

```text
Python / Data Science Concepts
        ↓
Data Cleaning
        ↓
EDA
        ↓
Visualization
        ↓
Machine Learning
        ↓
Logistic Regression
        ↓
TypeScript
        ↓
Next.js
        ↓
Supabase / PostgreSQL
        ↓
Git & GitHub
        ↓
Vercel Deployment
```

---

## 👩‍💻 Author

**Sreya Kumari Panigrahi**

B.Tech — Computer Science & Engineering

Interested in **Data Science, Machine Learning, and AI**

### Connect

* GitHub: https://github.com/sreya-git
* LinkedIn: https://www.linkedin.com/in/sreya-kumari-panigrahi/

---

## ⭐ Project Status

**Status:** Active Development

This project is being continuously improved as part of my journey in **Data Science and Machine Learning**.
