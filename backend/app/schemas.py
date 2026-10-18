from pydantic import BaseModel, Field


class SentimentRequest(BaseModel):
    text: str = Field(min_length=2, max_length=2000)


class SentimentResponse(BaseModel):
    label: str
    confidence: float
    probabilities: dict[str, float]
    model_note: str


class RagQueryRequest(BaseModel):
    question: str = Field(min_length=3, max_length=2000)
