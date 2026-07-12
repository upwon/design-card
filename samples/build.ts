#!/usr/bin/env bun
/**
 * 主题生成器 —— design-card 主题系统的**唯一真相源**。
 * 修改/新增主题只改下面的 THEMES 数组，然后重跑本脚本 + 截图脚本。
 *
 * 本脚本会生成：
 *   - samples/<id>.html          每套主题一张 1080×1080 预览卡
 *   - samples/_montage.html       全部主题的总览拼图（→ assets/theme-overview.png）
 *   - samples/index.html          本地可浏览的预览索引页
 *   - references/THEMES.tokens.md  全部主题的 :root token 速查（供技能贴用）
 *
 * 用法：
 *   bun samples/build.ts
 *   for f in samples/*.html; do bun scripts/screenshot.ts "$f" "${f%.html}.png" 1080 1080; done
 *   bun scripts/screenshot.ts samples/_montage.html assets/theme-overview.png 2200 --full-page
 */
import { writeFileSync } from 'fs';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const SAMPLES_DIR = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(SAMPLES_DIR, '..');

type Group = 'native' | 'brand';
type Theme = {
  id: string;
  nameZh: string;    // 卡片大标题
  mood: string;      // 一句气质 / 适用（含明暗与灵感来源）
  dark: boolean;
  group: Group;
  root: string;      // :root {} 内容（不含大括号）
  four?: boolean;    // 四色特例（google-multi）：走 cardMulti 模板，root 额外含 --g-blue/red/yellow/green
};

