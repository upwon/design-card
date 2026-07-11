<div align="center">

# design-card

**14 种格式 × 8 套主题配色 — Claude 设计语言驱动的卡片生成技能**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Themes](https://img.shields.io/badge/themes-8-c96442.svg)](./samples)
[![Formats](https://img.shields.io/badge/formats-14-30302e.svg)](#支持格式)
[![Bun](https://img.shields.io/badge/Bun-1.x-fbf0df.svg)](https://bun.sh/)
[![Playwright](https://img.shields.io/badge/Playwright-1.59-45ba4b.svg)](https://playwright.dev/)

<img src="assets/theme-overview.png" alt="design-card 8 套主题总览 — claude/newsroom/indigo/forest/kraft/dune/midnight/blueprint" width="100%">

</div>

---

## 这是什么

把一段文字 / 网页 URL / 数据，做成一张**像素精准、可直接发布**的设计卡片。覆盖平台封面、社交分享、长文编辑排版共 14 种格式，全部遵循 [Claude / Anthropic 设计系统](DESIGN.md) 的排版纪律（Georgia 衬线、书籍级行高、印刷级 SVG 装饰）。

相比原版 [claude-design-card](https://github.com/geekjourneyx/claude-design-card)，本仓库最大的升级是**主题系统**：颜色抽象成 10 个语义 token，换主题只改 `:root` 一段，排版结构零改动——不再只有一个陶土色。

```
输入：一段文字 / URL / 数据（+ 可选主题名，如「用 forest 主题」）
输出：/tmp/design-card-*.png（2x Retina，像素精准）
```

**内置 8 套主题**：`claude`（陶土·默认）· `newsroom`（报刊红）· `indigo`（靛蓝）· `forest`（森林墨）· `kraft`（牛皮纸）· `dune`（沙丘）· `midnight`（深色·橙）· `blueprint`（深色·蓝图）。

👉 **[主题预览画廊 →](samples/)**（每套主题一张大图样例卡 + 调色板 hex，方便挑选）

---

## 核心特性

- **14 种格式，4 大格式族** — 平台封面、图文内容卡、社交分享卡、长文编辑排版，每种格式有专属排版结构，不是「换尺寸」。
- **8 套可选主题** — token 化配色，`:root` 一段切换；`--ds` 恒深 + `--ws` 恒浅，深色头部构图在浅色 / 深色主题下都成立。可只覆盖 `--tc` 接入品牌色。
- **印刷级 SVG 系统** — 版刻装饰线、大号引言符、编辑插图、数据可视化、图案底纹五类，仅在 CSS 做不到时才用，全部走主题 token。
- **内容忠实** — 只提炼原文里的判断、数字、金句，不为排版好看而编造。
- **完全自包含** — 生成的 HTML 内联全部样式，无外部 CDN 依赖，可离线打开 / 截图。
- **可选二维码** — 传入 URL 自动在卡片角落生成「扫码阅读全文」二维码，深浅主题自适配。
- **自然语言触发** — 作为 Claude Code Skill 安装后，用一句话描述即可生成。

---

## 环境依赖

| 依赖 | 版本 | 说明 |
|------|------|------|
| [Bun](https://bun.sh) | ≥ 1.0 | 运行时 & 包管理器 |
| [Playwright](https://playwright.dev) | ≥ 1.59 | Chromium 截图引擎 |
| TypeScript | ≥ 5.0 | 脚本语言（Bun 原生支持） |

---

## 快速上手

**安装为 Claude Code Skill（推荐）：**

```bash
npx skills add https://github.com/upwon/design-card
```

**本地开发：**

```bash
bun install
bunx playwright install chromium
```

**直接调用截图脚本：**

```bash
# 固定尺寸（平台封面、内容卡）
bun scripts/screenshot.ts <input.html> [output.png] [width] [height]

# 自动高度（长文编辑排版）
bun scripts/screenshot.ts <input.html> [output.png] [width] --full-page

# 附带二维码（在末尾追加 --url）
bun scripts/screenshot.ts <input.html> [output.png] [width] [height] --url https://example.com
```

示例：

```bash
# 公众号首图 900×383
bun scripts/screenshot.ts /tmp/card.html /tmp/cover.png 900 383

# 小红书图文笔记 1080×1440
bun scripts/screenshot.ts /tmp/card.html /tmp/xiaohongshu.png 1080 1440

# The Broadsheet 长文排版（自动高度）
bun scripts/screenshot.ts /tmp/broadsheet.html /tmp/broadsheet.png 800 --full-page

# 省略输出路径 → /tmp/design-card-<basename>.png
bun scripts/screenshot.ts /tmp/my-card.html
```

---

## 支持格式

### 格式族 A — 平台封面

「点击前承诺」：一个强判断标题、一句承接、一个证据点，而不是正文摘要。

| 格式 | 尺寸 | 用途 | 设计重点 |
|------|------|------|------|
| 公众号首图 | 900 × 383 px | 微信公众号文章封面 | 横向秒读，左标题右证据 |
| 视频号竖封面 | 1080 × 1440 px | 微信视频号封面 | 竖版海报，中部标题锚点 |
| B站/YouTube 横封面 | 1280 × 720 px | B站、YouTube 缩略图 | 缩略图路牌，关键词清晰 |
| 抖音全屏竖版 | 1080 × 1920 px | 抖音、TikTok 封面 | 全屏停顿，安全区内一个判断 |

### 格式族 B — 图文内容卡

「可保存的知识物件」：首图停留，内页理解，工具页收藏。

| 格式 | 尺寸 | 用途 | 美学模式 |
|------|------|------|------|
| 小红书图文笔记 | 1080 × 1440 px | 小红书主图 / 轮播 | Editorial Artifact + Dark Magazine Cover |
| 步骤教程卡 | 1080 × 1440 px | 教程类内容 | Practical Toolkit |
| 对比分析卡 | 1080 × 1440 px | 对比 / 竞品分析 | Editorial Artifact |

### 格式族 C — 社交分享卡

| 格式 | 尺寸 | 特征 |
|---|---|---|
| 金句分享卡 | 1080 × 1080 px | 大号引言符，极简单栏 |
| 数据大字卡 | 1080 × 1080 px | 超大数字主导，SVG 进度条 |
| 方形通用卡 | 1080 × 1080 px | 标准单栏，灵活适配 |

### 格式族 D — 长文编辑排版

| 格式 | 宽度 | 气质 |
|---|---|---|
| The Broadsheet | 800 px | 三栏报纸，版刻装饰，Drop Cap |
| The Feature | 760 px | 杂志深度，暗头双栏，边侧栏 |
| The Reader | 720 px | 文学期刊，Marginalia 边注 |
| The Digest | 760 px | 分析报告，摘要框 + 数据列 |

---

## 主题系统

所有卡片颜色抽象成 **10 个语义 Token**，取值来自选中的**主题**。换主题只替换 `:root` 一段，正文样式零改动。完整定义见 [`references/THEMES.md`](references/THEMES.md)，8 套主题预览见 [samples/](samples/)。

下表为默认主题 `claude` 的取值：

| Token | 语义 | claude 默认值 |
|---|---|---|
| `--pg` | 主背景 | `#f5f4ed` |
| `--iv` | 卡面 / 次背景 | `#faf9f5` |
| `--nk` | 正文、标题（墨色，亮 / 暗随主题） | `#141413` |
| `--ds` | 深色区块（**永远深色**） | `#30302e` |
| `--ws` | `--ds` 上的文字（**永远浅色**） | `#b0aea5` |
| `--tc` | 强调、装饰、SVG 主色 | `#c96442` |
| `--og` | 副文本 | `#5e5d59` |
| `--sg` | 元信息 | `#87867f` |
| `--bc` / `--bw` | 细 / 常规分隔线 | `#f0eee6` / `#e8e6dc` |

**契约恒定**：`--ds` 恒深 + `--ws` 恒浅 → 深色头部构图在每套主题（含深色主题）都成立。
字体：Georgia（衬线，标题 / 正文）+ system-ui（UI / 标签）。颜色一律走 `var(--x)`，不写死 hex、不用纯白 `#ffffff`、不用 `font-weight: 700`。

**接入品牌色**：只需覆盖 `--tc`，其余沿用最接近的内置主题底色；或按 token 契约填满 10 个值自定义整套主题。

---

## 工作流程

技能被触发后自动完成以下步骤（关键节点会与你确认，不盲目生成）：

1. **内容提炼** — 抓取 URL / 读取文本，提炼主标题、要点、金句、来源，不编造。
2. **选格式 + 选主题** — 按内容类型与平台推荐格式，按气质推荐主题，与你确认。
3. **决定 SVG** — 逐项判断是否需要装饰 / 数据可视化，能用 CSS 就不用 SVG。
4. **生成 HTML** — 贴入主题 `:root` token 块，内联全部样式，完全自包含。
5. **预览确认** — 保存到 `/tmp`，你在浏览器确认布局后回复「截图」。
6. **截图输出** — Playwright 渲染为 2x PNG，输出到 `/tmp/design-card-*.png`。

---

## 作为 AI Skill 使用

在 Claude Code 中安装后，用自然语言描述即可触发：

```
帮我把这篇文章做成小红书图文笔记卡片
把这个数据做成方形分享卡，用 blueprint 主题
帮我生成一张公众号首图封面，森林墨风格
把这篇长文做成 The Broadsheet 编辑排版，newsroom 报刊主题
```

---

## 许可证

[MIT](./LICENSE) — 自由使用、修改、分发。

---

## 维护 & 致谢

| | |
|:---|:---|
| 维护者 | [@upwon](https://github.com/upwon) |
| Twitter | [@lifeee07296438](https://x.com/lifeee07296438) |
| 公众号 | 微信搜「热夏summer」 |
| 原项目 | [geekjourneyx/claude-design-card](https://github.com/geekjourneyx/claude-design-card) |

本仓库 fork 自 **geekjourneyx** 的 [claude-design-card](https://github.com/geekjourneyx/claude-design-card)，在其排版系统之上新增了 8 套主题配色。感谢原作者奠定的设计基础。
