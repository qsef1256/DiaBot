
    echo @echo off>> start.bat
    echo rem Diabot Starter by qsef1256>> start.bat
    echo.>> start.bat
    echo @setlocal>> start.bat
    echo title Diabot %ver%>> start.bat
    echo set /p user="Enter username : ">> start.bat
    echo set /p pass="Enter password(optional) : ">> start.bat
    echo set /p fast="Do you want start bot with fast start mode? [Y/N] : " >> start.bat
    echo if /i "%%fast%%"=="n" ^( >> start.bat
    echo     set /p version="Enter version : " >> start.bat
    echo     set /p host="Enter host : " >> start.bat
    echo     set /p port="Enter port : " >> start.bat
    echo ^)>> start.bat
    echo.>> start.bat
    echo if defined pass ^(>> start.bat
    echo     echo start Diabot %ver% with Online mode>> start.bat
    echo ^) else ^(>> start.bat
    echo     echo start Diabot %ver% with Offline mode>> start.bat
    echo     set pass="null" >> start.bat
    echo ^)>> start.bat
    echo.>> start.bat
    echo if not defined host set host="null">> start.bat
    echo if not defined port set port="null">> start.bat
    echo echo.>> start.bat
    echo ^:start >> start.bat
    echo set /p yn="Restart bot? [Y/N] : ">> start.bat
    echo if /i "%%yn%%"=="y" ^(>> start.bat
    echo    goto start>> start.bat
    echo ^)>> start.bat
    echo node diabot.js %%user%% %%pass%% %%version%% %%host%% %%port%%>> start.bat
    echo pause>> start.bat
    echo @endlocal>> start.bat