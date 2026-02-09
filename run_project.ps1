Write-Host "============================================" -ForegroundColor Cyan
Write-Host "   Learn 2 Code - Project Launcher" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan

# Check for backend directory
if (!(Test-Path "backend")) {
    Write-Error "Backend directory not found!"
    exit 1
}

# --- Backend Section ---
Write-Host "`n[Backend] Setup & Start..." -ForegroundColor Green
Set-Location backend

# Run setup script to ensure Maven is available
if (Test-Path "setup_maven.ps1") {
    Write-Host "Running Maven setup..." -ForegroundColor Gray
    Invoke-Expression ".\setup_maven.ps1"
} else {
    Write-Warning "backend/setup_maven.ps1 not found. Assuming Maven is in PATH."
}

# Determine Maven Command
$MavenLocal = ".\.tools\apache-maven-3.9.6\bin\mvn.cmd"
if (Test-Path $MavenLocal) {
    # Resolve absolute path for Start-Process
    $MavenCmd = (Resolve-Path $MavenLocal).Path
} else {
    $MavenCmd = "mvn" # Fallback to global path
}

Write-Host "Using Maven at: $MavenCmd" -ForegroundColor Gray

# Start Backend
# We use Start-Process to open a separate window
$BackendArgs = "spring-boot:run"
Write-Host "Launching Backend Server..." -ForegroundColor Yellow
Start-Process -FilePath $MavenCmd -ArgumentList $BackendArgs -WorkingDirectory $PWD -WindowStyle Normal

Set-Location ..

# --- Frontend Section ---
Write-Host "`n[Frontend] Setup & Start..." -ForegroundColor Green

# Install dependencies if needed
if (!(Test-Path "node_modules")) {
    Write-Host "Installing npm dependencies (this may take a minute)..." -ForegroundColor Yellow
    npm install
}

# Start Frontend
Write-Host "Launching Frontend Server..." -ForegroundColor Yellow
# Using cmd /c to ensure npm script runs correctly in new window keeping it open
Start-Process -FilePath "cmd.exe" -ArgumentList "/c npm run dev" -WorkingDirectory $PWD -WindowStyle Normal

Write-Host "`n============================================" -ForegroundColor Cyan
Write-Host "   Launch Commands Sent!" -ForegroundColor Cyan
Write-Host "   Check the two new terminal windows." -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
