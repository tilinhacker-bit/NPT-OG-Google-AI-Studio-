const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Insert import
code = code.replace(
  'import { AdminAudit } from "./components/AdminAudit";',
  'import { AdminAudit } from "./components/AdminAudit";\nimport { PostOpMonitoringCard } from "./components/PostOpMonitoringCard";'
);

// Insert the component into the Dashboard layout
// Find where Duty Notes are
const targetStr = '{/* OT List Section is buried under the codes for future activation when the user has the latest list and energy. */}\n                {/* <OTListWidget lang={lang} /> */}';
code = code.replace(targetStr, targetStr + '\n                <PostOpMonitoringCard />');

fs.writeFileSync('src/App.tsx', code);
