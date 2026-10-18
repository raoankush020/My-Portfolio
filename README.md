# ML Portfolio — Starter Project

A minimal professional portfolio for AI/ML internships and corporate roles.

## Stack
- Frontend: React, TypeScript, Vite, Axios, Recharts
- Backend: FastAPI, Pydantic, scikit-learn, joblib
- Demo ML model: TF-IDF + Logistic Regression sentiment classifier
- RAG: safe integration adapter contract; connect your existing RAG pipeline without rewriting it

> Important: `data/sentiment.csv` is a tiny starter dataset to prove the end-to-end flow. It is not a production-quality model or a credible benchmark. Replace it with a properly licensed, representative dataset and evaluate it before presenting results to recruiters.

## Requirements
- Python 3.10–3.12 recommended
- Node.js 20+ and npm
- Git

## 1. Start the backend (Windows PowerShell)
From the project root:

```powershell
cd backend
py -3.11 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
python train_model.py
uvicorn app.main:app --reload --port 8000
```

If `py -3.11` is unavailable, install Python 3.11 or use `python -m venv .venv` with a supported Python version. Avoid Python 3.14 for ML packages until your chosen dependencies explicitly support it.

Backend docs: http://127.0.0.1:8000/docs

## 2. Start the frontend
Open a second terminal from the project root:

```powershell
cd frontend
npm install
npm run dev
```

Open the local URL Vite prints (normally http://localhost:5173).

## 3. Test the API
```powershell
Invoke-RestMethod http://127.0.0.1:8000/api/health
Invoke-RestMethod -Method Post -Uri http://127.0.0.1:8000/api/sentiment `
  -ContentType "application/json" -Body '{"text":"I really enjoyed building this project"}'
```

## Project structure
```text
ml-portfolio-starter/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── schemas.py
│   │   └── services/
│   │       ├── sentiment.py
│   │       └── rag_adapter.py
│   ├── data/sentiment.csv
│   ├── models/.gitkeep
│   ├── train_model.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── api.ts
│   │   ├── main.tsx
│   │   └── styles.css
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
└── .gitignore
```

## 4. Connect your existing RAG system safely
Do not copy over or replace your current RAG pipeline yet.

1. Make a backup/branch of the existing RAG project.
2. Inspect its actual entry point, dependencies, embedding model, vector DB, LLM provider, environment variables, and API routes.
3. Add a thin adapter in `backend/app/services/rag_adapter.py` that calls your existing pipeline.
4. Replace the placeholder response in `/api/rag/query` only after the existing pipeline has been tested independently.
5. Return evidence chunks and claim-level analysis from your real implementation. Do not fabricate grounding or hallucination scores.
6. Keep secrets in `.env` (never commit it) and add authentication/rate limits before exposing document upload publicly.

Current starter behavior: `/api/rag/status` reports that the integration is not configured, and `/api/rag/query` returns HTTP 501. This is intentional; no unseen RAG code is assumed.

## 5. Before deployment
- Replace sample training data with a suitable dataset.
- Evaluate with a held-out test set; report precision, recall, F1 and confusion matrix.
- Add unit tests and API error handling.
- Add privacy controls and file-size/type limits for document upload.
- Configure `VITE_API_BASE_URL` for the deployed backend.
- Never commit `.env`, API keys, uploaded documents, model files, or personal data.
