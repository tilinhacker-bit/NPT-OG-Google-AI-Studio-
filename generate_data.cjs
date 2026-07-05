const fs = require('fs');

const group1 = ["Dr HMMM", "Dr NSDT"];
const group2 = ["Dr MTK", "Dr HMO"];
const group3 = ["Dr TKW", "Dr NLO"];

const groups = {
  "Group 1": group1,
  "Group 2": group2,
  "Group 3": group3
};

// Initial state so that the first WR from 6.7 onwards for each group gets swap=0
let swapState = {
  "Group 1": 1, // On 2.7 they get swap=1, on 8.7 they get swap=0
  "Group 2": 1, // On 1.7 they get swap=1, on 7.7 they get swap=0
  "Group 3": 1  // On 3.7 they get swap=1, on 6.7 they get swap=0
};

const getDutyGroup = (d) => {
  const mod = d % 3;
  if (mod === 0) return "Group 1";
  if (mod === 1) return "Group 3";
  if (mod === 2) return "Group 2";
};

const getWRGroup = (d) => {
  return getDutyGroup(d + 1);
};

const isWeekend = (d) => {
  const date = new Date(2026, 6, d);
  return date.getDay() === 0 || date.getDay() === 6;
};

const output = {};

for (let d = 1; d <= 31; d++) {
  const dutyGroup = getDutyGroup(d);
  const wrGroup = getWRGroup(d);
  
  let wr = null;
  if (!isWeekend(d)) {
    const doctors = groups[wrGroup];
    const swap = swapState[wrGroup];
    wr = {
      postop: doctors[swap],
      pn: doctors[1 - swap]
    };
    swapState[wrGroup] = 1 - swap;
  }

  output[`2026-07-${String(d).padStart(2, '0')}`] = {
    AS_Group: dutyGroup,
    WR: wr
  };
}

console.log(JSON.stringify(output, null, 2));
