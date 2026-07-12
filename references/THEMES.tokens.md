# 主题 token 速查（自动生成，请勿手改）

> 由 `samples/build.ts` 生成。**唯一真相源是 build.ts 的 `THEMES` 数组**——改主题请改那里再重跑。
> 生成 HTML 时把选中主题的 `:root {}` 块整段贴进 `<style>`，其余样式一律 `var(--x)`。
> 共 36 套（8 原生 + 28 品牌灵感）。品牌主题仅借配色、不含商标/字体。

## 原生编辑主题

### `claude` — 暖陶土编辑感 · 默认 · 通用

```css
:root {
  --pg:#f5f4ed;
  --iv:#faf9f5;
  --nk:#141413;
  --ds:#30302e;
  --tc:#c96442;
  --og:#5e5d59;
  --sg:#87867f;
  --bc:#f0eee6;
  --bw:#e8e6dc;
  --ws:#b0aea5;
}
```

### `newsroom` — 报纸奶油 + 旗红 · 新闻 · 评论

```css
:root {
  --pg:#f1ebd8;
  --iv:#f8f3e2;
  --nk:#14110b;
  --ds:#201a10;
  --tc:#c8260d;
  --og:#5e564a;
  --sg:#8c8473;
  --bc:#ebe3cc;
  --bw:#ddd3b8;
  --ws:#e8dfc6;
}
```

### `indigo` — 靛蓝当墨 + 瓷白 · 研究 · 分析

```css
:root {
  --pg:#f1f3f5;
  --iv:#f8fafc;
  --nk:#0a1f3d;
  --ds:#0a1f3d;
  --tc:#1e3a8a;
  --og:#4a5a78;
  --sg:#8595ad;
  --bc:#e7ebef;
  --bw:#d3dae2;
  --ws:#e4e8ec;
}
```

### `forest` — 森林绿当墨 + 象牙纸 · 自然 · 健康

```css
:root {
  --pg:#f5f1e8;
  --iv:#faf7ee;
  --nk:#1a2e1f;
  --ds:#1a2e1f;
  --tc:#4d7a4d;
  --og:#5c6a5e;
  --sg:#909a92;
  --bc:#ebe7d8;
  --bw:#d6cfb8;
  --ws:#ece7da;
}
```

### `kraft` — 深棕墨 + 牛皮米 + 铜锈 · 手作 · 复古

```css
:root {
  --pg:#eedfc7;
  --iv:#f3e9d6;
  --nk:#2a1e13;
  --ds:#2a1e13;
  --tc:#a35b2a;
  --og:#6e5a40;
  --sg:#a08c70;
  --bc:#e0d0b6;
  --bw:#cdba9a;
  --ws:#f3e9d6;
}
```

### `dune` — 炭褐墨 + 沙底 · 建筑 · 极简

```css
:root {
  --pg:#f0e6d2;
  --iv:#f6ecd9;
  --nk:#1f1a14;
  --ds:#1f1a14;
  --tc:#8c6a48;
  --og:#6b5c46;
  --sg:#9a8c70;
  --bc:#e3d7bf;
  --bw:#d0c1a0;
  --ws:#f0e6d2;
}
```

### `midnight` ★深色 — espresso 深底 + 火热橙 · 强传播 · 争议

```css
:root {
  --pg:#1a1714;
  --iv:#231f1a;
  --nk:#f5f0e5;
  --ds:#0d0b09;
  --tc:#ff4a2b;
  --og:#ece4d2;
  --sg:#7a7972;
  --bc:#2f2a25;
  --bw:#3a342d;
  --ws:#ece4d2;
}
```

### `blueprint` ★深色 — 深海军底 + 电光青 · 技术 · 数据

```css
:root {
  --pg:#0e1a2e;
  --iv:#142441;
  --nk:#d6e5ff;
  --ds:#0a1224;
  --tc:#4dd2ff;
  --og:#a8c2f0;
  --sg:#6c89b8;
  --bc:#1c2f54;
  --bw:#274069;
  --ws:#d6e5ff;
}
```

## 品牌灵感主题（明暗成对）

### `figma` — 白画布 + 洋红 · 设计 · 产品（灵感 Figma · 浅）

