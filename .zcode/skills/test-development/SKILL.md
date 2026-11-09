---
name: test-development
description: |
  测试开发规范(cocos-dev 学习仓库,Vitest 单端)。只测 logic 纯逻辑层(不 import cc)、
  AAA 三段式、禁 tautology;学习 demo 的放宽约定(什么时候必须测、可以不测)。

  触发场景: 给练习的逻辑层写单测、L6 综合项目验收、修 bug 补回归用例、
  学习"怎么写测试"本身。

  触发词: 测试、单测、unit test、Vitest、断言、覆盖率、回归、
  expect、mock

  注意: view 层渲染表现不测(人工预览验证);本仓库无后端,无集成测试。
---

# 测试开发规范(cocos-dev 版)

## 测试策略(单端)

| 层 | 测不测 | 怎么测 |
|---|---|---|
| `scripts/**/logic/` 纯逻辑(不 import 'cc') | ✅ 核心 | Vitest,Node 直接跑,脱离引擎 |
| view/ 组件(挂节点、渲染) | ❌ | 人工编辑器/预览验证 |
| 其中抽出的纯函数(伤害计算/判定) | ✅ | 拆到 logic/ 或独立纯函数文件再测 |

**前提**:logic 层不 import 'cc' 是可测的关键(cocos-development 分层纪律)——这也是练分层的最大动力。

## 环境接入(首次写测试时)

```powershell
# 工程根初始化(尚无 package.json 时)
npm init -y
npm install -D vitest
# package.json 加 "test": "vitest run"
npx vitest run            # 跑全部
npx vitest run src/xx.test.ts   # 单文件
```

测试文件放被测文件旁边:`xxx.logic.ts` ↔ `xxx.logic.test.ts`。

## 写法规范

```typescript
// xxx.logic.test.ts —— 测试名用中文描述行为,数值语义化
import { describe, it, expect } from 'vitest';
import { ScoreLogic } from './score.logic';

const PICKUP_POINTS = 10;

describe('计分逻辑', () => {
    it('拾取一次加 10 分', () => {
        const score = new ScoreLogic();        // Arrange 准备
        score.add(PICKUP_POINTS);              // Act 执行
        expect(score.current).toBe(PICKUP_POINTS); // Assert 断言
    });
});
```

## 通用纪律

1. **Arrange-Act-Assert** 三段式;一个测试只测一个行为
2. **数值语义化**:魔法数字提成常量(PICKUP_POINTS),不写 `toBe(10)` 裸数字
3. **禁止 tautology**:mock 返回什么就断言什么 = 没测任何东西
4. 测试间不共享可变状态、不依赖执行顺序
5. 测试代码同样 UTF-8 无 BOM

## 何时必须测 / 可以不测(学习仓库约定)

**必须测**:
- 修过 bug 的 logic 逻辑(回归用例,bug-detective 流程)
- L6 综合项目的核心规则(计分/判定/胜负条件)

**可以不测**:
- 纯练习的一次性脚本(L0~L5 的演示代码)
- view 组件、场景搭建、动效(人工预览验证)
- 纯配置

原则:学习期不为覆盖率而测,**测"算不对会出事"的逻辑**;写测试本身也是练习(断言想清楚 = 行为想清楚)。
