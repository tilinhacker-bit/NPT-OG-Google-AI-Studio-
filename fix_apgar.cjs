const fs = require('fs');
let code = fs.readFileSync('src/components/OBGYNCalculators.tsx', 'utf8');
code = code.replace(
  'const apgarScore = Object.values(apgarScores).reduce((a: number, b: number) => a + b, 0);',
  'const apgarScore: number = Object.values(apgarScores).reduce<number>((a, b) => a + Number(b), 0);'
);
fs.writeFileSync('src/components/OBGYNCalculators.tsx', code);