```css
:root {
  --pg:#f7f7f5;
  --iv:#ffffff;
  --nk:#000000;
  --ds:#1f1d3d;
  --tc:#ff3d8b;
  --og:#55555e;
  --sg:#8a8a90;
  --bc:#f1f1f1;
  --bw:#e6e6e6;
  --ws:#f7f7f5;
}
```

### `figma-dark` ★深色 — 深紫底 + 洋红 · 设计 · 产品（灵感 Figma · 深）

```css
:root {
  --pg:#161522;
  --iv:#221f30;
  --nk:#ffffff;
  --ds:#0e0d18;
  --tc:#ff3d8b;
  --og:#b5b2c0;
  --sg:#7d7a88;
  --bc:#2b2940;
  --bw:#37344d;
  --ws:#eceaf5;
}
```

### `apple` — 冷灰极简 + Action Blue · 产品 · 科技（灵感 Apple · 浅）

```css
:root {
  --pg:#f5f5f7;
  --iv:#ffffff;
  --nk:#1d1d1f;
  --ds:#1d1d1f;
  --tc:#0066cc;
  --og:#6e6e73;
  --sg:#86868b;
  --bc:#f0f0f2;
  --bw:#e0e0e0;
  --ws:#f5f5f7;
}
```

### `apple-dark` ★深色 — 纯黑 + Sky Blue · 产品 · 科技（灵感 Apple · 深）

```css
:root {
  --pg:#000000;
  --iv:#1d1d1f;
  --nk:#f5f5f7;
  --ds:#2a2a2c;
  --tc:#2997ff;
  --og:#a1a1a6;
  --sg:#6e6e73;
  --bc:#252527;
  --bw:#333335;
  --ws:#f5f5f7;
}
```

### `notion` — 暖白极简 + 靛紫 · 效率 · 文档（灵感 Notion · 浅）

```css
:root {
  --pg:#fafaf9;
  --iv:#ffffff;
  --nk:#1a1a1a;
  --ds:#2a2825;
  --tc:#5645d4;
  --og:#5a5852;
  --sg:#a4a097;
  --bc:#ede9e4;
  --bw:#e5e3df;
  --ws:#fafaf9;
}
```

### `notion-dark` ★深色 — 暖黑 + 亮靛紫 · 效率 · 文档（灵感 Notion · 深）

```css
:root {
  --pg:#191919;
  --iv:#252523;
  --nk:#f5f4f2;
  --ds:#0f0f0e;
  --tc:#8a7cf0;
  --og:#b0aea8;
  --sg:#7a7770;
  --bc:#2e2e2c;
  --bw:#3a3a37;
  --ws:#ecebe8;
}
```

### `vercel-light` — 净白 + 电光蓝 · 开发 · 部署（灵感 Vercel · 浅）

```css
:root {
  --pg:#fafafa;
  --iv:#ffffff;
  --nk:#000000;
  --ds:#171717;
  --tc:#0070f3;
  --og:#666666;
  --sg:#999999;
  --bc:#eaeaea;
  --bw:#e0e0e0;
  --ws:#fafafa;
}
```

### `vercel` ★深色 — 纯黑 + 电光蓝 · 开发 · 部署（灵感 Vercel · 深）

```css
:root {
  --pg:#0a0a0a;
  --iv:#171717;
  --nk:#fafafa;
  --ds:#1c1c1c;
  --tc:#0070f3;
  --og:#a1a1a1;
  --sg:#707070;
  --bc:#262626;
  --bw:#333333;
  --ws:#ededed;
}
```

### `linear-light` — 霜白 + 靛紫 · 工具 · 极简（灵感 Linear · 浅）

```css
:root {
  --pg:#f9f9fb;
  --iv:#ffffff;
  --nk:#08090a;
  --ds:#1a1c24;
  --tc:#5e6ad2;
  --og:#5a5f70;
  --sg:#8a8f9e;
  --bc:#eceef1;
  --bw:#e1e3e8;
  --ws:#f9f9fb;
}
```

### `linear` ★深色 — 近黑 + 靛紫 · 工具 · 极简（灵感 Linear · 深）

