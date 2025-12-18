# api/routers/ingest.py
# Handles document ingestion for RAG pipelines

from fastapi import APIRouter, UploadFile, File, HTTPException
import os

router = APIRouter()

@router.post("/ingest")
async def ingest(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file uploaded")

    content = await file.read()
    text = content.decode("utf-8", errors="ignore")

    # MOCK_MODE support (demo-safe)
    mock_mode = os.getenv("MOCK_MODE", "true").lower() == "true"

    if mock_mode:
        return {
            "mode": "mock",
            "filename": file.filename,
            "characters": len(text),
            "message": "File received successfully (mock mode)"
        }

    # Real ingestion logic placeholder (Qdrant / embeddings)
    # This is where you will:
    # - chunk text
    # - embed via OpenAI
    # - store in Qdrant

    return {
        "mode": "real",
        "filename": file.filename,
        "characters": len(text),
        "message": "File received successfully (real mode)"
    }
