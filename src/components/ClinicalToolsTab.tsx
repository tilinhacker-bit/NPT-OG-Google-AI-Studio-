import React, { useState } from "react";
import { BookOpen, Calculator, CheckSquare, AlertCircle } from "lucide-react";
import { HouseSurgeonGuide } from "./HouseSurgeonGuide";
import { OBGYNCalculators as ClinicalCalculators } from "./OBGYNCalculators";
import { ClinicalChecklists } from "./ClinicalChecklists";
import { EmergencyAlgorithms } from "./EmergencyAlgorithms";
import { WardRoutines } from "./WardRoutines";
import { useStore } from "../store/useStore";
import { motion, AnimatePresence } from "motion/react";

export function ClinicalToolsTab() {
  const { lang } = useStore();
  const [activeTab, setActiveTab] = useState<"ward" | "guide" | "calculators" | "checklists">("ward");

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 sm:p-6 rounded-[2rem] shadow-sm border border-slate-100">
        <div className="flex flex-col border-b border-slate-100 pb-4 mb-6">
          <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-indigo-500" /> 
            {lang === "en" ? "Clinical Tools & Emergencies" : "ဆေးဘက်ဆိုင်ရာ ကိရိယာများနှင့် အရေးပေါ်အခြေအနေများ"}
          </h3>
          <p className="text-xs text-slate-400 font-bold mt-1">
            {lang === "en"
              ? "Rapid-response protocols, calculators, checklists, and algorithms"
              : "အရေးပေါ်ကုသမှုများ၊ တွက်ချက်မှုများ၊ စစ်ဆေးရန်စာရင်းများနှင့် အဆင့်ဆင့်ကုသမှုများ"}
          </p>
        </div>

        <div className="flex bg-slate-100/60 p-1 rounded-2xl mb-6 w-full gap-1 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab("guide")}
            className={`flex-1 min-w-[80px] py-2.5 font-black text-[10px] sm:text-xs rounded-xl transition-all duration-200 flex flex-col items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap ${
              activeTab === "guide"
                ? "bg-white text-indigo-700 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <BookOpen className="h-4 w-4 shrink-0" />
            <span>{lang === "en" ? "Guide" : "လမ်းညွှန်"}</span>
          </button>
          
          <button
            onClick={() => setActiveTab("calculators")}
            className={`flex-1 min-w-[80px] py-2.5 font-black text-[10px] sm:text-xs rounded-xl transition-all duration-200 flex flex-col items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap ${
              activeTab === "calculators"
                ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-100"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Calculator className="h-4 w-4 shrink-0" />
            <span>{lang === "en" ? "Essential Calculators" : "အခြေခံ တွက်ချက်မှုများ"}</span>
          </button>

          <button
            onClick={() => setActiveTab("checklists")}
            className={`flex-1 min-w-[80px] py-2.5 font-black text-[10px] sm:text-xs rounded-xl transition-all duration-200 flex flex-col items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap ${
              activeTab === "checklists"
                ? "bg-green-50 text-green-700 shadow-sm border border-green-100"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <CheckSquare className="h-4 w-4 shrink-0" />
            <span>{lang === "en" ? "Checklists" : "စစ်ဆေးရန်"}</span>
          </button>

          <button
            onClick={() => setActiveTab("ward")}
            className={`flex-1 min-w-[80px] py-2.5 font-black text-[10px] sm:text-xs rounded-xl transition-all duration-200 flex flex-col items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap ${
              activeTab === "ward"
                ? "bg-purple-50 text-purple-700 shadow-sm border border-purple-100"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <BookOpen className="h-4 w-4 shrink-0" />
            <span>{lang === "en" ? "Ward/OT" : "လုပ်ငန်းစဉ်"}</span>
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "guide" && (
            <motion.div
              key="guide"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <HouseSurgeonGuide />
            </motion.div>
          )}
          {activeTab === "calculators" && (
            <motion.div
              key="calcs"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <ClinicalCalculators />
            </motion.div>
          )}
          {activeTab === "checklists" && (
            <motion.div
              key="checklists"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <ClinicalChecklists />
            </motion.div>
          )}
          {activeTab === "ward" && (
            <motion.div
              key="ward"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <WardRoutines />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
