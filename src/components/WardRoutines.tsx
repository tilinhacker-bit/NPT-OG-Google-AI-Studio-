import React, { useState } from "react";
import { CalendarDays, ClipboardList, Activity, FileText, Pill } from "lucide-react";
import { useStore } from "../store/useStore";
import { motion, AnimatePresence } from "motion/react";

const ROUTINES = [
  {
    id: "schedule",
    icon: CalendarDays,
    title: "Weekly Schedule",
    color: "bg-indigo-50 text-indigo-700 border-indigo-200",
    iconColor: "text-indigo-500",
    content: (
      <div className="space-y-3">
        <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-100">
          <span className="font-bold text-slate-700">Monday</span>
          <span className="text-xs font-black bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-lg">Obstetrics OPD</span>
        </div>
        <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-100">
          <span className="font-bold text-slate-700">Tuesday</span>
          <span className="text-xs font-black bg-red-100 text-red-700 px-2.5 py-1 rounded-lg">OT Day</span>
        </div>
        <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-100">
          <span className="font-bold text-slate-700">Wednesday</span>
          <span className="text-xs font-black bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-lg">Obstetrics OPD</span>
        </div>
        <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-100">
          <span className="font-bold text-slate-700">Thursday</span>
          <span className="text-xs font-black bg-red-100 text-red-700 px-2.5 py-1 rounded-lg">OT Day</span>
        </div>
        <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-100">
          <span className="font-bold text-slate-700">Friday</span>
          <span className="text-xs font-black bg-pink-100 text-pink-700 px-2.5 py-1 rounded-lg">Gynecology OPD</span>
        </div>
      </div>
    )
  },
  {
    id: "delivery",
    icon: ClipboardList,
    title: "Delivery & OT Tasks",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    iconColor: "text-emerald-500",
    content: (
      <ul className="space-y-2 text-sm text-slate-700">
        <li className="flex items-start gap-2"><div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" /> <b>History & Exam:</b> Complete thorough admission history and physical examination.</li>
        <li className="flex items-start gap-2"><div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" /> <b>Labor Monitoring:</b> Regular Os checks and CTG interpretation.</li>
        <li className="flex items-start gap-2"><div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" /> <b>NSVD:</b> Conduct normal vaginal delivery, perform episiotomy if indicated, and suture perineal tears.</li>
        <li className="flex items-start gap-2"><div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" /> <b>OT Assistance:</b> 2nd assist in emergency (e.g., Crash CS) and elective operations.</li>
      </ul>
    )
  },
  {
    id: "monitoring",
    icon: Activity,
    title: "Ward Vitals Monitoring",
    color: "bg-rose-50 text-rose-700 border-rose-200",
    iconColor: "text-rose-500",
    content: (
      <div className="space-y-3">
        <div className="p-3 bg-white rounded-xl border border-slate-100">
          <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2">Post-Op & Post-NSVD</h5>
          <p className="text-xs text-slate-600">Monitor BP, PR, RR, Temp, Urine Output, Lochia, and Uterine tone. Watch for PPH.</p>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-100">
          <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2">Preeclampsia & HTN</h5>
          <p className="text-xs text-slate-600">Strict BP monitoring, Urine dipstick for protein, Deep tendon reflexes, Symptom check (headache, blurring of vision, epigastric pain).</p>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-100">
          <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2">Diabetes Mellitus (DM)</h5>
          <p className="text-xs text-slate-600">Fasting and Postprandial Blood Sugar profiling (FBS/PPBS). Insulin sliding scale adjustments if applicable.</p>
        </div>
      </div>
    )
  },
  {
    id: "admin",
    icon: FileText,
    title: "Forms & Discharges",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    iconColor: "text-blue-500",
    content: (
      <div className="space-y-3">
        <div className="p-3 bg-white rounded-xl border border-slate-100">
          <h5 className="font-bold flex items-center gap-1.5 text-slate-800 mb-2">
            <FileText className="h-4 w-4 text-blue-500" /> Form Generation
          </h5>
          <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
            <li>Ensure all routine and urgent <b>Lab Forms</b> are filled correctly (e.g., FBC, Group & Save, Coag).</li>
            <li>Prepare <b>Ultrasound Forms</b> with clear indications.</li>
          </ul>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-100">
          <h5 className="font-bold flex items-center gap-1.5 text-slate-800 mb-2">
            <Pill className="h-4 w-4 text-blue-500" /> Discharge Summaries
          </h5>
          <p className="text-xs text-slate-600 mb-2">Ensure the following are clearly written:</p>
          <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
            <li><b>When to return:</b> e.g., 1 week for wound check, 6 weeks for PNC/FP, or immediately if heavy bleeding/fever.</li>
            <li><b>Drugs to take:</b> Iron/Folic acid, Analgesics (Paracetamol, Ibuprofen), Antibiotics (if indicated).</li>
          </ul>
        </div>
      </div>
    )
  }
];

export function WardRoutines() {
  const [expandedId, setExpandedId] = useState<string | null>("schedule");
  const { lang } = useStore();

  return (
    <div className="space-y-4">
      {ROUTINES.map((routine) => {
        const isExpanded = expandedId === routine.id;
        const Icon = routine.icon;

        return (
          <div key={routine.id} className={`rounded-2xl border transition-colors overflow-hidden ${routine.color}`}>
            <button
              onClick={() => setExpandedId(isExpanded ? null : routine.id)}
              className="w-full p-4 flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 bg-white/50 rounded-xl ${routine.iconColor}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h4 className="font-black tracking-tight">{routine.title}</h4>
              </div>
            </button>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-4 pb-4"
                >
                  <div className="pt-2 border-t border-black/5">
                    {routine.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
