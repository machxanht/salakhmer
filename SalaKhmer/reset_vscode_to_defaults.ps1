# reset_vscode_to_defaults.ps1
# Backs up user VS Code data (settings, extensions, workspace storage) then resets by renaming folders.
# Run after closing all VS Code windows:
#   powershell -ExecutionPolicy Bypass -File .\reset_vscode_to_defaults.ps1

$ErrorActionPreference = 'Stop'

function Backup-Rename {
    param($path)
    if (-not (Test-Path $path)) { return $null }
    $ts = Get-Date -Format yyyyMMddHHmmss
    $parent = Split-Path $path -Parent
    $name = Split-Path $path -Leaf
    $newName = "$name-backup-$ts"
    $newPath = Join-Path $parent $newName
    Rename-Item -LiteralPath $path -NewName $newName -Force
    return $newPath
}

Write-Host "Preparing to reset VS Code user data. Close all VS Code windows before continuing." -ForegroundColor Yellow
$running = Get-Process -Name Code -ErrorAction SilentlyContinue
if ($running) {
    Write-Host "Detected running VS Code processes. Please quit VS Code and re-run this script." -ForegroundColor Red
    exit 1
}

$appDataCode = Join-Path $env:APPDATA 'Code'
$userVscode = Join-Path $env:USERPROFILE '.vscode'    # extensions folder
$workspaceStorage = Join-Path $appDataCode 'workspaceStorage'
$userSettingsFolder = Join-Path $appDataCode 'User'
$settingsFile = Join-Path $userSettingsFolder 'settings.json'

Write-Host "Backing up and renaming the following (if present):" -ForegroundColor Cyan
Write-Host " - $appDataCode"
Write-Host " - $userVscode"

$backups = @{}
try {
    if (Test-Path $appDataCode) {
        $backups['AppDataCode'] = Backup-Rename -path $appDataCode
        Write-Host "Renamed $appDataCode -> $($backups['AppDataCode'])"
    } else { Write-Host "$appDataCode not found, skipping." }

    if (Test-Path $userVscode) {
        $backups['UserVscode'] = Backup-Rename -path $userVscode
        Write-Host "Renamed $userVscode -> $($backups['UserVscode'])"
    } else { Write-Host "$userVscode not found, skipping." }

    # Also backup LocalStorage if present (optional)
    $localState = Join-Path $env:LOCALAPPDATA 'Code'
    if (Test-Path $localState) {
        $backups['LocalAppDataCode'] = Backup-Rename -path $localState
        Write-Host "Renamed $localState -> $($backups['LocalAppDataCode'])"
    } else { Write-Host "$localState not found, skipping." }

    Write-Host "\nReset complete. VS Code will start with default settings next launch." -ForegroundColor Green
    Write-Host "Backups created:" -ForegroundColor Cyan
    $backups.GetEnumerator() | ForEach-Object { Write-Host " - $($_.Key): $($_.Value)" }
    Write-Host "\nIf you want to restore any backup, rename the backup folder back to its original name and restart VS Code." -ForegroundColor Yellow
} catch {
    Write-Error "An error occurred: $_"
    Write-Host "You can manually inspect and restore backup folders in %APPDATA% and your user profile." -ForegroundColor Red
    exit 1
}
