# Move all top-level items except .specify and GUIDE.md into an 'archived' folder.
# Run from repository root in PowerShell:
#   powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\move_to_archive.ps1

$keep = @('.specify','GUIDE.md','.git','.gitignore')
$root = Get-Location
$archived = Join-Path $root 'archived'
if (-not (Test-Path $archived)) { New-Item -ItemType Directory -Path $archived | Out-Null }

Get-ChildItem -Force | ForEach-Object {
    if ($keep -contains $_.Name) { return }
    # Skip the archived folder itself
    if ($_.Name -ieq 'archived') { return }
    try {
        Write-Host "Moving: $_.Name -> archived\$($_.Name)"
        Move-Item -LiteralPath $_.FullName -Destination $archived -Force
    } catch {
        Write-Warning "Failed to move $_.Name: $_"
    }
}

Write-Host 'ARCHIVE_COMPLETE'