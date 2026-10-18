
"""Adapter for the existing RAG system.

Keep the existing RAG pipeline intact. Connect its public service
functions here after identifying the actual implementation.
"""


def get_status() -> dict:
    """Return the current RAG integration status."""
    return {
        "configured": False,
        "message": (
            "RAG adapter is not connected yet. "
            "Connect the existing retrieval and generation pipeline."
        ),
    }


def answer_question(question: str) -> dict:
    """Validate a question and report that RAG integration is pending."""
    question = question.strip()

    if not question:
        return {
            "success": False,
            "error": "Question cannot be empty.",
        }

    return {
        "success": False,
        "error": (
            "RAG pipeline is not connected yet. "
            "Connect the existing retrieval, generation, "
            "and verification service."
        ),
    }
