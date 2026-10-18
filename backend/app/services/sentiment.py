from pathlib import Path
import joblib

MODEL_PATH = Path(__file__).resolve().parents[2] / "models" / "sentiment_pipeline.joblib"


def predict_sentiment(text: str) -> dict:
    if not MODEL_PATH.exists():
        raise RuntimeError("Model not trained. Run `python train_model.py` in the backend folder.")
    model = joblib.load(MODEL_PATH)
    probabilities = model.predict_proba([text])[0]
    classes = list(model.classes_)
    scores = {str(label): round(float(score), 4) for label, score in zip(classes, probabilities)}
    best_index = int(probabilities.argmax())
    return {
        "label": str(classes[best_index]),
        "confidence": round(float(probabilities[best_index]), 4),
        "probabilities": scores,
        "model_note": "Starter TF-IDF + Logistic Regression trained on a tiny demo dataset; not production validated."
    }
