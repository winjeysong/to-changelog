const { H4 } = require('./md-syntax').H;

module.exports = {
  FEAT: `${H4} ✨ 新功能`,
  FIX: `${H4} 🐛 修复`,
  DOCS: `${H4} 📝 文档`,
  STYLE: `${H4} 💄 样式`,
  REFACTOR: `${H4} ♻️ 重构`,
  TEST: `${H4} ✅ 测试`,
  CHORE: `${H4} 👷 构建工具或辅助性工具`,
  PERF: `${H4} ⚡️ 优化`,
  OTHERS: `${H4} 🔣 其他`,
};