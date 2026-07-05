import re

with open('src/components/CalendarMatrix.tsx', 'r') as f:
    content = f.read()

old = """                      <p className="text-xs font-semibold text-slate-500">
                        <span className="text-slate-400 w-8 inline-block">SAS:</span> {DATA.dailyInfo[selectedDay.dateStr]?.SAS || "-"}
                      </p>"""

new = """                      <p className="text-xs font-semibold text-slate-500">
                        <span className="text-slate-400 w-8 inline-block">SAS:</span> {DATA.dailyInfo[selectedDay.dateStr]?.SAS || "-"}
                      </p>
                      {DATA.dailyInfo[selectedDay.dateStr]?.PG && (
                        <p className="text-xs font-semibold text-slate-500">
                          <span className="text-slate-400 w-8 inline-block">PG 2:</span> {translateName(DATA.dailyInfo[selectedDay.dateStr].PG, lang)}
                        </p>
                      )}"""

content = content.replace(old, new)

with open('src/components/CalendarMatrix.tsx', 'w') as f:
    f.write(content)
