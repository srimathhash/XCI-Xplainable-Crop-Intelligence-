# XCI(Xplainable Crop Intelligence)– An Explainable AI Framework for Intelligent Crop Recommendation

A full-stack production-ready web application providing intelligent, region-aware crop recommendations powered by a pre-trained Random Forest model, featuring SHAP explainability, and built with modern glassmorphism design.

## 🚀 Quick Start

AgriSen is composed of completely independent Frontend and Backend services. You must start them in separate terminal windows.

### Step 1 – Start Backend
Navigate to the backend directory and start the Uvicorn server:
```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Step 2 – Start Frontend
Open a new terminal, navigate to the frontend directory, and start the Vite dev server:
```bash
cd frontend
npm run dev
```

---

## Features
- **Accurate AI Model**: ~99.5% accurate Random Forest model.
- **Explainable AI (XAI)**: SHAP-based feature importance visualization for Researchers, simplified text explanations for Farmers.
- **Google Auth**: Secure one-click login.
- **OTP Verification**: Email-style verification for standard signups.
- **Two Predict Modes**: 
  - *Manual*: Input soil (N, P, K, pH) and climate (Temp, Humidity, Rainfall).
  - *Region-based*: Select an Indian state/UT to auto-fill regional averages.
- **i18n Support**: Full support for English, Telugu, and Hindi.
- **Role-based Access**: Custom dashboards based on user role (Farmer vs Researcher).
- **History Tracking**: All predictions saved to MongoDB and viewable in the dashboard.
- **Weather API**: 5-Day real-time API telemetry powered by OpenWeather and cached via Redis.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS 3 (Glassmorphism UI), Recharts, React Router
- **Backend**: FastAPI, Motor (Async MongoDB), Joblib, Pandas, SHAP
- **Authentication**: JWT via python-jose, passlib bcrypt
- **Database / Cache**: MongoDB, Redis

## Prerequisites
- MongoDB running locally on port 27017 (or update `MONGO_URI` in `backend/.env`)
- Redis server running locally on port 6379 
- Node.js 18+
- Python 3.9+

## 1. Backend Setup

1. Navigate to backend dir:
   ```bash
   cd backend
   ```
2. Create virtual environment and install dependencies:
   ```bash
   python -m venv venv
   source venv/Scripts/activate  # On Windows
   pip install -r requirements.txt
   ```
3. Ensure the model and data files are present:
   - `backend/models/best_rf_model.pkl`
   - `backend/data/region_climate_mapping_all_india.csv`
   - `backend/data/region_soil_mapping_all_india.csv`
4. Run the FastAPI server:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

## 2. Frontend Setup

1. Navigate to frontend dir:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Vite dev server:
   ```bash
   npm run dev
   ```
4. Access the app at `http://localhost:5173`.
