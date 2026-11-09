#!/usr/bin/env node
/**
 * UserPromptSubmit Hook - 强制技能评估(ZCode 版,cocos-dev 学习仓库)
 * 功能: 每次用户提交请求时,注入技能清单并要求模型显式评估匹配项,
 *       将学习/开发规范(路线纪律/Cocos 纪律/MCP 用法)的遵循率保持在高水平。
 * 维护: 新增/删除 skill 后必须同步更新下方 SKILLS 列表和 AGENTS.md 的 Skills 索引表。
 */

const fs = require('fs');

let inputData = '';
try {
  inputData = fs.readFileSync(0, 'utf8');
} catch {
  process.exit(0);
}

let input;
try {
  input = JSON.parse(inputData);
} catch {
  process.exit(0);
}

const prompt = (input.prompt || '').trim();

// 恢复会话检测,防止上下文溢出死循环
const skipPatterns = [
  'continued from a previous conversation',
  'ran out of context',
  'No code restore',
  'Conversation compacted',
  'commands restored',
  'context window',
  'session is being continued'
];
const isRecoverySession = skipPatterns.some(p => prompt.toLowerCase().includes(p.toLowerCase()));
if (isRecoverySession) process.exit(0);

// 斜杠命令跳过(命令本身已是明确意图)
const isSlashCommand = /^\/[^/\s]+$/.test(prompt.split(/\s/)[0]);
const isExpandedCommand = /<command-name>/.test(prompt);
if (isSlashCommand || isExpandedCommand) process.exit(0);

// 纯闲聊/提问类内容跳过,减少噪音
const chattyPatterns = [/^(你好|hi|hello|谢谢|thanks|ok|好的|嗯)/i, /^(什么是|为什么)/];
if (chattyPatterns.some(p => p.test(prompt)) && prompt.length < 30) process.exit(0);

const SKILLS = `- cocos-learning: 学习路线/开始学习/继续学/下一阶段/练习安排/学习笔记/进度/带我学/学到哪了(L0~L7 总纲,学习会话入口)
- cocos-development: Cocos开发/组件/场景/预制体/节点/UI/resources加载/节点池/生命周期/tween/角色控制/分层(logic/view)
- cocos-mcp: MCP/cocos-mcp/编辑器控制/搭场景/建节点/挂组件/跑预览/MCP连不上/扩展面板(安装/使用/排查)
- game-assets: 模型/资产/美术/glb/gltf/贴图/Kenney/Quaternius/low-poly/风格/模型比例方向不对
- bug-detective: bug排查/报错/不工作/没反应/不显示/数据不对/动画不播(运行期行为错误)
- performance-doctor: 性能/卡/FPS/drawcall/内存/优化/加载慢/卡顿/合批/图集
- test-development: 测试/单测/Vitest/断言/回归用例(logic 纯逻辑层)
- git-workflow: git/提交/commit/分支/回滚/revert/历史/暂存/gitignore/tag(阶段里程碑)`;

const instructions = `## 强制技能激活流程(必须执行)

### 步骤 1 - 评估(必须在响应开头明确展示)

针对用户任务,列出匹配的技能:\`技能名: 理由\`,无匹配则写"无匹配技能"。可匹配多个。

可用技能:
${SKILLS}

### 步骤 2 - 激活

匹配到技能后,必须先读取 \`.zcode/skills/<技能名>/SKILL.md\` 并严格遵循其中的规范再动手。

### 步骤 3 - 纪律自检

任何涉及代码编写的任务,响应中需对照 AGENTS.md「Cocos 开发纪律」自查是否触及;学习类任务另对照「学习纪律」(不跳级/练习必亲手做/笔记必写);触及到的纪律必须在方案中说明如何遵守。不触及则不必赘述。`;

// 通过 JSON 输出 additionalContext 注入指令
console.log(JSON.stringify({
  hookSpecificOutput: {
    hookEventName: 'UserPromptSubmit',
    additionalContext: instructions
  }
}));
