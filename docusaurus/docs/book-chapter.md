---
sidebar_position: 3
---

# Demo Chapter — Project Requirements Summary

This concise chapter maps the hackathon requirements into the demo deliverables and how the repository satisfies them.

Core demo deliverables

- RAG Chatbot embedded in the book: implemented as a FastAPI endpoint (`/api/chat`) with `MOCK_MODE` to avoid token use during demos.
- Vector store integration: mock ingestion via `scripts/ingest_mock.py` and optional Qdrant upload when `QDRANT_URL` is set.
- Docusaurus site: minimal docs and `book-overview.md` used as the demo landing page.

How this aligns with `.specify/memory/requirements.md`

- AI/Spec-Driven Book: content is structured for retrieval (clear headings, chunkable text) and placed in `docusaurus/docs/` and `context.txt` for ingestion.
- Integrated RAG Chatbot: demo supports retrieval over `context.txt` and returns deterministic mock responses when `MOCK_MODE=true`.
- Personalization & Translation: optional routes exist (`api/routers/personalization.py`, `api/routers/i18n.py`); enable only when you add production keys.

Demo instructions (safe, token-free)

1. Ensure `.env` contains `MOCK_MODE=true` (already set in the repo template).
2. Dry-run ingestion of `context.txt` to preview chunks:

```powershell
D:\Panavers\Speckit_GeminiCLI\first_hackathone\.venv\Scripts\python.exe scripts/ingest_mock.py --dry-run --files context.txt
```

3. Start the FastAPI demo (no external LLM calls while `MOCK_MODE=true`):

```powershell
D:\Panavers\Speckit_GeminiCLI\first_hackathone\.venv\Scripts\python.exe -m uvicorn api.main:app --reload --port 8000
```

4. Use the test client script or the Docusaurus demo UI to call the chat endpoint and verify responses.

Replace this chapter with a full book chapter or PDF export when you're ready for full ingestion.
