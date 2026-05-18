@echo off
chcp 65001 >nul
title 发文张 - 取消开机自启
cd /d "%~dp0"

set "LNK=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup\发文张-自动启动.lnk"

if exist "%LNK%" (
    del /f /q "%LNK%"
    echo 已移除开机启动项：%LNK%
) else (
    echo 未找到开机启动项（可能尚未安装）。
)

echo.
echo 说明：已取消「登录自动启动」，不影响手动运行「启动网站.bat」。
echo.
pause
