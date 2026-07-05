const fs = require('fs');

const code = `import React, { useState, useEffect } from "react";
import {
  Calendar,
  Baby,
  Activity,
  Heart,
  AlertTriangle,
  Info,
  CheckCircle,
  RotateCcw,
  BookOpen
} from "lucide-react";
import { useStore } from "../store/useStore";

// --- Translations ---
const enTranslations = {
  tabTitle: "Clinical Calculators",
  tabSubtitle: "Essential obstetric tools",
  calculatorSelect: "Select Calculator",
  eddGa: "EDD & Gestational Age",
  apgar: "APGAR Score",
  
  // EDD / GA Calculator
  lmpDate: "Last Menstrual Period (LMP)",
  eddDate: "Estimated Date of Delivery (EDD)",
  scanDate: "Ultrasound Scan Date",
  scanEgaWeeks: "Scan EGA (Weeks)",
  scanEgaDays: "Scan EGA (Days)",
  targetDate: "Target Date for Calculation",
  resultGa: "Gestational Age",
  resultEdd: "Calculated EDD",
  resultTerm: "Term Status",
  termPreterm: "Preterm",
  termEarly: "Early Term",
  termFull: "Full Term",
  termLate: "Late Term",
  termPost: "Postterm",
  methodLmp: "By LMP",
  methodScan: "By Scan",
  useCurrentDate: "Use Today",
  
  // APGAR Calculator
  apgarTime: "Evaluation Time",
  apgar1m: "1 Minute",
  apgar5m: "5 Minutes",
  apgar10m: "10 Minutes",
  apgarAppearance: "Appearance (Color)",
  apgarPulse: "Pulse (Heart Rate)",
  apgarGrimace: "Grimace (Reflex Irritability)",
  apgarActivity: "Activity (Muscle Tone)",
  apgarRespiration: "Respiration",
  
  // APGAR Details
  app0: "Blue, pale",
  app1: "Pink body, cyanotic extremities",
  app2: "Completely pink",
  pul0: "Absent",
  pul1: "< 100 bpm",
  pul2: "> 100 bpm",
  gri0: "No response to stimulation",
  gri1: "Grimace on stimulation",
  gri2: "Cry or active withdrawal",
  act0: "Flaccid",
  act1: "Some flexion of arms/legs",
  act2: "Active movement",
  res0: "Absent",
  res1: "Slow, irregular, weak cry",
  res2: "Good, strong cry",
  
  apgarResultTitle: "Total APGAR Score",
  apgarStatusNormal: "Normal (7-10)",
  apgarStatusModerate: "Mild to Moderate Asphyxia (4-6)",
  apgarStatusCritical: "Severe Asphyxia (0-3)",
  apgarNormalRec: "Routine post-delivery care. Keep warm, clear airway if needed, dry.",
  apgarModerateRec: "Requires intervention. Suction airway, stimulate, provide oxygen. Prepare for possible resuscitation.",
  apgarCriticalRec: "Requires immediate advanced resuscitation. Initiate PPV, chest compressions if HR < 60, administer epinephrine if indicated.",
  
  reset: "Reset All",
  referenceText: "For educational & clinical reference. Always use clinical judgement."
};

const zhTranslations = {
  ...enTranslations, // Fallback for simplicity
  tabTitle: "临床计算器",
  tabSubtitle: "基本产科工具",
  eddGa: "预产期 & 孕周",
  apgar: "APGAR 评分"
};

const myTranslations = {
  ...enTranslations, // Fallback for simplicity
  tabTitle: "ဆေးဘက်ဆိုင်ရာ တွက်ချက်မှုများ",
  tabSubtitle: "အခြေခံ သားဖွားကိရိယာများ",
  eddGa: "မွေးဖွားမည့်ရက်နှင့် ကိုယ်ဝန်ရက်သတ္တပတ်",
  apgar: "APGAR အမှတ်ပေးစနစ်"
};

const tTranslations = {
  en: enTranslations,
  zh: zhTranslations,
  my: myTranslations,
};

export function OBGYNCalculators() {
  const { lang } = useStore();
  const tr = tTranslations[lang] || enTranslations;

  const [activeCalc, setActiveCalc] = useState<"edd" | "apgar">("edd");

  // --- State for EDD / GA ---
  const [eddMethod, setEddMethod] = useState<"lmp" | "scan">("lmp");
  const [lmpDate, setLmpDate] = useState("");
  const [scanDate, setScanDate] = useState("");
  const [scanWeeks, setScanWeeks] = useState(0);
  const [scanDays, setScanDays] = useState(0);
  const [targetDate, setTargetDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  const [gaResult, setGaResult] = useState({ weeks: 0, days: 0 });
  const [eddResult, setEddResult] = useState<Date | null>(null);
  const [termStatus, setTermStatus] = useState("");

  // --- State for APGAR ---
  const [apgarTime, setApgarTime] = useState<"1m" | "5m" | "10m">("1m");
  const [apgarScores, setApgarScores] = useState({
    appearance: 0,
    pulse: 0,
    grimace: 0,
    activity: 0,
    respiration: 0,
  });

  // --- Effects for Calculations ---

  // EDD/GA Calculation
  useEffect(() => {
    let finalEdd: Date | null = null;
    let finalGaWeeks = 0;
    let finalGaDays = 0;

    const tDate = new Date(targetDate);
    
    if (isNaN(tDate.getTime())) {
       setEddResult(null);
       setGaResult({ weeks: 0, days: 0 });
       setTermStatus("");
       return;
    }

    if (eddMethod === "lmp" && lmpDate) {
      const lDate = new Date(lmpDate);
      if (!isNaN(lDate.getTime())) {
        // Naegele's rule: LMP + 280 days
        finalEdd = new Date(lDate.getTime() + 280 * 24 * 60 * 60 * 1000);
        const diffTime = tDate.getTime() - lDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays >= 0) {
            finalGaWeeks = Math.floor(diffDays / 7);
            finalGaDays = diffDays % 7;
        }
      }
    } else if (eddMethod === "scan" && scanDate) {
      const sDate = new Date(scanDate);
      if (!isNaN(sDate.getTime())) {
        // Calculate total days GA at scan
        const scanTotalDays = (scanWeeks * 7) + scanDays;
        
        // EDD = scanDate + (280 - scanTotalDays)
        finalEdd = new Date(sDate.getTime() + (280 - scanTotalDays) * 24 * 60 * 60 * 1000);
        
        // GA at target = scanTotalDays + days between scan and target
        const diffTime = tDate.getTime() - sDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const totalTargetDays = scanTotalDays + diffDays;
        
        if (totalTargetDays >= 0) {
            finalGaWeeks = Math.floor(totalTargetDays / 7);
            finalGaDays = totalTargetDays % 7;
        }
      }
    }

    setEddResult(finalEdd);
    setGaResult({ weeks: finalGaWeeks, days: finalGaDays });

    if (finalGaWeeks < 37) setTermStatus(tr.termPreterm);
    else if (finalGaWeeks >= 37 && finalGaWeeks < 39) setTermStatus(tr.termEarly);
    else if (finalGaWeeks >= 39 && finalGaWeeks < 41) setTermStatus(tr.termFull);
    else if (finalGaWeeks >= 41 && finalGaWeeks < 42) setTermStatus(tr.termLate);
    else if (finalGaWeeks >= 42) setTermStatus(tr.termPost);
    else setTermStatus("");

  }, [eddMethod, lmpDate, scanDate, scanWeeks, scanDays, targetDate, tr]);

  const handleResetEdd = () => {
    setLmpDate("");
    setScanDate("");
    setScanWeeks(0);
    setScanDays(0);
    setTargetDate(new Date().toISOString().split("T")[0]);
  };

  const apgarScore = Object.values(apgarScores).reduce((a, b) => a + b, 0);

  const handleResetApgar = () => {
    setApgarScores({
      appearance: 0,
      pulse: 0,
      grimace: 0,
      activity: 0,
      respiration: 0,
    });
    setApgarTime("1m");
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 p-1 bg-slate-100/60 border border-slate-100 rounded-2xl">
        <button
          onClick={() => setActiveCalc("edd")}
          className={\`flex-1 min-w-[120px] py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 whitespace-nowrap \${
            activeCalc === "edd"
              ? "bg-white text-indigo-700 shadow-sm"
              : "text-slate-500 hover:text-slate-800"
          }\`}
        >
          <Calendar className="h-4 w-4" />
          {tr.eddGa}
        </button>
        <button
          onClick={() => setActiveCalc("apgar")}
          className={\`flex-1 min-w-[120px] py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 whitespace-nowrap \${
            activeCalc === "apgar"
              ? "bg-white text-emerald-700 shadow-sm"
              : "text-slate-500 hover:text-slate-800"
          }\`}
        >
          <Baby className="h-4 w-4" />
          {tr.apgar}
        </button>
      </div>

      {/* --- 1. EDD / GA Calculator --- */}
      {activeCalc === "edd" && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-fadeIn">
          <div className="md:col-span-7 space-y-6">
            
            {/* Method Toggle */}
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setEddMethod("lmp")}
                className={\`flex-1 py-2 text-xs font-bold rounded-lg transition-all \${
                  eddMethod === "lmp" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }\`}
              >
                {tr.methodLmp}
              </button>
              <button
                onClick={() => setEddMethod("scan")}
                className={\`flex-1 py-2 text-xs font-bold rounded-lg transition-all \${
                  eddMethod === "scan" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }\`}
              >
                {tr.methodScan}
              </button>
            </div>

            {/* Inputs based on Method */}
            <div className="space-y-4">
              {eddMethod === "lmp" ? (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">
                    {tr.lmpDate}
                  </label>
                  <input
                    type="date"
                    value={lmpDate}
                    onChange={(e) => setLmpDate(e.target.value)}
                    className="w-full bg-white p-4 rounded-2xl border border-slate-200 text-sm font-black text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                  />
                </div>
              ) : (
                <div className="space-y-4 p-4 border border-slate-100 bg-slate-50 rounded-2xl">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">
                      {tr.scanDate}
                    </label>
                    <input
                      type="date"
                      value={scanDate}
                      onChange={(e) => setScanDate(e.target.value)}
                      className="w-full bg-white p-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">
                        {tr.scanEgaWeeks}
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="42"
                        value={scanWeeks === 0 ? "" : scanWeeks}
                        onChange={(e) => setScanWeeks(parseInt(e.target.value) || 0)}
                        placeholder="0"
                        className="w-full bg-white p-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">
                        {tr.scanEgaDays}
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="6"
                        value={scanDays === 0 ? "" : scanDays}
                        onChange={(e) => setScanDays(parseInt(e.target.value) || 0)}
                        placeholder="0"
                        className="w-full bg-white p-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between pl-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    {tr.targetDate}
                  </label>
                  <button 
                    onClick={() => setTargetDate(new Date().toISOString().split("T")[0])}
                    className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 transition px-2 py-0.5 bg-indigo-50 rounded-md"
                  >
                    {tr.useCurrentDate}
                  </button>
                </div>
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full bg-slate-50 p-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                />
              </div>
            </div>

            <button
              onClick={handleResetEdd}
              className="flex items-center justify-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition mx-auto pt-2"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>{tr.reset}</span>
            </button>
          </div>

          {/* Results Panel */}
          <div className="md:col-span-5">
            <div className="p-6 bg-indigo-50/50 border border-indigo-100 rounded-[2rem] h-full flex flex-col justify-center space-y-8">
              
              <div className="space-y-2">
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest text-center">
                  {tr.resultGa}
                </h4>
                <div className="flex items-end justify-center gap-2">
                  <span className="text-5xl font-black text-indigo-600 tracking-tighter">
                    {gaResult.weeks}
                  </span>
                  <span className="text-sm font-bold text-indigo-400 mb-1.5 uppercase tracking-widest">WKS</span>
                  <span className="text-5xl font-black text-indigo-600 tracking-tighter ml-2">
                    {gaResult.days}
                  </span>
                  <span className="text-sm font-bold text-indigo-400 mb-1.5 uppercase tracking-widest">DAYS</span>
                </div>
                
                {gaResult.weeks > 0 && (
                  <div className="flex justify-center mt-3">
                    <span className={\`text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest \${
                      gaResult.weeks < 37 ? "bg-amber-100 text-amber-700" :
                      gaResult.weeks >= 42 ? "bg-rose-100 text-rose-700" :
                      "bg-emerald-100 text-emerald-700"
                    }\`}>
                      {termStatus}
                    </span>
                  </div>
                )}
              </div>

              <div className="h-px bg-indigo-100 w-3/4 mx-auto" />

              <div className="space-y-2 text-center">
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">
                  {tr.resultEdd}
                </h4>
                <div className="text-xl font-black text-slate-800">
                  {eddResult ? eddResult.toLocaleDateString(lang === 'en' ? 'en-US' : 'en-GB', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) : "-"}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* --- 2. APGAR Score --- */}
      {activeCalc === "apgar" && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-fadeIn">
          <div className="md:col-span-8 space-y-6">
            
            {/* Time Selector */}
            <div className="flex bg-slate-100 p-1 rounded-xl">
              {(["1m", "5m", "10m"] as const).map(time => (
                 <button
                 key={time}
                 onClick={() => setApgarTime(time)}
                 className={\`flex-1 py-2 text-xs font-bold rounded-lg transition-all \${
                   apgarTime === time ? "bg-white text-emerald-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
                 }\`}
               >
                 {time === "1m" ? tr.apgar1m : time === "5m" ? tr.apgar5m : tr.apgar10m}
               </button>
              ))}
            </div>

            <div className="space-y-3">
               {[
                { key: 'appearance', label: tr.apgarAppearance, options: [tr.app0, tr.app1, tr.app2] },
                { key: 'pulse', label: tr.apgarPulse, options: [tr.pul0, tr.pul1, tr.pul2] },
                { key: 'grimace', label: tr.apgarGrimace, options: [tr.gri0, tr.gri1, tr.gri2] },
                { key: 'activity', label: tr.apgarActivity, options: [tr.act0, tr.act1, tr.act2] },
                { key: 'respiration', label: tr.apgarRespiration, options: [tr.res0, tr.res1, tr.res2] },
               ].map(cat => (
                 <div key={cat.key} className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <h5 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-3 border-b border-slate-50 pb-2">
                      {cat.label}
                    </h5>
                    <div className="grid grid-cols-3 gap-2">
                      {[0, 1, 2].map(score => {
                        const isSelected = apgarScores[cat.key as keyof typeof apgarScores] === score;
                        return (
                          <button
                            key={score}
                            onClick={() => setApgarScores(prev => ({ ...prev, [cat.key]: score }))}
                            className={\`p-2 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 \${
                              isSelected 
                                ? "bg-emerald-50 border-emerald-200 text-emerald-800 shadow-sm" 
                                : "bg-slate-50/50 border-slate-100 text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                            }\`}
                          >
                            <span className={\`text-lg font-black leading-none \${isSelected ? "text-emerald-600" : "text-slate-300"}\`}>
                              +{score}
                            </span>
                            <span className="text-[10px] sm:text-xs font-bold leading-tight">
                              {cat.options[score]}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                 </div>
               ))}
            </div>
            
            <button
              onClick={handleResetApgar}
              className="flex items-center justify-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition mx-auto pt-2"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>{tr.reset}</span>
            </button>
          </div>

          <div className="md:col-span-4">
            <div className="p-6 bg-emerald-50/50 border border-emerald-100 rounded-[2rem] h-full flex flex-col justify-between space-y-6">
              <div className="space-y-6 text-center">
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">
                  {tr.apgarResultTitle}
                </h4>
                
                <div className="relative inline-flex items-center justify-center">
                   <svg className="w-32 h-32 transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="58"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="transparent"
                        className="text-emerald-100"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="58"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 58}
                        strokeDashoffset={2 * Math.PI * 58 * (1 - apgarScore / 10)}
                        className={\`transition-all duration-700 ease-out \${
                          apgarScore >= 7 ? "text-emerald-500" : 
                          apgarScore >= 4 ? "text-amber-400" : "text-rose-500"
                        }\`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                       <span className="text-4xl font-black text-slate-800 tracking-tighter leading-none">
                         {apgarScore}
                       </span>
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                         / 10
                       </span>
                    </div>
                </div>

                <div className="space-y-3">
                  <div className={\`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest \${
                    apgarScore >= 7 ? "bg-emerald-100 text-emerald-700" :
                    apgarScore >= 4 ? "bg-amber-100 text-amber-700" :
                    "bg-rose-100 text-rose-700"
                  }\`}>
                    {apgarScore >= 7 ? tr.apgarStatusNormal : apgarScore >= 4 ? tr.apgarStatusModerate : tr.apgarStatusCritical}
                  </div>
                  
                  <div className="p-4 bg-white rounded-2xl border border-emerald-100 space-y-2 text-left">
                    <h5 className="text-[11px] font-black uppercase text-emerald-600 flex items-center gap-1">
                      <Baby className="h-3.5 w-3.5 text-emerald-500" />
                      Action Required
                    </h5>
                    <p className="text-xs text-slate-700 font-bold leading-relaxed">
                      {apgarScore >= 7 
                        ? tr.apgarNormalRec 
                        : apgarScore >= 4 
                        ? tr.apgarModerateRec 
                        : tr.apgarCriticalRec}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
`;

fs.writeFileSync('src/components/OBGYNCalculators.tsx', code);
