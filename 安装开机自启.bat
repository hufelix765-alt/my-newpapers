@echo off
REM 仅在当前 Windows 用户「启动」文件夹创建快捷方式，不会写入 Git 仓库
chcp 65001 >nul
title 发文张 - 安装开机自启
cd /d "%~dp0"

set "TARGET=%~dp0auto-start-server.bat"
set "STARTUP=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
set "LNK=%STARTUP%\发文张-自动启动.lnk"
set "WORKDIR=%~dp0"
set "WORKDIR=%WORKDIR:~0,-1%"

if not exist "%TARGET%" (
    echo [错误] 找不到 auto-start-server.bat
    pause
    exit /b 1
)

echo 正在添加到 Windows 开机启动项...
echo 目标：%LNK%
echo.

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$ws=New-Object -ComObject WScript.Shell;" ^
  "$s=$ws.CreateShortcut('%LNK%');" ^
  "$s.TargetPath='%TARGET%';" ^
  "$s.WorkingDirectory='%WORKDIR%';" ^
  "$s.WindowStyle=7;" ^
  "$s.Description='发文张：登录后自动启动本地网站服务';" ^
  "$s.Save()"

if errorlevel 1 (
    echo [失败] 无法创建启动项，请右键「以管理员身份运行」本脚本后重试。
    pause
    exit /b 1
)

echo.
echo ========================================
echo   已设置开机自动启动
echo ========================================
echo.
echo - 下次登录 Windows 后，将自动在后台启动网站服务
echo - 不会自动弹出浏览器（避免每次开机打扰）
echo - 使用方式：双击「打开网页.bat」或访问
echo   http://localhost:3000/app.html
echo.
echo 若要取消：运行「取消开机自启.bat」
echo 若从 GitHub 克隆或移动了项目文件夹，请在本目录重新运行本脚本。
echo.
echo 是否立即在后台启动一次服务？（Y/N）
choice /c YN /n /t 10 /d Y >nul
if errorlevel 2 goto :done
call "%TARGET%"
echo 已尝试启动，稍等几秒后可用浏览器打开。
:done
pause
