@echo off
rem DiaBot Installer by qsef1256
rem https://github.com/qsef1256/DiaBot/
setlocal

node -v 2> Nul
if not "%ERRORLEVEL%" == "0" goto errNode

cd %~dp0
set ver=0.5.0
set link=https://github.com/qsef1256/DiaBot/
title Diabot Installer %ver%
echo.
echo DiaBot Installer by qsef1256
echo Version: %ver%
echo Link: %link%
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
call npm install portscanner
call npm install node-clipboardy
if not "%ERRORLEVEL%" == "0" goto errInstall

if exist "start.bat" (
    echo.
    echo start.bat already exists.
    echo If start.bat was not created by this installer, delete start.bat and restart this installer.
) else (
    echo @echo off>> start.bat
    echo rem Diabot Starter by qsef1256>> start.bat
    echo.>> start.bat
    echo @setlocal>> start.bat
    echo title Diabot %ver%>> start.bat
    echo set /p user="Enter username : ">> start.bat
    echo set /p online="Online Mode [y/n] : ">> start.bat
    echo set /p fast="Do you want start bot with fast start mode? [y/n] : ">> start.bat
    echo if /i "%%fast%%"=="n" ^(>> start.bat
    echo     set /p version="Enter version : ">> start.bat
    echo     set /p host="Enter host : ">> start.bat
    echo     set /p port="Enter port : ">> start.bat
    echo ^)>> start.bat
    echo.>> start.bat
    echo if "%%online%%"=="y" ^(>> start.bat
    echo     echo start Diabot %ver% with Online mode>> start.bat
    echo     set auth="microsoft">> start.bat
    echo ^) else ^(>> start.bat
    echo     echo start Diabot %ver% with Offline mode>> start.bat
    echo     set auth="offline">> start.bat
    echo ^)>> start.bat
    echo.>> start.bat
    echo if not defined host set host="null">> start.bat
    echo if not defined port set port="null">> start.bat
    echo.>> start.bat
    echo echo.>> start.bat
    echo ^:start >> start.bat
    echo node diabot.js %%user%% %%version%% %%host%% %%port%% %%auth%%>> start.bat
    echo set /p yn="Restart bot? [y/n] : ">> start.bat
    echo if /i "%%yn%%"=="y" ^(>> start.bat
    echo    goto start>> start.bat
    echo ^)>> start.bat
    echo @endlocal>> start.bat
)

:finish
echo.
echo DiaBot Installer by qsef1256
echo Version: %ver%
echo.
echo Installation finished
echo Run start.bat to run diabot.
echo.
echo Contact: %link%
echo.
pause
goto stop

:errNode
echo No Node.js installation detected. 
echo Please install or repair Node.js.
echo.
echo Contact: %link%
pause
goto stop

:errInstall
echo There was a problem installing diabot.
echo ERRORLEVEL: %ERRORLEVEL%
echo.
echo Contact: %link%
pause
goto stop

:stop
endlocal
exit