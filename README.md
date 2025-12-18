# Physical AI & Humanoid Robotics Textbook

## Welcome — demo-ready project

This repository has been simplified for the hackathon demo. Only the essential spec and developer guide are preserved in-place; other project files can be archived using the included script.

What remains here by design

- `.specify/` — project constitution, requirements, templates (kept as canonical source)
- `GUIDE.md` — developer guide (credentials, dependencies, dev workflows)
- `clean_repo/` — backups created during cleanup (contains copies of important files)

Quick demo (safe, no LLM tokens)

1. Ensure Python dependencies are installed in a virtualenv and keep `MOCK_MODE=true` in `.env`.

```powershell
python -m venv .venv
.\.venv\Scripts\pip.exe install -r requirements.txt
```

2. Dry-run ingestion (preview chunks without uploads):

```powershell
.\.venv\Scripts\python.exe scripts/ingest_mock.py --dry-run --files context.txt
```

3. API health test (safe with mock mode):

```powershell
.\.venv\Scripts\python.exe scripts/test_api_client.py
```

How to archive extras (I added a script you can run locally)

Run this PowerShell script from the repository root to move nonessential top-level files/folders into an `archived/` directory:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\move_to_archive.ps1
```

If you prefer, I can run the archival here for you (requires permission). Otherwise run the script locally and verify the `archived/` folder.

If you need a full restore, see `clean_repo/` for backups of `.specify` and `GUIDE.md` created earlier.