# design-card 主题系统

这份文档定义 design-card 的**主题层**。它是 claude-design-card 的核心升级：
原技能把颜色硬编码为 Claude 陶土色一套；design-card 把颜色抽象成 **10 个语义 token**，
每套主题只是给同一批 token 换一组值。**排版结构、字体纪律、SVG 系统全部不变，只有配色随主题流动。**

> **唯一真相源是 [`../samples/build.ts`](../samples/build.ts) 的 `THEMES` 数组。**
> 全部 37 套的 `:root {}` 值见自动生成的 [`THEMES.tokens.md`](THEMES.tokens.md)（生成 HTML 时贴用）。
> 改主题 / 加主题：改 build.ts 的数组 → `bun samples/build.ts` → 重截图，勿手改生成物。

---

## 1. Token 契约（不可变的语义）

无论哪套主题，这 10 个 token 的**语义角色恒定**，只是取值不同。
生成 HTML 时把选中主题的 `:root {}` 块整段贴进 `<style>`，其余样式一律引用 `var(--x)`，
**绝不再写死任何 hex**（含 SVG 里的强调色、装饰色，一律换成 `var(--tc)` / `var(--ws)`）。

| Token | 语义角色 | 恒定规则 |
|---|---|---|
| `--pg` | 舞台主背景（卡片最底色） | 与 `--nk` 高对比 |
| `--iv` | 卡面 / 抬升背景（比 `--pg` 上层一档） | 比 `--pg` 更"亮/浮"一档 |
| `--nk` | 主文字（墨色）、主标题 | **亮/暗随主题**，始终与 `--pg` 高对比 |
| `--ds` | **深色强调区块背景**（Feature/Digest 深色头部等） | 始终是**距 `--pg` 有对比的深块**；近黑主题用"抬升块" |
| `--ws` | `--ds` 区块上的文字 | **永远是浅色**，配 `--ds` 恒定高对比 |
| `--tc` | 强调色（accent、CTA、装饰、SVG 主色） | 主题的唯一饱和色（`calcom` 为单色，`--tc` 即墨色） |
| `--og` | 次级文字（承接句、正文副色） | 介于 `--nk` 与 `--sg` |
| `--sg` | 元信息文字（来源、页码、kicker） | 最弱的可读文字 |
| `--bc` | 极浅分隔线 / 底纹 | 几乎贴近 `--pg` |
| `--bw` | 常规分隔线（栏线、边注边框） | 比 `--bc` 略重 |

> **关键设计**：`--ds` 是「与底有对比的深块」+ `--ws` 恒浅。这保证「深色头部 + 浅字」的构图
> （Feature、Digest、Dark Magazine Cover）在**每一套主题**下都成立。

### 深色主题额外注意

深色主题的 `--nk` 是浅色墨、`--pg` 是深色底。**近黑主题**（vercel/linear/spotify/calcom-dark 等）
的 `--ds` 用**抬升块**（比 `--pg` 稍亮）而非纯黑，否则深色带会与背景融为一体。
SVG 底纹（类型 E）在深色主题用 `var(--tc)` 且 opacity 抬到 0.10–0.14 才看得见。

---

## 2. 内置主题（37 套）

**完整 `:root {}` 值见 [`THEMES.tokens.md`](THEMES.tokens.md)**（自动生成）。下面是名称与强调色速查。
未指定时默认 `claude`。品牌灵感主题**仅借配色、不含商标/字体**，名称仅作气质标识。

### 原生编辑主题（8）

| 主题 | 中文 | 明/暗 | 强调色 | 气质 |
|---|---|---|---|---|
| `claude` | 陶土（默认） | 浅 | `#c96442` | 暖陶土编辑感 · 通用 |
| `newsroom` | 报刊 | 浅 | `#c8260d` | 报纸奶油 + 旗红 · 新闻 |
| `indigo` | 靛蓝 | 浅 | `#1e3a8a` | 靛蓝当墨 · 研究 / 分析 |
| `forest` | 森林墨 | 浅 | `#4d7a4d` | 森林绿当墨 · 自然 / 健康 |
| `kraft` | 牛皮纸 | 浅 | `#a35b2a` | 深棕墨 + 铜锈 · 手作 / 复古 |
| `dune` | 沙丘 | 浅 | `#8c6a48` | 炭褐墨 + 沙底 · 建筑 / 极简 |
| `midnight` | 午夜 | 深 | `#ff4a2b` | espresso + 火热橙 · 强传播 |
| `blueprint` | 蓝图 | 深 | `#4dd2ff` | 深海军 + 电光青 · 技术 / 数据 |

### 品牌灵感主题 · 明暗成对（28）

