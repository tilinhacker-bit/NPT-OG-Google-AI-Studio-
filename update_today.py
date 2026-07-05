import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Make expanded cards false by default
content = content.replace('"ho-super": true,', '"ho-super": false,')
content = content.replace('"as": true,', '"as": false,')

# Fix HO Super Card grid and remove phone
ho_super_old = """                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-black/20 border-t border-white/5 px-4 py-4 space-y-3.5 text-white"
                          >
                            {['Duty', 'Pre', 'Ord', 'Off', 'Anes', 'Rest'].map(role => {
                              const groups = ['A', 'B', 'C', 'D'].filter(g => rosterDay?.roles[g] === role);
                              if (groups.length === 0) return null;
                              return (
                                <div key={role} className="bg-black/25 rounded-xl p-3 border border-white/5">
                                  <p 
                                    className="font-bold uppercase tracking-wider text-[10px] mb-2 border-b border-white/10 pb-1"
                                    style={{ color: theme[role]?.bg }}
                                  >
                                    {LABELS[role] || role} Team
                                  </p>
                                  <div className="space-y-3">
                                    {groups.map(g => (
                                      <div key={g}>
                                        <div className="text-[10px] font-black uppercase opacity-75">Group {g}</div>
                                        <div className="space-y-1.5 mt-1">
                                          {(DATA.ho_directory[g] || []).map((doc: Contact) => (
                                            <div key={doc.name} className="flex justify-between items-center text-xs">
                                              <span className="font-semibold">⚕️ {translateName(doc.name, lang)}</span>
                                              <a 
                                                href={`tel:${doc.phone}`} 
                                                className="bg-white/15 hover:bg-white/25 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider transition flex items-center gap-1"
                                                onClick={(e) => e.stopPropagation()}
                                              >
                                                <Phone className="h-2.5 w-2.5" /> {doc.phone}
                                              </a>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                          </motion.div>"""

ho_super_new = """                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-black/20 border-t border-white/5 px-3 py-3 text-white"
                          >
                            <div className="grid grid-cols-2 gap-2">
                              {['Duty', 'Pre', 'Ord', 'Off', 'Anes', 'Rest'].map(role => {
                                const groups = ['A', 'B', 'C', 'D'].filter(g => rosterDay?.roles[g] === role);
                                if (groups.length === 0) return null;
                                return (
                                  <div key={role} className="bg-black/25 rounded-xl p-2.5 border border-white/5">
                                    <p 
                                      className="font-bold uppercase tracking-wider text-[9px] mb-1.5 border-b border-white/10 pb-1"
                                      style={{ color: theme[role]?.bg }}
                                    >
                                      {LABELS[role] || role} Team
                                    </p>
                                    <div className="space-y-2">
                                      {groups.map(g => (
                                        <div key={g}>
                                          <div className="text-[9px] font-black uppercase opacity-75 mb-0.5">Group {g}</div>
                                          <div className="space-y-1">
                                            {(DATA.ho_directory[g] || []).map((doc: Contact) => (
                                              <div key={doc.name} className="flex flex-col text-[10px]">
                                                <span className="font-semibold truncate">⚕️ {translateName(doc.name, lang)}</span>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </motion.div>"""

content = content.replace(ho_super_old, ho_super_new)

# Fix AS Team Super Card and remove phone
as_super_old = """                                  {dailyData ? (
                                    (DATA.as_directory[dailyData.AS_Group.replace("Group ", "")] || []).map((doc: Contact) => (
                                      <div key={doc.name} className="flex justify-between items-center">
                                        <span className="font-semibold">⚕️ AS {translateName(doc.name, lang)}</span>
                                        <a 
                                          href={`tel:${doc.phone}`} 
                                          className="bg-white/15 hover:bg-white/25 px-2 py-0.5 rounded font-bold tracking-wider transition flex items-center gap-1 text-[10px]"
                                          onClick={(e) => e.stopPropagation()}
                                        >
                                          <Phone className="h-2.5 w-2.5" /> {doc.phone}
                                        </a>
                                      </div>
                                    ))
                                  ) : null}"""

as_super_new = """                                  {dailyData ? (
                                    (DATA.as_directory[dailyData.AS_Group.replace("Group ", "")] || []).map((doc: Contact) => (
                                      <div key={doc.name} className="flex items-center">
                                        <span className="font-semibold">⚕️ AS {translateName(doc.name, lang)}</span>
                                      </div>
                                    ))
                                  ) : null}"""

content = content.replace(as_super_old, as_super_new)

with open('src/App.tsx', 'w') as f:
    f.write(content)
print("Updated App Today tab cards")
