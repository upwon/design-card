# 主题预览画廊

design-card 内置 **8 套主题**。下面每张卡用的是**同一份模板**，只替换了 `:root` 里的 token 块——
直观展示「换主题只改一段 `:root`，排版结构纹丝不动」。

生成卡片时告诉我主题名（如「用 forest 主题」）即可；不指定则用默认的 `claude`。
完整 token 定义见 [`../references/THEMES.md`](../references/THEMES.md)。

| 主题 | 预览 | 气质 / 适用 |
|---|---|---|
| **`claude`** · 陶土（默认） | <img src="claude.png" width="260"> | 暖陶土编辑感 · 通用 |
| **`newsroom`** · 报刊 | <img src="newsroom.png" width="260"> | 报纸奶油 + 旗红 · 新闻 · 评论 |
| **`indigo`** · 靛蓝 | <img src="indigo.png" width="260"> | 靛蓝当墨 + 瓷白 · 研究 · 分析 |
| **`forest`** · 森林墨 | <img src="forest.png" width="260"> | 森林绿当墨 + 象牙纸 · 自然 · 健康 |
| **`kraft`** · 牛皮纸 | <img src="kraft.png" width="260"> | 深棕墨 + 牛皮米 + 铜锈 · 手作 · 复古 |
| **`dune`** · 沙丘 | <img src="dune.png" width="260"> | 炭褐墨 + 沙底 · 建筑 · 极简 |
| **`midnight`** · 午夜 ★深色 | <img src="midnight.png" width="260"> | espresso 深底 + 火热橙 · 强传播 · 争议 |
| **`blueprint`** · 蓝图 ★深色 | <img src="blueprint.png" width="260"> | 深海军底 + 电光青 · 技术 · 数据 |

---

## 重新生成

```bash
# 1. 生成 8 份样例 HTML
bun samples/build.ts

# 2. 逐张截图为 PNG
for f in samples/*.html; do
  bun scripts/screenshot.ts "$f" "${f%.html}.png" 1080 1080
done
```

样例卡只用系统字体（Georgia + system-ui），不依赖本地字体绝对路径，clone 后直接可打开 `.html` 预览。
新增或修改主题：编辑 [`../references/THEMES.md`](../references/THEMES.md) 与 [`build.ts`](build.ts) 里的 `THEMES` 数组，再重跑上面两步。