// ── 主题定义（唯一真相源）─────────────────────────────────────────
// 品牌灵感主题：仅借配色，不含商标/字体；名称仅作气质标识。
// 深色主题的 --ds 用「抬升块」（比底稍亮）以免与近黑底融为一体。
const THEMES: Theme[] = [
  // ── 原生编辑主题（8）──
  { id: 'claude', nameZh: '陶土', mood: '暖陶土编辑感 · 默认 · 通用', dark: false, group: 'native',
    root: '--pg:#f5f4ed;--iv:#faf9f5;--nk:#141413;--ds:#30302e;--tc:#c96442;--og:#5e5d59;--sg:#87867f;--bc:#f0eee6;--bw:#e8e6dc;--ws:#b0aea5;' },
  { id: 'newsroom', nameZh: '报刊', mood: '报纸奶油 + 旗红 · 新闻 · 评论', dark: false, group: 'native',
    root: '--pg:#f1ebd8;--iv:#f8f3e2;--nk:#14110b;--ds:#201a10;--tc:#c8260d;--og:#5e564a;--sg:#8c8473;--bc:#ebe3cc;--bw:#ddd3b8;--ws:#e8dfc6;' },
  { id: 'indigo', nameZh: '靛蓝', mood: '靛蓝当墨 + 瓷白 · 研究 · 分析', dark: false, group: 'native',
    root: '--pg:#f1f3f5;--iv:#f8fafc;--nk:#0a1f3d;--ds:#0a1f3d;--tc:#1e3a8a;--og:#4a5a78;--sg:#8595ad;--bc:#e7ebef;--bw:#d3dae2;--ws:#e4e8ec;' },
  { id: 'forest', nameZh: '森林墨', mood: '森林绿当墨 + 象牙纸 · 自然 · 健康', dark: false, group: 'native',
    root: '--pg:#f5f1e8;--iv:#faf7ee;--nk:#1a2e1f;--ds:#1a2e1f;--tc:#4d7a4d;--og:#5c6a5e;--sg:#909a92;--bc:#ebe7d8;--bw:#d6cfb8;--ws:#ece7da;' },
  { id: 'kraft', nameZh: '牛皮纸', mood: '深棕墨 + 牛皮米 + 铜锈 · 手作 · 复古', dark: false, group: 'native',
    root: '--pg:#eedfc7;--iv:#f3e9d6;--nk:#2a1e13;--ds:#2a1e13;--tc:#a35b2a;--og:#6e5a40;--sg:#a08c70;--bc:#e0d0b6;--bw:#cdba9a;--ws:#f3e9d6;' },
  { id: 'dune', nameZh: '沙丘', mood: '炭褐墨 + 沙底 · 建筑 · 极简', dark: false, group: 'native',
    root: '--pg:#f0e6d2;--iv:#f6ecd9;--nk:#1f1a14;--ds:#1f1a14;--tc:#8c6a48;--og:#6b5c46;--sg:#9a8c70;--bc:#e3d7bf;--bw:#d0c1a0;--ws:#f0e6d2;' },
  { id: 'midnight', nameZh: '午夜', mood: 'espresso 深底 + 火热橙 · 强传播 · 争议', dark: true, group: 'native',
    root: '--pg:#1a1714;--iv:#231f1a;--nk:#f5f0e5;--ds:#0d0b09;--tc:#ff4a2b;--og:#ece4d2;--sg:#7a7972;--bc:#2f2a25;--bw:#3a342d;--ws:#ece4d2;' },
  { id: 'blueprint', nameZh: '蓝图', mood: '深海军底 + 电光青 · 技术 · 数据', dark: true, group: 'native',
    root: '--pg:#0e1a2e;--iv:#142441;--nk:#d6e5ff;--ds:#0a1224;--tc:#4dd2ff;--og:#a8c2f0;--sg:#6c89b8;--bc:#1c2f54;--bw:#274069;--ws:#d6e5ff;' },

  // ── 品牌灵感主题 · 明暗成对（26）──
  { id: 'figma', nameZh: '洋红', mood: '白画布 + 洋红 · 设计 · 产品（灵感 Figma · 浅）', dark: false, group: 'brand',
    root: '--pg:#f7f7f5;--iv:#ffffff;--nk:#000000;--ds:#1f1d3d;--tc:#ff3d8b;--og:#55555e;--sg:#8a8a90;--bc:#f1f1f1;--bw:#e6e6e6;--ws:#f7f7f5;' },
  { id: 'figma-dark', nameZh: '洋红', mood: '深紫底 + 洋红 · 设计 · 产品（灵感 Figma · 深）', dark: true, group: 'brand',
    root: '--pg:#161522;--iv:#221f30;--nk:#ffffff;--ds:#0e0d18;--tc:#ff3d8b;--og:#b5b2c0;--sg:#7d7a88;--bc:#2b2940;--bw:#37344d;--ws:#eceaf5;' },
  { id: 'apple', nameZh: '晨灰', mood: '冷灰极简 + Action Blue · 产品 · 科技（灵感 Apple · 浅）', dark: false, group: 'brand',
    root: '--pg:#f5f5f7;--iv:#ffffff;--nk:#1d1d1f;--ds:#1d1d1f;--tc:#0066cc;--og:#6e6e73;--sg:#86868b;--bc:#f0f0f2;--bw:#e0e0e0;--ws:#f5f5f7;' },
  { id: 'apple-dark', nameZh: '暗灰', mood: '纯黑 + Sky Blue · 产品 · 科技（灵感 Apple · 深）', dark: true, group: 'brand',
    root: '--pg:#000000;--iv:#1d1d1f;--nk:#f5f5f7;--ds:#2a2a2c;--tc:#2997ff;--og:#a1a1a6;--sg:#6e6e73;--bc:#252527;--bw:#333335;--ws:#f5f5f7;' },
  { id: 'notion', nameZh: '素笺', mood: '暖白极简 + 靛紫 · 效率 · 文档（灵感 Notion · 浅）', dark: false, group: 'brand',
    root: '--pg:#fafaf9;--iv:#ffffff;--nk:#1a1a1a;--ds:#2a2825;--tc:#5645d4;--og:#5a5852;--sg:#a4a097;--bc:#ede9e4;--bw:#e5e3df;--ws:#fafaf9;' },
  { id: 'notion-dark', nameZh: '墨笺', mood: '暖黑 + 亮靛紫 · 效率 · 文档（灵感 Notion · 深）', dark: true, group: 'brand',
    root: '--pg:#191919;--iv:#252523;--nk:#f5f4f2;--ds:#0f0f0e;--tc:#8a7cf0;--og:#b0aea8;--sg:#7a7770;--bc:#2e2e2c;--bw:#3a3a37;--ws:#ecebe8;' },
  { id: 'vercel-light', nameZh: '净白', mood: '净白 + 电光蓝 · 开发 · 部署（灵感 Vercel · 浅）', dark: false, group: 'brand',
    root: '--pg:#fafafa;--iv:#ffffff;--nk:#000000;--ds:#171717;--tc:#0070f3;--og:#666666;--sg:#999999;--bc:#eaeaea;--bw:#e0e0e0;--ws:#fafafa;' },
  { id: 'vercel', nameZh: '纯黑', mood: '纯黑 + 电光蓝 · 开发 · 部署（灵感 Vercel · 深）', dark: true, group: 'brand',
    root: '--pg:#0a0a0a;--iv:#171717;--nk:#fafafa;--ds:#1c1c1c;--tc:#0070f3;--og:#a1a1a1;--sg:#707070;--bc:#262626;--bw:#333333;--ws:#ededed;' },
  { id: 'linear-light', nameZh: '霜紫', mood: '霜白 + 靛紫 · 工具 · 极简（灵感 Linear · 浅）', dark: false, group: 'brand',
    root: '--pg:#f9f9fb;--iv:#ffffff;--nk:#08090a;--ds:#1a1c24;--tc:#5e6ad2;--og:#5a5f70;--sg:#8a8f9e;--bc:#eceef1;--bw:#e1e3e8;--ws:#f9f9fb;' },
  { id: 'linear', nameZh: '靛紫', mood: '近黑 + 靛紫 · 工具 · 极简（灵感 Linear · 深）', dark: true, group: 'brand',
    root: '--pg:#08090a;--iv:#141516;--nk:#f7f8f8;--ds:#1a1c24;--tc:#5e6ad2;--og:#b4b8c4;--sg:#6f7280;--bc:#1f2023;--bw:#2b2d31;--ws:#eceef2;' },
  { id: 'spotify-light', nameZh: '浅绿', mood: '净白 + 森野绿 · 音乐 · 传播（灵感 Spotify · 浅）', dark: false, group: 'brand',
    root: '--pg:#f7f7f5;--iv:#ffffff;--nk:#121212;--ds:#191414;--tc:#12a350;--og:#535353;--sg:#8a8a8a;--bc:#eeeeec;--bw:#e5e5e3;--ws:#f0f0ee;' },
  { id: 'spotify', nameZh: '霓绿', mood: '深灰 + 霓虹绿 · 音乐 · 传播（灵感 Spotify · 深）', dark: true, group: 'brand',
    root: '--pg:#121212;--iv:#1f1f1f;--nk:#ffffff;--ds:#282828;--tc:#1ed760;--og:#b3b3b3;--sg:#7c7c7c;--bc:#2a2a2a;--bw:#383838;--ws:#eeeeee;' },
  { id: 'airbnb', nameZh: '玫红', mood: '净白 + 玫红 · 消费 · 生活（灵感 Airbnb · 浅）', dark: false, group: 'brand',
    root: '--pg:#fafafa;--iv:#ffffff;--nk:#222222;--ds:#222222;--tc:#ff385c;--og:#5e5e5e;--sg:#949494;--bc:#f0f0f0;--bw:#ebebeb;--ws:#fafafa;' },
  { id: 'airbnb-dark', nameZh: '暗玫', mood: '暖黑 + 亮玫红 · 消费 · 生活（灵感 Airbnb · 深）', dark: true, group: 'brand',
    root: '--pg:#1a1516;--iv:#262022;--nk:#ffffff;--ds:#0f0b0c;--tc:#ff5a70;--og:#b3adae;--sg:#7c7678;--bc:#2e2829;--bw:#3a3335;--ws:#ededed;' },
  { id: 'stripe', nameZh: '品紫', mood: '冷白 + 靛紫 · 支付 · SaaS（灵感 Stripe · 浅）', dark: false, group: 'brand',
    root: '--pg:#f6f9fc;--iv:#ffffff;--nk:#0a2540;--ds:#0a2540;--tc:#635bff;--og:#425466;--sg:#8792a2;--bc:#e6ebf1;--bw:#d5dce5;--ws:#f6f9fc;' },
  { id: 'stripe-dark', nameZh: '暗紫', mood: '深海军 + 亮紫 · 支付 · SaaS（灵感 Stripe · 深）', dark: true, group: 'brand',
    root: '--pg:#0a1a2f;--iv:#122a47;--nk:#f6f9fc;--ds:#061020;--tc:#7a73ff;--og:#a8b7c9;--sg:#6b7f96;--bc:#1a3350;--bw:#25436a;--ws:#dce6f0;' },
  { id: 'cursor', nameZh: '烈橙', mood: '暖奶油 + 烈橙 · 开发 · 工具（灵感 Cursor · 浅）', dark: false, group: 'brand',
    root: '--pg:#f7f7f4;--iv:#ffffff;--nk:#26251e;--ds:#26251e;--tc:#f54e00;--og:#5c5a4e;--sg:#918f80;--bc:#eceae3;--bw:#e6e5e0;--ws:#f7f7f4;' },
  { id: 'cursor-dark', nameZh: '暗橙', mood: '暖黑 + 亮橙 · 开发 · 工具（灵感 Cursor · 深）', dark: true, group: 'brand',
    root: '--pg:#1a1917;--iv:#26251e;--nk:#f7f7f4;--ds:#0f0e0c;--tc:#ff6a2b;--og:#b0aea0;--sg:#7a7768;--bc:#2c2b26;--bw:#38362f;--ws:#e6e5df;' },
  { id: 'coinbase', nameZh: '湛蓝', mood: '净白 + 湛蓝 · 金融 · 机构（灵感 Coinbase · 浅）', dark: false, group: 'brand',
    root: '--pg:#f7f7f7;--iv:#ffffff;--nk:#0a0b0d;--ds:#0a0b0d;--tc:#0052ff;--og:#5b616e;--sg:#8a919e;--bc:#eef0f3;--bw:#e3e6ea;--ws:#f7f7f7;' },
  { id: 'coinbase-dark', nameZh: '暗蓝', mood: '近黑 + 亮蓝 · 金融 · 机构（灵感 Coinbase · 深）', dark: true, group: 'brand',
    root: '--pg:#0a0b0d;--iv:#141519;--nk:#ffffff;--ds:#1b1d22;--tc:#3c7dff;--og:#a5abb6;--sg:#6b7280;--bc:#22242a;--bw:#2e3138;--ws:#e5e7ea;' },
  { id: 'calcom', nameZh: '墨白', mood: '黑白单色极简 · 通用 · 开源（灵感 Cal.com · 浅）', dark: false, group: 'brand',
    root: '--pg:#f9f9f9;--iv:#ffffff;--nk:#18181b;--ds:#18181b;--tc:#18181b;--og:#71717a;--sg:#a1a1aa;--bc:#f0f0f0;--bw:#e4e4e7;--ws:#f9f9f9;' },
  { id: 'calcom-dark', nameZh: '玄墨', mood: '纯黑单色极简 · 通用 · 开源（灵感 Cal.com · 深）', dark: true, group: 'brand',
    root: '--pg:#0a0a0a;--iv:#18181b;--nk:#fafafa;--ds:#1c1c1f;--tc:#fafafa;--og:#a1a1aa;--sg:#6b6b70;--bc:#26262a;--bw:#333338;--ws:#e4e4e7;' },
  { id: 'airtable', nameZh: '湖蓝', mood: '净白 + 湖蓝 · 数据 · 协作（灵感 Airtable · 浅）', dark: false, group: 'brand',
    root: '--pg:#fbfbfc;--iv:#ffffff;--nk:#1d1f25;--ds:#1d1f25;--tc:#2d7ff9;--og:#616670;--sg:#9599a3;--bc:#f0f1f3;--bw:#e6e7ea;--ws:#fbfbfc;' },
  { id: 'airtable-dark', nameZh: '暗湖', mood: '近黑 + 亮湖蓝 · 数据 · 协作（灵感 Airtable · 深）', dark: true, group: 'brand',
    root: '--pg:#0e1013;--iv:#1a1d22;--nk:#ffffff;--ds:#22262d;--tc:#4a90ff;--og:#a2a7b2;--sg:#6a6f79;--bc:#242830;--bw:#30353e;--ws:#e8eaed;' },
  { id: 'minimax-light', nameZh: '珊瑚', mood: '净白 + 珊瑚 · AI · 传播（灵感 MiniMax · 浅）', dark: false, group: 'brand',
    root: '--pg:#fafafa;--iv:#ffffff;--nk:#0a0a0a;--ds:#0a0a0a;--tc:#ff5530;--og:#5e5e5e;--sg:#949494;--bc:#f0f0f0;--bw:#e8e8e8;--ws:#fafafa;' },
  { id: 'minimax', nameZh: '珊黑', mood: '纯黑 + 珊瑚 · AI · 传播（灵感 MiniMax · 深）', dark: true, group: 'brand',
    root: '--pg:#0a0a0a;--iv:#181e25;--nk:#ffffff;--ds:#1c2029;--tc:#ff5530;--og:#a0a3a8;--sg:#6a6d72;--bc:#22262d;--bw:#2e333b;--ws:#e8e8ea;' },
  { id: 'google', nameZh: '谷蓝', mood: '净白 + 谷歌蓝 · 搜索 · 大众（灵感 Google · 浅）', dark: false, group: 'brand',
    root: '--pg:#f8f9fa;--iv:#ffffff;--nk:#202124;--ds:#202124;--tc:#4285f4;--og:#5f6368;--sg:#9aa0a6;--bc:#f1f3f4;--bw:#e8eaed;--ws:#f8f9fa;' },
  { id: 'google-dark', nameZh: '谷夜', mood: '石墨底 + 亮谷蓝 · 搜索 · 大众（灵感 Google · 深）', dark: true, group: 'brand',
    root: '--pg:#202124;--iv:#292a2d;--nk:#e8eaed;--ds:#171717;--tc:#8ab4f8;--og:#bdc1c6;--sg:#80868b;--bc:#303134;--bw:#3c4043;--ws:#e8eaed;' },

  // ── 四色特例（1）：突破单强调色，蓝红黄绿轮转 ──
  { id: 'google-multi', nameZh: '谷彩', mood: '净白 + 蓝红黄绿四色轮转 · 大众 · 活泼（灵感 Google · 四色特例）', dark: false, group: 'brand', four: true,
    root: '--pg:#ffffff;--iv:#f8f9fa;--nk:#202124;--ds:#202124;--ws:#f8f9fa;--og:#5f6368;--sg:#9aa0a6;--bc:#f1f3f4;--bw:#e8eaed;--g-blue:#4285f4;--g-red:#ea4335;--g-yellow:#fbbc05;--g-green:#34a853;--tc:var(--g-blue);' },
];

