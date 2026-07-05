import re

with open('src/components/CalendarMatrix.tsx', 'r') as f:
    content = f.read()

# Remove phone link from AS Team in CalendarMatrix
cal_as_old = """                            <div key={doc.name} className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-100 shadow-sm">
                              <span className="text-xs font-semibold text-slate-700">{translateName(doc.name, lang)}</span>
                              {doc.phone && (
                                <a 
                                  href={`tel:${doc.phone}`} 
                                  className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded text-[9px] font-bold flex items-center gap-1"
                                >
                                  <Phone className="h-2.5 w-2.5" /> {doc.phone}
                                </a>
                              )}
                            </div>"""

cal_as_new = """                            <div key={doc.name} className="flex items-center bg-white p-2 rounded-lg border border-slate-100 shadow-sm">
                              <span className="text-xs font-semibold text-slate-700">{translateName(doc.name, lang)}</span>
                            </div>"""

content = content.replace(cal_as_old, cal_as_new)

with open('src/components/CalendarMatrix.tsx', 'w') as f:
    f.write(content)
print("Updated CalendarMatrix phones")
