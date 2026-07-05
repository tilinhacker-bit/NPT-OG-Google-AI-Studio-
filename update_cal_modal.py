import re

with open('src/components/CalendarMatrix.tsx', 'r') as f:
    content = f.read()

# Update the Duty Info modal section to include SCS, JCS, SAS, AS_Group
info_old = """                    <p className="text-xs font-semibold text-slate-500 mt-1">
                      {DATA.dailyInfo[selectedDay.dateStr]?.SCS ? `SCS: ${DATA.dailyInfo[selectedDay.dateStr].SCS}` : "No specific info for this day"}
                    </p>"""

info_new = """                    <div className="mt-2 space-y-1">
                      <p className="text-xs font-semibold text-slate-500">
                        <span className="text-slate-400 w-8 inline-block">SCS:</span> {DATA.dailyInfo[selectedDay.dateStr]?.SCS || "-"}
                      </p>
                      <p className="text-xs font-semibold text-slate-500">
                        <span className="text-slate-400 w-8 inline-block">JCS:</span> {DATA.dailyInfo[selectedDay.dateStr]?.JCS || "-"}
                      </p>
                      <p className="text-xs font-semibold text-slate-500">
                        <span className="text-slate-400 w-8 inline-block">SAS:</span> {DATA.dailyInfo[selectedDay.dateStr]?.SAS || "-"}
                      </p>
                      <p className="text-xs font-semibold text-slate-500">
                        <span className="text-slate-400 w-8 inline-block">AS:</span> {DATA.dailyInfo[selectedDay.dateStr]?.AS_Group || "-"}
                      </p>
                    </div>"""

content = content.replace(info_old, info_new)

with open('src/components/CalendarMatrix.tsx', 'w') as f:
    f.write(content)
print("Updated CalendarMatrix modal info")