// ── 从 root 解析某个 token 的 hex ──
function hexOf(root: string, token: string): string {
  const m = root.match(new RegExp(`${token}:\\s*(#[0-9a-fA-F]{3,8})`));
  return m ? m[1] : '';
}
const SWATCH_TOKENS = ['--pg', '--nk', '--tc', '--ds'] as const;

// ── 1b) 四色特例卡（google-multi）──
function cardMulti(t: Theme): string {
  return `<!-- theme: ${t.id} -->
<!doctype html><html lang="zh"><head><meta charset="utf-8"><style>
:root{${t.root}}
*{margin:0;box-sizing:border-box}
.card{width:1080px;height:1080px;background:var(--pg);color:var(--nk);
  font-family:-apple-system,system-ui,"PingFang SC","Microsoft YaHei",sans-serif;
  padding:88px 84px;display:flex;flex-direction:column}
.top{display:flex;justify-content:space-between;align-items:baseline}
.kicker{font-size:19px;letter-spacing:3px;text-transform:uppercase;color:var(--sg)}
.idx{font-size:19px;letter-spacing:2px;color:var(--sg)}
.name{font-family:Georgia,"Times New Roman",serif;font-weight:500;font-size:150px;line-height:1.0;letter-spacing:-2px;margin-top:36px}
.name .a{color:var(--g-blue)} .name .d{color:var(--g-green)} .name em{font-style:normal;color:var(--g-blue)}
.id{font-family:ui-monospace,Menlo,monospace;font-size:38px;color:var(--og);margin-top:16px;letter-spacing:1px}
.dots{display:flex;gap:16px;margin-top:30px}
.dot{width:34px;height:34px;border-radius:50%}
.mood{font-size:27px;line-height:1.5;color:var(--og);margin-top:30px;max-width:880px}
.spacer{flex:1}
.multiline{display:flex;height:6px;border-radius:3px;overflow:hidden;margin:0 0 30px}
.multiline i{flex:1}
.band{background:var(--ds);border-radius:8px;padding:26px 30px;font-size:22px;color:var(--ws);display:flex;justify-content:space-between;align-items:center}
.band .g{font-family:ui-monospace,Menlo,monospace;font-weight:600;letter-spacing:.5px}
.band .g span:nth-child(1){color:var(--g-blue)} .band .g span:nth-child(2){color:var(--g-red)}
.band .g span:nth-child(3){color:var(--g-yellow)} .band .g span:nth-child(4){color:var(--g-blue)}
.band .g span:nth-child(5){color:var(--g-green)} .band .g span:nth-child(6){color:var(--g-red)}
.swatches{display:flex;gap:22px;margin-top:30px}
.sw{flex:1}
.chip{height:96px;border-radius:8px}
.tk{font-size:19px;margin-top:14px;font-family:ui-monospace,Menlo,monospace}
.hx{font-size:16px;color:var(--sg);font-family:ui-monospace,Menlo,monospace;margin-top:3px}
.foot{font-size:18px;color:var(--sg);margin-top:34px}
</style></head><body>
<div class="card">
  <div class="top"><div class="kicker">design-card · theme</div><div class="idx">浅色 · 四色特例</div></div>
  <div class="name"><span class="a">谷</span><span class="d">彩</span><em>.</em></div>
  <div class="id">${t.id}</div>
  <div class="dots">
    <div class="dot" style="background:var(--g-blue)"></div><div class="dot" style="background:var(--g-red)"></div>
    <div class="dot" style="background:var(--g-yellow)"></div><div class="dot" style="background:var(--g-green)"></div>
  </div>
  <div class="mood">突破单强调色：蓝红黄绿四色轮转，用在标题字、圆点、分节线与标签，底/墨仍是 Google 净白系。</div>
  <div class="spacer"></div>
  <div class="multiline"><i style="background:var(--g-blue)"></i><i style="background:var(--g-red)"></i><i style="background:var(--g-yellow)"></i><i style="background:var(--g-green)"></i></div>
  <div class="band"><span>四色轮转 · 底墨不变 · 深块仍 --ds + --ws 浅字</span><span class="g"><span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span></span></div>
  <div class="swatches">
    <div class="sw"><div class="chip" style="background:var(--g-blue)"></div><div class="tk">blue</div><div class="hx">#4285f4</div></div>
    <div class="sw"><div class="chip" style="background:var(--g-red)"></div><div class="tk">red</div><div class="hx">#ea4335</div></div>
    <div class="sw"><div class="chip" style="background:var(--g-yellow)"></div><div class="tk">yellow</div><div class="hx">#fbbc05</div></div>
    <div class="sw"><div class="chip" style="background:var(--g-green)"></div><div class="tk">green</div><div class="hx">#34a853</div></div>
  </div>
  <div class="foot">四色特例 · 底/墨走 Google 净白系 · references/THEMES.md</div>
</div>
</body></html>`;
}

