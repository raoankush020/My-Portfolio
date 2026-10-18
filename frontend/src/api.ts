import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000",
  timeout: 30000,
});

export type SentimentResult = {
  label: string;
  confidence: number;
  probabilities: Record<string, number>;
  model_note: string;
};

export async function predictSentiment(text: string) {
  const response = await api.post<SentimentResult>("/api/sentiment", { text });
  return response.data;
}

export async function getRagStatus() {
  const response = await api.get<{ configured: boolean; message: string }>("/api/rag/status");
  return response.data;
}
