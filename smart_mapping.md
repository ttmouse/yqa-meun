# Smart Mapping — 自迭代分析引擎

> 不是静态提示词。通过**持续记录分析日志 → 从日志提取模式 → 自我更新**来进化。
> 每次分析都让下一次更聪明。

---

## 快速入口

| 你想做什么 | 看哪里 |
|-----------|--------|
| 了解项目现状 | 第 1 节「项目恒定上下文」 |
| 开始一次新的分析 | 第 6 节「分析运行规程」 |
| 看之前发现了什么 Bug 模式 | 第 4 节「活跃反模式」 |
| 看历史分析记录 | `smart_mapping_log.yaml` |
| 生成一个 prompt | 第 5 节「场景 prompt 工厂」 |

---

## 1. 项目恒定上下文

| 维度 | 值 |
|------|----|
| 技术栈 | Vite 6 + React 18 + Tailwind 3 + Radix Icons |
| 构建输出 | `base: './'` 相对路径 |
| 部署 | PM2 + serve:4130 / deploy.sh → Nginx |
| 路由 | 纯状态驱动，`activeKey` + `activeItemId` |
| 数据流 | `schemes.js` → App state → props 逐层 |
| 深色模式 | `dark` CSS class + Tailwind `dark:` |
| 包管理 | npm, `"type":"module"`，PM2 用 `.cjs` |

## 2. 文件拓扑

```
App.jsx                      ← 顶层状态: activeKey, activeItemId, dark
├── Sidebar.jsx              ← 侧栏 + 搜索 + 方案切换
│   └── NavItem (递归)       ← 菜单项（一级/二级）
├── ContentArea.jsx          ← 内容区 + ITEM_PREVIEWS 字典
├── Icon.jsx                 ← Radix 图标映射
└── data/schemes.js          ← 4 套导航方案数据
```

## 3. 数据文件

| 文件 | 作用 | 谁维护 |
|------|------|--------|
| `smart_mapping.md` | 策略 + 规则 + 活跃反模式 | 每次分析后自动更新 |
| `smart_mapping_log.yaml` | 所有分析会话的完整日志（只追加） | 每次分析后自动追加 |
| `smart_mapping/sessions/` | 每次分析的详细产出（可选的） | 分析 agent |

---

## 4. 反模式状态

> ✅ = 已修复，⚠️ = 仍活跃。完整历史见 `smart_mapping_log.yaml`。
> 每次分析开始时，**重新验证所有 ⚠️ 条目**。如果发现新模式，追加末尾。

### 已修复（本轮迭代关闭）

| ID | 标题 | 严重度 | 修复于 |
|----|------|--------|--------|
| P001 | 深色模式作用域断裂 | 🔴 | S002: dark 外移到最外层 div |
| P002 | ContentArea 不响应选中 | 🔴 | S002: 传入 activeItemId prop |
| P003 | ITEM_PREVIEWS 不完整 | 🟡 | S002: 补全 33 条 |
| P004 | 方案切换 expandedId 不重置 | 🟡 | S002: useEffect 监听 activeKey |
| P005 | 搜索无高亮 | 🟢 | S002: highlightText + `<mark>` |
| P006 | deploy.sh tar 层级问题 | 🔴 | S001: --strip-components=1 |

### 活跃（待处理）

_当前无活跃反模式。_

---

> 当发现新模式时，在此追加，同时在 `smart_mapping_log.yaml` 中记录完整细节。

---

## 5. 场景 prompt 工厂

> 每次分析后，根据日志中的成功/失败模式，此处动态更新。

### 新增功能
- **前置检查：** P003（ITEM_PREVIEWS） | P002（状态同步）
- **产出模板：**
```
在 [文件] 新增 [功能]。
数据：[schemes.js 位置 / ContentArea preview]
交互：[点击/切换/搜索]
样式：[Tailwind，dark: 深色]
```

### 修复 Bug
- **前置检查：** P001（dark 作用域） | P002（状态不同步） | P004（展开残留）
- **产出模板：**
```
修复 [文件:行] 的 [问题]。
根因：[一句话]
范围：[波及文件]
验证：[测试步骤]
```

### 部署
- **前置检查：** P006（tar 层级）
- **产出模板：**
```
目标：[URL]
base：[vite.config.js 的 base]
服务：[PM2 / Nginx]
```

---

## 6. 分析运行规程

> 执行分析时必须严格按以下步骤走，否则日志不完整、迭代断裂。

### 步骤 A — 准备
```
1. 读取 smart_mapping_log.yaml，了解历史发现
2. 读取 smart_mapping.md 第 4 节，已知活跃反模式
3. 用当前代码验证每条反模式是否仍存在
```

### 步骤 B — 执行
```
4. 按固定顺序扫描项目：
   a) App.jsx — dark 包裹 + props 传递
   b) Sidebar.jsx — 搜索 + 展开 + 高亮
   c) ContentArea.jsx — activeItemId 消费 + ITEM_PREVIEWS
   d) schemes.js — ID 唯一性 + 引用完整性
   e) vite.config.js — base 匹配部署路径
   f) deploy.sh — tar 参数 + 目录层级
   g) ecosystem.config.cjs — 路径/端口匹配
```

### 步骤 C — 产出
```
5. 填写本次分析日志（追加到 smart_mapping_log.yaml）：
   - 本次检查了哪些反模式
   - 哪些仍然活跃
   - 哪些已修复（标记 fixed + 修复方式）
   - 是否发现新模式
6. 如果有新模式 → 追加到 smart_mapping.md 第 4 节末尾
7. 如果有已修复的模式 → 从第 4 节移除（日志里永久留存）
8. 生成 prompt（写入第 5 节对应的工厂）
```

### 步骤 D — 闭环
```
9. 验证 smart_mapping.md 和 smart_mapping_log.yaml 的一致性
10. 下次分析从步骤 A 重新开始
```

---

## 7. 自迭代原理

```
  ┌─────────────────────────────────────────────────────┐
  │                                                     │
  │  每次分析                                            │
  │    ↓                                                │
  │  读取 smart_mapping.md + smart_mapping_log.yaml     │
  │    ↓                                                │
  │  了解历史上下文 + 已知模式                            │
  │    ↓                                                │
  │  扫描项目代码                                        │
  │    ↓                                                │
  │  验证旧反模式 + 发现新反模式                          │
  │    ↓                                                │
  │  追加 smart_mapping_log.yaml（永远不删）              │
  │    ↓                                                │
  │  更新 smart_mapping.md（活跃列表 + prompt 工厂）      │
  │    ↓                                                │
  │  下次分析时上下文更丰富 → 分析更准 → prompt 更好      │
  │                                                     │
  └─────────────────────────────────────────────────────┘
```

关键约束：
- **日志只追加不删除**：`smart_mapping_log.yaml` 是所有历史的唯一真相源
- **反模式可移不移删**：修复后从第 4 节移到日志备注，不会丢失
- **每次分析必须写日志**：否则迭代断裂，下次没有历史参考
