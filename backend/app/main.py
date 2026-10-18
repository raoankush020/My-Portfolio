from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import SentimentRequest, SentimentResponse, RagQueryRequest
from app.services.sentiment import predict_sentiment
from app.services.rag_adapter import get_status, answer_question

app = FastAPI(
    title="ML Portfolio API",
    description="Portfolio APIs for ML demos. RAG routes are placeholders until the existing pipeline is connected.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

PROJECTS = [
    {
        "title": "RAG Hallucination Detector",
        "category": "RAG · NLP",
        "description": "Evidence-grounded question answering and claim verification. Existing pipeline integration is pending.",
        "status": "Integration pending",
        "tags": ["RAG", "Embeddings", "Vector Search"],
    },
    {
        "title": "NLP Sentiment Analyzer",
        "category": "Machine Learning",
        "description": "A TF-IDF + Logistic Regression demo that classifies short text into sentiment categories.",
        "status": "Working demo",
        "tags": ["Python", "scikit-learn", "NLP"],
    },
    {
        "title": "Model Evaluation Lab",
        "category": "Model Evaluation",
        "description": "Planned dashboard for comparing precision, recall, F1-score and confusion matrices.",
        "status": "Planned",
        "tags": ["Evaluation", "Metrics", "Visualization"],
    },
]


@app.get("/api/health")
def health():
    return {"status": "ok", "service": "ML Portfolio API"}


@app.get("/api/projects")
def list_projects():
    return {"projects": PROJECTS}


@app.post("/api/sentiment", response_model=SentimentResponse)
def sentiment(payload: SentimentRequest):
    try:
        result = predict_sentiment(payload.text.strip())
        return SentimentResponse(**result)
    except RuntimeError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc


@app.get("/api/rag/status")
def rag_status():
    return get_status()


@app.post("/api/rag/query")
def rag_query(payload: RagQueryRequest):
    try:
        return answer_question(payload.question.strip())
    except NotImplementedError as exc:
        raise HTTPException(status_code=501, detail=str(exc)) from exc
