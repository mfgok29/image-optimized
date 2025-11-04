@echo off
echo ========================================
echo   Sharp Test - Gorsel Optimize
echo ========================================
echo.
echo Input klasorundeki gorseller test edilecek...
echo.

cd /d "%~dp0"

echo [1/2] Test scripti calistiriliyor...
node src/optimize-sharp.js

echo.
echo [2/2] Output klasoru aciliyor...
start output

echo.
echo Test tamamlandi!
pause

