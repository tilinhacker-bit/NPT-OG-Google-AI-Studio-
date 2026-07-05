import re

with open('src/components/CalendarMatrix.tsx', 'r') as f:
    content = f.read()

# Make sure translateName is imported
if 'translateName' not in content:
    content = content.replace("import { DATA } from '../data';", "import { DATA } from '../data';\nimport { translateName } from './DirectoryTab';")
    content = content.replace("import { Phone } from 'lucide-react';", "import { Phone } from 'lucide-react';") # Let's see if Phone is there
    
    # We need Phone from lucide-react if not present
    if 'Phone' not in content:
        imports = re.search(r"import \{.*?\} from ['\"]lucide-react['\"];", content)
        if imports:
            imp_str = imports.group(0).replace("}", ", Phone }")
            content = content.replace(imports.group(0), imp_str)

info_old = """                      <p className="text-xs font-semibold text-slate-500">
                        <span className="text-slate-400 w-8 inline-block">AS:</span> {DATA.dailyInfo[selectedDay.dateStr]?.AS_Group || "-"}
                      </p>"""

info_new = """                      <div className="pt-2 border-t border-slate-200/60 mt-2">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">AS Team ({DATA.dailyInfo[selectedDay.dateStr]?.AS_Group || "-"})</p>
                        <div className="space-y-1.5">
                          {DATA.dailyInfo[selectedDay.dateStr]?.AS_Group && DATA.as_directory[DATA.dailyInfo[selectedDay.dateStr].AS_Group.replace('Group ', '') as keyof typeof DATA.as_directory]?.map((doc: any) => (
                            <div key={doc.name} className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-100 shadow-sm">
                              <span className="text-xs font-semibold text-slate-700">{translateName(doc.name, lang)}</span>
                              {doc.phone && (
                                <a 
                                  href={`tel:${doc.phone}`} 
                                  className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded text-[9px] font-bold flex items-center gap-1"
                                >
                                  <Phone className="h-2.5 w-2.5" /> {doc.phone}
                                </a>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>"""

content = content.replace(info_old, info_new)

with open('src/components/CalendarMatrix.tsx', 'w') as f:
    f.write(content)
print("Updated CalendarMatrix with full AS names")
