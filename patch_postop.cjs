const fs = require('fs');
let code = fs.readFileSync('src/components/PostOpMonitoringCard.tsx', 'utf8');
code = code.replace(
  'import { Activity, Plus, Heart, HeartPulse, User } from "lucide-react";',
  'import { Activity, Plus, Heart, HeartPulse, User, X } from "lucide-react";'
);
code = code.replace(
  '<div className="text-xs font-bold text-slate-500 flex items-center gap-1.5">',
  '<div className="text-xs font-bold text-slate-500 flex items-center gap-1.5">'
);
code = code.replace(
  '<div className="flex gap-4">',
  '<div className="flex gap-4 items-center">\n                 <button onClick={() => handleRemove(p.id)} className="p-1.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">\n                   <X className="h-4 w-4" />\n                 </button>'
);
fs.writeFileSync('src/components/PostOpMonitoringCard.tsx', code);
