import React, { useMemo } from "react";
import { ClipboardList, Calendar, BarChart3 } from "lucide-react";
import { useStore } from "../store/useStore";
import { masterRoster } from "../utils/roster";

export function AdminAudit({
  activeDateStr,
  onLockDatabase,
}: {
  activeDateStr: string;
  onLockDatabase?: () => void;
}) {
  const { theme } = useStore();

  const stats = useMemo(() => {
    const initCounts = () => ({
      Duty: 0,
      Off: 0,
      Pre: 0,
      Ord: 0,
      Rest: 0,
      Anes: 0,
    });

    const data: Record<string, Record<string, ReturnType<typeof initCounts>>> = {
      all: {
        A: initCounts(),
        B: initCounts(),
        C: initCounts(),
        D: initCounts(),
      },
      7: {
        A: initCounts(),
        B: initCounts(),
        C: initCounts(),
        D: initCounts(),
      },
      8: {
        A: initCounts(),
        B: initCounts(),
        C: initCounts(),
        D: initCounts(),
      },
      9: {
        A: initCounts(),
        B: initCounts(),
        C: initCounts(),
        D: initCounts(),
      },
    };

    masterRoster.forEach((day) => {
      const m = day.month; // 7, 8, 9
      ["A", "B", "C", "D"].forEach((g) => {
        const r = day.roles[g] as keyof ReturnType<typeof initCounts>;
        if (r && data[m] && data[m][g] && r in data[m][g]) {
          data[m][g][r]++;
          data.all[g][r]++;
        }
      });
    });

    return data;
  }, []);

  const roles = ["Duty", "Off", "Pre", "Ord", "Rest", "Anes"] as const;
  const groups = ["A", "B", "C", "D"] as const;

  // Compute total counts across all groups for each role
  const getRoleAllGroupsTotal = (monthKey: string | number, role: typeof roles[number]) => {
    return groups.reduce((acc, g) => acc + stats[monthKey][g][role], 0);
  };

  const monthNames: Record<number, string> = {
    7: "July 2026",
    8: "August 2026",
    9: "September 2026",
  };

  return (
    <div className="space-y-8">
      {/* 1. HEADER */}
      <div className="bg-slate-900 p-6 rounded-[2rem] shadow-xl text-white border border-slate-800">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-indigo-600/20 text-indigo-400 rounded-2xl border border-indigo-500/20">
            <ClipboardList className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tight">
              92-Day Full Roster & Database Comparison
            </h2>
            <p className="text-slate-400 font-bold text-xs mt-1">
              Side-by-side distribution analysis and shift balance audit for Groups A, B, C, and D.
            </p>
          </div>
        </div>
      </div>

      {/* 2. MEGA SUMMARY TABLE */}
      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <BarChart3 className="h-5 w-5 text-indigo-500" />
          <h3 className="text-base font-black text-slate-800">
            Mega Table Summary (All 92 Days Combined)
          </h3>
        </div>
        
        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Role / Status</th>
                <th className="py-3.5 px-4 text-center">Group A</th>
                <th className="py-3.5 px-4 text-center">Group B</th>
                <th className="py-3.5 px-4 text-center">Group C</th>
                <th className="py-3.5 px-4 text-center">Group D</th>
                <th className="py-3.5 px-4 text-center bg-slate-100/50 text-slate-700">Total (All Groups)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {roles.map((role) => {
                const totalAll = getRoleAllGroupsTotal("all", role);
                return (
                  <tr key={role} className="hover:bg-slate-50/50 transition">
                    <td className="py-3 px-4 text-xs">
                      <span
                        className="inline-block px-2.5 py-1 rounded-full text-xs font-black shadow-sm"
                        style={{
                          backgroundColor: theme[role]?.bg || "#cbd5e1",
                          color: theme[role]?.text || "#1e293b",
                        }}
                      >
                        {role}
                      </span>
                    </td>
                    {groups.map((g) => (
                      <td key={g} className="py-3 px-4 text-center text-xs font-bold text-slate-600">
                        {stats.all[g][role]}
                      </td>
                    ))}
                    <td className="py-3 px-4 text-center text-xs font-black text-slate-900 bg-slate-50/50">
                      {totalAll}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. MONTHLY COMPARISON TABLES */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-indigo-500" />
          <h3 className="text-base font-black text-slate-800">
            Monthly Database Breakdown
          </h3>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {([7, 8, 9] as const).map((m) => (
            <div key={m} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-black text-slate-700 mb-3 border-b border-slate-100 pb-2">
                  {monthNames[m]}
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">
                        <th className="py-2">Role</th>
                        <th className="py-2 text-center">G-A</th>
                        <th className="py-2 text-center">G-B</th>
                        <th className="py-2 text-center">G-C</th>
                        <th className="py-2 text-center">G-D</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {roles.map((role) => (
                        <tr key={role} className="hover:bg-slate-50/30 transition text-xs">
                          <td className="py-2">
                            <span
                              className="inline-block px-2 py-0.5 rounded-full text-[10px] font-black shadow-sm"
                              style={{
                                backgroundColor: theme[role]?.bg || "#cbd5e1",
                                color: theme[role]?.text || "#1e293b",
                              }}
                            >
                              {role}
                            </span>
                          </td>
                          {groups.map((g) => (
                            <td key={g} className="py-2 text-center font-bold text-slate-600">
                              {stats[m][g][role]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
