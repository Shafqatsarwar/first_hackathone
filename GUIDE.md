"""Keys & Secrets Guide (Windows PowerShell)
uvicorn api.main:app --reload --host 0.0.0.0 --port 8000

This short guide documents only environment variables (service keys/URLs) and Windows PowerShell commands to verify them. Keep secrets in a local `.env` file at the repository root and do NOT commit it.

Minimum key (required for RAG features):

```env
OPENAI_API_KEY="sk-..."
```

Optional service keys (add only if you enable the integration):

- Qdrant (local or cloud):

```env
QDRANT_URL=http://127.0.0.1:6333
QDRANT_API_KEY=Abcd!234
```

- Neon (Postgres) — optional:

```env
NEON_DATABASE_URL=postgresql://username:password@host:port/dbname?sslmode=require
```

- Better-Auth (optional):

```env
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_better_auth_secret_here
JWT_SECRET=your_jwt_secret_here
```

- Google Translate (optional):

```env
GOOGLE_TRANSLATE_API_KEY=your_google_translate_api_key_here
```

- OpenAI Assistant / Vector Store IDs (optional):

```env
OPENAI_ORG_ID=your_openai_org_id
OPENAI_PROJECT_ID=your_openai_project_id
OPENAI_ASSISTANT_ID=your_assistant_id
OPENAI_VECTOR_STORE_ID=your_vector_store_id
```

Windows PowerShell quick commands (only)

- Create `.env` from example and edit:

```powershell
copy .env.example .env
notepad .env
```

- Add or set a single variable from PowerShell (append):

```powershell
Add-Content -Path .env -Value 'MOCK_MODE=true'
```

- Verify `.env` is ignored by Git:

```powershell
git check-ignore -v .env
```

- Verify OpenAI key (lightweight check — lists models status code):

```powershell
D:\Panavers\Speckit_GeminiCLI\first_hackathone\.venv\Scripts\python.exe -c "from dotenv import load_dotenv; import os, requests; load_dotenv(); k=os.getenv('OPENAI_API_KEY'); print('NO_KEY' if not k else requests.get('https://api.openai.com/v1/models', headers={'Authorization':f'Bearer {k}'}).status_code)"
```

- Verify Qdrant health (local) with PowerShell:

```powershell
Invoke-RestMethod -Uri 'http://127.0.0.1:6333/collections' -UseBasicParsing
```

Security checklist

- If you exposed a key (for example by pasting it in chat), rotate it immediately via the provider dashboard.
- Keep `MOCK_MODE=true` during development to avoid LLM calls and token consumption.

Minimal `.env` example for safe local development (Windows):

```powershell
# .env (example)
OPENAI_API_KEY="sk-..."
MOCK_MODE=true
QDRANT_URL=http://127.0.0.1:6333
```

If you want, I can enable `MOCK_MODE=true` in your `.env` now, or re-run the OpenAI key check after you rotate your key.

**Minimal keys for demo**

For a simple local demo of the book RAG chatbot you only need these:

- **OPENAI_API_KEY**: required only if you want real embeddings/LLM responses. Keep it secret.
- **MOCK_MODE=true**: recommended during development to avoid any token usage; the API will return deterministic mock responses.
- **QDRANT_URL** (optional): set only if you run a local or cloud Qdrant instance and want to store/query vectors.
- **QDRANT_API_KEY** (optional): only for authenticated Qdrant clouds.

You do NOT need the OpenAI Assistant/Project/Org IDs or the Neon DB/JWT secrets for a minimal demo. Add them only when you enable the corresponding production integrations.

How to set these quickly from PowerShell

```powershell
Add-Content -Path .env -Value 'OPENAI_API_KEY="sk-..."'
Add-Content -Path .env -Value 'MOCK_MODE=true'
Add-Content -Path .env -Value 'QDRANT_URL=http://127.0.0.1:6333'
```

Add a local context file for the vector store

1. Place a plain text or PDF file with the book/context at the repository root. Example file created for you: `context.txt` (root).
2. Dry-run ingestion (no uploads, previews chunks/embeddings):

```powershell
D:\Panavers\Speckit_GeminiCLI\first_hackathone\.venv\Scripts\python.exe scripts/ingest_mock.py --dry-run --files context.txt
```

3. Live ingest to Qdrant (only if `QDRANT_URL` is set and you want to upload):

```powershell
D:\Panavers\Speckit_GeminiCLI\first_hackathone\.venv\Scripts\python.exe scripts/ingest_mock.py --upsert --files context.txt
```

PowerShell HTTP alternative (if you expose an ingestion endpoint):

```powershell
Invoke-RestMethod -Uri 'http://127.0.0.1:8000/api/ingest' -Method Post -Form @{ file = Get-Item .\context.txt }
```

Next steps

- Keep `MOCK_MODE=true` until you rotate and verify a fresh `OPENAI_API_KEY`.
- When ready for real embeddings/LLM calls: set `MOCK_MODE=false`, add `OPENAI_API_KEY`, and optionally set `QDRANT_URL`/`QDRANT_API_KEY`.

"""