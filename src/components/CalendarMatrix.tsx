import React, { useMemo, useState, useRef } from 'react';
import { Heart, Camera } from 'lucide-react';
import html2canvas from 'html2canvas';
import { useStore } from '../store/useStore';
import { masterRoster } from '../utils/roster';
import { DATA } from '../data';

const LABELS: { [key: string]: string } = {
  'Duty': 'Duty',
  'Pre': 'Pre-Duty',
  'Ord': 'Ordinary',
  'Off': 'Night Off',
  'Rest': 'Day Off',
  'Anes': 'ANA'
};

const HO_SHORT_LABELS: Record<string, string> = {
  'Duty': 'Duty',
  'Pre': 'Pre-D',
  'Ord': 'Ord',
  'Off': 'NOF',
  'Rest': 'DOF',
  'Anes': 'ANA'
};

export function CalendarMatrix() {
  const captureRef = useRef<HTMLDivElement>(null);
  
  const handleCapture = async () => {
    if (!captureRef.current) return;
    try {
      const canvas = await html2canvas(captureRef.current, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `roster-${calMonth}-2026.png`;
      link.click();
    } catch (err) {
      console.error('Failed to capture screenshot', err);
    }
  };
  const { userRole, userGroup, theme } = useStore();
  const [calMonth, setCalMonth] = useState<number>(7);

  const calendarPadding = useMemo(() => {
    return new Date(2026, calMonth - 1, 1).getDay();
  }, [calMonth]);

  const activeMonthDays = useMemo(() => {
    return masterRoster.filter(d => d.month === calMonth);
  }, [calMonth]);

  const todayDate = new Date();
  const todayDateStr = `${todayDate.getFullYear()}-${String(todayDate.getMonth() + 1).padStart(2, '0')}-${String(todayDate.getDate()).padStart(2, '0')}`;

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        <div className="flex-grow flex bg-white p-1 rounded-xl shadow-sm border border-slate-100">
          {[7, 8, 9].map(m => (
            <button 
              key={m}
              onClick={() => setCalMonth(m)}
              className={`flex-1 py-2 font-bold text-xs md:text-sm rounded-lg transition duration-200 ${
                calMonth === m 
                  ? "bg-indigo-50 text-indigo-700 shadow-sm font-black" 
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {m === 7 ? "July" : m === 8 ? "August" : "September"} 2026
            </button>
          ))}
        </div>
      </div>
      
      <div 
        ref={captureRef}
        id="capture-calendar-area" 
        className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden relative"
      >
      <div className="p-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
        <div>
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
            NPT OG Hub Roster • {calMonth === 7 ? "July" : calMonth === 8 ? "August" : "September"}
          </h3>
          <p className="text-[10px] text-slate-400 font-bold mt-0.5">
            {userRole === "HO" ? `Group ${userGroup} House Officer Schedule` : "All Ward Groups Comparison Matrix"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleCapture}
            className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition"
            title="Save as Image"
          >
            <Camera className="h-4 w-4" />
          </button>
          <Heart className="h-4 w-4 text-pink-500 fill-pink-500/20" />
        </div>
      </div>

      {userRole === "HO" ? (
        <div className="p-5">
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-black text-slate-400 uppercase mb-3 tracking-wider">
            <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
          </div>
          
          <div className="grid grid-cols-7 gap-1 md:gap-2">
            {Array.from({ length: calendarPadding }).map((_, idx) => (
              <div key={`padding-${idx}`} className="bg-transparent" />
            ))}
            
            {activeMonthDays.map(day => {
              const role = day.roles[userGroup!] || "Off";
              const c = theme[role] || theme['Off'];
              const isToday = day.dateStr === todayDateStr;
              return (
                <div 
                  key={day.d}
                  style={{ backgroundColor: c.bg, color: c.text }}
                  className={`flex flex-col items-center justify-center py-2.5 rounded-xl shadow-sm border ${isToday ? 'border-2 border-indigo-500 shadow-md ring-2 ring-indigo-500/20' : 'border-black/5'}`}
                >
                  <span className="text-xs md:text-sm font-black">{day.d}</span>
                  <span className="text-[8px] font-black uppercase tracking-widest mt-0.5 opacity-90">
                    {HO_SHORT_LABELS[role] || role}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest pt-5 border-t border-slate-100">
            {Object.keys(LABELS).map(k => {
              const c = theme[k] || theme['Off'];
              return (
                <div key={k} className="flex items-center gap-1.5">
                  <div 
                    className="w-3.5 h-3.5 rounded border border-black/5 shadow-sm"
                    style={{ backgroundColor: c.bg }}
                  />
                  <span style={{ color: c.text === '#ffffff' ? c.bg : c.text }}>{LABELS[k]}</span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto w-full max-h-[600px]">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="sticky left-0 bg-slate-50 border-r border-slate-200/50 z-10 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider p-3">Date</th>
                <th className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider p-3">SCS</th>
                <th className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider p-3">JCS</th>
                <th className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider p-3">SAS</th>
                <th className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider p-3 border-r border-slate-200/50">AS Group</th>
                <th className="text-center text-[10px] font-extrabold text-slate-400 uppercase tracking-wider p-3">A</th>
                <th className="text-center text-[10px] font-extrabold text-slate-400 uppercase tracking-wider p-3">B</th>
                <th className="text-center text-[10px] font-extrabold text-slate-400 uppercase tracking-wider p-3">C</th>
                <th className="text-center text-[10px] font-extrabold text-slate-400 uppercase tracking-wider p-3">D</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeMonthDays.map(day => {
                const dInfo = DATA.dailyInfo[day.dateStr] || { SCS: '-', JCS: '-', SAS: '-', AS_Group: '-' };
                const roles = ['A', 'B', 'C', 'D'].map(g => day.roles[g] || "Off");
                const isToday = day.dateStr === todayDateStr;
                
                return (
                  <tr key={day.d} className={`transition ${isToday ? 'bg-indigo-50/60' : 'hover:bg-slate-50/50'}`}>
                    <td className={`sticky left-0 border-r border-slate-100 z-10 font-black text-xs p-2.5 shadow-[2px_0_5px_rgba(0,0,0,0.02)] ${isToday ? 'bg-indigo-50 text-indigo-700' : 'bg-white text-slate-700'}`}>
                      {day.month}/{day.d}
                      {isToday && <span className="ml-1.5 inline-block w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>}
                    </td>
                    <td className="text-xs font-semibold text-slate-500 p-2.5 truncate max-w-[120px]">{dInfo.SCS}</td>
                    <td className="text-xs font-semibold text-slate-500 p-2.5 truncate max-w-[120px]">{dInfo.JCS}</td>
                    <td className="text-xs font-semibold text-slate-500 p-2.5 truncate max-w-[120px]">{dInfo.SAS}</td>
                    <td className="text-xs font-bold text-indigo-600 p-2.5 border-r border-slate-100">
                      {dInfo.AS_Group.replace("Group ", "Gp ")}
                    </td>
                    {['A', 'B', 'C', 'D'].map((g, idx) => {
                      const r = roles[idx];
                      const c = theme[r] || theme['Off'];
                      return (
                        <td 
                          key={g} 
                          style={{ backgroundColor: c.bg, color: c.text === '#ffffff' ? c.bg : c.text }}
                          className="text-center font-black text-[10px] p-2"
                        >
                          {HO_SHORT_LABELS[r] || r}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
  );
}
