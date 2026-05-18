@echo off
chcp 65001 >nul
title 发文张 - 打开网页
cd /d "%~dp0"

powershell -NoProfile -Command "Get-ChildItem -LiteralPath '%~dp0' -Filter '*.bat' -ErrorAction SilentlyContinue | Unblock-File -ErrorAction SilentlyContinue" >nul 2>&1

if not exist "%~dp0package.json" (
    echo [错误] 请先解压完整项目后再运行。详见：从GitHub使用说明.txt
    pause
    exit /b 1
)

echo 正在检查并启动热榜服务...
echo.

where npm >nul 2>&1
if errorlevel 1 (
    echo [错误] 未找到 Node.js，请先安装：https://nodejs.org/
    pause
    exit /b 1
)

REM 后台唤醒服务（供网页自动拉起本地 Next 服务）
powershell -NoProfile -Command "try{(Invoke-WebRequest -UseBasicParsing -TimeoutSec 1 'http://127.0.0.1:38765/ping').StatusCode}catch{exit 1}" >nul 2>&1
if errorlevel 1 (
    start "发文张-唤醒" /min "%~dp0run-launcher.cmd"
    timeout /t 1 /nobreak >nul
)

call "%~dp0auto-start-server.bat"

echo 等待热榜服务就绪（首次启动约需 15～60 秒）...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\wait-hot.ps1" -TimeoutSec 120
if errorlevel 1 (
    echo.
    echo [提示] 服务尚未就绪，浏览器仍会打开；页面将自动重试连接。
    echo        若长时间失败，请双击「启动网站.bat」查看报错。
    echo.
) else (
    node gen.mjs >nul 2>&1
)

start http://localhost:3000/app.html
echo.
echo 已在浏览器打开 http://localhost:3000/app.html
echo 热榜将自动连接，请勿关闭标题为「发文张-服务」的黑窗口。
timeout /t 4 >nul
