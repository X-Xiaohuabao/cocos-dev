---
name: git-workflow
description: |
  Git 版本控制规范(cocos-dev 学习仓库,单人开发版)。提交颗粒与 message 规范、
  逐文件 add、学习阶段 tag 对应、.gitignore 要点(Cocos 工程生成目录)、危险操作禁令。

  触发场景: 提交练习代码/笔记、写 commit message、建分支、回退改动、
  整理提交历史、配置 .gitignore。

  触发词: git、提交、commit、push、分支、branch、回滚、回退、revert、reset、
  merge、历史、暂存、gitignore、tag

  注意: 冲突解决与危险操作(reset --hard/clean)必须先确认;push 必须用户明确要求。
---

# Git 规范(cocos-dev 版)

## 仓库结构

- 学习仓库 = 单 Cocos 工程(仓库根即工程根,assets/ 与 .zcode/ 同级)
- 只有一个 `.git`(仓库根);`library/`、`temp/` 等生成目录不进 git(见 .gitignore)
- 远端私有仓库;**push 必须用户明确要求才执行**

## 提交规范

```
<type>(<scope>): <中文描述>

type: feat 新功能 / fix 修复 / refactor 重构 / test 测试 / docs 文档 /
      chore 构建·依赖·配置 / style 格式 / perf 性能
scope: 学习阶段或主题,如 l1、l2、notes、mcp、assets
```

示例:
```
feat(l1): ClickMove 练习——点击移动方块
docs(notes): L1 脚本生命周期笔记
fix(l2): 背包格复用时未重置显示内容
chore(mcp): 接入 cocos-mcp-server 插件
```

- 一提交一主题:练习能跑 + 笔记写完再提交;禁止"半成品提交后又连续 fix 自己"
- 练习 + 笔记分两笔提交(`feat(lx)` 与 `docs(notes)`),历史即学习进度线

## 提交操作纪律

- **逐文件 add**:只 add 本次改动涉及的具体文件,**禁止 `git add -A` / `git add .`**(防止带入 library/、临时文件、误下载的大资源)
- **不碰用户未提交的改动**:工作区有用户未暂存改动时,只提交自己改的文件
- **每次提交前看一眼** `git status` + `git diff --stat`,确认没有意外文件混入
- 敏感文件(`.env*`、`*.pem`、密钥)永不入库;发现已入库立即报告用户
- 场景 .scene/.prefab 是 JSON:提交前在编辑器里开一次确认无损坏(cocos-mcp 纪律)

## 分支模型(单人开发,从简)

- `main`:日常直接提交(单人学习仓库,无协作压力)
- **学习阶段完成打 tag**:`l0-editor`、`l2-ui`、`l6-mini-game` 这类,tag 名与路线表阶段对应(cocos-learning 阶段完成动作)
- 试验性大改(如重构练习框架)可开 `feat/xxx` 分支,验证后合回

## 危险操作矩阵

| 操作 | 规则 |
|---|---|
| `git reset --hard` / `git clean` | 🔴 禁止默认使用;必须先向用户确认丢弃范围 |
| `git push --force` | 🔴 禁止(master 上永不 force) |
| `git commit --amend` 已推送提交 | 🔴 禁止;未推送的 amend 也要先说明 |
| 丢弃未提交改动 | 先确认是否用户的工作,宁可 stash 不 delete |
| rebase 已推送历史 | 禁止 |

冲突解决:理解两边意图后手工合并,禁止"选一边覆盖另一边"式了事;合并后重新预览验证。

## .gitignore 要点(仓库根,已建)

Cocos 工程生成目录(`library/`、`temp/`、`local/`、`profiles/`、`build/`)、`node_modules/`、系统临时文件(`.DS_Store`、`Thumbs.db`、`nul`)、`*.log`、`.env*`;**保留**:assets/、extensions/(插件本体,不含其 node_modules)、settings/、package.json、.zcode/、docs/。
