@echo off
chcp 65001 >nul
title 发文张 - 知识内容工坊
cd /d "%~dp0"

REM 解除从 GitHub/ZIP 下载后 Windows 可能加的“锁定”
powershell -NoProfile -Command "Get-ChildItem -LiteralPath '%~dp0' -Filter '*.bat' -ErrorAction SilentlyContinue | Unblock-File -ErrorAction SilentlyContinue" >nul 2>&1

if not exist "%~dp0package.json" (
    echo [错误] 请先把 GitHub 下载的 ZIP 完整解压，再进入文件夹双击本文件。
    echo        不要隔着压缩包运行，也不要只复制单个 bat 文件。
    echo        详见：从GitHub使用说明.txt
    pause
    exit /b 1
)

where npm >nul 2>&1
if errorlevel 1 (
    echo [错误] 未找到 Node.js，请先安装：https://nodejs.org/
    pause
    exit /b 1
)

if not exist "node_modules\" (
    echo 正在安装依赖，请稍候...
    call npm install
)

if not exist ".env.local" (
    echo 首次使用：正在打开 API 配置向导...
    call "%~dp0配置API.bat"
)

echo.
echo 正在生成页面并启动服务...
node gen.mjs >nul 2>&1

powershell -NoProfile -Command "try{(Invoke-WebRequest -UseBasicParsing -TimeoutSec 1 'http://127.0.0.1:38765/ping').StatusCode}catch{exit 1}" >nul 2>&1
if errorlevel 1 (
    start "发文张-唤醒" /min "%~dp0run-launcher.cmd"
    timeout /t 1 /nobreak >nul
)

call "%~dp0auto-start-server.bat"

echo 正在等待服务就绪...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\wait-hot.ps1" -TimeoutSec 120
if errorlevel 1 (
    echo [提示] 启动较慢，浏览器将先打开，页面会自动重试连接。
) else (
    echo 服务已就绪。
)

start http://localhost:3000/app.html
echo.
echo 浏览器已打开 http://localhost:3000/app.html
echo 本地服务在后台窗口「发文张-服务」中运行，关闭该窗口即可停止。
echo 开机自动启动：双击「安装开机自启.bat」（仅需设置一次）
echo.
pause
