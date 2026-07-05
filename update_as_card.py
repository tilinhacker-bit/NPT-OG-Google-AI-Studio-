import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# I need to add a helper function getInitials at the top
if 'function getInitials' not in content:
    init_func = """function getInitials(name: string): string {
  let cleanName = name.replace(/Dr\\.?\\s*/ig, '').trim();
  return cleanName.split(/\\s+/).map(part => part[0]?.toUpperCase()).join('');
}

"""
    content = content.replace("function translateName", init_func + "function translateName")

# Add PG right after SAS
sas_old = """                      <div className="bg-black/10 backdrop-blur-sm rounded-2xl border border-white/10 dark:border-white/40 dark:shadow-[0_0_10px_rgba(255,255,255,0.05)] p-3.5">
                        <p className="text-[9px] font-bold uppercase tracking-wider opacity-70 mb-1">Senior Assistant Surgeon (SAS)</p>
                        <p className="font-extrabold text-sm leading-tight">
                          {dailyData?.SAS !== "-" ? translateName(dailyData?.SAS || "", lang) : "N/A"}
                        </p>
                      </div>"""

pg_block = """                      {dailyData?.PG && (
                        <div className="bg-black/10 backdrop-blur-sm rounded-2xl border border-white/10 dark:border-white/40 dark:shadow-[0_0_10px_rgba(255,255,255,0.05)] p-3.5">
                          <p className="text-[9px] font-bold uppercase tracking-wider opacity-70 mb-1">Postgraduate (PG 2)</p>
                          <p className="font-extrabold text-sm leading-tight">
                            {translateName(dailyData.PG, lang)}
                          </p>
                        </div>
                      )}"""

content = content.replace(sas_old, sas_old + "\n\n" + pg_block)

# Replace AS Card
as_old = """                      {/* AS Team & Ward Round Super Card */}
                      <div 
                        onClick={() => toggleCard("as")}
                        className="bg-black/10 backdrop-blur-sm rounded-2xl border border-white/10 dark:border-white/40 dark:shadow-[0_0_10px_rgba(255,255,255,0.05)] cursor-pointer hover:bg-black/15 transition-all duration-300 dark:hover:scale-[1.02] overflow-hidden"
                      >
                        <div className="p-3.5 flex justify-between items-center">
                          <div>
                            <p className="text-[9px] font-bold uppercase tracking-wider opacity-70 mb-1">AS Team & Ward Round</p>
                            <p className="font-extrabold text-sm leading-tight">
                              {dailyData ? `Duty Team: Gp ${dailyData.AS_Group.replace("Group ", "")}` : "N/A"}
                            </p>
                          </div>
                          <div>
                            {expandedCards["as"] ? <ChevronUp className="h-4 w-4 opacity-60" /> : <ChevronDown className="h-4 w-4 opacity-60" />}
                          </div>
                        </div>

                        <AnimatePresence>
                          {expandedCards["as"] && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="px-3.5 pb-4 pt-1 border-t border-white/5 text-xs text-white/90 leading-relaxed space-y-3.5 bg-black/10"
                            >
                              <div>
                                <span className="font-bold uppercase tracking-wider text-[9px] opacity-60 block mb-1.5">Duty Surgeons</span>
                                <div className="space-y-2">
                                  {dailyData ? (
                                    (DATA.as_directory[dailyData.AS_Group.replace("Group ", "")] || []).map((doc: Contact) => (
                                      <div key={doc.name} className="flex flex-col text-[10px]">
                                        <span className="font-semibold">⚕️ AS {translateName(doc.name, lang)}</span>
                                      </div>
                                    ))
                                  ) : (
                                    <span className="opacity-60">No surgeon scheduled</span>
                                  )}
                                </div>
                              </div>

                              {dailyData?.WR && (
                                <div className="pt-2 border-t border-white/5">
                                  <span className="font-bold uppercase tracking-wider text-[9px] opacity-60 block mb-1">Ward Round assignments</span>
                                  <div className="grid grid-cols-2 gap-2 mt-1.5">
                                    <div className="bg-black/15 p-2 rounded-lg border border-white/5">
                                      <span className="block text-[8px] uppercase tracking-widest opacity-60">Post-Op Ward</span>
                                      <span className="font-extrabold text-white text-xs">{dailyData.WR.postop}</span>
                                    </div>
                                    <div className="bg-black/15 p-2 rounded-lg border border-white/5">
                                      <span className="block text-[8px] uppercase tracking-widest opacity-60">PN Ward</span>
                                      <span className="font-extrabold text-white text-xs">{dailyData.WR.pn}</span>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>"""

