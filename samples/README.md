# 🎨 主题预览画廊

design-card 内置 **14 套主题**。下面每张卡用的是**同一份模板**，只替换了 `:root` 里的 token 块——
直观展示「换主题只改一段 `:root`，排版结构纹丝不动」。

前 8 套是编辑/印刷取向的原生配色；后 6 套（figma / apple / notion / vercel / linear / spotify）
配色灵感来自知名品牌设计系统，**仅借配色、不含商标/字体**，名称仅作气质标识。

生成卡片时告诉我主题名（如「用 forest 主题」）即可；不指定则用默认的 `claude`。
完整 token 定义见 [`../references/THEMES.md`](../references/THEMES.md)。

**快速跳转**：[claude](#claude) · [newsroom](#newsroom) · [indigo](#indigo) · [forest](#forest) · [kraft](#kraft) · [dune](#dune) · [midnight](#midnight-深色) · [blueprint](#blueprint-深色) · [figma](#figma) · [apple](#apple) · [notion](#notion) · [vercel](#vercel-深色) · [linear](#linear-深色) · [spotify](#spotify-深色)

---

## 原生编辑主题（8 套）

### `claude`
> 暖陶土编辑感 · 通用（默认）。延续 Claude / Anthropic 原生气质。

<img src="claude.png" width="560" alt="claude 主题预览">

`--pg #f5f4ed` · `--nk #141413` · `--tc #c96442` · `--ds #30302e`

### `newsroom`
> 报纸奶油 + 旗红 · 新闻 / 评论。The Broadsheet 首选。

<img src="newsroom.png" width="560" alt="newsroom 主题预览">

`--pg #f1ebd8` · `--nk #14110b` · `--tc #c8260d` · `--ds #201a10`

### `indigo`
> 靛蓝当墨 + 瓷白 · 研究 / 分析。

<img src="indigo.png" width="560" alt="indigo 主题预览">

`--pg #f1f3f5` · `--nk #0a1f3d` · `--tc #1e3a8a` · `--ds #0a1f3d`

### `forest`
> 森林绿当墨 + 象牙纸 · 自然 / 健康 / 可持续。

<img src="forest.png" width="560" alt="forest 主题预览">

`--pg #f5f1e8` · `--nk #1a2e1f` · `--tc #4d7a4d` · `--ds #1a2e1f`

### `kraft`
> 深棕墨 + 牛皮米 + 铜锈 · 手作 / 复古 / 生活方式。

<img src="kraft.png" width="560" alt="kraft 主题预览">

`--pg #eedfc7` · `--nk #2a1e13` · `--tc #a35b2a` · `--ds #2a1e13`

### `dune`
> 炭褐墨 + 沙底 · 建筑 / 设计 / 极简。

<img src="dune.png" width="560" alt="dune 主题预览">

`--pg #f0e6d2` · `--nk #1f1a14` · `--tc #8c6a48` · `--ds #1f1a14`

### `midnight` ★深色
> espresso 深底 + 火热橙 · 强传播首图 / 争议观点。

<img src="midnight.png" width="560" alt="midnight 主题预览">

`--pg #1a1714` · `--nk #f5f0e5` · `--tc #ff4a2b` · `--ds #0d0b09`

### `blueprint` ★深色
> 深海军底 + 电光青 · 技术 / 工程 / 数据。

<img src="blueprint.png" width="560" alt="blueprint 主题预览">

`--pg #0e1a2e` · `--nk #d6e5ff` · `--tc #4dd2ff` · `--ds #0a1224`

---

## 品牌灵感主题（6 套 · 仅借配色）

### `figma`
> 白画布 + 洋红 + 深紫块 · 设计 / 产品（灵感来自 Figma）。

<img src="figma.png" width="560" alt="figma 主题预览">

`--pg #f7f7f5` · `--nk #000000` · `--tc #ff3d8b` · `--ds #1f1d3d`

### `apple`
> 冷调极简 + Action Blue · 产品 / 科技（灵感来自 Apple）。

<img src="apple.png" width="560" alt="apple 主题预览">

`--pg #f5f5f7` · `--nk #1d1d1f` · `--tc #0066cc` · `--ds #1d1d1f`

### `notion`
> 暖极简 + 靛紫 · 效率 / 文档（灵感来自 Notion）。

<img src="notion.png" width="560" alt="notion 主题预览">

`--pg #fafaf9` · `--nk #1a1a1a` · `--tc #5645d4` · `--ds #2a2825`

### `vercel` ★深色
> 纯黑 + 电光蓝 · 开发 / 部署（灵感来自 Vercel）。`--ds` 为抬升块。

<img src="vercel.png" width="560" alt="vercel 主题预览">

`--pg #0a0a0a` · `--nk #fafafa` · `--tc #0070f3` · `--ds #1c1c1c`

### `linear` ★深色
> 近黑 + 靛紫 · 工具 / 极简（灵感来自 Linear）。`--ds` 为抬升块。

<img src="linear.png" width="560" alt="linear 主题预览">

`--pg #08090a` · `--nk #f7f8f8` · `--tc #5e6ad2` · `--ds #1a1c24`

### `spotify` ★深色
> 深灰 + 霓虹绿 · 音乐 / 传播（灵感来自 Spotify）。`--ds` 为抬升块。

<img src="spotify.png" width="560" alt="spotify 主题预览">

`--pg #121212` · `--nk #ffffff` · `--tc #1ed760` · `--ds #282828`

---

## 全部一览

| 主题 | 预览 | 气质 / 适用 |
|---|---|---|
| **`claude`** | <img src="claude.png" width="170"> | 陶土·默认·通用 |
| **`newsroom`** | <img src="newsroom.png" width="170"> | 报刊红·新闻·评论 |
| **`indigo`** | <img src="indigo.png" width="170"> | 靛蓝·研究·分析 |
| **`forest`** | <img src="forest.png" width="170"> | 森林墨·自然·健康 |
| **`kraft`** | <img src="kraft.png" width="170"> | 牛皮纸·手作·复古 |
| **`dune`** | <img src="dune.png" width="170"> | 沙丘·建筑·极简 |
| **`midnight`** ★ | <img src="midnight.png" width="170"> | 午夜橙·强传播·争议 |
| **`blueprint`** ★ | <img src="blueprint.png" width="170"> | 蓝图·技术·数据 |
| **`figma`** | <img src="figma.png" width="170"> | 洋红·设计·产品 |
| **`apple`** | <img src="apple.png" width="170"> | 晨灰·产品·科技 |
| **`notion`** | <img src="notion.png" width="170"> | 素笺·效率·文档 |
| **`vercel`** ★ | <img src="vercel.png" width="170"> | 纯黑·开发·部署 |
| **`linear`** ★ | <img src="linear.png" width="170"> | 靛紫·工具·极简 |
| **`spotify`** ★ | <img src="spotify.png" width="170"> | 霓绿·音乐·传播 |

（★ = 深色主题）

---

## 重新生成

```bash
# 1. 生成全部样例 HTML
bun samples/build.ts

# 2. 逐张截图为 PNG
for f in samples/*.html; do
  bun scripts/screenshot.ts "$f" "${f%.html}.png" 1080 1080
done

# 3.（可选）重建主 README 顶部的主题总览图
bun scripts/screenshot.ts samples/_montage.html assets/theme-overview.png 2200 --full-page
```

样例卡只用系统字体（Georgia + system-ui），不依赖本地字体绝对路径，clone 后直接可打开 `.html` 预览。
新增或修改主题：编辑 [`../references/THEMES.md`](../references/THEMES.md) 与 [`build.ts`](build.ts) 里的 `THEMES` 数组，再重跑上面三步。
