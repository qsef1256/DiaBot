@echo off
@setlocal

set /p user="Enter username : "
:start 
node diabot.js %user% null 1.18.2 localhost 25565
set /p yn="Restart bot? [Y/N] : "
if /i "%yn%"=="y" (
   goto start
)
@endlocal