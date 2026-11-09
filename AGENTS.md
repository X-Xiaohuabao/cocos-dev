# AGENTS.md

本文件为 ZCode 在本仓库(cocos-dev 学习仓库)中工作时提供指导。本仓库当前只有 `.zcode/` 一套配置;后续若添加其他智能体配置(如 `.claude/`),更新任意一侧的规则/技能清单时必须同步另一侧。

## 语言设置

**必须使用简体中文**与用户对话。文档、注释、commit message 均使用简体中文。

## 文件编码规范(强制)

- 所有源码与配置文件统一使用 **UTF-8(无 BOM)**:`.ts`、`.json`、`.md`、`.scene`、`.prefab`
- 绝对禁止 UTF-8 with BOM、GBK、GB2312 混用
- 发现乱码优先检查文件实际编码

## 仓库定位

**cocos-dev = Cocos Creator 3.x 学习工程**(仓库根即 Cocos 工程根,`assets/` 与 `.zcode/` 同级)。目标:通过练习驱动掌握 Cocos 客户端开发,为 NoNameEarth 项目储备技能。学习方式:**AI 讲解概念 → MCP 操控编辑器搭示例 → 用户亲手做练习 → 写笔记**。

## 目录术语约定(必须遵守)

| 用户说 | 目标 | 说明 |
|---|---|---|
| 练习 / 学习代码 | `assets/Lxx-<短名>/` | 每个学习阶段一个目录(L01-click-move 等) |
| 学习笔记 | `docs/notes/` | 费曼式笔记,每阶段至少一篇 |
| 资产清单 | `docs/assets-registry.md` | 已入库模型/贴图登记表(首次入库时创建) |
| MCP 插件 | `extensions/cocos-mcp-server/` | 编辑器 MCP 插件本体(node_modules 不进 git) |
| 配置 | `.zcode/` | skills/hooks/agents/config.json(含 MCP 注册) |

**绝对禁止**:把学习仓库的练习代码写进 NoNameEarth,或把 NoNameEarth 的业务代码拷进来;本仓库不写后端代码(L7 联机阶段再议)。

## 学习路线与纪律

路线 L0~L7(L0 编辑器 → L1 TS 脚本 → L2 UI → L3 资源动画 → L4 3D → L5 物理 → L6 综合小游戏 → L7 联机全栈[可选])的完整路线表、练习清单、笔记模板见 **cocos-learning** 技能。三条硬纪律:

1. **不跳级**:当前阶段练习+笔记未完成不开下一阶段;完成标准 = 不看示例能独立重做
2. **练习必亲手做**:AI 用 MCP 搭的示例只用于讲解;用户练习环节 AI 只指导不代劳
3. **笔记必写**:不写笔记不算完成;踩坑记录是本仓库最有价值的沉淀

## 人机分工

- **AI**:讲解概念、用 MCP 操控编辑器搭讲解示例(cocos-mcp)、写示例/练习配套脚本、出练习题、验收提问(自测三问)
- **用户**:在编辑器里亲手完成练习、预览验收、导入资源、决定学习节奏
- 场景/节点/组件/预制体操作优先走 MCP,不手改 `.scene`/`.prefab` JSON(MCP 不可用且用户同意时除外)

## Cocos 开发纪律

1. **分层单向依赖**:`view → logic`;logic 层禁止 import 'cc'(可脱离引擎单测;L2 起养成习惯)
2. **节点池**:频繁创建销毁的对象必须 NodePool 复用;动态资源 `load`/`release` 成对
3. **update() 节制**:禁止每帧分配对象/查找节点;事件 on-off 成对,防泄漏
4. **高频数据不进响应式状态**,view 层直更节点
5. TypeScript strict;组件命名 `XxxView.ts`/`XxxManager.ts`,逻辑类 `XxxLogic.ts`,禁止中文文件名

## MCP 接入(cocos-creator)

- 已在 `.zcode/config.json` 注册:`http://127.0.0.1:3000/mcp`(HTTP);**编辑器开着且插件服务器已启动时自动连接**,编辑器没开时连接失败属正常
- 前置:Cocos Creator **3.8.6+** + `extensions/cocos-mcp-server` 插件(安装步骤见 cocos-mcp 技能)
- 使用纪律(改前先查/改后必存/脚本不走 MCP/练习不代劳)详见 cocos-mcp 技能

## 常用命令

```powershell
# 本仓库为 Cocos 工程,无构建命令行;用 Cocos Creator 编辑器打开仓库根目录开发与预览
npx vitest run                      # logic 层单测(接入 vitest 后)
git log --oneline                   # 学习进度线(练习与笔记分笔提交)

# Cocos Creator 3.8.6+ 从官网 Dashboard 下载安装;编辑器命令行构建等随 L6 阶段补充
```

## Skills 体系(强制评估)

`.zcode/skills/` 下共 8 个技能。**每次接到任务,先评估匹配哪个 skill 并遵循之**:

| Skill | 触发场景 |
|---|---|
| `cocos-learning` | 学习路线、开始/继续学习、练习安排、笔记、进度(学习会话入口) |
| `cocos-development` | 写/改 Cocos 脚本、组件、预制体、UI、资源加载、分层 |
| `cocos-mcp` | MCP 安装/使用/排查、AI 操控编辑器搭场景建节点 |
| `game-assets` | 找模型/贴图、资产入库、模型显示不对 |
| `bug-detective` | 运行期 bug 排查(报错、没反应、不显示) |
| `performance-doctor` | FPS/DrawCall/内存等性能问题 |
| `test-development` | logic 层 Vitest 单测、回归用例 |
| `git-workflow` | 提交、commit message、tag、回退、gitignore |

`UserPromptSubmit` hook 会强制注入此清单要求评估;**新增/删除 skill 后必须同步更新 `.zcode/hooks/skill-forced-eval.cjs` 的技能列表和本表**。
