---
name: cocos-development
description: |
  Cocos Creator 3.x 开发规范(cocos-dev 学习仓库)。工程结构、脚本分层(logic/view)、
  节点池与资源加载性能纪律、UI 约定、编码规范;写练习代码时遵循。

  触发场景: 写/改任何 Cocos 脚本、组件、预制体、UI、资源加载、练习功能实现、
  Cocos 工程配置。

  触发词: cocos、creator、组件、场景、预制体、prefab、节点、node、
  UI 面板、resources、bundle、节点池、NodePool、角色控制、相机、生命周期、tween

  注意: 编辑器内搭场景/节点走 cocos-mcp;学习路线与练习安排用 cocos-learning;美术资产用 game-assets。
---

# Cocos Creator 开发规范

## 工程定位

- 本仓库 = Cocos Creator 3.x 学习工程(**仓库根即 Cocos 工程根**,assets/ 与 .zcode/ 同级)
- 人机分工:**AI 写全部脚本/逻辑/讲解示例(MCP 操控编辑器搭场景);用户负责编辑器内亲手做练习、资源导入、预览验收**
- 原则:能用代码动态构建的节点(`new Node()` + `addComponent`)优先代码化,保证 git 可 diff、重做练习可复制

## 目录结构(assets/)

```
assets/
├── Lxx-<短名>/        # 每个学习阶段的练习目录(L01-click-move 等,见 cocos-learning)
│   ├── Lxx.scene      # 练习场景
│   └── scripts/       # 练习脚本(L2 起鼓励 logic/view 分目录)
├── prefabs/           # 公用预制体
├── models/            # GLTF/GLB 模型
├── textures/          # 贴图与图集
└── resources/         # 动态加载资源(谨慎使用,见性能纪律)
```

**依赖方向(单向):view → logic(cc 只在 view 层用)。logic 层禁止 import 'cc',保证可脱离引擎用 Vitest 单测;L2 起养成此习惯,L6 综合项目严格执行。**

```typescript
// logic/ 纯逻辑层示例:不 import cc,可单测
export class ScoreLogic {
    private score = 0;
    add(points: number): number { return this.score += points; }
}
// view/ 组件层:挂节点、渲染、动效;只消费 logic 的数据
```

## 性能纪律(违反 = 卡顿/内存泄漏;学习期就养成)

1. **节点池**:频繁创建销毁的对象(列表项、伤害数字、收集物)必须 NodePool 复用
2. **动态加载**:模型/预制体用 `resources.load`/bundle 按需加载 + `release` 释放;禁止全量预载;场景切换释放未用资源
3. **批量渲染**:同类大量对象合并图集与材质,利用 builtin batching 减少 drawcall
4. **update 节制**:组件 `update()` 里禁止分配对象(new/数组字面量)、禁止每帧查节点(`find`/`getChildByPath` 结果缓存成成员变量)
5. **事件解绑**:on 必须 off,`onEnable/onDisable` 成对;定时器 `schedule` 记得 `unschedule`,否则场景切换泄漏
6. **图集纪律**:UI 与场景小物件打成图集(自动图集),减少 drawcall

## UI 约定

- 列表/背包格用预制体 + NodePool 动态生成;长列表了解虚拟列表思想
- 面板开关走 logic/ 的简单状态机,view 只订阅渲染——练 L2 时体会分层的好处
- 多分辨率适配:Canvas 设计分辨率 + Widget 对齐,练习时切换预览分辨率验证

## 编码与提交约定

- TypeScript strict;`npx tsc --noEmit` 过(工程初始化后补 tsconfig)
- 组件命名 `XxxView.ts`/`XxxManager.ts`;逻辑类 `XxxLogic.ts`;禁止中文文件名
- 场景/预制体改动后由人在编辑器里开一次确认无损坏再提交(优先经 MCP 修改,见 cocos-mcp)
- 文件编码 UTF-8 无 BOM(项目强制)
