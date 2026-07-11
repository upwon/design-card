# design-card 主题系统

这份文档定义 design-card 的**主题层**。它是 claude-design-card 的核心升级：
原技能把颜色硬编码为 Claude 陶土色一套；design-card 把颜色抽象成 **10 个语义 token**，
每套主题只是给同一批 token 换一组值。**排版结构、字体纪律、SVG 系统全部不变，只有配色随主题流动。**

参考自 ConardLi/garden-skills 的 web-video-presentation 主题契约思路（token 契约 + 主题层），
配色取自其内置主题的真实取值，映射到本卡片系统的 token 命名。

---

## 1. Token 契约（不可变的语义）

无论哪套主题，这 10 个 token 的**语义角色恒定**，只是取值不同。
生成 HTML 时把选中主题的 `:root {}` 块整段贴进 `<style>`，其余样式一律引用 `var(--x)`，
**绝不再写死任何 hex**（含 SVG 里的 `#c96442` / `#b0aea5`，一律换成 `var(--tc)` / `var(--ws)`）。

| Token | 语义角色 | 恒定规则 |
|---|---|---|
| `--pg` | 舞台主背景（卡片最底色） | 与 `--nk` 高对比 |
| `--iv` | 卡面 / 抬升背景（比 `--pg` 上层一档） | 比 `--pg` 更"亮/浮"一档 |
| `--nk` | 主文字（墨色）、主标题 | **亮/暗随主题**，始终与 `--pg` 高对比 |
| `--ds` | **深色强调区块背景**（Feature/Digest 深色头部等） | **永远是深色**，任何主题都不翻转 |
| `--ws` | `--ds` 区块上的文字 | **永远是浅色**，配 `--ds` 恒定高对比 |
| `--tc` | 强调色（accent、CTA、装饰、SVG 主色） | 主题的唯一饱和色 |
| `--og` | 次级文字（承接句、正文副色） | 介于 `--nk` 与 `--sg` |
| `--sg` | 元信息文字（来源、页码、kicker） | 最弱的可读文字 |
| `--bc` | 极浅分隔线 / 底纹 | 几乎贴近 `--pg` |
| `--bw` | 常规分隔线（栏线、边注边框） | 比 `--bc` 略重 |

> **关键设计**：`--ds` 恒深 + `--ws` 恒浅。这保证「深色头部 + 浅字」的构图
> （Feature、Digest、Dark Magazine Cover）在**每一套主题**下都成立，深色主题也不会翻车。

### 深色主题额外注意

`midnight` / `blueprint` 属深色主题：`--nk` 是**浅色墨**、`--pg` 是深色底。
此时不要再把 Feature/Digest 头部反转成「亮块深字」——`--ds` 仍是比 `--pg` 更深/更饱和的暗块，
配 `--ws` 浅字即可，视觉是「暗上更暗」的抬升块，保持一致。
SVG 底纹（类型 E）在深色主题用 `var(--tc)` 且 opacity 抬到 0.10–0.14 才看得见。

---

## 2. 内置主题（8 套）

每套主题给出完整 `:root {}` 块 + 气质 + 适用场景。用户没指定时默认 `claude`。

### `claude` — 暖陶土编辑感（默认）
> 场景：通用；延续 Claude/Anthropic 原生气质。米色纸底 + 陶土强调。

```css
:root {
  --pg: #f5f4ed;  --iv: #faf9f5;  --nk: #141413;  --ds: #30302e;
  --tc: #c96442;  --og: #5e5d59;  --sg: #87867f;
  --bc: #f0eee6;  --bw: #e8e6dc;  --ws: #b0aea5;
}
```

### `newsroom` — 报刊权威
> 场景：新闻、评论、观点长文。报纸奶油底 + 墨黑衬线 + 旗红强调。The Broadsheet 首选。

```css
:root {
  --pg: #f1ebd8;  --iv: #f8f3e2;  --nk: #14110b;  --ds: #201a10;
  --tc: #c8260d;  --og: #5e564a;  --sg: #8c8473;
  --bc: #ebe3cc;  --bw: #ddd3b8;  --ws: #e8dfc6;
}
```

### `indigo` — 靛蓝瓷（学术沉静）
> 场景：研究、分析、知识卡。靛蓝当墨 + 瓷白纸 + 微冷。The Digest / 对比分析卡出彩。

```css
:root {
  --pg: #f1f3f5;  --iv: #f8fafc;  --nk: #0a1f3d;  --ds: #0a1f3d;
  --tc: #1e3a8a;  --og: #4a5a78;  --sg: #8595ad;
  --bc: #e7ebef;  --bw: #d3dae2;  --ws: #e4e8ec;
}
```

