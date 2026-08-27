# backup_and_move.ps1
# Usage: Run from PowerShell (no admin required):
#   powershell -ExecutionPolicy Bypass -File .\backup_and_move.ps1

$ErrorActionPreference = 'Stop'

$source = 'e:\AI\Antigravity\SalaKhmer'
$backupRoot = 'D:\backup'
$timestamp = (Get-Date -Format 'yyyyMMddHHmmss')
$dest = Join-Path $backupRoot "SalaKhmer-backup-$timestamp"

Write-Host "Source: $source"
Write-Host "Destination: $dest"

if (-not (Test-Path $source)) {
    Write-Error "Source folder does not exist: $source"
    exit 1
}

# Ensure backup root exists
if (-not (Test-Path $backupRoot)) {
    Write-Host "Creating backup root: $backupRoot"
    New-Item -ItemType Directory -Path $backupRoot -Force | Out-Null
}

Write-Host "Starting robocopy (this may take a while)..."
$robocopyArgs = @(
    '"' + $source + '"',
    '"' + $dest + '"',
    '/MIR',
    '/COPYALL',
    '/R:3',
    '/W:5'
)

# Use Start-Process to display progress in the console
$rc = 0
try {
    & robocopy $source $dest /MIR /COPYALL /R:3 /W:5
    $rc = $LASTEXITCODE
} catch {
    Write-Error "Robocopy failed: $_"
    exit 1
}

Write-Host "Robocopy exit code: $rc"
if ($rc -le 7) {
    Write-Host "Robocopy completed (exit code $rc). Backup likely successful."
    Write-Host "Showing sample of files in backup:"
    Get-ChildItem -Path $dest -Recurse -File | Select-Object -First 10 | ForEach-Object { Write-Host $_.FullName }

    $confirm = Read-Host "Do you want to DELETE the source folder now? Type YES to confirm"
    if ($confirm -eq 'YES') {
        Write-Host "Deleting source folder: $source"
        Remove-Item -LiteralPath $source -Recurse -Force
        Write-Host "Source folder deleted."
    } else {
        Write-Host "Source folder left intact."
    }
} else {
    Write-Error "Robocopy reported exit code $rc. Backup may be incomplete. Source not deleted. Inspect logs and retry."
    exit 1
}

Write-Host "Done."
