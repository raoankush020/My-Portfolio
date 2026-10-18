from pathlib import Path
import pandas as pd
import joblib
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

BASE_DIR = Path(__file__).resolve().parent
DATA_PATH = BASE_DIR / "data" / "sentiment.csv"
MODEL_DIR = BASE_DIR / "models"
MODEL_DIR.mkdir(parents=True, exist_ok=True)

df = pd.read_csv(DATA_PATH)
required = {"text", "label"}
if not required.issubset(df.columns):
    raise ValueError(f"CSV must contain columns: {sorted(required)}")
df = df.dropna(subset=["text", "label"])
if df["label"].nunique() < 2:
    raise ValueError("Training data must contain at least two labels.")

pipeline = Pipeline([
    ("tfidf", TfidfVectorizer(ngram_range=(1, 2), max_features=5000, strip_accents="unicode")),
    ("classifier", LogisticRegression(max_iter=1000, class_weight="balanced")),
])
pipeline.fit(df["text"].astype(str), df["label"].astype(str))
output = MODEL_DIR / "sentiment_pipeline.joblib"
joblib.dump(pipeline, output)
print(f"Saved model to: {output}")
print(f"Training rows: {len(df)} | Labels: {sorted(df['label'].unique())}")
print("Reminder: this tiny sample is for wiring the demo only. Use a proper train/test split and real evaluation before claiming performance.")
