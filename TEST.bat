@echo off
echo ========================================
echo   Image Optimizer - Test
echo ========================================
echo.
echo Uygulama test modu ile baslatiliyor...
echo.
echo NOTLAR:
echo - Input klasorune test gorselleri ekleyin
echo - Optimize butonuna tiklayarak test edin
echo - Output klasorunde sonuclari kontrol edin
echo.
echo Devam etmek icin bir tusa basin...
pause > nul

cd /d "%~dp0"
call npm start

