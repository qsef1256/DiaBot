@echo off
rem Diabot Starter by qsef1256

@setlocal
title Diabot 
set /p user="Enter username : "
set /p pass="Enter password(optional) : "
set /p fast="Do you want start bot with fast start mode? [Y/N] : " 
if /i "%fast%"=="n" ( 
    set /p version="Enter version : " 
    set /p host="Enter host : " 
    set /p port="Enter port : " 
)

if defined pass (
    echo start Diabot  with Online mode
) else (
    echo start Diabot  with Offline mode
    set pass="null" 
)

if not defined host set host="null"
if not defined port set port="null"
echo.
:start 
set /p yn="Restart bot? [Y/N] : "
if /i "%yn%"=="y" (
   goto start
)
node diabot.js %user% %pass% %version% %host% %port%
pause
@endlocal
