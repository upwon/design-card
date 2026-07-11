# 🎨 主题预览画廊

design-card 内置 **8 套主题**。下面每张卡用的是**同一份模板**，只替换了 `:root` 里的 token 块——
直观展示「换主题只改一段 `:root`，排版结构纹丝不动」。

生成卡片时告诉我主题名（如「用 forest 主题」）即可；不指定则用默认的 `claude`。
完整 token 定义见 [`../references/THEMES.md`](../references/THEMES.md)。

**快速跳转**：[claude](#claude--陶土默认) · [newsroom](#newsroom--报刊) · [indigo](#indigo--靛蓝) · [forest](#forest--森林墨) · [kraft](#kraft--牛皮纸) · [dune](#dune--沙丘) · [midnight](#midnight--午夜-深色) · [blueprint](#blueprint--蓝图-深色)

---

## `claude` · 陶土（默认）

> 暖陶土编辑感 · 通用。延续 Claude / Anthropic 原生气质。

<img src="claude.png" width="640" alt="claude 主题预览">

`--pg #f5f4ed` · `--nk #141413` · `--tc #c96442` · `--ds #30302e`

---

## `newsroom` · 报刊

> 报纸奶油 + 旗红 · 新闻 / 评论。The Broadsheet 首选。

<img src="newsroom.png" width="640" alt="newsroom 主题预览">

`--pg #f1ebd8` · `--nk #14110b` · `--tc #c8260d` · `--ds #201a10`

---

## `indigo` · 靛蓝

> 靛蓝当墨 + 瓷白 · 研究 / 分析。The Digest、对比分析卡出彩。

<img src="indigo.png" width="640" alt="indigo 主题预览">

`--pg #f1f3f5` · `--nk #0a1f3d` · `--tc #1e3a8a` · `--ds #0a1f3d`

---

## `forest` · 森林墨

> 森林绿当墨 + 象牙纸 · 自然 / 健康 / 可持续。

<img src="forest.png" width="640" alt="forest 主题预览">

`--pg #f5f1e8` · `--nk #1a2e1f` · `--tc #4d7a4d` · `--ds #1a2e1f`

---

## `kraft` · 牛皮纸

> 深棕墨 + 牛皮米 + 铜锈 · 手作 / 复古 / 生活方式。

<img src="kraft.png" width="640" alt="kraft 主题预览">

`--pg #eedfc7` · `--nk #2a1e13` · `--tc #a35b2a` · `--ds #2a1e13`

---

## `dune` · 沙丘

> 炭褐墨 + 沙底 · 建筑 / 设计 / 极简。留白大，气质冷静。

<img src="dune.png" width="640" alt="dune 主题预览">

`--pg #f0e6d2` · `--nk #1f1a14` · `--tc #8c6a48` · `--ds #1f1a14`

---

## `midnight` · 午夜 ★深色

> espresso 深底 + 火热橙 · 强传播首图 / 争议观点。Dark Magazine Cover。

<img src="midnight.png" width="640" alt="midnight 主题预览">

`--pg #1a1714` · `--nk #f5f0e5` · `--tc #ff4a2b` · `--ds #0d0b09`

---

## `blueprint` · 蓝图 ★深色

> 深海军底 + 电光青 · 技术 / 工程 / 数据 / 产品。

<img src="blueprint.png" width="640" alt="blueprint 主题预览">

`--pg #0e1a2e` · `--nk #d6e5ff` · `--tc #4dd2ff` · `--ds #0a1224`

---

## 全部一览

| 主题 | 预览 | 气质 / 适用 |
|---|---|---|
| **`claude`** 陶土（默认） | <img src="claude.png" width="200"> | 暖陶土编辑感 · 通用 |
| **`newsroom`** 报刊 | <img src="newsroom.png" width="200"> | 报纸奶油 + 旗红 · 新闻 · 评论 |
| **`indigo`** 靛蓝 | <img src="indigo.png" width="200"> | 靛蓝当墨 + 瓷白 · 研究 · 分析 |
| **`forest`** 森林墨 | <img src="forest.png" width="200"> | 森林绿 + 象牙纸 · 自然 · 健康 |
| **`kraft`** 牛皮纸 | <img src="kraft.png" width="200"> | 深棕墨 + 牛皮米 + 铜锈 · 手作 · 复古 |
| **`dune`** 沙丘 | <img src="dune.png" width="200"> | 炭褐墨 + 沙底 · 建筑 · 极简 |
| **`midnight`** 午夜 ★深色 | <img src="midnight.png" width="200"> | espresso + 火热橙 · 强传播 · 争议 |
| **`blueprint`** 蓝图 ★深色 | <img src="blueprint.png" width="200"> | 深海军底 + 电光青 · 技术 · 数据 |

---

## 重新生成

```bash
# 1. 生成 8 份样例 HTML
bun samples/build.ts

# 2. 逐张截图为 PNG
for f in samples/*.html; do
  bun scripts/screenshot.ts "$f" "${f%.html}.png" 1080 1080
done

# 3.（可选）重建主 README 顶部的 8 宫格总览图
bun scripts/screenshot.ts samples/_montage.html assets/theme-overview.png 2200 --full-page
```

样例卡只用系统字体（Georgia + system-ui），不依赖本地字体绝对路径，clone 后直接可打开 `.html` 预览。
新增或修改主题：编辑 [`../references/THEMES.md`](../references/THEMES.md) 与 [`build.ts`](build.ts) 里的 `THEMES` 数组，再重跑上面两步。
