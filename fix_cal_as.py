import re

with open('src/components/CalendarMatrix.tsx', 'r') as f:
    content = f.read()

old = """                      <p className="text-xs font-semibold text-slate-500">
                        <span className="text-slate-400 w-8 inline-block">SAS:</span> {DATA.dailyInfo[selectedDay.dateStr]?.SAS || "-"}
                      </p>
                      <div className="pt-3 border-t border-slate-200/60 mt-3">
                        <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                          <div className="bg-white p-2 rounded-lg border border-slate-100 flex justify-between items-center shadow-sm">
                            <span className="text-slate-400">AS Gp:</span>
                            <span className="text-indigo-600">{DATA.dailyInfo[selectedDay.dateStr]?.AS_Group?.replace('Group ', '') || "-"}</span>
                          </div>
                          {['A', 'B', 'C', 'D'].map(g => (
                            <div key={g} className="bg-white p-2 rounded-lg border border-slate-100 flex justify-between items-center shadow-sm">
                              <span className="text-slate-400">{g}:</span>
                              <span className="text-slate-700">{HO_SHORT_LABELS[selectedDay.roles[g] || "Off"]}</span>
                            </div>
                          ))}
                        </div>
                      </div>"""

new = """                      <p className="text-xs font-semibold text-slate-500">
                        <span className="text-slate-400 w-8 inline-block">SAS:</span> {DATA.dailyInfo[selectedDay.dateStr]?.SAS || "-"}
                      </p>
                      <p className="text-xs font-semibold text-slate-500">
                        <span className="text-slate-400 w-8 inline-block">AS (G{DATA.dailyInfo[selectedDay.dateStr]?.AS_Group?.replace('Group ', '') || "-"}):</span> 
                        {DATA.dailyInfo[selectedDay.dateStr]?.AS_Group ? (
                          (DATA.as_directory[DATA.dailyInfo[selectedDay.dateStr].AS_Group.replace('Group ', '') as keyof typeof DATA.as_directory] || []).map((doc: any) => translateName(doc.name, lang)).join(', ')
                        ) : "-"}
                      </p>
                      <div className="pt-3 border-t border-slate-200/60 mt-3">
                        <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                          {['A', 'B', 'C', 'D'].map(g => (
                            <div key={g} className="bg-white p-2 rounded-lg border border-slate-100 flex justify-between items-center shadow-sm">
                              <span className="text-slate-400">{g}:</span>
                              <span className="text-slate-700">{HO_SHORT_LABELS[selectedDay.roles[g] || "Off"]}</span>
                            </div>
                          ))}
                        </div>
                      </div>"""

content = content.replace(old, new)

with open('src/components/CalendarMatrix.tsx', 'w') as f:
    f.write(content)
print("Updated Calendar Modal AS")
