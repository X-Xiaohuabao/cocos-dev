#!/usr/bin/env node
/**
 * PreToolUse Hook - 工具使用前拦截
 * 功能: 阻止危险命令(数据丢失/系统破坏),提醒敏感操作。
 * 输出: JSON decision "block" 阻止执行;其余放行。
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

const toolName = input.tool_name;
const toolInput = input.tool_input || {};
const command = (toolInput.command || '').toString();

const block = (reason) => {
  console.log(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision: 'block',
      permissionDecisionReason: reason
    }
  }));
  process.exit(0);
};

// ===== 数据库危险操作(数据不可逆丢失) =====
if (/\b(drop\s+(database|schema|table)\b|truncate\s+table\b)/i.test(command)) {
  block(`检测到数据库破坏性操作: ${command}\nDROP/TRUNCATE 会导致数据不可逆丢失。\n如确需执行,请用户手动确认后再操作。`);
}

// ===== 文件系统破坏性操作 =====
if (/(rm\s+-rf\s+[/~]|Remove-Item\s+-Recurse\s+-Force\s+[A-Za-z]:\\)/.test(command)) {
  block(`检测到高危删除命令: ${command}\n禁止递归强删根/家目录。请明确列出要删除的具体文件并征求用户同意。`);
}

// ===== Git 破坏性操作 =====
if (/git\s+push\s+.*--force|git\s+reset\s+--hard/.test(command)) {
  block(`检测到 Git 破坏性操作: ${command}\n强制推送/硬重置可能丢失工作成果,需用户明确要求才能执行。`);
}

// ===== 生产环境误操作提醒(允许执行但注入提醒) =====
if (/docker\s+(down|rm)\s/i.test(command) && !/dev/.test(command)) {
  console.log(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision: 'ask',
      permissionDecisionReason: '正在停止/删除 Docker 容器,确认是否影响用户正在使用的开发环境。'
    }
  }));
  process.exit(0);
}

process.exit(0);