### `forest` — 森林墨（自然纪录）
> 场景：自然、健康、可持续、纪录感内容。森林绿当墨 + 象牙暖纸。

```css
:root {
  --pg: #f5f1e8;  --iv: #faf7ee;  --nk: #1a2e1f;  --ds: #1a2e1f;
  --tc: #4d7a4d;  --og: #5c6a5e;  --sg: #909a92;
  --bc: #ebe7d8;  --bw: #d6cfb8;  --ws: #ece7da;
}
```

### `kraft` — 牛皮纸（手作怀旧）
> 场景：手作、复古、生活方式、独立品牌。深棕墨 + 牛皮米 + 铜锈强调。

```css
:root {
  --pg: #eedfc7;  --iv: #f3e9d6;  --nk: #2a1e13;  --ds: #2a1e13;
  --tc: #a35b2a;  --og: #6e5a40;  --sg: #a08c70;
  --bc: #e0d0b6;  --bw: #cdba9a;  --ws: #f3e9d6;
}
```

### `dune` — 沙丘（建筑画廊）
> 场景：建筑、设计、极简高级。炭褐墨 + 沙底 + 低饱和陶土。留白大、气质冷静。

```css
:root {
  --pg: #f0e6d2;  --iv: #f6ecd9;  --nk: #1f1a14;  --ds: #1f1a14;
  --tc: #8c6a48;  --og: #6b5c46;  --sg: #9a8c70;
  --bc: #e3d7bf;  --bw: #d0c1a0;  --ws: #f0e6d2;
}
```

### `midnight` — 午夜印刷（电影暗底）★深色
> 场景：强传播首图、观点争议、Dark Magazine Cover。暖 espresso 深底 + 火热橙。

```css
:root {
  --pg: #1a1714;  --iv: #231f1a;  --nk: #f5f0e5;  --ds: #0d0b09;
  --tc: #ff4a2b;  --og: #ece4d2;  --sg: #7a7972;
  --bc: #2f2a25;  --bw: #3a342d;  --ws: #ece4d2;
}
```

### `blueprint` — 工程蓝图 ★深色
> 场景：技术、工程、数据、产品。深海军底 + 电光青 + 网格感。适合科技类封面/教程卡。

```css
:root {
  --pg: #0e1a2e;  --iv: #142441;  --nk: #d6e5ff;  --ds: #0a1224;
  --tc: #4dd2ff;  --og: #a8c2f0;  --sg: #6c89b8;
  --bc: #1c2f54;  --bw: #274069;  --ws: #d6e5ff;
}
```

---

## 3. 主题 × 格式速配

不是硬绑定，只是「气质最搭」的推荐。用户可任意组合。

| 内容类型 | 首选主题 | 备选 |
|---|---|---|
| 新闻 / 评论 / 时事 | `newsroom` | `claude`、`dune` |
| 研究 / 分析 / 数据报告 | `indigo` | `blueprint`、`claude` |
| 技术 / 工程 / 产品 | `blueprint` | `indigo`、`midnight` |
| 自然 / 健康 / 可持续 | `forest` | `dune`、`kraft` |
| 手作 / 生活 / 复古 | `kraft` | `dune`、`newsroom` |
| 建筑 / 设计 / 极简 | `dune` | `claude`、`indigo` |
| 强传播首图 / 争议观点 | `midnight` | `blueprint`、`newsroom` |
| 通用 / 不确定 | `claude` | 按内容气质选一个暖/冷 |

深色主题（`midnight`/`blueprint`）在小红书、抖音、B站封面上更抓眼；
浅色主题在长文编辑排版（Broadsheet/Reader/Digest）上更耐读。

---

## 4. 主题选择流程（并入生成流程 Step 2）

1. 内容提炼后，先判定内容气质（暖/冷、严肃/活泼、传播/耐读）。
2. 依 §3 速配 + 内容气质，给用户 **1 个主推主题 + 1 个备选**，一句话说明为什么。
3. 用户可回复主题名（如「用 forest」）、说「按你判断」、或提出自定义配色。
4. 未指定则用 `claude` 默认主题，并在 HTML 注释里标注「按默认主题 claude 生成」。

### 自定义主题

用户给出品牌色时，只需覆盖 `--tc`（强调色），其余沿用最接近的内置主题底色；
若给出整套配色，按 §1 契约填满 10 个 token（务必保证 `--ds` 深 + `--ws` 浅、`--nk` 与 `--pg` 高对比）。
生成前自检对比度：正文 `--nk` on `--pg` 至少 AA 级（≈4.5:1）。