// ── 1) 单张主题预览卡 ──
function card(t: Theme): string {
  const swatches = SWATCH_TOKENS.map((tok) => {
    const hex = hexOf(t.root, tok);
    const ring = tok === '--pg' || tok === '--iv' ? 'box-shadow:inset 0 0 0 1px var(--bw);' : '';
    return `<div class="sw"><div class="chip" style="background:${hex};${ring}"></div><div class="tk">${tok}</div><div class="hx">${hex}</div></div>`;
  }).join('');
  return `<!-- theme: ${t.id} -->
<!doctype html><html lang="zh"><head><meta charset="utf-8"><style>
:root{${t.root}}
*{margin:0;box-sizing:border-box}
.card{width:1080px;height:1080px;background:var(--pg);color:var(--nk);
  font-family:-apple-system,system-ui,"PingFang SC","Microsoft YaHei",sans-serif;
  padding:88px 84px;display:flex;flex-direction:column}
.top{display:flex;justify-content:space-between;align-items:baseline}
.kicker{font-size:19px;letter-spacing:3px;text-transform:uppercase;color:var(--sg)}
.idx{font-size:19px;letter-spacing:2px;color:var(--sg);font-variant-numeric:tabular-nums}
.name{font-family:Georgia,"Times New Roman",serif;font-weight:500;font-size:150px;line-height:1.0;letter-spacing:-2px;margin-top:40px}
.name em{font-style:normal;color:var(--tc)}
.id{font-family:ui-monospace,Menlo,monospace;font-size:38px;color:var(--tc);margin-top:16px;letter-spacing:1px}
.mood{font-size:27px;line-height:1.5;color:var(--og);margin-top:26px;max-width:880px}
.spacer{flex:1}
.band{background:var(--ds);color:var(--ws);border-radius:6px;padding:26px 30px;font-size:22px;display:flex;justify-content:space-between;align-items:center}
.band b{color:var(--tc);font-family:ui-monospace,Menlo,monospace;font-weight:500}
.rule{height:1px;background:var(--bw);margin:34px 0 30px}
.swatches{display:flex;gap:22px}
.sw{flex:1}
.chip{height:96px;border-radius:6px}
.tk{font-size:20px;margin-top:14px;color:var(--nk);font-family:ui-monospace,Menlo,monospace}
.hx{font-size:17px;color:var(--sg);font-family:ui-monospace,Menlo,monospace;margin-top:3px}
.foot{font-size:18px;color:var(--sg);margin-top:38px}
</style></head><body>
<div class="card">
  <div class="top"><div class="kicker">design-card · theme</div><div class="idx">${t.dark ? '深色主题' : '浅色主题'}</div></div>
  <div class="name">${t.nameZh}<em>.</em></div>
  <div class="id">${t.id}</div>
  <div class="mood">${t.mood}</div>
  <div class="spacer"></div>
  <div class="band"><span>--ds 恒深 · --ws 恒浅，深色头部在每套主题都成立</span><b>${t.id}</b></div>
  <div class="rule"></div>
  <div class="swatches">${swatches}</div>
  <div class="foot">同一份模板，只替换 :root token 块 · references/THEMES.md</div>
</div>
</body></html>`;
}

