# 发文张 · 热榜选题与内容审核update

一站式中文内容工具：多平台热榜选题 → 链接抓取 / 审阅 → AI 结构化概括 → 导出到 DeepSeek / 豆包等。

## 从微信 / GitHub 打开的朋友（必读）

**GitHub 链接不能在微信里直接运行程序。** 微信里点 `启动网站.bat` 只会看到代码文本，不会启动网站。

| 情况 | 说明 |
|------|------|
| 微信里打开 GitHub | 只能浏览，**不能**双击运行 bat |
| 手机 | **不支持**，必须用 **Windows 电脑** |
| 正确做法 | 电脑浏览器打开仓库 → **Code → Download ZIP** → **解压** → 双击 **`启动网站.bat`** |

**前置条件：** 安装 [Node.js LTS](https://nodejs.org/)（安装后重启电脑更稳妥）。

更详细的图文步骤见仓库内 **[从GitHub使用说明.txt](./从GitHub使用说明.txt)**。

## GitHub Pages + 手机访问（你当前的方案）

页面地址示例：[https://hufelix765-alt.github.io/my-newpapers/](https://hufelix765-alt.github.io/my-newpapers/)

**热榜：** 推送到 GitHub 后，手机打开即可用（百度/微博/抖音/知乎浏览器直连；头条/B站/小红书由 Actions 每 2 小时同步 `hot-cache.json`）。**无需 Vercel 也能看热榜。**

**AI 概括 / 链接抓取（可选）：** 若要用云端 AI，再部署 [Vercel](https://vercel.com) 同一仓库，并在 **API 设置** 填写 `https://你的项目.vercel.app`，或在 `public/fwz-config.json` 配置 `apiBase`。

### 使用步骤

1. `git push` 到 GitHub，等 Pages 部署完成（约 1～3 分钟）
2. 微信分享：**https://hufelix765-alt.github.io/my-newpapers/**
3. 点 **全部热榜** 或各平台频道即可浏览
4. （可选）Vercel 部署 + 配置 `OPENAI_API_KEY` 后，在 **API 设置** 保存 Vercel 地址以启用 AI

---

## 手机 / 微信访问（纯 Vercel 版）

**手机无法运行 `.bat`**，也可只用 Vercel 一个链接（不用 GitHub Pages）。

### 一键部署（Vercel，免费）

1. 登录 [vercel.com](https://vercel.com)，用 GitHub 导入本仓库  
2. 直接点 **Deploy**（构建命令已配置：`node gen.mjs && next build`）  
3. 部署完成后在 **Settings → Environment Variables** 添加：  
   - `OPENAI_API_KEY`（必填，DeepSeek / Groq 等）  
   - 可选：`OPENAI_BASE_URL`、`OPENAI_MODEL`（见 `.env.example`）  
4. 重新部署一次  

**发给微信的链接：**

```text
https://你的项目名.vercel.app/app.html
```

根路径 `/` 会自动跳转到 `app.html`。更细说明见 **[手机使用说明.txt](./手机使用说明.txt)**。

| 使用场景 | 方式 |
|----------|------|
| Windows 本机 | 解压 ZIP → 双击 `启动网站.bat` |
| 手机 / 微信 | 打开 Vercel 在线链接，无需安装 |

**可转发给朋友的微信话术：**

> 请用 **Windows 电脑** 浏览器打开 GitHub 链接，点绿色 **Code** → **Download ZIP**，解压后双击 **启动网站.bat**（需先安装 Node.js）。不要在微信里直接点 bat，手机也用不了。

## 功能

- **获取文章**：今日头条、百度、微博、抖音、知乎、B站、小红书热榜；汽车 / 专利 / 其他干货分类
- **内容审核**：粘贴链接抓取正文，编辑标题与正文
- **AI 概括**：结论 → 分析（分条）→ 总结；支持 Groq、硅基流动、DeepSeek、通义等（OpenAI 兼容 API）
- **导出**：审核通过后一键跳转 DeepSeek、豆包、ChatGPT、Gemini，并复制 STAR 结构提示词

## Windows 快速使用（推荐）

| 文件 | 说明 |
|------|------|
| `启动网站.bat` | 安装依赖、生成页面、启动服务并打开浏览器 |
| `打开网页.bat` | 若服务未运行会自动拉起，再打开页面 |
| `配置API.bat` | 从 `.env.example` 创建 `.env.local` 并提示填写 Key |
| `安装开机自启.bat` | 登录后后台自动启动服务（本机，不进仓库） |

日常使用地址：**http://localhost:3000/app.html**

> 热榜、链接抓取、AI 概括需本地 Next 服务（`localhost:3000`），请勿仅用 `file://` 打开 `index.html`。

## 安装与启动

```bash
npm install
copy .env.example .env.local   # Windows；填入 OPENAI_API_KEY 等
npm run gen                    # client.js → index.html、public/app.html
npm run dev
```

浏览器打开 http://localhost:3000/app.html

也可双击 **`启动网站.bat`**，会自动执行上述步骤。

## 修改前端

1. 编辑 **`client.js`**（不要手改 `index.html`）
2. 运行 **`npm run gen`** 或重新运行 `启动网站.bat`

## 上传到 GitHub

**不会上传的内容（已在 `.gitignore`）：**

| 内容 | 说明 |
|------|------|
| `.env.local`、API 密钥 | 仅保留本机 |
| `node_modules`、`.next` | 克隆后 `npm install` |

**首次推送（在项目目录）：**

```bash
git init
git add .
git status                    # 确认没有 .env.local
git commit -m "Initial commit: 发文张热榜与内容审核"
git branch -M main
git remote add origin https://github.com/你的用户名/仓库名.git
git push -u origin main
```

**克隆后：**

1. `npm install`
2. `copy .env.example .env.local` 并填入密钥（或网页「设置」）
3. `npm run gen && npm run dev`，或双击 `启动网站.bat`

## 数据来源

热榜聚合（`lib/sources/hot/`）+ RSS；详见各平台接口与 `app/api/hot`。

## 技术栈

- Next.js 14 + TypeScript
- 单页工坊：`client.js` + `gen.mjs` → `public/app.html`
- OpenAI 兼容 API（概括 / 可选配图）

## 生产部署

```bash
npm run build
npm start
```

部署到 Vercel 时在环境变量中配置 `OPENAI_API_KEY`、`OPENAI_BASE_URL`（可选）。
