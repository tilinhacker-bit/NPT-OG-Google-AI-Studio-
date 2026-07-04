import re

with open('src/components/DirectoryTab.tsx', 'r') as f:
    content = f.read()

start = "          <h3 className=\"text-lg font-black text-slate-800 mb-2 flex items-center gap-2\">\n            <Users className=\"h-5 w-5 text-indigo-500\" /> Department Directory\n          </h3>"

new_contacts = '''          <h3 className="text-lg font-black text-slate-800 mb-2 flex items-center gap-2">
            <Users className="h-5 w-5 text-indigo-500" /> Department Directory
          </h3>
          
          <div className="space-y-4">
            {DATA.directory_layout.map((section, idx) => (
              <div key={idx} className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-slate-50 p-3 border-b border-slate-100 font-black text-slate-700 text-[10px] uppercase tracking-wider">
                  {section.header}
                </div>
                <div className="p-3 space-y-2">
                  {section.contacts.map((doc, i) => (
                    <div key={doc.name + i} className="flex justify-between items-center text-xs font-semibold text-slate-700">
                      <span className="truncate pr-1">{translateName(doc.name, lang)}</span>
                      {doc.phone && (
                        <a 
                          href={`tel:${doc.phone}`} 
                          className="bg-white text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 shadow-sm text-[9px] font-bold shrink-0"
                        >
                          📱 {doc.phone}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-slate-50 p-3 border-b border-slate-100 font-black text-slate-700 text-[10px] uppercase tracking-wider">
                Assistant Surgeons (AS)
              </div>
              <div className="p-3 space-y-4">
                {['1', '2', '3'].map(g => (
                  <div key={g}>
                    <div className="text-[10px] font-bold text-slate-400 mb-2">Group {g}</div>
                    <div className="space-y-2">
                      {(DATA.as_directory[g] || []).map((doc, i) => (
                        <div key={doc.name + i} className="flex justify-between items-center text-xs font-semibold text-slate-700">
                          <span className="truncate pr-1">{translateName(doc.name, lang)}</span>
                          {doc.phone && (
                            <a 
                              href={`tel:${doc.phone}`} 
                              className="bg-white text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 shadow-sm text-[9px] font-bold shrink-0"
                            >
                              📱 {doc.phone}
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-slate-50 p-3 border-b border-slate-100 font-black text-slate-700 text-[10px] uppercase tracking-wider">
                House Officers (HO)
              </div>
              <div className="p-3 space-y-4">
                {['A', 'B', 'C', 'D'].map(g => (
                  <div key={g}>
                    <div className="text-[10px] font-bold text-slate-400 mb-2">Group {g}</div>
                    <div className="space-y-2">
                      {(DATA.ho_directory[g] || []).map((doc, i) => (
                        <div key={doc.name + i} className="flex justify-between items-center text-xs font-semibold text-slate-700">
                          <span className="truncate pr-1">{translateName(doc.name, lang)}</span>
                          {doc.phone && (
                            <a 
                              href={`tel:${doc.phone}`} 
                              className="bg-white text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 shadow-sm text-[9px] font-bold shrink-0"
                            >
                              📱 {doc.phone}
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
'''

end = "        </div>\n      )}\n      {directoryTab === \"resources\" && ("

start_idx = content.find(start)
end_idx = content.find(end)

if start_idx != -1 and end_idx != -1:
    new_content = content[:start_idx] + new_contacts + content[end_idx:]
    with open('src/components/DirectoryTab.tsx', 'w') as f:
        f.write(new_content)
    print("Replaced successfully")
else:
    print("Not found")

