# Orchestrates a full local project test: export book, ingest embeddings (if key), copy to Next.js public, build Next app.
param()

function Write-ErrAndExit($msg){ Write-Host $msg -ForegroundColor Red; exit 1 }

# Check Python
$py = Get-Command python -ErrorAction SilentlyContinue
if (-not $py) { Write-ErrAndExit "Python not found in PATH. Install Python 3.8+ and try again." }

# Check Node/npm
$node = Get-Command node -ErrorAction SilentlyContinue
$npm = Get-Command npm -ErrorAction SilentlyContinue

# Check .env
$envPath = Join-Path (Get-Location) '.env'
$hasEnv = Test-Path $envPath
if (-not $hasEnv) { Write-Host "Warning: .env not found — embeddings step will be skipped unless you set OPENAI_API_KEY." -ForegroundColor Yellow }

Write-Host "== Exporting book (scripts/export_book.py) =="
try { python scripts/export_book.py } catch { Write-Host "Export script failed: $_" -ForegroundColor Red; exit 2 }

# If OPENAI_API_KEY present in .env, run ingest_embeddings.py
if ($hasEnv) {
    $envContent = Get-Content $envPath -ErrorAction SilentlyContinue | Where-Object { $_ -match "^OPENAI_API_KEY\s*=" }
    if ($envContent) {
        Write-Host "== OPENAI_API_KEY found — running embeddings ingestion =="
        try { python scripts/ingest_embeddings.py } catch { Write-Host "Embeddings ingestion failed: $_" -ForegroundColor Yellow; Write-Host "You can run: python scripts/ingest_embeddings.py"; }
    } else {
        Write-Host "OPENAI_API_KEY not set in .env — skipping embeddings ingestion." -ForegroundColor Yellow
    }
} else {
    Write-Host "No .env — skipping embeddings ingestion." -ForegroundColor Yellow
}

# Copy built book to nextjs public folder if present
$bookTxt = Join-Path (Join-Path (Get-Location) 'build') 'book\book.txt'
if (Test-Path $bookTxt) {
    $destDir = Join-Path (Get-Location) 'nextjs-book\public\book'
    if (-not (Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir -Force | Out-Null }
    Copy-Item -Path $bookTxt -Destination (Join-Path $destDir 'book.txt') -Force
    Write-Host "Copied book to nextjs-book/public/book/book.txt"
} else {
    Write-Host "build/book/book.txt not found — skipping copy to Next.js public." -ForegroundColor Yellow
}

# Attempt Next.js build if npm present
if ($npm) {
    Write-Host "== Installing Next.js deps and building nextjs-book =="
    Push-Location nextjs-book
    try {
        npm ci
        npm run build
        Write-Host "Next.js build succeeded." -ForegroundColor Green
    } catch {
        Write-Host "Next.js build failed or npm not configured: $_" -ForegroundColor Yellow
        Write-Host "You can run manually: cd nextjs-book; npm ci; npm run dev" -ForegroundColor Cyan
    }
    Pop-Location
} else {
    Write-Host "Node/npm not found — skipping Next.js build." -ForegroundColor Yellow
}

Write-Host "Full test orchestration complete. Check above output for any failures." -ForegroundColor Green