// ── 2) 总览拼图 ──
function montage(): string {
  const cells = THEMES.map((t) =>
    `<div class="cell"><img src="${t.id}.png"><div class="cap"><span class="id">${t.id}</span><span class="zh">${t.nameZh}${t.dark ? '·深' : ''}</span></div></div>`
  ).join('\n    ');
  return `<!doctype html><html lang="zh"><head><meta charset="utf-8"><style>
*{margin:0;box-sizing:border-box}
body{background:#f5f4ed;font-family:-apple-system,system-ui,"PingFang SC",sans-serif}
.wrap{width:2200px;padding:64px}
.head{display:flex;justify-content:space-between;align-items:baseline;padding:0 8px 40px}
.title{font-family:Georgia,serif;font-weight:500;font-size:64px;color:#141413;letter-spacing:-1px}
.title em{font-style:normal;color:#c96442}
.sub{font-size:26px;color:#87867f;letter-spacing:1px}
.grid{display:flex;flex-wrap:wrap;justify-content:center;gap:36px}
.cell{width:491px;background:#faf9f5;border-radius:12px;overflow:hidden;box-shadow:0 0 0 1px rgba(0,0,0,.06)}
.cell img{display:block;width:100%}
.cap{padding:18px 20px;display:flex;justify-content:space-between;align-items:baseline}
.cap .id{font-family:ui-monospace,Menlo,monospace;font-size:22px;color:#141413}
.cap .zh{font-size:20px;color:#5e5d59}
</style></head><body>
<div class="wrap">
  <div class="head"><div class="title">design-card<em>.</em> 主题总览</div><div class="sub">${THEMES.length} THEMES · 同模板换 :root</div></div>
  <div class="grid">
    ${cells}
  </div>
</div>
</body></html>`;
}

