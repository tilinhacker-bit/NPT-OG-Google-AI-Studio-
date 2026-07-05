const fs = require('fs');

const getDutyGroup = (d) => {
  const mod = d % 3;
  if (mod === 1) return "Group 3";
  if (mod === 2) return "Group 2";
  if (mod === 0) return "Group 1";
};

const wrData = {
  1: { postop: "Dr MTK", pn: "Dr HMO" },
  2: { postop: "Dr HMMM", pn: "Dr NSDT" },
  3: { postop: "Dr TKW", pn: "Dr NLO" },
  4: null,
  5: null,
  6: { postop: "Dr TKW", pn: "Dr NLO" },
  7: { postop: "Dr MTK", pn: "Dr HMO" },
  8: { postop: "Dr HMMM", pn: "Dr NSDT" },
  9: { postop: "Dr NLO", pn: "Dr TKW" },
  10: { postop: "Dr HMO", pn: "Dr MTK" },
  11: null,
  12: null,
  13: { postop: "Dr MTK", pn: "Dr HMO" },
  14: { postop: "Dr NSDT", pn: "Dr HMMM" },
  15: { postop: "Dr TKW", pn: "Dr NLO" },
  16: { postop: "Dr HMO", pn: "Dr MTK" },
  17: { postop: "Dr HMMM", pn: "Dr NSDT" },
  18: null,
  19: null,
  20: { postop: "Dr NSDT", pn: "Dr HMMM" },
  21: { postop: "Dr NLO", pn: "Dr TKW" },
  22: { postop: "Dr MTK", pn: "Dr HMO" },
  23: { postop: "Dr HMMM", pn: "Dr NSDT" },
  24: { postop: "Dr TKW", pn: "Dr NLO" },
  25: null,
  26: null,
  27: { postop: "Dr NLO", pn: "Dr TKW" },
  28: { postop: "Dr HMO", pn: "Dr MTK" },
  29: null, 
  30: { postop: "Dr TKW", pn: "Dr NLO" },
  31: { postop: "Dr MTK", pn: "Dr HMO" }
};

let dataStr = fs.readFileSync('src/data.ts', 'utf8');

for (let d = 1; d <= 31; d++) {
  const dateStr = `2026-07-${String(d).padStart(2, '0')}`;
  const asGroup = getDutyGroup(d);
  const wr = wrData[d];
  
  // Replace AS_Group
  const regexAsGroup = new RegExp(`("${dateStr}":\\s*{[^}]*AS_Group:\\s*)"Group [123]"`);
  dataStr = dataStr.replace(regexAsGroup, `$1"${asGroup}"`);
  
  // Replace WR
  const wrReplacement = wr === null ? 'null' : `{ postop: "${wr.postop}", pn: "${wr.pn}" }`;
  const regexWr = new RegExp(`("${dateStr}":\\s*{[^}]*WR:\\s*)(?:null|{[^}]+})(,)`);
  dataStr = dataStr.replace(regexWr, `$1${wrReplacement}$2`);
}

fs.writeFileSync('src/data.ts', dataStr);
