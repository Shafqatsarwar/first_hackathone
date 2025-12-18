# Cleanup script: removes virtualenv, history, .qwen, and __pycache__ folders
# Run: powershell -ExecutionPolicy Bypass -File scripts\cleanup.ps1

$root = Split-Path -Parent $PSScriptRoot

$pathsToRemove = @(
    ".venv",
    "history",
    ".qwen"
)

foreach ($p in $pathsToRemove) {
    $full = Join-Path -Path $root -ChildPath $p
    if (Test-Path $full) {
        Write-Host "Removing $full"
        Remove-Item -LiteralPath $full -Recurse -Force -ErrorAction SilentlyContinue
    } else {
        Write-Host "Not found: $full"
    }
}

# Remove all __pycache__ directories recursively
Write-Host "Removing __pycache__ directories..."
Get-ChildItem -Path $PSScriptRoot -Recurse -Directory -Force -ErrorAction SilentlyContinue |
    Where-Object { $_.Name -like "__pycache__" } |
    ForEach-Object {
        Write-Host "Removing $__"
        Remove-Item -LiteralPath $_.FullName -Recurse -Force -ErrorAction SilentlyContinue
    }

Write-Host "Cleanup complete."