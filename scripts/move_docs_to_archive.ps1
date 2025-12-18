param(
    [switch]$WhatIf
)

$src = Join-Path $PSScriptRoot "..\docs"
$dst = Join-Path $PSScriptRoot "..\archived\docs"

Write-Host "Source: $src"
Write-Host "Destination: $dst"

if (-not (Test-Path $src)) {
    Write-Host "No docs folder found at $src" -ForegroundColor Yellow
    exit 0
}

if (!(Test-Path $dst)) {
    New-Item -ItemType Directory -Path $dst -Force | Out-Null
}

Get-ChildItem -Path $src -File | ForEach-Object {
    $dest = Join-Path $dst $_.Name
    if ($WhatIf) {
        Write-Host "Would move: $($_.FullName) -> $dest"
    } else {
        Move-Item -Path $_.FullName -Destination $dest -Force
        Write-Host "Moved: $($_.Name)"
    }
}

Write-Host "Done. Files moved to: $dst"
