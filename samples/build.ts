#!/usr/bin/env bun
/**
 * 主题样例生成器 — 为 8 套主题各生成一张 1080×1080 预览卡（HTML）。
 * 模板完全一致，只替换 :root token 块，直观展示「换主题只改一段 :root」。
 * 生成后用 scripts/screenshot.ts 逐张截图为 PNG。
 *
 * 用法：bun samples/build.ts   （在仓库根目录运行）
 */
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const SAMPLES_DIR = dirname(fileURLToPath(import.meta.url));

type Theme = {
  id: string;
  nameZh: string;
  mood: string;      // 一句气质 / 适用场景
  dark: boolean;
  root: string;      // :root {} 内容（不含大括号）
};

// token 取值来自 references/THEMES.md §2
const THEMES: Theme[] = [
  { id: 'claude', nameZh: '陶土', mood: '暖陶土编辑感 · 默认 · 通用', dark: false,
    root: '--pg:#f5f4ed;--iv:#faf9f5;--nk:#141413;--ds:#30302e;--tc:#c96442;--og:#5e5d59;--sg:#87867f;--bc:#f0eee6;--bw:#e8e6dc;--ws:#b0aea5;' },
  { id: 'newsroom', nameZh: '报刊', mood: '报纸奶油 + 旗红 · 新闻 · 评论', dark: false,
    root: '--pg:#f1ebd8;--iv:#f8f3e2;--nk:#14110b;--ds:#201a10;--tc:#c8260d;--og:#5e564a;--sg:#8c8473;--bc:#ebe3cc;--bw:#ddd3b8;--ws:#e8dfc6;' },
  { id: 'indigo', nameZh: '靛蓝', mood: '靛蓝当墨 + 瓷白 · 研究 · 分析', dark: false,
    root: '--pg:#f1f3f5;--iv:#f8fafc;--nk:#0a1f3d;--ds:#0a1f3d;--tc:#1e3a8a;--og:#4a5a78;--sg:#8595ad;--bc:#e7ebef;--bw:#d3dae2;--ws:#e4e8ec;' },
  { id: 'forest', nameZh: '森林墨', mood: '森林绿当墨 + 象牙纸 · 自然 · 健康', dark: false,
    root: '--pg:#f5f1e8;--iv:#faf7ee;--nk:#1a2e1f;--ds:#1a2e1f;--tc:#4d7a4d;--og:#5c6a5e;--sg:#909a92;--bc:#ebe7d8;--bw:#d6cfb8;--ws:#ece7da;' },
  { id: 'kraft', nameZh: '牛皮纸', mood: '深棕墨 + 牛皮米 + 铜锈 · 手作 · 复古', dark: false,
    root: '--pg:#eedfc7;--iv:#f3e9d6;--nk:#2a1e13;--ds:#2a1e13;--tc:#a35b2a;--og:#6e5a40;--sg:#a08c70;--bc:#e0d0b6;--bw:#cdba9a;--ws:#f3e9d6;' },
  { id: 'dune', nameZh: '沙丘', mood: '炭褐墨 + 沙底 · 建筑 · 极简', dark: false,
    root: '--pg:#f0e6d2;--iv:#f6ecd9;--nk:#1f1a14;--ds:#1f1a14;--tc:#8c6a48;--og:#6b5c46;--sg:#9a8c70;--bc:#e3d7bf;--bw:#d0c1a0;--ws:#f0e6d2;' },
  { id: 'midnight', nameZh: '午夜', mood: 'espresso 深底 + 火热橙 · 强传播 · 争议', dark: true,
    root: '--pg:#1a1714;--iv:#231f1a;--nk:#f5f0e5;--ds:#0d0b09;--tc:#ff4a2b;--og:#ece4d2;--sg:#7a7972;--bc:#2f2a25;--bw:#3a342d;--ws:#ece4d2;' },
  { id: 'blueprint', nameZh: '蓝图', mood: '深海军底 + 电光青 · 技术 · 数据', dark: true,
    root: '--pg:#0e1a2e;--iv:#142441;--nk:#d6e5ff;--ds:#0a1224;--tc:#4dd2ff;--og:#a8c2f0;--sg:#6c89b8;--bc:#1c2f54;--bw:#274069;--ws:#d6e5ff;' },
];

// 展示的 4 个关键 token（名 + hex 从 root 里解析）
const SWATCH_TOKENS = ['--pg', '--nk', '--tc', '--ds'] as const;

function hexOf(root: string, token: string): string {
  const m = root.match(new RegExp(`${token}:\\s*(#[0-9a-fA-F]{3,8})`));
  return m ? m[1] : '';
}

function card(t: Theme): string {
  const swatches = SWATCH_TOKENS.map((tok) => {
    const hex = hexOf(t.root, tok);
    // --pg 底色贴近卡面，加一圈描边才看得出
    const ring = tok === '--pg' || tok === '--iv' ? 'box-shadow:inset 0 0 0 1px var(--bw);' : '';
    return `<div class="sw">
      <div class="chip" style="background:${hex};${ring}"></div>
      <div class="tk">${tok}</div>
      <div class="hx">${hex}</div>
    </div>`;
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
.name{font-family:Georgia,"Times New Roman",serif;font-weight:500;
  font-size:150px;line-height:1.0;letter-spacing:-2px;margin-top:40px}
.name em{font-style:normal;color:var(--tc)}
.id{font-family:Georgia,serif;font-size:40px;color:var(--tc);margin-top:14px;letter-spacing:1px}
.mood{font-size:29px;line-height:1.5;color:var(--og);margin-top:26px;max-width:860px}
.spacer{flex:1}
.band{background:var(--ds);color:var(--ws);border-radius:6px;
  padding:26px 30px;font-size:22px;display:flex;justify-content:space-between;align-items:center}
.band b{color:var(--tc);font-family:Georgia,serif;font-weight:500}
.rule{height:1px;background:var(--bw);margin:34px 0 30px}
.swatches{display:flex;gap:22px}
.sw{flex:1}
.chip{height:96px;border-radius:6px}
.tk{font-size:20px;margin-top:14px;color:var(--nk);font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
.hx{font-size:17px;color:var(--sg);font-family:ui-monospace,SFMono-Regular,Menlo,monospace;margin-top:3px}
.foot{font-size:18px;color:var(--sg);margin-top:38px}
</style></head><body>
<div class="card">
  <div class="top">
    <div class="kicker">design-card · theme</div>
    <div class="idx">${t.dark ? '深色主题' : '浅色主题'}</div>
  </div>
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

for (const t of THEMES) {
  const html = card(t);
  const out = join(SAMPLES_DIR, `${t.id}.html`);
  writeFileSync(out, html);
  console.log(`wrote ${out}`);
}
console.log(`\n✅ ${THEMES.length} theme samples generated in ${SAMPLES_DIR}`);
console.log('Next: screenshot each →');
console.log('  for f in samples/*.html; do bun scripts/screenshot.ts "$f" "${f%.html}.png" 1080 1080; done');
