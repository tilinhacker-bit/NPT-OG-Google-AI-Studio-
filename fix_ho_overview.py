import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

old = """                          <div className="flex flex-wrap gap-2.5 text-xs font-black">
                            {['A', 'B', 'C', 'D'].map(g => {
                              const r = rosterDay ? rosterDay.roles[g] : 'Off';
                              return (
                                <span key={g} className="px-2 py-0.5 rounded bg-black/15 border border-white/5 flex items-center gap-1">
                                  <span className="opacity-60">{g}:</span> 
                                  <span style={{ color: theme[r]?.bg }} className="font-extrabold">
                                    {HO_SHORT_LABELS[r] || r}
                                  </span>
                                </span>
                              );
                            })}
                          </div>"""

new = """                          <div className="grid grid-cols-4 gap-1 text-[9px] sm:text-[10px] font-black w-full pr-2">
                            {['A', 'B', 'C', 'D'].map(g => {
                              const r = rosterDay ? rosterDay.roles[g] : 'Off';
                              return (
                                <span key={g} className="px-1.5 py-1 rounded bg-black/15 border border-white/5 flex justify-center items-center gap-1">
                                  <span className="opacity-60">{g}:</span> 
                                  <span style={{ color: theme[r]?.bg }} className="font-extrabold truncate">
                                    {HO_SHORT_LABELS[r] || r}
                                  </span>
                                </span>
                              );
                            })}
                          </div>"""

content = content.replace(old, new)
with open('src/App.tsx', 'w') as f:
    f.write(content)
