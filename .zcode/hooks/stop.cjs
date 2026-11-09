#!/usr/bin/env node
/**
 * Stop Hook - Claude 回答结束时触发
 * 功能: 清理 Windows 下 `> nul` 误用产生的 nul 文件
 */

const fs = require('fs');

const findAndDeleteNul = (dir, depth = 0) => {
  if (depth > 5) return;
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = `${dir}\\${entry.name}`;
      if (entry.isFile() && entry.name === 'nul') {
        try { fs.unlinkSync(fullPath); } catch {}
      } else if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
        findAndDeleteNul(fullPath, depth + 1);
      }
    }
  } catch {}
};
findAndDeleteNul(process.cwd());

process.exit(0);
