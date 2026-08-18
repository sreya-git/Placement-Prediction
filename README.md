# 🧪 DATA SCIENCE LAB

> **Interactive AI Learning Platform for 1st-Year B.Tech Students**  
> *"From raw student data to your own Machine Learning prediction."*

**DATA SCIENCE LAB** is a production-ready, fully functional interactive web application built to teach first-year engineering students the complete data science and machine learning workflow visually and hands-on:

```
RAW DATA ➔ DATA CLEANING ➔ DATA ANALYSIS ➔ VISUALIZATION ➔ MACHINE LEARNING ➔ PREDICTION
```

---

## ⚡ 100% Vercel + Supabase Only Architecture

- **Zero Python Server**: No Flask, no FastAPI, no manual Python script running.
- **Zero Railway / Render / Docker**: The whole system runs in a single Next.js project.
- **Server-Side ML Math**: Pure TypeScript Logistic Regression engine executing with zero client-side leakage.
- **Database Safety**: Original Supabase dataset is protected via Row Level Security (RLS); data cleaning runs in-memory per session.

---

## 📋 Features

1. **Step 01 — Meet Your Data**: Dynamic table with 150 student records, live calculation of rows, features, missing cells, and duplicates.
2. **Step 02 — Remove Duplicates**: Dynamic detection and animated removal of redundant records ($150 \to 146$).
3. **Step 03 — Mean Imputation**: Visual step-by-step arithmetic mean ($\text{Mean} = \sum X / N$) replacement of missing numerical values.
4. **Step 04 — Data Analysis**: 5 interactive question cards with animated counters for branch scores, attendance, backlogs, and study hours.
5. **Step 05 — Visualization**: 5 interactive SVG charts (Bar graphs, Scatter plots) with data-driven observation callouts.
6. **Step 06 — Machine Learning**: Impressive AI processor particle canvas animation ($0 \to 100\%$), 80/20 train/test split, real model test accuracy, and confusion matrix.
7. **Step 07 — Live Prediction**: Interactive candidate profile sliders with real-time probabilistic classification (*LIKELY PLACED* vs *NOT LIKELY TO BE PLACED*).
8. **Step 08 — Victory Summary**: Full pipeline completion recap and confetti celebration.

---

## 🚀 Prerequisites

You only need:
- **Node.js** (v18 or higher)
- A free **[Supabase](https://supabase.com)** account
- A free **[Vercel](https://vercel.com)** account

*(No Docker, no Python, no separate database server needed)*

---

## 🛠️ Step-by-Step Setup Guide

### 1. Set Up Supabase Database

1. Go to [Supabase](https://supabase.com) and create a new project.
2. Open the **SQL Editor** tab in your Supabase dashboard.
3. Paste the contents of `supabase/schema.sql` into the SQL Editor and click **Run**.
4. Go to **Table Editor** ➔ Click on the `students` table ➔ Click **Insert** ➔ **Import data from CSV**.
5. Upload the provided file `supabase/seed.csv` and confirm the import.

### 2. Configure Environment Variables

1. In your Supabase dashboard, go to **Project Settings** ➔ **API**.
2. Copy your **Project URL** and **anon / public key**.
3. Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-publishable-key
```

*(Note: If you run the app without environment variables, it automatically boots in safe Seed Sandbox Mode using the exact 150-row dataset so you can test it immediately!)*

### 3. Run Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploy to Vercel

1. Push this project to your GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Data Science Lab"
   git branch -M main
   git remote add origin https://github.com/<your-username>/data-science-lab.git
   git push -u origin main
   ```
2. Log into [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. In the **Environment Variables** section, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
5. Click **Deploy**.

Your website is now live worldwide on Vercel and connected to Supabase!

---

## 📂 Project Structure

```
data-science-lab/
├── app/
│   ├── api/
│   │   ├── dataset/        # GET raw dataset & statistics
│   │   ├── data/clean/     # POST duplicate removal & mean imputation
│   │   ├── analysis/       # GET/POST dynamic exploratory questions
│   │   ├── charts/         # GET/POST chart datasets
│   │   └── model/
│   │       ├── train/      # POST train Logistic Regression
│   │       ├── status/     # GET training state
│   │       └── predict/    # POST live student inference
│   ├── globals.css         # AI lab theme, custom sliders & animations
│   ├── layout.tsx          # Root layout & Google Fonts
│   └── page.tsx            # Interactive laboratory step coordinator
├── components/
│   ├── landing/            # Hero section & Real-world domain cards
│   ├── steps/              # Steps 01 to 08 interactive stages
│   └── ui/                 # Header, progress bar, modals
├── lib/
│   ├── analytics/          # Statistical aggregations
│   ├── data-processing/    # Deduplication, Mean/Mode imputation, seed data
│   ├── ml/                 # TypeScript Logistic Regression engine
│   ├── supabase/           # Supabase browser & server clients
│   └── types/              # Strict TypeScript interfaces
└── supabase/
    ├── schema.sql          # PostgreSQL schema with Row Level Security
    └── seed.csv            # 150-row student dataset
```

---

## 🎓 Educational Note for Students

> **Correlation vs. Causation:** In Step 5, students observe that higher attendance and study hours positively correlate with placement outcomes. The lab explicitly reminds students that while machine learning detects statistical patterns, correlation does not automatically prove direct causation.
