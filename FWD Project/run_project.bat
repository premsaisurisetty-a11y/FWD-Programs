@echo off
setlocal
echo ============================================
echo    Learn 2 Code - Project Launcher (CMD)
echo ============================================

:: Check for backend
if not exist "backend" (
    echo Error: Backend directory not found!
    pause
    exit /b 1
)

:: --- Backend Section ---
echo.
echo [Backend] Setup ^& Start...
cd backend

:: Run setup script (still needs PowerShell for the download logic, but called from CMD)
if exist "setup_maven.ps1" (
    echo Running Maven setup...
    powershell -NoProfile -ExecutionPolicy Bypass -File "setup_maven.ps1"
)

:: Determine Maven Command
set "MAVEN_CMD=mvn"
if exist ".tools\apache-maven-3.9.6\bin\mvn.cmd" (
    set "MAVEN_CMD=.tools\apache-maven-3.9.6\bin\mvn.cmd"
)

echo Using Maven at: %MAVEN_CMD%
echo Launching Backend Server...
start "Backend Server" cmd /c "%MAVEN_CMD% spring-boot:run"

cd ..

:: --- Frontend Section ---
echo.
echo [Frontend] Setup ^& Start...

if not exist "node_modules" (
    echo Installing npm dependencies...
    call npm install
)

echo Launching Frontend Server...
start "Frontend Server" cmd /c "npm run dev"

echo.
echo ============================================
echo    Launch Commands Sent!
echo    Check the two new terminal windows.
echo ============================================
pause
