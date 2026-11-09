# cocos-dev —— Cocos Creator 学习工程

通过练习驱动掌握 Cocos Creator 3.x 游戏开发,为 NoNameEarth 项目储备客户端技能。

**学习模式**:AI 讲解概念 → MCP 操控编辑器搭示例 → 我亲手做练习 → 写笔记(费曼式)。
路线总纲与纪律见 `.zcode/skills/cocos-learning/SKILL.md`。

## 路线图 L0~L7

| 阶段 | 主题 | 一句话目标 | 动手练习 | 状态 |
|---|---|---|---|---|
| L0 | 编辑器与环境 | 会用编辑器,懂工程目录与场景/节点/组件 | HelloLabel | ⬜ 未开始 |
| L1 | TypeScript 脚本 | 生命周期、事件、计时器 | ClickMove | ⬜ |
| L2 | UI 与预制体 | 常用 UI 组件、预制体+NodePool、多页面 | MiniBag | ⬜ |
| L3 | 资源与动画 | 动态加载释放、图集、Animation、tween | LoadActor | ⬜ |
| L4 | 3D 基础 | 3D 场景、材质、角色控制 | Roam3D | ⬜ |
| L5 | 物理与碰撞 | 刚体、触发器、射线 | Collector | ⬜ |
| L6 | 综合小游戏 | 完整闭环 + 构建发布 | 平台跳跃 或 收集跑酷 | ⬜ |
| L7 | 联机与全栈(可选) | Colyseus 房间与状态同步 | 双人联机 demo | ⬜ |

状态图例:⬜ 未开始 / 🔵 进行中 / ✅ 已完成(练习+笔记齐,已打 tag)

## 学习笔记索引

| 阶段 | 笔记 |
|---|---|
| — | (学习中逐步生成于 docs/notes/) |

## 环境准备(一次性)

1. **Cocos Creator 3.8.6+**:官网下载 Dashboard,安装 3.8.6 及以上版本编辑器
2. **cocos-mcp-server 插件**(AI 操控编辑器):按 `.zcode/skills/cocos-mcp/SKILL.md` 安装到 `extensions/`,编辑器面板启动服务器(端口 3000,ZCode 已配好自动连接)
3. **ZCode**:用 ZCode 打开本仓库根目录;`.zcode/` 配置(8 技能 + hooks + MCP)自动生效
4. **Node.js 20+**(vitest 单测与插件依赖)

## 快速开始

用 ZCode 打开本仓库,说「**开始 L0**」即可开始第一阶段;说「**继续学**」或「**学到哪了**」恢复进度。
