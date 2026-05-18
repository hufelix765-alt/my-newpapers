# 发文张 · 热榜选题与内容审核

一站式中文内容工具：多平台热榜选题 → 链接抓取 / 审阅 → AI 结构化概括 → 导出到 DeepSeek / 豆包等。

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
