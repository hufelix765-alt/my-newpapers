@echo off
chcp 65001 >nul
cd /d "%~dp0"
set "PATH=%PATH%;%ProgramFiles%\nodejs\;%ProgramFiles(x86)%\nodejs\;%APPDATA%\npm\"

where npm >nul 2>&1
if errorlevel 1 exit /b 1

REM 已在运行则跳过
powershell -NoProfile -Command "try{$c=New-Object Net.Sockets.TcpClient;$c.Connect('127.0.0.1',3000);$c.Close();exit 0}catch{exit 1}" >nul 2>&1
if not errorlevel 1 exit /b 0

if not exist "node_modules\" (
    call npm install >nul 2>&1
)

if not exist ".env.local" (
    if exist ".env.example" copy /y ".env.example" ".env.local" >nul
)

node gen.mjs >nul 2>&1

powershell -NoProfile -Command "try{(Invoke-WebRequest -UseBasicParsing -TimeoutSec 1 'http://127.0.0.1:38765/ping').StatusCode}catch{exit 1}" >nul 2>&1
if errorlevel 1 (
    start "发文张-唤醒" /min "%~dp0run-launcher.cmd"
)

REM 后台最小化运行，不自动打开浏览器
start "发文张-服务" /min "%~dp0run-dev.cmd"

exit /b 0
