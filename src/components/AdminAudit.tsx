import React, { useMemo } from "react";
import { Lock, ClipboardList, Activity } from "lucide-react";
import { useStore } from "../store/useStore";
import { masterRoster } from "../utils/roster";

export function AdminAudit({
  onLockDatabase,
  activeDateStr,
}: {
  onLockDatabase: () => void;
  activeDateStr: string;
}) {
  const { theme, userGroup, userRole } = useStore();

  const groupStats = useMemo(() => {
    const stats = {
      A: {
        total: { Duty: 0, Off: 0, Pre: 0, Ord: 0, Rest: 0, Anes: 0 },
        remaining: { Duty: 0, Off: 0, Pre: 0, Ord: 0, Rest: 0, Anes: 0 },
      },
      B: {
        total: { Duty: 0, Off: 0, Pre: 0, Ord: 0, Rest: 0, Anes: 0 },
        remaining: { Duty: 0, Off: 0, Pre: 0, Ord: 0, Rest: 0, Anes: 0 },
      },
      C: {
        total: { Duty: 0, Off: 0, Pre: 0, Ord: 0, Rest: 0, Anes: 0 },
        remaining: { Duty: 0, Off: 0, Pre: 0, Ord: 0, Rest: 0, Anes: 0 },
      },
      D: {
        total: { Duty: 0, Off: 0, Pre: 0, Ord: 0, Rest: 0, Anes: 0 },
        remaining: { Duty: 0, Off: 0, Pre: 0, Ord: 0, Rest: 0, Anes: 0 },
      },
    };

    masterRoster.forEach((day) => {
      const isFuture = day.dateStr >= activeDateStr;

      ["A", "B", "C", "D"].forEach((g) => {
        const r = day.roles[g] as keyof typeof stats.A.total;
        if (
          stats[g as keyof typeof stats] &&
          r in stats[g as keyof typeof stats].total
        ) {
          stats[g as keyof typeof stats].total[r]++;
          if (isFuture) {
            stats[g as keyof typeof stats].remaining[r]++;
          }
        }
      });
    });

    return stats;
  }, [activeDateStr]);

  const groups = ["A", "B", "C", "D"] as const;

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
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-xs transition shadow-sm"
        >
          Lock Database
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {groups.map((g) => {
          const s = groupStats[g];
          const isUserGroup = g === userGroup && userRole === "HO";
          return (
            <div
              key={g}
              className={`bg-white p-5 rounded-[1.75rem] shadow-sm border ${isUserGroup ? "border-pink-200 bg-pink-50/10" : "border-slate-100"}`}
            >
              <h3
                className={`text-sm font-black mb-3 uppercase tracking-wider flex items-center gap-1.5 ${isUserGroup ? "text-pink-600" : "text-slate-800"}`}
              >
                <Activity
                  className={`h-4 w-4 ${isUserGroup ? "text-pink-500" : "text-indigo-500"}`}
                />
                Group {g} {isUserGroup && "(You)"}
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">
                      <th className="py-2">Role</th>
                      <th className="py-2 text-center">Total (92D)</th>
                      <th className="py-2 text-center">Remaining</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {(
                      ["Duty", "Off", "Pre", "Ord", "Rest", "Anes"] as const
                    ).map((role) => (
                      <tr key={role} className="text-xs">
                        <td
                          className="py-2.5 font-extrabold"
                          style={{ color: theme[role]?.text }}
                        >
                          {role}
                        </td>
                        <td className="py-2.5 text-center font-bold text-slate-600">
                          {s.total[role]}
                        </td>
                        <td className="py-2.5 text-center font-black text-slate-800">
                          {s.remaining[role]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