| 主题 | 中文 | 明/暗 | 强调色 | 灵感 |
|---|---|---|---|---|
| `figma` / `figma-dark` | 洋红 | 浅 / 深 | `#ff3d8b` | Figma · 设计 / 产品 |
| `apple` / `apple-dark` | 晨灰 / 暗灰 | 浅 / 深 | `#0066cc` / `#2997ff` | Apple · 产品 / 科技 |
| `notion` / `notion-dark` | 素笺 / 墨笺 | 浅 / 深 | `#5645d4` / `#8a7cf0` | Notion · 效率 / 文档 |
| `vercel-light` / `vercel` | 净白 / 纯黑 | 浅 / 深 | `#0070f3` | Vercel · 开发 / 部署 |
| `linear-light` / `linear` | 霜紫 / 靛紫 | 浅 / 深 | `#5e6ad2` | Linear · 工具 / 极简 |
| `spotify-light` / `spotify` | 浅绿 / 霓绿 | 浅 / 深 | `#12a350` / `#1ed760` | Spotify · 音乐 / 传播 |
| `airbnb` / `airbnb-dark` | 玫红 / 暗玫 | 浅 / 深 | `#ff385c` / `#ff5a70` | Airbnb · 消费 / 生活 |
| `stripe` / `stripe-dark` | 品紫 / 暗紫 | 浅 / 深 | `#635bff` / `#7a73ff` | Stripe · 支付 / SaaS |
| `cursor` / `cursor-dark` | 烈橙 / 暗橙 | 浅 / 深 | `#f54e00` / `#ff6a2b` | Cursor · 开发 / 工具 |
| `coinbase` / `coinbase-dark` | 湛蓝 / 暗蓝 | 浅 / 深 | `#0052ff` / `#3c7dff` | Coinbase · 金融 / 机构 |
| `calcom` / `calcom-dark` | 墨白 / 玄墨 | 浅 / 深 | 单色（墨） | Cal.com · 黑白极简 |
| `airtable` / `airtable-dark` | 湖蓝 / 暗湖 | 浅 / 深 | `#2d7ff9` / `#4a90ff` | Airtable · 数据 / 协作 |
| `minimax-light` / `minimax` | 珊瑚 / 珊黑 | 浅 / 深 | `#ff5530` | MiniMax · AI / 传播 |
| `google` / `google-dark` | 谷蓝 / 谷夜 | 浅 / 深 | `#4285f4` / `#8ab4f8` | Google · 搜索 / 大众 |

### 四色特例（1）

| 主题 | 中文 | 明/暗 | 强调色 | 灵感 |
|---|---|---|---|---|
| `google-multi` | 谷彩 | 浅 | 蓝红黄绿四色 | Google 四色 · 大众 / 活泼 |

**`google-multi` 是唯一突破「单强调色」的主题**：底/墨仍走 Google 净白系（`--pg`/`--nk`/`--ds`/`--ws` 照常），
但额外提供 4 个品牌色 token —— `--g-blue #4285f4` / `--g-red #ea4335` / `--g-yellow #fbbc05` / `--g-green #34a853`。
用法：**四色轮转**在标题字、圆点、分节线、标签等装饰位；正文/元信息仍用 `--nk`/`--og`/`--sg`。
`--tc` 默认指向 `--g-blue`。深色块仍是 `--ds` + `--ws` 浅字，契约不变。

> 全部预览图见 [`../samples/`](../samples/)（画廊 + 可浏览 `index.html`）。

---

## 3. 主题 × 格式速配

不是硬绑定，只是「气质最搭」的推荐。用户可任意组合，并可指定明/暗。

| 内容类型 | 首选主题 | 备选 |
|---|---|---|
| 新闻 / 评论 / 时事 | `newsroom` | `claude`、`dune` |
| 研究 / 分析 / 数据报告 | `indigo` | `blueprint`、`apple` |
| 技术 / 工程 / 开发 | `blueprint` | `vercel`、`linear` |
| 产品 / SaaS / 科技极简 | `apple` | `linear`、`stripe` |
| 设计 / 创意 / 产品发布 | `figma` | `apple`、`midnight` |
| 效率 / 文档 / 知识笔记 | `notion` | `apple`、`claude` |
| 金融 / 数据 / 机构 | `coinbase` | `airtable`、`indigo` |
| 自然 / 健康 / 可持续 | `forest` | `dune`、`kraft` |
| 手作 / 生活 / 复古 | `kraft` | `dune`、`newsroom` |
| 消费 / 生活方式 | `airbnb` | `cursor`、`claude` |
| 建筑 / 极简 / 单色 | `dune` | `calcom`、`apple` |
| 音乐 / 娱乐 / 潮流 | `spotify` | `figma`、`minimax` |
| 强传播首图 / 争议观点 | `midnight` | `figma`、`vercel` |
| 通用 / 不确定 | `claude` | 按内容气质选一个暖/冷 |

深色主题在小红书、抖音、B站封面上更抓眼；浅色主题在长文编辑排版上更耐读。
大多数品牌主题都有明暗两版（如 `apple` / `apple-dark`），按投放背景选。

---

## 4. 主题选择流程（并入生成流程 Step 2）

1. 内容提炼后，先判定内容气质（暖/冷、严肃/活泼、传播/耐读）。
2. 依 §3 速配 + 内容气质，给用户 **1 个主推主题 + 1 个备选**，一句话说明为什么。
3. 用户可回复主题名（如「用 forest」「apple 深色版」）、说「按你判断」、或提出自定义配色。
4. 未指定则用 `claude` 默认主题，并在 HTML 注释里标注「按默认主题 claude 生成」。

### 自定义主题

用户给出品牌色时，只需覆盖 `--tc`（强调色），其余沿用最接近的内置主题底色；
若给出整套配色，按 §1 契约填满 10 个 token（务必保证 `--ds` 深 + `--ws` 浅、`--nk` 与 `--pg` 高对比）。
生成前自检对比度：正文 `--nk` on `--pg` 至少 AA 级（≈4.5:1）。
