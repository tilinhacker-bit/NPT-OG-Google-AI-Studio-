const fs = require('fs');

const isWeekendOrHoliday = (d) => {
  const date = new Date(2026, 6, d);
  const day = date.getDay();
  if (day === 0 || day === 6) return true;
  if (d === 29) return true; // Full Moon of Waso
  return false;
};

// Based on Duty being Group 1 on 1.7, Group 2 on 2.7, Group 3 on 3.7
const getDutyGroupNum = (d) => {
  const mod = d % 3;
  if (mod === 1) return 1;
  if (mod === 2) return 2;
  if (mod === 0) return 3;
};

// WR group is the one on Duty the NEXT day
const getWRGroupNum = (d) => getDutyGroupNum(d + 1);

const groupDocs = {
  1: ["Dr TKW", "Dr NLO"],
  2: ["Dr MTK", "Dr HMO"],
  3: ["Dr HMMM", "Dr NSDT"]
};

// Aligning to match the image:
// Group 1 on 6.7: TKW, NLO (swap 0) => 3.7 must be swap 1
// Group 2 on 7.7: MTK, HMO (swap 0) => 1.7 must be swap 1
// Group 3 on 8.7: HMMM, NSDT (swap 0) => 2.7 must be swap 1
const swapState = {
  1: 1, 
  2: 1, 
  3: 1  
};

const output = {};

for (let d = 1; d <= 31; d++) {
  const dutyNum = getDutyGroupNum(d);
  const wrNum = getWRGroupNum(d);
  
  let wr = null;
  if (!isWeekendOrHoliday(d)) {
    const docs = groupDocs[wrNum];
    const swap = swapState[wrNum];
    wr = {
      postop: docs[swap],
      pn: docs[1 - swap]
    };
    swapState[wrNum] = 1 - swap;
  }
  
  output[`2026-07-${String(d).padStart(2, '0')}`] = {
    AS_Group: `Group ${dutyNum}`,
    WR: wr
  };
}

let dataStr = fs.readFileSync('src/data.ts', 'utf8');

for (let d = 1; d <= 31; d++) {
  const dateStr = `2026-07-${String(d).padStart(2, '0')}`;
  const replacement = output[dateStr];
  
  const regexAsGroup = new RegExp(`("${dateStr}":\\s*{[^}]*AS_Group:\\s*)"Group [123]"`);
  dataStr = dataStr.replace(regexAsGroup, `$1"${replacement.AS_Group}"`);
  
  const wrReplacement = replacement.WR === null ? 'null' : `{ postop: "${replacement.WR.postop}", pn: "${replacement.WR.pn}" }`;
  const regexWr = new RegExp(`("${dateStr}":\\s*{[^}]*WR:\\s*)(?:null|{[^}]+})(,)`);
  dataStr = dataStr.replace(regexWr, `$1${wrReplacement}$2`);
}

// Fix as_directory groups
dataStr = dataStr.replace(/"1": \[\s*{\s*name: "Dr\. Han Myint Mo Mo"[^\]]+\]/m, 
`"1": [
      { name: "Dr. Thukha Wynn", phone: "09424752640" },
      { name: "Dr. Nay Linn Oo", phone: "09793519374" },
    ]`);
    
dataStr = dataStr.replace(/"3": \[\s*{\s*name: "Dr\. Thukha Wynn"[^\]]+\]/m, 
`"3": [
      { name: "Dr. Han Myint Mo Mo", phone: "09261618203" },
      { name: "Dr. Nan Sandar Tun", phone: "09262779715" },
    ]`);

fs.writeFileSync('src/data.ts', dataStr);
console.log("Success");