```css
:root {
  --pg:#08090a;
  --iv:#141516;
  --nk:#f7f8f8;
  --ds:#1a1c24;
  --tc:#5e6ad2;
  --og:#b4b8c4;
  --sg:#6f7280;
  --bc:#1f2023;
  --bw:#2b2d31;
  --ws:#eceef2;
}
```

### `spotify-light` — 净白 + 森野绿 · 音乐 · 传播（灵感 Spotify · 浅）

```css
:root {
  --pg:#f7f7f5;
  --iv:#ffffff;
  --nk:#121212;
  --ds:#191414;
  --tc:#12a350;
  --og:#535353;
  --sg:#8a8a8a;
  --bc:#eeeeec;
  --bw:#e5e5e3;
  --ws:#f0f0ee;
}
```

### `spotify` ★深色 — 深灰 + 霓虹绿 · 音乐 · 传播（灵感 Spotify · 深）

```css
:root {
  --pg:#121212;
  --iv:#1f1f1f;
  --nk:#ffffff;
  --ds:#282828;
  --tc:#1ed760;
  --og:#b3b3b3;
  --sg:#7c7c7c;
  --bc:#2a2a2a;
  --bw:#383838;
  --ws:#eeeeee;
}
```

### `airbnb` — 净白 + 玫红 · 消费 · 生活（灵感 Airbnb · 浅）

```css
:root {
  --pg:#fafafa;
  --iv:#ffffff;
  --nk:#222222;
  --ds:#222222;
  --tc:#ff385c;
  --og:#5e5e5e;
  --sg:#949494;
  --bc:#f0f0f0;
  --bw:#ebebeb;
  --ws:#fafafa;
}
```

### `airbnb-dark` ★深色 — 暖黑 + 亮玫红 · 消费 · 生活（灵感 Airbnb · 深）

```css
:root {
  --pg:#1a1516;
  --iv:#262022;
  --nk:#ffffff;
  --ds:#0f0b0c;
  --tc:#ff5a70;
  --og:#b3adae;
  --sg:#7c7678;
  --bc:#2e2829;
  --bw:#3a3335;
  --ws:#ededed;
}
```

### `stripe` — 冷白 + 靛紫 · 支付 · SaaS（灵感 Stripe · 浅）

```css
:root {
  --pg:#f6f9fc;
  --iv:#ffffff;
  --nk:#0a2540;
  --ds:#0a2540;
  --tc:#635bff;
  --og:#425466;
  --sg:#8792a2;
  --bc:#e6ebf1;
  --bw:#d5dce5;
  --ws:#f6f9fc;
}
```

### `stripe-dark` ★深色 — 深海军 + 亮紫 · 支付 · SaaS（灵感 Stripe · 深）

```css
:root {
  --pg:#0a1a2f;
  --iv:#122a47;
  --nk:#f6f9fc;
  --ds:#061020;
  --tc:#7a73ff;
  --og:#a8b7c9;
  --sg:#6b7f96;
  --bc:#1a3350;
  --bw:#25436a;
  --ws:#dce6f0;
}
```

### `cursor` — 暖奶油 + 烈橙 · 开发 · 工具（灵感 Cursor · 浅）

```css
:root {
  --pg:#f7f7f4;
  --iv:#ffffff;
  --nk:#26251e;
  --ds:#26251e;
  --tc:#f54e00;
  --og:#5c5a4e;
  --sg:#918f80;
  --bc:#eceae3;
  --bw:#e6e5e0;
  --ws:#f7f7f4;
}
```

### `cursor-dark` ★深色 — 暖黑 + 亮橙 · 开发 · 工具（灵感 Cursor · 深）

```css
:root {
  --pg:#1a1917;
  --iv:#26251e;
  --nk:#f7f7f4;
  --ds:#0f0e0c;
  --tc:#ff6a2b;
  --og:#b0aea0;
  --sg:#7a7768;
  --bc:#2c2b26;
  --bw:#38362f;
  --ws:#e6e5df;
}
```

### `coinbase` — 净白 + 湛蓝 · 金融 · 机构（灵感 Coinbase · 浅）

```css
:root {
  --pg:#f7f7f7;
  --iv:#ffffff;
  --nk:#0a0b0d;
  --ds:#0a0b0d;
  --tc:#0052ff;
  --og:#5b616e;
  --sg:#8a919e;
  --bc:#eef0f3;
  --bw:#e3e6ea;
  --ws:#f7f7f7;
}
```

