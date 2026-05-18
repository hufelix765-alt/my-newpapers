@echo off
chcp 65001 >nul
title 发文张 - 配置免费 AI API
cd /d "%~dp0"

echo ========================================
echo   一键概括 · 免费 API 配置向导
echo ========================================
echo.
echo 任选一种（均兼容 OpenAI 格式）：
echo.
echo   [1] Groq         - 国外，注册即送免费额度（推荐试手）
echo   [2] 硅基流动     - 国内，新用户送额度
echo   [3] OpenRouter   - 有永久免费模型
echo   [4] DeepSeek     - 国内，新用户有赠送
echo   [5] 通义千问     - 阿里云免费额度
echo.
set "choice="
set /p choice=请输入数字 1-5 后回车（直接回车默认 1 Groq）:
if "%choice%"=="" set choice=1

if "%choice%"=="1" goto groq
if "%choice%"=="2" goto siliconflow
if "%choice%"=="3" goto openrouter
if "%choice%"=="4" goto deepseek
if "%choice%"=="5" goto dashscope
goto groq

:groq
set "KEYLINE=OPENAI_API_KEY=gsk-在此粘贴Groq密钥"
set "BASE=https://api.groq.com/openai/v1"
set "MODEL=llama-3.3-70b-versatile"
set "REG=https://console.groq.com/keys"
set "NAME=Groq"
goto write

:siliconflow
set "KEYLINE=OPENAI_API_KEY=sk-在此粘贴硅基流动密钥"
set "BASE=https://api.siliconflow.cn/v1"
set "MODEL=Qwen/Qwen2.5-7B-Instruct"
set "REG=https://cloud.siliconflow.cn/account/ak"
set "NAME=硅基流动"
goto write

:openrouter
set "KEYLINE=OPENAI_API_KEY=sk-在此粘贴OpenRouter密钥"
set "BASE=https://openrouter.ai/api/v1"
set "MODEL=google/gemma-2-9b-it:free"
set "REG=https://openrouter.ai/keys"
set "NAME=OpenRouter"
goto write

:deepseek
set "KEYLINE=OPENAI_API_KEY=sk-在此粘贴DeepSeek密钥"
set "BASE=https://api.deepseek.com/v1"
set "MODEL=deepseek-chat"
set "REG=https://platform.deepseek.com/api_keys"
set "NAME=DeepSeek"
goto write

:dashscope
set "KEYLINE=OPENAI_API_KEY=sk-在此粘贴通义千问密钥"
set "BASE=https://dashscope.aliyuncs.com/compatible-mode/v1"
set "MODEL=qwen-turbo"
set "REG=https://dashscope.console.aliyun.com/apiKey"
set "NAME=通义千问"
goto write

:write
(
echo # %NAME% API - 一键概括
echo %KEYLINE%
echo OPENAI_BASE_URL=%BASE%
echo OPENAI_MODEL=%MODEL%
echo OPENAI_IMAGE_MODEL=dall-e-3
) > .env.local

echo.
echo 已写入 %NAME% 配置到 .env.local
echo 请打开浏览器注册并复制 Key：%REG%
echo.
start "" "%REG%"
notepad .env.local
echo.
echo 在记事本中把 Key 填到 OPENAI_API_KEY= 后面，保存后关闭。
echo 然后双击「启动网站.bat」即可自动 AI 概括。
pause
