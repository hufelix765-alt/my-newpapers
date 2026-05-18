@echo off
chcp 65001 >nul
cd /d "%~dp0"
set "PATH=%PATH%;%ProgramFiles%\nodejs\;%ProgramFiles(x86)%\nodejs\;%APPDATA%\npm\"
node scripts\hot-launcher.mjs
