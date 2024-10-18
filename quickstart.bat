@echo off
@setlocal

set /p user="Enter username : "
title DiaBot - %user%

:start 
node diabot.js %user% 1.20.4 localhost 25577
set /p yn="Restart bot? [Y/N] : "
if /i "%yn%"=="y" (
   goto start
)
@endlocal