// ── 3) 本地预览索引页 ──
function indexPage(): string {
  const cards = THEMES.map((t) =>
    `<a class="card" href="${t.id}.html"><img src="${t.id}.png"><div class="cap"><span class="id">${t.id}</span><span class="zh">${t.nameZh}${t.dark ? '·深' : ''}</span></div></a>`
  ).join('\n    ');
  return `<!doctype html><html lang="zh"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>design-card · 主题预览</title><style>
*{margin:0;box-sizing:border-box}
body{background:#f5f4ed;color:#141413;font-family:-apple-system,system-ui,"PingFang SC",sans-serif;padding:48px 32px}
.wrap{max-width:1280px;margin:0 auto}
h1{font-family:Georgia,serif;font-weight:500;font-size:40px;letter-spacing:-.5px}
h1 em{font-style:normal;color:#c96442}
.sub{color:#87867f;margin-top:10px;font-size:16px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:26px;margin-top:40px}
.card{background:#faf9f5;border-radius:14px;overflow:hidden;box-shadow:0 0 0 1px rgba(0,0,0,.06);text-decoration:none;color:inherit}
.card img{display:block;width:100%}
.cap{padding:16px 20px;display:flex;justify-content:space-between;align-items:baseline}
.cap .id{font-family:ui-monospace,Menlo,monospace;font-size:17px}
.cap .zh{color:#5e5d59;font-size:15px}
</style></head><body>
<div class="wrap">
  <h1>design-card <em>·</em> 主题预览</h1>
  <div class="sub">${THEMES.length} 套主题 · 点开任意样例卡查看效果 · 同模板只换 :root</div>
  <div class="grid">
    ${cards}
  </div>
</div>
</body></html>`;
}

