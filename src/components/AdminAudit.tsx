import React, { useMemo } from 'react';
import { Lock, ClipboardList } from 'lucide-react';
import { useStore } from '../store/useStore';
import { masterRoster } from '../utils/roster';

export function AdminAudit({ onLockDatabase }: { onLockDatabase: () => void }) {
  const { theme, userGroup, userRole } = useStore();

  const adminStats = useMemo(() => {
    const stats = {
      A: { Duty: 0, Off: 0, Pre: 0, Ord: 0, Rest: 0, Anes: 0, total: 0 },
      B: { Duty: 0, Off: 0, Pre: 0, Ord: 0, Rest: 0, Anes: 0, total: 0 },
      C: { Duty: 0, Off: 0, Pre: 0, Ord: 0, Rest: 0, Anes: 0, total: 0 },
      D: { Duty: 0, Off: 0, Pre: 0, Ord: 0, Rest: 0, Anes: 0, total: 0 }
    };

    const monthStats: { [month: number]: typeof stats } = {
      7: { A: { ...stats.A }, B: { ...stats.B }, C: { ...stats.C }, D: { ...stats.D } },
      8: { A: { ...stats.A }, B: { ...stats.B }, C: { ...stats.C }, D: { ...stats.D } },
      9: { A: { ...stats.A }, B: { ...stats.B }, C: { ...stats.C }, D: { ...stats.D } }
    };

    masterRoster.forEach(day => {
      ['A', 'B', 'C', 'D'].forEach(g => {
        const r = day.roles[g] as keyof typeof stats.A;
        if (stats[g as keyof typeof stats] && r in stats[g as keyof typeof stats]) {
          stats[g as keyof typeof stats][r]++;
          stats[g as keyof typeof stats].total++;
        }
        if (monthStats[day.month] && monthStats[day.month][g as keyof typeof stats] && r in monthStats[day.month][g as keyof typeof stats]) {
          monthStats[day.month][g as keyof typeof stats][r]++;
          monthStats[day.month][g as keyof typeof stats].total++;
        }
      });
    });

    return { grand: stats, monthly: monthStats };
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 p-6 rounded-[2rem] shadow-md flex justify-between items-center text-white border border-slate-700">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Lock className="h-5 w-5 text-amber-400" /> Master comparison
          </h2>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider mt-1">
            92-Day Duty Balance & Fairness Auditing
          </p>
        </div>
        <button 
          onClick={onLockDatabase} 
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-xs transition"
        >
          Lock Database
        </button>
      </div>

      <div className="bg-white p-5 rounded-[1.75rem] shadow-sm border border-slate-100">
        <h3 className="text-sm font-black text-slate-800 mb-3 uppercase tracking-wider flex items-center gap-1.5">
          <ClipboardList className="h-4 w-4 text-pink-500" /> Q3 Grand Total Breakdowns (92 Days)
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
                const s = adminStats.grand[g as keyof typeof adminStats.grand];
                return (
                  <tr key={g} className={`text-xs ${g === userGroup && userRole === "HO" ? "bg-pink-50/40 font-black" : ""}`}>
                    <td className="py-3 font-bold text-slate-700">Group {g}</td>
                    <td className="py-3 text-center font-extrabold" style={{ color: theme.Duty?.bg }}>{s.Duty}</td>
                    <td className="py-3 text-center font-extrabold" style={{ color: theme.Off?.bg }}>{s.Off}</td>
                    <td className="py-3 text-center font-extrabold" style={{ color: theme.Pre?.bg }}>{s.Pre}</td>
                    <td className="py-3 text-center font-extrabold" style={{ color: theme.Ord?.bg }}>{s.Ord}</td>
                    <td className="py-3 text-center font-extrabold" style={{ color: theme.Rest?.bg }}>{s.Rest}</td>
                    <td className="py-3 text-center font-extrabold" style={{ color: theme.Anes?.bg }}>{s.Anes}</td>
                    <td className="py-3 text-center font-bold text-slate-500">{s.total}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

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
    </div>
  );
}
