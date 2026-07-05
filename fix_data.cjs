const fs = require('fs');
let text = fs.readFileSync('src/data.ts', 'utf8');

text = text.replace(/WR: \{ postop: "([^"]+)", pn: "([^"]+)" \},[^,]+,/g, 'WR: { postop: "$1", pn: "$2" },');
fs.writeFileSync('src/data.ts', text);
