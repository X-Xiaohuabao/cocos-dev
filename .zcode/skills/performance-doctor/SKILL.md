---
name: performance-doctor
description: |
  Cocos Creator 客户端性能诊断与优化(cocos-dev 学习仓库)。FPS/DrawCall/内存三类
  症状定位:节点池、批量渲染、纹理与图集、动态加载释放、update 分配、事件泄漏、
  profiler 使用;顺带性能优化背后的原理讲解(学习向)。

  触发场景: 预览卡顿、FPS 低、DrawCall 高、内存涨、加载慢、发热、
  节点多了变卡、练习想了解"为什么卡"。

  触发词: 性能、慢、卡、优化、FPS、drawcall、内存、占用、发热、
  批量、合批、图集、加载慢、卡顿

  注意: 功能跑出 bug 用 bug-detective;环境/启动问题查 cocos-mcp 排查表。
---

# 性能诊断指南(Cocos 客户端版)

## 诊断纪律

1. **先测量后优化**:开 profiler/.stats 看数字,"感觉卡"不算证据
2. **找热点再动手**:是 DrawCall 高(渲染)、逻辑重(CPU)还是内存涨(泄漏)?对症下药
3. **一次一变量**,改前后同场景同操作对比
4. 学习期要求:**每次优化能讲出原理**(为什么合批能提速?为什么分配对象会卡?)——优化本身是学习素材

## 症状 → 首查点对照表

| 症状 | 首查 | 常见根因 |
|---|---|---|
| FPS 低 + DrawCall 高 | profiler 的 drawcall 数 | 每个节点独立贴图/材质;没合图集;文本/图片层层嵌套 |
| FPS 低 + DrawCall 不高 | 逻辑耗时 | update() 里每帧分配对象/查节点;大量节点每帧 setPosition |
| 内存只涨不降 | 加载/释放是否成对 | resources.load 后没 release;场景切换没释放;纹理累计 |
| 节点多到几百上千就卡 | 节点组织方式 | 没用节点池反复 instantiate/destroy;每帧创建临时节点 |
| 点击/移动间歇性卡顿 | GC 压力 | update/回调里频繁 new 对象/数组/字符串拼接 |
| 加载场景慢 | 资源体积与数量 | 首包全量预载;大贴图没压缩;同步加载阻塞 |

## 工具

- **编辑器预览**:预览窗口左上角开 **FPS/DrawCall 统计**(调试信息);DevTools Performance 面板录帧分析
- **调试构建**:构建 Web Desktop 版用 DevTools 深入分析(内存快照看泄漏对象)
- MCP `debug_console` / `debug_system` 拿编辑器侧性能信息(cocos-mcp)

## 优化手段(对照 cocos-development 性能纪律)

### DrawCall / 渲染

1. 小图合**图集**(自动图集/SpriteAtlas),同图集同材质的 Sprite 可合批
2. 同类对象共用材质,避免每节点单独 set 材质参数
3. 静态背景考虑合并为一张大图;超大量重复物了解 GPU Instancing 概念(L4+)
4. 减少层级嵌套的透明叠加(透明排序打断合批)

### 逻辑 / CPU

1. update() 内**零分配**:复用成员变量 Vec3,别每帧 `new Vec3()`
2. 节点/组件引用**缓存到成员变量**(onLoad 里取一次),别每帧 find/getChildByPath/getComponent
3. 不需要每帧的逻辑降频(计数器隔帧执行/用 schedule 指定间隔)
4. 频繁创建销毁的对象上 **NodePool**(列表项/子弹/伤害数字)

### 内存 / 泄漏

1. `resources.load` 与 `release` **严格成对**;场景切换 `releaseAll` 未用资源
2. 事件 on/off 成对、schedule/unschedule 成对(onEnable/onDisable 钩子里做)
3. 定时器持有 this 引用会阻止组件回收,destroy 前 unschedule 全部
4. 纹理是大头:控制贴图尺寸(≤1024),不用的图集整包释放

## 优化后必做

1. 同场景同操作复测数字,前后对比写进笔记(学习仓库要求讲原理)
2. 功能回归:优化不能改变行为
3. 可复用的结论(如"自动图集使 DrawCall 从 120 降到 30")记入该阶段笔记