// ── 4) token 速查 markdown（供技能贴用）──
function tokensMd(): string {
  const block = (t: Theme) => {
    const pretty = t.root.replace(/;/g, ';\n  ').replace(/\n  $/, '\n');
    return `### \`${t.id}\`${t.dark ? ' ★深色' : ''} — ${t.mood}\n\n\`\`\`css\n:root {\n  ${pretty}}\n\`\`\`\n`;
  };
  const native = THEMES.filter((t) => t.group === 'native').map(block).join('\n');
  const brand = THEMES.filter((t) => t.group === 'brand').map(block).join('\n');
  return `# 主题 token 速查（自动生成，请勿手改）

> 由 \`samples/build.ts\` 生成。**唯一真相源是 build.ts 的 \`THEMES\` 数组**——改主题请改那里再重跑。
> 生成 HTML 时把选中主题的 \`:root {}\` 块整段贴进 \`<style>\`，其余样式一律 \`var(--x)\`。
> 共 ${THEMES.length} 套（${THEMES.filter(t=>t.group==='native').length} 原生 + ${THEMES.filter(t=>t.group==='brand').length} 品牌灵感）。品牌主题仅借配色、不含商标/字体。

## 原生编辑主题

${native}
## 品牌灵感主题（明暗成对）

${brand}`;
}

// ── 生成 ──
for (const t of THEMES) writeFileSync(join(SAMPLES_DIR, `${t.id}.html`), t.four ? cardMulti(t) : card(t));
writeFileSync(join(SAMPLES_DIR, '_montage.html'), montage());
writeFileSync(join(SAMPLES_DIR, 'index.html'), indexPage());
writeFileSync(join(REPO, 'references', 'THEMES.tokens.md'), tokensMd());

console.log(`✅ ${THEMES.length} themes → ${THEMES.length} cards + _montage.html + index.html + references/THEMES.tokens.md`);
console.log('Next:');
console.log('  for f in samples/*.html; do bun scripts/screenshot.ts "$f" "${f%.html}.png" 1080 1080; done');
console.log('  bun scripts/screenshot.ts samples/_montage.html assets/theme-overview.png 2200 --full-page');