### `coinbase-dark` ★深色 — 近黑 + 亮蓝 · 金融 · 机构（灵感 Coinbase · 深）

```css
:root {
  --pg:#0a0b0d;
  --iv:#141519;
  --nk:#ffffff;
  --ds:#1b1d22;
  --tc:#3c7dff;
  --og:#a5abb6;
  --sg:#6b7280;
  --bc:#22242a;
  --bw:#2e3138;
  --ws:#e5e7ea;
}
```

### `calcom` — 黑白单色极简 · 通用 · 开源（灵感 Cal.com · 浅）

```css
:root {
  --pg:#f9f9f9;
  --iv:#ffffff;
  --nk:#18181b;
  --ds:#18181b;
  --tc:#18181b;
  --og:#71717a;
  --sg:#a1a1aa;
  --bc:#f0f0f0;
  --bw:#e4e4e7;
  --ws:#f9f9f9;
}
```

### `calcom-dark` ★深色 — 纯黑单色极简 · 通用 · 开源（灵感 Cal.com · 深）

```css
:root {
  --pg:#0a0a0a;
  --iv:#18181b;
  --nk:#fafafa;
  --ds:#1c1c1f;
  --tc:#fafafa;
  --og:#a1a1aa;
  --sg:#6b6b70;
  --bc:#26262a;
  --bw:#333338;
  --ws:#e4e4e7;
}
```

### `airtable` — 净白 + 湖蓝 · 数据 · 协作（灵感 Airtable · 浅）

```css
:root {
  --pg:#fbfbfc;
  --iv:#ffffff;
  --nk:#1d1f25;
  --ds:#1d1f25;
  --tc:#2d7ff9;
  --og:#616670;
  --sg:#9599a3;
  --bc:#f0f1f3;
  --bw:#e6e7ea;
  --ws:#fbfbfc;
}
```

### `airtable-dark` ★深色 — 近黑 + 亮湖蓝 · 数据 · 协作（灵感 Airtable · 深）

```css
:root {
  --pg:#0e1013;
  --iv:#1a1d22;
  --nk:#ffffff;
  --ds:#22262d;
  --tc:#4a90ff;
  --og:#a2a7b2;
  --sg:#6a6f79;
  --bc:#242830;
  --bw:#30353e;
  --ws:#e8eaed;
}
```

### `minimax-light` — 净白 + 珊瑚 · AI · 传播（灵感 MiniMax · 浅）

```css
:root {
  --pg:#fafafa;
  --iv:#ffffff;
  --nk:#0a0a0a;
  --ds:#0a0a0a;
  --tc:#ff5530;
  --og:#5e5e5e;
  --sg:#949494;
  --bc:#f0f0f0;
  --bw:#e8e8e8;
  --ws:#fafafa;
}
```

### `minimax` ★深色 — 纯黑 + 珊瑚 · AI · 传播（灵感 MiniMax · 深）

```css
:root {
  --pg:#0a0a0a;
  --iv:#181e25;
  --nk:#ffffff;
  --ds:#1c2029;
  --tc:#ff5530;
  --og:#a0a3a8;
  --sg:#6a6d72;
  --bc:#22262d;
  --bw:#2e333b;
  --ws:#e8e8ea;
}
```

### `google` — 净白 + 谷歌蓝 · 搜索 · 大众（灵感 Google · 浅）

```css
:root {
  --pg:#f8f9fa;
  --iv:#ffffff;
  --nk:#202124;
  --ds:#202124;
  --tc:#4285f4;
  --og:#5f6368;
  --sg:#9aa0a6;
  --bc:#f1f3f4;
  --bw:#e8eaed;
  --ws:#f8f9fa;
}
```

### `google-dark` ★深色 — 石墨底 + 亮谷蓝 · 搜索 · 大众（灵感 Google · 深）

```css
:root {
  --pg:#202124;
  --iv:#292a2d;
  --nk:#e8eaed;
  --ds:#171717;
  --tc:#8ab4f8;
  --og:#bdc1c6;
  --sg:#80868b;
  --bc:#303134;
  --bw:#3c4043;
  --ws:#e8eaed;
}
```
