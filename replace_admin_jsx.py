import re

with open('src/components/AdminAudit.tsx', 'r') as f:
    content = f.read()

end_idx = content.find('    </div>\n  );\n}')

if end_idx != -1:
    new_content = content[:end_idx] + '''
      {/* Monthly Breakdowns */}
      {[7, 8, 9].map(m => (
        <div key={m} className="bg-white p-5 rounded-[1.75rem] shadow-sm border border-slate-100">
          <h3 className="text-sm font-black text-slate-800 mb-3 uppercase tracking-wider">
            {m === 7 ? "July" : m === 8 ? "August" : "September"} 2026 Summary
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[400px]">
              <thead>
                <tr className="border-b border-slate-100 text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">
                  <th className="py-2.5">Group</th>
                  <th className="py-2.5 text-center">Duty</th>
                  <th className="py-2.5 text-center">Off</th>
                  <th className="py-2.5 text-center">Pre</th>
                  <th className="py-2.5 text-center">Ord</th>
                  <th className="py-2.5 text-center">Rest</th>
                  <th className="py-2.5 text-center">ANA</th>
                  <th className="py-2.5 text-center">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {["A", "B", "C", "D"].map(g => {
                  const s = adminStats.monthly[m][g as keyof typeof adminStats.grand];
                  return (
                    <tr key={g} className={`text-xs ${g === userGroup && userRole === "HO" ? "bg-pink-50/40 font-black" : ""}`}>
                      <td className="py-3 font-bold text-slate-700">Group {g}</td>
                      <td className="py-3 text-center font-extrabold" style={{ color: theme.Duty?.bg }}>{s.Duty}</td>
                      <td className="py-3 text-center font-extrabold" style={{ color: theme.Off?.bg }}>{s.Off}</td>
                      <td className="py-3 text-center font-extrabold" style={{ color: theme.Pre?.bg }}>{s.Pre}</td>
                      <td className="py-3 text-center font-extrabold" style={{ color: theme.Ord?.bg }}>{s.Ord}</td>
                      <td className="py-3 text-center font-extrabold" style={{ color: theme.Rest?.bg }}>{s.Rest}</td>
                      <td className="py-3 text-center font-extrabold" style={{ color: theme.Anes?.bg }}>{s.Anes}</td>
                      <td className="py-3 text-center font-black text-slate-800">{s.total}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}
''' + content[end_idx:]
    with open('src/components/AdminAudit.tsx', 'w') as f:
        f.write(new_content)
    print("Replaced Admin Audit JSX successfully")
else:
    print("End not found")
