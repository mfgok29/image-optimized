@echo off
echo ========================================
echo   Image Optimizer - Build EXE
echo ========================================
echo.
echo Executable olusturuluyor...
echo Bu islem birkaç dakika surebilir...
echo.

cd /d "%~dp0"
call npm run build:win

echo.
echo ========================================
echo Build tamamlandi!
echo EXE dosyasi: dist\Image Optimizer Setup.exe
echo ========================================
echo.

pause