as_new = """                      {/* AS Team & Ward Round Super Card */}
                      <div 
                        onClick={() => toggleCard("as")}
                        className="bg-black/10 backdrop-blur-sm rounded-2xl border border-white/10 dark:border-white/40 dark:shadow-[0_0_10px_rgba(255,255,255,0.05)] cursor-pointer hover:bg-black/15 transition-all duration-300 dark:hover:scale-[1.02] overflow-hidden"
                      >
                        <div className="p-3.5 flex justify-between items-center">
                          <div className="flex-1 pr-2">
                            <p className="text-[9px] font-bold uppercase tracking-wider opacity-70 mb-1">AS Team & Ward Round</p>
                            <p className="font-extrabold text-xs sm:text-sm leading-tight break-words">
                              {dailyData ? (
                                <>
                                  Gp {dailyData.AS_Group.replace("Group ", "")} (
                                  {(DATA.as_directory[dailyData.AS_Group.replace("Group ", "")] || []).map((doc: Contact) => "Dr. " + getInitials(doc.name)).join(" & ")})
                                </>
                              ) : "N/A"}
                            </p>
                          </div>
                          <div>
                            {expandedCards["as"] ? <ChevronUp className="h-4 w-4 opacity-60 shrink-0" /> : <ChevronDown className="h-4 w-4 opacity-60 shrink-0" />}
                          </div>
                        </div>

                        <AnimatePresence>
                          {expandedCards["as"] && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="px-3.5 pb-4 pt-1 border-t border-white/5 text-xs text-white/90 leading-relaxed space-y-3.5 bg-black/10"
                            >
                              <div>
                                <span className="font-bold uppercase tracking-wider text-[9px] opacity-60 block mb-1.5">Duty Surgeons</span>
                                <div className="space-y-2">
                                  {dailyData ? (
                                    (DATA.as_directory[dailyData.AS_Group.replace("Group ", "")] || []).map((doc: Contact) => (
                                      <div key={doc.name} className="flex flex-col text-[10px]">
                                        <span className="font-semibold">⚕️ AS {translateName(doc.name, lang)}</span>
                                      </div>
                                    ))
                                  ) : (
                                    <span className="opacity-60">No surgeon scheduled</span>
                                  )}
                                </div>
                              </div>
                              
                              {/* Ordinary Surgeons */}
                              {(!isWeekend(mNum, dNum) && !isHoliday(mNum, dNum) && dailyData) && (
                                <div className="pt-2 border-t border-white/5">
                                  <span className="font-bold uppercase tracking-wider text-[9px] opacity-60 block mb-1.5">Ordinary Surgeons</span>
                                  <div className="space-y-2">
                                    {['1', '2', '3'].filter(g => g !== dailyData.AS_Group.replace("Group ", "")).map(g => (
                                      <div key={g} className="mb-2">
                                        <span className="font-bold text-[9px] opacity-80">Gp {g}</span>
                                        <div className="mt-1 space-y-1">
                                          {(DATA.as_directory[g] || []).map((doc: Contact) => (
                                            <div key={doc.name} className="flex flex-col text-[10px]">
                                              <span className="font-semibold">⚕️ AS {translateName(doc.name, lang)}</span>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {dailyData?.WR && (
                                <div className="pt-2 border-t border-white/5">
                                  <span className="font-bold uppercase tracking-wider text-[9px] opacity-60 block mb-1">Ward Round assignments</span>
                                  <div className="grid grid-cols-2 gap-2 mt-1.5">
                                    <div className="bg-black/15 p-2 rounded-lg border border-white/5">
                                      <span className="block text-[8px] uppercase tracking-widest opacity-60">Post-Op Ward</span>
                                      <span className="font-extrabold text-white text-xs">{dailyData.WR.postop}</span>
                                    </div>
                                    <div className="bg-black/15 p-2 rounded-lg border border-white/5">
                                      <span className="block text-[8px] uppercase tracking-widest opacity-60">PN Ward</span>
                                      <span className="font-extrabold text-white text-xs">{dailyData.WR.pn}</span>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>"""

content = content.replace(as_old, as_new)

with open('src/App.tsx', 'w') as f:
    f.write(content)

