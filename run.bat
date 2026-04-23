@echo off
SETLOCAL
SET "PROJECT_DIR=%~dp0"
cd /d "%PROJECT_DIR%"

echo.
echo ========================================================
echo        SRI GANESH GEMS - RUNNER
echo ========================================================
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed! 
    echo Please download and install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

:: Check if node_modules exists, if not run npm install
if not exist "node_modules\" (
    echo [INFO] node_modules not found. Installing dependencies...
    echo This may take a few minutes depending on your internet speed.
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] npm install failed! Please check your internet connection.
        pause
        exit /b 1
    )
    echo [SUCCESS] Dependencies installed successfully.
)

echo.
echo [INFO] Starting the development server...
echo.

:: Start Vite dev server
call npm run dev

echo.
pause
ENDLOCAL
