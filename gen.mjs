import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, 'index.html');
const publicPath = join(__dirname, 'public', 'app.html');

function buildHtml() {
  const parts = [];
  parts.push(`<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>发文张 - 各行各业中文精选</title>
<style>
:root{--ink:#1f2937;--paper:#e4e7ec;--surface:#f8f9fb;--accent:#c45c26;--sage:#5c7a6b;--muted:#6b7280;--border:#cfd4dc}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,"PingFang SC","Microsoft YaHei",sans-serif;background:var(--paper);color:var(--ink);line-height:1.6}
header{position:sticky;top:0;z-index:50;background:#f3f4f6;border-bottom:1px solid var(--border);padding:12px 20px}
.wrap{max-width:1680px;margin:0 auto}
.hdr{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px}
.logo b{font-size:1.2rem}
.logo small{display:block;color:var(--muted);font-size:.72rem}
.update-bar{font-size:.75rem;color:var(--muted);display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.update-bar button{padding:4px 10px;font-size:.75rem}
main.wrap{padding:12px 20px 36px}
.box{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:14px 16px;margin-bottom:0;box-shadow:0 1px 2px rgba(15,23,42,.04)}
h2{font-size:.95rem;margin-bottom:2px}
.panel-head{display:flex;align-items:baseline;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-bottom:6px}
.hint{font-size:.76rem;color:var(--muted);margin-bottom:8px;line-height:1.45}
.layout-main{display:grid;gap:16px;grid-template-columns:1fr;align-items:start}
@media(min-width:960px){
  .layout-main{grid-template-columns:minmax(300px,40%) minmax(360px,60%)}
  .panel-discover .list{max-height:calc(100vh - 200px)}
  .panel-workspace{position:sticky;top:68px;max-height:calc(100vh - 80px);display:flex;flex-direction:column}
  .review-pane{flex:1;min-height:0;overflow:auto}
}
@media(max-width:959px){
  .panel-discover .list{max-height:min(42vh,420px)}
  .layout-main{gap:12px}
  .tabs,.ch-tabs{gap:6px}
  .tab,.ch-tab{padding:6px 10px;font-size:.72rem}
  .hdr{flex-direction:column;align-items:flex-start}
  .editor-card textarea{min-height:min(38vh,280px)}
}
.panel-workspace .workspace-hint{margin-bottom:10px}
.review-toolbar{margin-bottom:8px}
.review-toolbar input{flex:1}
.review-layout{display:grid;gap:14px;grid-template-columns:1fr;min-height:min(52vh,420px)}
@media(min-width:640px){
  .review-layout{grid-template-columns:minmax(150px,188px) 1fr}
}
.review-aside{display:flex;flex-direction:column;gap:8px;font-size:.76rem}
.review-aside .hint{margin-bottom:4px;line-height:1.4}
.review-aside .ok{margin:0;padding:8px 10px;font-size:.74rem}
.review-main{min-width:0;display:flex;flex-direction:column}
.editor-card{flex:1;display:flex;flex-direction:column;background:linear-gradient(180deg,#eceef2 0%,#fff 55%);border:1px solid var(--border);border-radius:12px;padding:12px 14px;box-shadow:inset 0 1px 0 rgba(255,255,255,.6)}
.editor-card label.hint{margin:0 0 4px;font-weight:600;color:var(--ink);font-size:.74rem}
.editor-card input{margin-bottom:10px;font-size:.9rem}
.editor-card textarea{flex:1;min-height:min(42vh,360px);resize:vertical;line-height:1.55;font-size:.86rem}
.status-pill{display:inline-block;padding:3px 10px;border-radius:999px;font-size:.7rem;font-weight:600;background:#d8dce3;color:var(--muted)}
.status-pill.pass{background:#d1fae5;color:#065f46}
.ai-jump-row .btn-s{flex:1;min-width:64px;font-size:.7rem;padding:6px 8px}
.review-empty{display:flex;align-items:center;justify-content:center;min-height:200px;color:var(--muted);font-size:.85rem;text-align:center;padding:24px;border:1px dashed var(--border);border-radius:12px;background:#e9ecf1}
.card-row-hot .card-main{width:100%;padding:8px 10px}
.card-row-hot .card-main p{-webkit-line-clamp:1}
.card-row-hot .card-side{display:none}
.card-row-hot{margin-bottom:6px}
.panel-org #org{max-height:min(36vh,320px);overflow-y:auto}
.panel-img #img textarea,.panel-img #vidPrompt{max-height:min(22vh,200px)}
.media-tabs{display:flex;gap:6px;margin:8px 0 10px}
.media-tab{flex:1;padding:7px;border:1px solid var(--border);border-radius:8px;background:var(--paper);cursor:pointer;font-size:.8rem}
.media-tab.on{background:var(--ink);color:#fff;border-color:var(--ink)}
.vid-tools{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0}
.vid-tools label{font-size:.78rem;padding:6px 11px;border:1px solid var(--border);border-radius:8px;cursor:pointer}
.vid-tools input{display:none}
.vid-tools label.on{background:var(--accent);color:#fff;border-color:var(--accent)}
.panel-review textarea{min-height:88px}
.publish-row{scroll-margin-top:72px;margin-bottom:32px}
input,textarea,button,select{font:inherit}
input[type=text],textarea{width:100%;padding:8px 10px;border:1px solid var(--border);border-radius:8px;background:#fff}
textarea{min-height:120px;resize:vertical}
.btn{padding:8px 12px;border:none;border-radius:8px;cursor:pointer;font-weight:500;font-size:.82rem}
.btn-p{background:var(--accent);color:#fff}
.btn-d{background:var(--ink);color:#fff;width:100%}
.btn-g{background:var(--sage);color:#fff;width:100%}
.btn-o{background:var(--surface);border:1px solid var(--border)}
.btn-s{padding:5px 9px;font-size:.72rem}
.btn:disabled{opacity:.5;cursor:not-allowed}
.row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.tabs{display:flex;gap:5px;margin-top:10px;flex-wrap:wrap}
.tab{padding:5px 10px;border-radius:16px;border:1px solid var(--border);background:var(--paper);cursor:pointer;font-size:.76rem}
.tab.on{background:var(--accent);color:#fff;border-color:var(--accent)}
.ch-tabs{display:flex;gap:5px;margin:10px 0 6px;flex-wrap:wrap}
.ch-tab{padding:5px 11px;border-radius:16px;border:1px solid var(--border);background:var(--surface);cursor:pointer;font-size:.74rem}
.ch-tab:hover{border-color:var(--accent);color:var(--accent)}
.ch-tab.on{background:var(--ink);color:#fff;border-color:var(--ink)}
.discover-meta{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:8px 0 10px;flex-wrap:wrap}
.discover-meta .hint{margin:0}
.card-tags{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:6px;align-items:center}
.tag-rank{background:#1a1614;color:#fff;font-weight:600}
.tag-heat{background:#fff7ed;color:#c2410c;border:1px solid #fed7aa}
.tag-time{background:#f0f9ff;color:#0369a1;border:1px solid #bae6fd;font-size:.6rem}
.tag-sync{background:#eff6ff;color:#1d4ed8;border:1px solid #bfdbfe;font-size:.6rem}
.tag-pub{background:#f0fdf4;color:#15803d;border:1px solid #bbf7d0;font-size:.6rem}
.tag-update{background:#fff7ed;color:#c2410c;border:1px solid #fed7aa;font-size:.6rem}
.tag-warn{background:#fef2f2;color:#991b1b;border:1px dashed #fca5a5}
.list{overflow:auto}
.card-row{display:flex;gap:8px;margin-bottom:8px;align-items:stretch}
.card-main{flex:1;border:1px solid var(--border);border-radius:10px;padding:10px 12px;cursor:pointer;background:var(--surface);min-width:0}
.card-main:hover{border-color:var(--accent)}
.card-main.on{border-color:var(--accent);box-shadow:0 0 0 2px rgba(196,92,38,.2)}
.card-main h3{font-size:.88rem;margin:5px 0 3px;line-height:1.35}
.card-main p{font-size:.76rem;color:var(--muted);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.card-actions{display:flex;gap:10px;align-items:center;margin-top:8px;flex-wrap:wrap;position:relative;z-index:2}
.link-src{font-size:.72rem;color:var(--accent);text-decoration:none;font-weight:500;position:relative;z-index:3;pointer-events:auto}
.link-src:hover{text-decoration:underline}
.tag-niche{background:#dbeafe;color:#1e40af}
.tag-dry{background:#fef3c7;color:#92400e}
.tag-hot{background:#fee2e2;color:#991b1b}
.tag-new{background:#e0e7ff;color:#3730a3}
.tag-video{background:#fce7f3;color:#9d174d}
.tag-learn{background:#d1fae5;color:#065f46}
.tag-car{background:#e0f2fe;color:#0369a1}
.tag-car-int{background:#fef3c7;color:#92400e}
.tag-car-ext{background:#dbeafe;color:#1d4ed8}
.tag-car-seat{background:#ede9fe;color:#5b21b6}
.tag-pat{background:#ecfdf5;color:#047857}
.tag-pat-new{background:#fff7ed;color:#c2410c}
.card-side{width:108px;flex-shrink:0;border:1px solid var(--border);border-radius:10px;padding:8px;background:#eceef2;display:flex;flex-direction:column;gap:6px}
@media(max-width:1280px){.card-row{flex-direction:column}.card-side{width:100%;flex-direction:row;flex-wrap:wrap;align-items:center}.card-side .btn-s{width:auto}}
.card-side .btn-s{width:100%}
.sim-toggle{display:flex;align-items:center;gap:4px;font-size:.65rem;color:var(--muted);cursor:pointer}
.sim-toggle input{width:auto;margin:0}
.sim-list{font-size:.65rem;color:var(--muted);max-height:72px;overflow:auto;line-height:1.4}
.sim-list a{color:var(--accent);text-decoration:none;display:block;margin-top:3px}
.btn-fav-on{background:#fef3c7;border-color:#f59e0b;color:#92400e}
.btn-fav-on:hover{background:#fde68a}
.tag{font-size:.62rem;padding:2px 5px;border-radius:4px;background:#eee;margin-right:3px}
.tag-src{background:#fde8d8}
.tag-val{background:#d1fae5;color:#065f46}
.score{font-size:.65rem;color:var(--sage);margin-left:4px}
.lock{text-align:center;padding:20px;background:#fffbeb;border:1px solid #fde68a;border-radius:10px;color:#92400e;font-size:.88rem}
.empty{text-align:center;padding:28px;color:var(--muted);border:2px dashed var(--border);border-radius:10px;font-size:.88rem}
.ok{background:#ecfdf5;border:1px solid #a7f3d0;color:#065f46;padding:10px;border-radius:8px;font-size:.82rem;margin-bottom:10px}
.err{background:#fef2f2;border:1px solid #fecaca;color:#991b1b;padding:10px;border-radius:8px;margin-bottom:12px;font-size:.88rem}
.wc{display:flex;gap:6px;margin:10px 0}
.wc button{flex:1;padding:7px;border:1px solid var(--border);border-radius:6px;background:var(--paper);cursor:pointer;font-size:.82rem}
.wc button.on{background:var(--accent);color:#fff;border-color:var(--accent)}
.modal{position:fixed;inset:0;background:rgba(0,0,0,.35);display:none;align-items:center;justify-content:center;z-index:100;padding:16px}
.modal.show{display:flex}
.modal-box{background:var(--surface);border-radius:14px;padding:20px;width:100%;max-width:400px}
.imgs{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px}
.imgs img{width:100%;border-radius:8px}
.hidden{display:none!important}
.filter-bar{display:flex;gap:8px;align-items:center;margin-bottom:10px;flex-wrap:wrap}
.filter-bar label{font-size:.78rem;color:var(--muted);display:flex;align-items:center;gap:4px}
.publish-row{border:2px solid var(--accent);background:linear-gradient(180deg,#fff 0%,#fffbf7 100%);padding:16px 18px}
.publish-row h2{color:var(--accent)}
.zhihu-types{display:flex;gap:8px;flex-wrap:wrap;margin:10px 0}
.zhihu-types label{font-size:.8rem;padding:6px 12px;border:1px solid var(--border);border-radius:8px;cursor:pointer}
.zhihu-types input{display:none}
.zhihu-types label.on{background:var(--accent);color:#fff;border-color:var(--accent)}
.steps{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;font-size:.75rem}
.step{padding:4px 10px;border-radius:6px;background:#f0ebe4;color:var(--muted)}
.step.done{background:#d1fae5;color:#065f46}
.step.cur{background:var(--accent);color:#fff}
.preview-box{background:#eceef2;border:1px solid var(--border);border-radius:10px;padding:12px;max-height:200px;overflow:auto;font-size:.85rem;white-space:pre-wrap;margin:10px 0}
.org-draft{background:#eceef2;border:1px solid var(--border);border-radius:10px;padding:12px;margin-top:10px}
.org-draft p{font-size:.86rem;white-space:pre-wrap;max-height:min(32vh,280px);overflow:auto;line-height:1.55;margin:8px 0 0}
.org-draft b{font-size:.92rem;display:block}
.btn-zhihu{background:#0066ff;color:#fff;width:100%;font-size:.95rem;padding:12px;margin-top:6px}
.btn-zhihu:disabled{opacity:.5}
.pub-hist{margin-top:14px;border-top:1px solid var(--border);padding-top:12px}
.pub-hist h3{font-size:.85rem;margin-bottom:8px;color:var(--muted)}
.pub-item{font-size:.78rem;padding:8px 10px;background:#eceef2;border-radius:8px;margin-bottom:6px;border:1px solid var(--border)}
.pub-item b{display:block;margin-bottom:3px;color:var(--ink)}
.pub-item span{color:var(--muted)}
.fw-tabs{display:flex;gap:6px;margin:8px 0 10px}
.fw-tabs button{flex:1;padding:7px;border:1px solid var(--border);border-radius:8px;background:var(--paper);cursor:pointer;font-size:.78rem}
.fw-tabs button.on{background:var(--ink);color:#fff;border-color:var(--ink)}
.analyze-drop{border:2px dashed var(--border);border-radius:12px;padding:16px;text-align:center;background:#e9ecf1;margin:10px 0;cursor:pointer}
.analyze-drop:hover{border-color:var(--accent)}
.analyze-previews{display:flex;gap:8px;flex-wrap:wrap;margin:10px 0}
.analyze-previews img{max-width:120px;max-height:80px;border-radius:8px;border:1px solid var(--border)}
.analyze-result{background:#f0fdf4;border:1px solid #a7f3d0;padding:12px;border-radius:10px;font-size:.85rem;max-height:200px;overflow:auto;white-space:pre-wrap;margin:10px 0}
.modal-box.wide{max-width:640px;max-height:92vh;overflow:auto}
</style>
</head>
<body>
<header>
  <div class="wrap hdr">
    <div class="logo"><b>发文张</b><small>获取文章 · 发布</small></div>
    <div class="update-bar">
      <span id="nextUpdate">下次更新 --:--:--</span>
      <label class="sim-toggle"><input type="checkbox" id="globalAuto"/> 每2小时自动更新</label>
      <button class="btn btn-o btn-s" id="btnRefreshNow">立即更新</button>
      <button class="btn btn-o" id="btnAnalyze">素材分析</button>
      <button class="btn btn-o" id="btnSettings">API 设置</button>
    </div>
  </div>
</header>
<main class="wrap">
<div id="err" class="err hidden"></${'di'+'v'}>
<div id="ghOnlineTip" class="ok hidden" style="margin:0 0 10px;font-size:.75rem;line-height:1.55;padding:10px 12px;border-radius:8px">
  <b>热榜已直连</b>（百度/微博/抖音/知乎）。头条·B站·小红书每 2 小时自动同步。
  <button type="button" class="btn btn-o btn-s" id="ghBannerOpenApi" style="margin-left:6px;padding:4px 10px;font-size:.72rem">可选：配置 AI 接口</button>
</${'di'+'v'}>
<div id="ghSetupBanner" class="err hidden" style="margin:0 0 10px;font-size:.75rem;line-height:1.55;padding:10px 12px;border-radius:8px">
  <b>热榜未连接</b>：请刷新页面；若仍失败，在 <button type="button" class="btn btn-o btn-s" id="ghBannerOpenApi2" style="padding:4px 10px;font-size:.72rem">API 设置</button> 填写 Vercel 地址。
</div>
<div class="box">
  <div class="row">
    <input type="text" id="q" placeholder="搜索关键词，如：新车、专利、座椅、新能源…" style="flex:1"/>
    <button class="btn btn-p" id="btnSearch">搜索</button>
  </div>
  <div class="tabs" id="tabs">
    <button class="tab on" data-c="all">全部</button>
    <button class="tab" data-c="car">汽车</button>
    <button class="tab" data-c="patent">专利</button>
    <button class="tab" data-c="fun">趣事</button>
    <button class="tab" data-c="other">其他</button>
  </div>
</div>
<div class="layout-main">
  <section class="box panel-discover">
    <div class="panel-head"><h2>获取文章</h2><span class="hint" style="margin:0">热榜与资讯 · 点频道筛选</span></div>
    <div class="ch-tabs" id="chTabs">
      <button type="button" class="ch-tab on" data-ch="all">全部热榜</button>
      <button type="button" class="ch-tab" data-ch="toutiao">今日头条</button>
      <button type="button" class="ch-tab" data-ch="baidu">百度热搜</button>
      <button type="button" class="ch-tab" data-ch="weibo">微博</button>
      <button type="button" class="ch-tab" data-ch="douyin">抖音</button>
      <button type="button" class="ch-tab" data-ch="zhihu">知乎热榜</button>
      <button type="button" class="ch-tab" data-ch="bilibili">哔哩哔哩</button>
      <button type="button" class="ch-tab" data-ch="xiaohongshu">小红书</button>
      <button type="button" class="ch-tab" data-ch="wechat">公众号</button>
    </div>
    <div class="discover-meta">
      <span class="hint" id="cnt">加载中…</span>
      <div class="row" style="margin:0">
        <label id="onlyValuableWrap" style="display:none"><input type="checkbox" id="onlyValuable" checked/> RSS精选</label>
        <button type="button" class="btn btn-o btn-s" id="btnFavs">我的收藏</button>
      </div>
    </div>
    <div class="list" id="list"></div>
  </section>
  <section class="box panel-workspace">
    <h2>内容审核</h2>
    <p class="hint workspace-hint">左侧选选题 · 粘贴链接抓取 · 右侧编辑标题与正文</p>
    <div class="review-toolbar row">
      <input type="text" id="reviewUrl" placeholder="粘贴网页 / 微信公众号(mp.weixin.qq.com) / 知乎 / B站…"/>
      <button type="button" class="btn btn-p" id="btnFetchUrl">抓取链接</button>
    </div>
    <input type="file" id="file" class="hidden" accept=".txt,.md,.json,.csv,.html,.pdf"/>
    <button type="button" class="btn btn-o btn-s" style="margin-bottom:10px" id="btnUpload">上传本地文件</button>
    <div id="review" class="review-pane"></div>
  </section>
  <section class="box publish-row" hidden aria-hidden="true">
    <div id="zhSteps"></div><div id="pubPlats"></div><div id="zhTypes"></div><div id="xhsTypes"></div>
    <input type="text" id="zhihuQ" tabindex="-1"/><div id="publishArea"></div>
  </section>
</div>
</main>
<div class="modal" id="modal"><div class="modal-box" style="max-width:480px">
  <h2 style="margin-bottom:8px">API 设置</h2>
  <div class="ok" id="demoBanner" style="margin-bottom:10px">当前：<b>演示模式</b></div>
  <label class="sim-toggle" style="display:block;margin-bottom:8px"><input type="checkbox" id="useDemo" checked/> 演示模式（无 Key 时用本地规则）</label>
  <p class="hint" style="margin-bottom:8px;font-size:.72rem"><b>免费 Key 推荐：</b>点下面按钮自动填地址和模型，再去对应网站注册复制 Key</p>
  <div class="row" style="margin-bottom:6px;gap:5px;flex-wrap:wrap">
    <button type="button" class="btn btn-o btn-s" data-api-preset="groq">Groq 免费</button>
    <button type="button" class="btn btn-o btn-s" data-api-preset="siliconflow">硅基流动</button>
    <button type="button" class="btn btn-o btn-s" data-api-preset="openrouter">OpenRouter</button>
    <button type="button" class="btn btn-o btn-s" data-api-preset="deepseek">DeepSeek</button>
    <button type="button" class="btn btn-o btn-s" data-api-preset="dashscope">通义千问</button>
  </div>
  <div class="row" style="margin-bottom:8px"><button type="button" class="btn btn-o btn-s" id="btnTestApi">测试连接</button></div>
  <details style="margin-bottom:8px;font-size:.7rem;border:1px solid var(--border);border-radius:8px;padding:6px 10px">
    <summary style="cursor:pointer">免费平台注册地址</summary>
    <p class="hint" style="margin:6px 0 2px"><b>Groq</b> <a href="https://console.groq.com/keys" target="_blank" rel="noopener">console.groq.com</a> · Key: gsk_</p>
    <p class="hint" style="margin:2px 0"><b>硅基流动</b> <a href="https://cloud.siliconflow.cn/account/ak" target="_blank" rel="noopener">cloud.siliconflow.cn</a></p>
    <p class="hint" style="margin:2px 0"><b>OpenRouter</b> <a href="https://openrouter.ai/keys" target="_blank" rel="noopener">openrouter.ai</a></p>
    <p class="hint" style="margin:2px 0"><b>DeepSeek</b> <a href="https://platform.deepseek.com/api_keys" target="_blank" rel="noopener">platform.deepseek.com</a></p>
  </details>
  <label class="hint">API Key</label>
  <input type="password" id="apiKey" placeholder="粘贴注册获得的 Key（sk- 或 gsk_ 等）" style="margin:4px 0 8px"/>
  <label class="hint">API 基础地址</label>
  <input type="text" id="apiBase" placeholder="https://api.deepseek.com/v1" style="margin:4px 0 8px"/>
  <label class="hint">概括模型名</label>
  <input type="text" id="orgModel" placeholder="deepseek-chat" style="margin:4px 0 10px"/>
  <hr style="margin:12px 0;border:none;border-top:1px solid var(--border)"/>
  <p class="hint" style="margin-bottom:6px"><b>豆包配图</b>（火山方舟，无水印高清图）</p>
  <label class="hint">豆包 API Key</label>
  <input type="password" id="doubaoKey" placeholder="火山方舟 API Key" style="margin:4px 0 8px"/>
  <label class="hint">豆包接口地址</label>
  <input type="text" id="doubaoEp" placeholder="https://ark.cn-beijing.volces.com/api/v3" style="margin:4px 0 8px"/>
  <label class="hint">豆包模型（文生图）</label>
  <input type="text" id="doubaoModel" placeholder="doubao-seedream-4-0-250828" style="margin:4px 0 10px"/>
  <p class="hint" style="font-size:.72rem">概括用 API；配图请用 ChatGPT 生图（见「生成配图」）</p>
  <hr style="margin:12px 0;border:none;border-top:1px solid var(--border)"/>
  <p class="hint" style="margin-bottom:6px"><b>七大平台热榜</b>（GitHub 在线页必填 Vercel 地址）</p>
  <motion.div id="ghApiTip" class="err hidden" style="margin-bottom:8px;font-size:.72rem;line-height:1.5">
    手机/GitHub 页需先部署 Vercel：① <a id="ghVercelLink" href="https://vercel.com" target="_blank" rel="noopener">打开 Vercel 部署</a>（Import 本仓库）② 复制 https://xxx.vercel.app ③ 粘贴到下方 ④ 点保存
  </${'di'+'v'}>
  <label class="hint">热榜服务地址</label>
  <input type="text" id="hotApi" placeholder="https://my-newpapers.vercel.app" style="margin:4px 0 10px"/>
  <p class="hint" style="font-size:.72rem">本地电脑用 http://localhost:3000；手机/微信用 Vercel 的 https 地址</p>
  <div class="row"><button class="btn btn-o" id="btnClose">关闭</button><button class="btn btn-p" id="btnSave">保存</button></div>
</div></div>
<div class="modal" id="analyzeModal"><div class="modal-box wide">
  <h2 style="margin-bottom:6px">素材分析</h2>
  <p class="hint">下载的视频/网页/带视频的文章：在此提炼可学习的干货，整理成科普文章后导入「内容审核」</p>
  <label class="hint">网页 / 视频链接</label>
  <input type="text" id="analyzeUrl" placeholder="https:// 文章、B站、知乎、新闻链接…" style="margin-bottom:8px"/>
  <label class="hint">补充说明（可选）</label>
  <textarea id="analyzeNote" placeholder="例如：这是 B 站个税科普视频，重点整理 7 项专项附加扣除…" style="min-height:60px;margin-bottom:8px"></textarea>
  <div class="analyze-drop" id="analyzeDrop">点击或拖拽上传：图片 / PDF / Word / 文本 / 视频文件</div>
  <input type="file" id="analyzeFiles" class="hidden" multiple accept="image/*,.pdf,.md,.html,.mp4,.mov,.webm,.txt,.doc,.docx"/>
  <div class="analyze-previews" id="analyzePreviews"></div>
  <div id="analyzeResult" class="analyze-result hidden"></div>
  <div class="row" style="margin-top:12px">
    <button class="btn btn-o" id="btnAnalyzeClose">关闭</button>
    <button class="btn btn-p" id="btnAnalyzeRun">开始分析</button>
    <button class="btn btn-p" id="btnAnalyzeImport" style="display:none">导入到内容审核</button>
  </div>
</motion></motion>`);

  parts.push(buildScript());
  parts.push(`\n</body>\n</html>`);
  let html = parts.join('');
  const mot = 'mot' + 'ion';
  html = html.split('<' + mot).join('<div').split('</' + mot + '>').join('</div>');
  return html;
}

function buildScript() {
  let code = readFileSync(join(__dirname, 'client.js'), 'utf8');
  code = code.replace(/<\/script/gi, '<\\/script');
  const cachePath = join(__dirname, 'public', 'hot-cache.json');
  let bundle = 'null';
  try {
    bundle = readFileSync(cachePath, 'utf8').trim();
    JSON.parse(bundle);
    bundle = bundle.replace(/<\/script/gi, '<\\/script');
  } catch {
    bundle = 'null';
  }
  return (
    '<script>\nconst EMBEDDED_HOT_BUNDLE=' +
    bundle +
    ';\n' +
    code +
    '\n</script>'
  );
}
const html = buildHtml();
writeFileSync(outPath, html, 'utf8');
mkdirSync(join(__dirname, 'public'), { recursive: true });
writeFileSync(publicPath, html, 'utf8');
const ghCfg = join(__dirname, 'public', 'fwz-config.json');
if (readFileSync(ghCfg, 'utf8')) {
  writeFileSync(join(__dirname, 'fwz-config.json'), readFileSync(ghCfg, 'utf8'), 'utf8');
}
console.log('Wrote', outPath, 'and', publicPath);
