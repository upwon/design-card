# 🎨 主题预览画廊

design-card 内置 **36 套主题**（8 套原生编辑配色 + 14 个品牌灵感 × 明暗双模）。
每张卡用的是**同一份模板**，只替换了 `:root` 里的 token 块——直观展示「换主题只改一段 `:root`，排版结构纹丝不动」。

品牌灵感主题**仅借配色、不含商标/字体**，名称仅作气质标识。生成卡片时告诉我主题名（如「用 forest」「apple 深色版」）即可；不指定则用默认的 `claude`。

- 完整 `:root` 值：[`../references/THEMES.tokens.md`](../references/THEMES.tokens.md)（自动生成）
- 本地可浏览：用浏览器打开本目录的 [`index.html`](index.html)
- 主题清单与速配：[`../references/THEMES.md`](../references/THEMES.md)

---

## 总览

<img src="../assets/theme-overview.png" alt="design-card 36 套主题总览" width="100%">

---

## 全部主题

**原生编辑（8）**

| 主题 | 中文 | 强调色 |
|---|---|---|
| `claude` | 陶土（默认） | `#c96442` |
| `newsroom` | 报刊 | `#c8260d` |
| `indigo` | 靛蓝 | `#1e3a8a` |
| `forest` | 森林墨 | `#4d7a4d` |
| `kraft` | 牛皮纸 | `#a35b2a` |
| `dune` | 沙丘 | `#8c6a48` |
| `midnight` ★ | 午夜 | `#ff4a2b` |
| `blueprint` ★ | 蓝图 | `#4dd2ff` |

**品牌灵感 · 明暗成对（28）**

| 浅色 | 深色 | 中文 | 强调色 | 灵感 |
|---|---|---|---|---|
| `figma` | `figma-dark` | 洋红 | `#ff3d8b` | Figma |
| `apple` | `apple-dark` | 晨灰 / 暗灰 | `#0066cc` | Apple |
| `notion` | `notion-dark` | 素笺 / 墨笺 | `#5645d4` | Notion |
| `vercel-light` | `vercel` | 净白 / 纯黑 | `#0070f3` | Vercel |
| `linear-light` | `linear` | 霜紫 / 靛紫 | `#5e6ad2` | Linear |
| `spotify-light` | `spotify` | 浅绿 / 霓绿 | `#1ed760` | Spotify |
| `airbnb` | `airbnb-dark` | 玫红 / 暗玫 | `#ff385c` | Airbnb |
| `stripe` | `stripe-dark` | 品紫 / 暗紫 | `#635bff` | Stripe |
| `cursor` | `cursor-dark` | 烈橙 / 暗橙 | `#f54e00` | Cursor |
| `coinbase` | `coinbase-dark` | 湛蓝 / 暗蓝 | `#0052ff` | Coinbase |
| `calcom` | `calcom-dark` | 墨白 / 玄墨 | 单色 | Cal.com |
| `airtable` | `airtable-dark` | 湖蓝 / 暗湖 | `#2d7ff9` | Airtable |
| `minimax-light` | `minimax` | 珊瑚 / 珊黑 | `#ff5530` | MiniMax |
| `google` | `google-dark` | 谷蓝 / 谷夜 | `#4285f4` | Google |

（★ = 深色主题；单张大图见 [`index.html`](index.html) 或直接看各 `<id>.png`）

---

## 重新生成

`samples/build.ts` 是主题的**唯一真相源**，一次生成全部产物：

```bash
# 1. 生成 34 张样例 HTML + 总览图 HTML + index.html + THEMES.tokens.md
bun samples/build.ts

# 2. 逐张截图为 PNG
for f in samples/*.html; do
  case "$f" in *_montage.html|*index.html) continue;; esac
  bun scripts/screenshot.ts "$f" "${f%.html}.png" 1080 1080
done

# 3. 重建总览图
bun scripts/screenshot.ts samples/_montage.html assets/theme-overview.png 2200 --full-page
```

样例卡只用系统字体（Georgia + system-ui），不依赖本地字体绝对路径，clone 后直接可打开 `.html` 预览。
**新增 / 修改主题：只改 [`build.ts`](build.ts) 的 `THEMES` 数组**，再重跑上面三步——`THEMES.tokens.md`、总览图、索引页全部自动同步。
