#!/usr/bin/env python3
"""Create embeddings for the concatenated book for later ingestion into a vector store.

This script reads `build/book/book.txt`, splits into text chunks, calls OpenAI
Embeddings API, and writes `build/book/embeddings.json` with entries:
    {"id": idx, "text": chunk_text, "embedding": [..]}

Usage:
  python scripts/ingest_embeddings.py
Requires: `openai` python package and a valid `OPENAI_API_KEY` in environment or .env
"""
import os
import json
from pathlib import Path
from math import ceil
from chatbot.env_utils import load_env

ROOT = Path(__file__).resolve().parents[1]
BOOK_TXT = ROOT / "build" / "book" / "book.txt"
OUT_FILE = ROOT / "build" / "book" / "embeddings.json"


def chunk_text(text: str, max_chars: int = 1000):
    parts = []
    start = 0
    L = len(text)
    while start < L:
        end = min(L, start + max_chars)
        # try to break at newline
        if end < L:
            nl = text.rfind('\n', start, end)
            if nl > start:
                end = nl
        parts.append(text[start:end].strip())
        start = end
    return [p for p in parts if p]


def create_embeddings():
    load_env(required=["OPENAI_API_KEY"])  # will raise if missing
    if not BOOK_TXT.exists():
        raise FileNotFoundError("Run scripts/export_book.py first to create build/book/book.txt")

    import openai

    openai.api_key = os.environ.get("OPENAI_API_KEY")

    text = BOOK_TXT.read_text(encoding="utf-8")
    chunks = chunk_text(text, max_chars=1000)

    out = []
    for i, chunk in enumerate(chunks):
        print(f"Embedding chunk {i+1}/{len(chunks)} (chars={len(chunk)})")
        try:
            resp = openai.Embedding.create(model="text-embedding-3-small", input=chunk)
            emb = resp["data"][0]["embedding"]
        except Exception as e:
            print("Embedding failed:", e)
            emb = None
        out.append({"id": i, "text": chunk, "embedding": emb})

    OUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    OUT_FILE.write_text(json.dumps(out, ensure_ascii=False), encoding="utf-8")
    print(f"Wrote embeddings to {OUT_FILE}")


if __name__ == "__main__":
    create_embeddings()
