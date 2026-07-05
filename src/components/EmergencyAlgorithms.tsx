import React from "react";
import { AlertTriangle, Clock, ArrowDownCircle } from "lucide-react";

const SHOULDER_DYSTOCIA = [
  { step: "Step 1", title: "Call for Help", detail: "Midwife coordinator, experienced obstetrician, neonatal team, anaesthetist. Discourage pushing." },
  { step: "Step 2", title: "McRoberts' Manoeuvre", detail: "Thighs to abdomen flat on bed." },
  { step: "Step 3", title: "Suprapubic Pressure", detail: "And routine axial traction. Try McRoberts and Suprapubic together first." },
  { step: "Step 4", title: "Episiotomy", detail: "Consider to make internal manoeuvres easier." },
  { step: "Step 5", title: "Internal Rotational Manoeuvres", detail: "Woods' screw or Reverse Woods' screw." },
  { step: "Step 6", title: "Deliver Posterior Arm", detail: "" },
  { step: "Step 7", title: "All Fours", detail: "Roll patient on to 'All Fours' position." },
  { step: "Step 8", title: "Last Resorts", detail: "If all fail, consider Cleidotomy, Zavanelli manoeuvre, or symphysiotomy (consultant only)." }
];

const NEONATAL_RESUS = [
  { time: "0s", title: "Birth Assessment", detail: "Term gestation? Breathing or crying? Good tone?\n• If YES to all -> Routine care (warm, clear airway, dry, skin-to-skin).\n• If NO -> Proceed below." },
  { time: "0-30s", title: "Initial Steps", detail: "Provide warmth, clear airway, dry, stimulate. Evaluate Heart Rate (HR)." },
  { time: "30-60s", title: "Ventilation", detail: "Is HR < 100 bpm, gasping, or apnea?\n• If YES -> Start Positive Pressure Ventilation (Bag and Mask) and SpO2 monitoring." },
  { time: "60s", title: "Reassessment", detail: "Is HR < 100 bpm?\n• If YES -> Reposition, check mask seal.\nIs HR < 60 bpm?\n• If YES -> Start Chest Compressions (Coordinate with PPV 3:1 ratio) and consider intubation." },
  { time: ">60s", title: "Medication", detail: "If HR remains < 60 bpm -> IV Epinephrine/Adrenaline." }
];

export function EmergencyAlgorithms() {
  return (
    <div className="space-y-6">
      
      {/* Shoulder Dystocia */}
      <div className="border border-slate-100 bg-slate-50 rounded-[2rem] p-5 shadow-sm">
        <h4 className="font-black text-slate-800 text-lg flex items-center gap-2 mb-4">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          Shoulder Dystocia (HELPERR)
        </h4>
        <div className="space-y-3 relative before:absolute before:inset-0 before:ml-[1.4rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-red-200 before:to-transparent">
          {SHOULDER_DYSTOCIA.map((item, idx) => (
            <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              {/* Icon */}
              <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-white bg-red-100 text-red-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <ArrowDownCircle className="w-4 h-4" />
              </div>
              
              {/* Card */}
              <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] bg-white p-3 sm:p-4 rounded-xl border border-red-100 shadow-sm ml-3 md:ml-0">
                <div className="flex items-center justify-between mb-1">
                  <h5 className="font-bold text-sm text-slate-800">{item.title}</h5>
                  <span className="text-[10px] font-black text-red-600 bg-red-50 px-2 py-0.5 rounded-full">{item.step}</span>
                </div>
                {item.detail && <p className="text-xs text-slate-600 font-semibold leading-relaxed mt-1.5">{item.detail}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Neonatal Resuscitation */}
      <div className="border border-slate-100 bg-slate-50 rounded-[2rem] p-5 shadow-sm">
        <h4 className="font-black text-slate-800 text-lg flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-blue-500" />
          Neonatal Resus (First 60s)
        </h4>
        <div className="bg-white rounded-xl border border-blue-100 overflow-hidden divide-y divide-blue-50">
          {NEONATAL_RESUS.map((item, idx) => (
            <div key={idx} className="p-4 sm:p-5 flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="shrink-0 bg-blue-100 text-blue-700 text-[11px] font-black px-2.5 py-1 rounded-lg min-w-[3.5rem] text-center">
                  {item.time}
                </span>
                <h5 className="font-bold text-sm text-slate-800">{item.title}</h5>
              </div>
              <div className="pl-[4.25rem]">
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed whitespace-pre-wrap">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
