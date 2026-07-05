const fs = require('fs');
let dataStr = fs.readFileSync('src/data.ts', 'utf8');

for (let d = 1; d <= 10; d++) {
  const dateStr = `2026-07-${String(d).padStart(2, '0')}`;
  const regexAsGroup = new RegExp(`"${dateStr}":\\s*{[^}]*AS_Group:\\s*"(Group [123])"`);
  const match = dataStr.match(regexAsGroup);
  if (match) console.log(dateStr, match[1]);
}
