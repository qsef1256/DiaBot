@echo off
rem Diabot Starter by qsef1256

@setlocal
title Diabot 0.5.0
set /p user="Enter username : "
set /p online="Online Mode [y/n] : "
set /p fast="Do you want start bot with fast start mode? [y/n] : " 
if /i "%fast%"=="n" ( 
    set /p version="Enter version : " 
    set /p host="Enter host : " 
    set /p port="Enter port : " 
)

if "%online%"=="y" (
    echo start Diabot 0.5.0 with Online mode
    set auth="microsoft"
) else (
    echo start Diabot 0.5.0 with Offline mode
    set auth="offline"
)

if not defined host set host="null"
if not defined port set port="null"

echo.
:start 
node diabot.js %user% %version% %host% %port% %auth%
set /p yn="Restart bot? [y/n] : "
if /i "%yn%"=="y" (
   goto start
)
@endlocal
