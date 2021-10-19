@echo off
rem DiaBot Installer by qsef1256
rem https://github.com/qsef1256/DiaBot/
setlocal

node -v 2> Nul
if not "%ERRORLEVEL%" == "0" goto errNode

cd %~dp0
set ver=0.45.1
title Diabot Installer %ver%
echo.
echo DiaBot Installer by qsef1256
echo Version: %ver%
echo.
echo This installer installs DiaBot to the %~dp0.
echo Enter Y if you want to install, otherwise N.
set /p yn=[Y/N] : 
if /i "%yn%" == "Y" goto install
goto stop

:install
echo Installing DiaBot...
call npm install mineflayer
call npm install mineflayer-pathfinder
call npm install mineflayer-web-inventory
call npm install mineflayer-pvp
call npm install mineflayer-armor-manager
if not "%ERRORLEVEL%" == "0" goto errInstall

if exist "start.bat" (
    echo.
    echo start.bat already exists.
    echo If start.bat was not created by this installer, delete start.bat and restart this installer.
) else (
    echo @echo off>> start.bat
    echo rem Diabot Starter by qsef1256>> start.bat
    echo.>> start.bat
    echo title Diabot %ver%>> start.bat
    echo set /p user="Enter username : ">> start.bat
    echo set /p pass="Enter password(optional) : ">> start.bat
    echo if defined pass ^(>> start.bat
    echo     echo start Diabot %ver% with Online mode>> start.bat
    echo ^) else ^(>> start.bat
    echo     echo start Diabot %ver% with Offline mode>> start.bat
    echo ^)>> start.bat
    echo echo.>> start.bat
    echo node diabot.js %%user%% %%pass%%>> start.bat
    echo pause>> start.bat
)

:finish
echo.
echo DiaBot Installer by qsef1256
echo Version: %ver%
echo.
echo Installation finished
echo Run start.bat to run diabot.
echo.
echo Contact: https://github.com/qsef1256/DiaBot/
echo.
pause
goto stop

:errNode
echo No Node.js installation detected. 
echo Please install or repair Node.js.
echo.
echo Contact: https://github.com/qsef1256/DiaBot/
pause
goto stop

:errInstall
echo There was a problem installing diabot.
echo ERRORLEVEL: %ERRORLEVEL%
echo.
echo Contact: https://github.com/qsef1256/DiaBot/
pause
goto stop

:stop
endlocal
exit