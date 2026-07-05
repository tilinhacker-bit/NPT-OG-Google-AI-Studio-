import React, { useState } from "react";
import { Activity, Plus, Heart, HeartPulse, User, X } from "lucide-react";
import { useStore } from "../store/useStore";

export function PostOpMonitoringCard() {
  const { lang } = useStore();
  const [patients, setPatients] = useState<any[]>([]);
  const [patientName, setPatientName] = useState("");
  const [surgeryType, setSurgeryType] = useState("");
  const [bp, setBp] = useState("");
  const [pulse, setPulse] = useState("");

  const handleAddPatient = () => {
    if (!patientName.trim()) return;
    setPatients([
      ...patients,
      {
        id: Date.now().toString(),
        name: patientName,
        surgery: surgeryType,
        bp: bp,
        pulse: pulse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setPatientName("");
    setSurgeryType("");
    setBp("");
    setPulse("");
  };

  const handleRemove = (id: string) => {
    setPatients(patients.filter(p => p.id !== id));
  };

  return (
    <div className="mt-6 border-t border-slate-100 pt-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-black text-slate-800 text-lg flex items-center gap-2">
          <Activity className="h-5 w-5 text-indigo-500" />
          {lang === "en" ? "Post-Op Monitoring" : lang === "zh" ? "术后监测" : "ခွဲစိတ်အပြီး စောင့်ကြည့်ခြင်း"}
        </h4>
      </div>

      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <input
            type="text"
            placeholder={lang === "en" ? "Patient Name" : "လူနာအမည်"}
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
          <input
            type="text"
            placeholder={lang === "en" ? "Surgery Type (e.g. LSCS)" : "ခွဲစိတ်မှုအမျိုးအစား"}
            value={surgeryType}
            onChange={(e) => setSurgeryType(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
          <input
            type="text"
            placeholder="BP (e.g. 120/80)"
            value={bp}
            onChange={(e) => setBp(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
          <input
            type="text"
            placeholder="Pulse (e.g. 80)"
            value={pulse}
            onChange={(e) => setPulse(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>
        <button
          onClick={handleAddPatient}
          disabled={!patientName.trim()}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white p-2.5 rounded-xl transition-colors shadow-sm font-bold flex items-center justify-center gap-2"
        >
          <Plus className="h-5 w-5" />
          {lang === "en" ? "Add Patient" : "လူနာအသစ်ထည့်ရန်"}
        </button>
      </div>

      <div className="space-y-3">
        {patients.length === 0 ? (
          <div className="text-center p-4 text-xs font-bold text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
            {lang === "en" ? "No patients currently tracked." : "စောင့်ကြည့်နေသောလူနာမရှိပါ။"}
          </div>
        ) : (
          patients.map(p => (
            <div key={p.id} className="bg-white border border-slate-200 rounded-xl p-3 sm:p-4 shadow-sm flex flex-col sm:flex-row gap-3 justify-between">
              <div>
                <div className="font-black text-slate-800 text-sm flex items-center gap-1.5 mb-1">
                  <User className="h-4 w-4 text-slate-400" />
                  {p.name}
                </div>
                <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                  <Activity className="h-3.5 w-3.5 text-slate-400" />
                  {p.surgery || "N/A"} • {p.time}
                </div>
              </div>
              <div className="flex gap-4 items-center">
                 <button onClick={() => handleRemove(p.id)} className="p-1.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                   <X className="h-4 w-4" />
                 </button>
                 <div className="flex flex-col items-center justify-center bg-rose-50/50 px-3 py-1.5 rounded-lg border border-rose-100 min-w-[70px]">
                   <span className="text-[10px] font-black uppercase text-rose-500 flex items-center gap-1"><Heart className="h-3 w-3" /> BP</span>
                   <span className="text-sm font-bold text-rose-900">{p.bp || "-"}</span>
                 </div>
                 <div className="flex flex-col items-center justify-center bg-amber-50/50 px-3 py-1.5 rounded-lg border border-amber-100 min-w-[70px]">
                   <span className="text-[10px] font-black uppercase text-amber-500 flex items-center gap-1"><HeartPulse className="h-3 w-3" /> PR</span>
                   <span className="text-sm font-bold text-amber-900">{p.pulse || "-"}</span>
                 </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
