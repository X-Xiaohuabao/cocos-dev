---
name: cocos-mcp
description: |
  cocos-mcp-server 接入与使用规范(cocos-dev 学习仓库)。安装步骤、端口约定、
  工具类别速查、AI 操控编辑器的纪律(示例可代劳、用户练习不代劳)、连接排查。

  触发场景: 安装/启动/排查 MCP 连接、AI 需要在编辑器里建场景/节点/组件/预制体、
  查询场景层级、导入资源、跑预览、看控制台日志。

  触发词: mcp、cocos-mcp、编辑器控制、搭场景、建节点、挂组件、MCP 连不上、
  服务器没启动、扩展面板、参考图、截图验证

  注意: 纯 TS 脚本文件编写不走 MCP;MCP 不可用时退回"指导用户编辑器手工操作"。
---

# cocos-mcp-server 接入与使用

## 是什么

- 社区开源插件(DaxianLee/cocos-mcp-server,要求 **Cocos Creator 3.8.6+**):在编辑器内起 HTTP MCP 服务,AI 通过它直接操控编辑器(建场景/节点/组件/预制体、导资源、跑预览、读控制台)
- 本仓库 `.zcode/config.json` 已注册 MCP 服务 `cocos-creator`(http://127.0.0.1:3000/mcp):**编辑器开着且插件服务器已启动时自动连接**;编辑器没开时连接失败属正常现象,不是配置 bug

## 安装(一次性;装完在 README 进度表记录)

1. 获取插件:github.com/DaxianLee/cocos-mcp-server(clone 或 release 均可)
2. 整个 `cocos-mcp-server/` 文件夹放入本仓库 `extensions/` 目录
3. `cd extensions/cocos-mcp-server && npm install`(node_modules 不进 git)
4. 仓库内无 `dist/` 时构建:`npm run build`
5. 重启 Cocos Creator → 菜单「扩展」→ Cocos MCP Server → 打开控制面板
6. 端口默认 **3000**,勾选「自动启动」;点击「启动服务器」
7. 验证:ZCode 新会话里出现 `mcp__cocos-creator__*` 工具;或调 `server_info` 查状态
- ⚠️ 首次安装/升级前,删除工程 `settings/` 下的 `mcp-server.json` 与 `tool-manager.json`(插件 README 官方提示,防工具列表显示异常)

## 工具类别速查(约 50 工具,操作码模式:一个工具 + action 参数切换操作)

| 前缀 | 用途 | 常用操作 |
|---|---|---|
| scene_* | 场景 | 打开/保存/新建/关闭、层级查询(scene_hierarchy) |
| node_* | 节点 | 创建/删除/变换/层级调整/剪贴板、按名称或路径查询 |
| component_* | 组件 | 加删引擎组件、挂载自定义脚本、设置组件属性 |
| prefab_* | 预制体 | 从节点创建、实例化到场景、应用/还原变更 |
| asset_* | 资源 | 导入/删除/按类型查询、依赖分析、UUID↔路径互转 |
| project_* | 工程 | 运行预览、构建、工程设置查询 |
| debug_* | 调试 | 控制台日志读取/过滤/清空、系统信息 |
| sceneView_* / referenceImage_* | 视图 | Gizmo/相机控制、场景视图叠加参考图 |
| validation_* | 校验 | 场景完整性、资源引用检查 |

## AI 使用纪律

1. **场景/节点/组件/预制体操作优先走 MCP**,不手改 `.scene`/`.prefab` JSON(MCP 与官方 API 对齐;JSON 手改易损坏且 git 难 diff);仅当 MCP 不可用且用户同意时才手改
2. **改前先查,改后必存**:批量操作前先 `scene_hierarchy`/`node_query` 拿当前状态;改完必 `scene` 保存,再用 `debug_console` 确认无报错
3. **脚本文件不走 MCP**:TS 脚本用常规文件工具编写,MCP 只负责把脚本组件挂到节点(component_script)并设属性
4. **学习场景铁律**:AI 可用 MCP 搭"讲解示例";**用户练习环节不代劳**——指导用户在编辑器亲手做(cocos-learning 纪律 2)
5. **失败处理**:读错误信息修正参数后重试;连续失败 3 次停下向用户说明情况,不盲试
6. **破坏性操作先确认**:删节点/删资源/改工程设置前,先说明影响范围征得同意

## 排查(MCP 连不上)

| 症状 | 检查 |
|---|---|
| ZCode 里没有 `mcp__cocos-creator__*` 工具 | `.zcode/config.json` 的 `mcp.servers` 是否存在;重开 ZCode 会话 |
| 工具调用超时/连接拒绝 | 编辑器开着没?插件面板服务器启动没?端口 3000 是否被占(换端口后同步改 config.json 并重开会话) |
| 工具列表异常/缺失 | 删 `settings/mcp-server.json`、`settings/tool-manager.json` 后重开面板 |
| 操作返回错误 | `debug_console` 看编辑器报错;确认当前场景已加载、节点路径/UUID 有效 |
