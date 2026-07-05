import React, { useState } from "react";
import {
  Users,
  Phone,
  PhoneCall,
  ChevronDown,
  ChevronUp,
  Utensils,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { DATA, MM_NAMES, ZH_NAMES } from "../data";
import { useStore } from "../store/useStore";

export function translateName(name: string, lang: "en" | "mm" | "zh"): string {
  if (lang === "en") return name;
  let translated = name;
  const mapping = lang === "zh" ? ZH_NAMES : MM_NAMES;
  for (const [enName, mappedName] of Object.entries(mapping)) {
    if (translated.includes(enName)) {
      translated = translated.replace(enName, mappedName);
    }
  }
  return translated;
}

const MED_PHYSICIANS = [
  { name: "Dr. Htet Phyo Kyaw", phone: "09 254 565 451" },
  { name: "Dr. Kay Kay Khine", phone: "09 765 005 367" },
  { name: "Dr. Myo Thwin Thein", phone: "09 264 643 399" },
  { name: "Dr. Nway Nay Chi Hlaing", phone: "09 974 302 664 / 09 681 364 292" },
  { name: "Dr. Phyo Zin Maung", phone: "09 456 155 485" },
  { name: "Dr. Phyu Sin Aye", phone: "09 518 6364" },
  { name: "Dr. Theint Thinzar Kyaw", phone: "09 443 153 586" },
  { name: "Dr. Yin Mon Aung", phone: "09 799 969 997" },
];

export function DirectoryTab() {
  const { lang } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [tastyMenuModalOpen, setTastyMenuModalOpen] = useState(false);
  const [subTab, setSubTab] = useState<"doctors" | "useful">("doctors");
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const renderContact = (doc: any, i: number) => (
    <div
      key={doc.name + i}
      className="flex justify-between items-center text-xs font-semibold text-slate-700 py-1"
    >
      <span className="truncate pr-1">{translateName(doc.name, lang)}</span>
      {doc.phone && (
        <a
          href={`tel:${doc.phone.split(" / ")[0]}`}
          className="bg-white text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 shadow-sm text-[9px] font-bold shrink-0"
        >
          📱 {doc.phone}
        </a>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 space-y-6">
        
        {/* Topmost Search Input */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder={
              lang === "en"
                ? "Search by name, phone, or section..."
                : lang === "zh"
                ? "输入姓名、电话或科室进行搜索..."
                : "အမည်၊ ဖုန်းနံပါတ် သို့မဟုတ် ဌာနအလိုက် ရှာဖွေရန်..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:font-medium placeholder:text-slate-400"
          />
        </div>

        <div className="flex bg-slate-100/50 p-1 rounded-xl mb-4">
          <button
            onClick={() => setSubTab("doctors")}
            className={`flex-1 py-2 font-bold text-xs rounded-lg transition ${subTab === "doctors" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
          >
            <Users className="h-4 w-4 inline-block mr-1" />{" "}
            {lang === "en" ? "Doctors" : lang === "zh" ? "医生通讯录" : "ဆရာဝန်များ"}
          </button>
          <button
            onClick={() => setSubTab("useful")}
            className={`flex-1 py-2 font-bold text-xs rounded-lg transition ${subTab === "useful" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
          >
            <Phone className="h-4 w-4 inline-block mr-1" />{" "}
            {lang === "en" ? "Useful Contacts" : lang === "zh" ? "常用电话" : "အသုံးဝင်သော ဖုန်းနံပါတ်များ"}
          </button>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-2">
          <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
            <Users className="h-5 w-5 text-indigo-500" />{" "}
            {lang === "en" ? "Department Directory" : lang === "zh" ? "科室人员通讯录" : "ဌာနတွင်း ဖုန်းလမ်းညွှန်"}
          </h3>
        </div>

        {subTab === "doctors" && (
          <div className="space-y-4">
            {/* SCS & JCS Combined */}
            <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
              <button
                onClick={() => toggleSection("scs_jcs")}
                className="w-full bg-slate-50 p-3 border-b border-slate-100 flex justify-between items-center"
              >
                <span className="font-black text-slate-700 text-[10px] uppercase tracking-wider">
                  {lang === "en" ? "Consultants (SCS & JCS)" : lang === "zh" ? "顾问医生 (SCS & JCS)" : "အထူးကုဆရာဝန်ကြီးများ (SCS & JCS)"}
                </span>
                {expandedSections["scs_jcs"] ? (
                  <ChevronUp className="h-4 w-4 text-slate-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                )}
              </button>
              <AnimatePresence>
                {expandedSections["scs_jcs"] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="p-3 bg-white"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 mb-2">
                          {DATA.directory_layout[0].header}
                        </div>
                        <div className="space-y-1">
                          {DATA.directory_layout[0].contacts
                            .filter((doc) =>
                              translateName(doc.name, lang)
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase()),
                            )
                            .map((doc, i) => renderContact(doc, i))}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 mb-2">
                          {DATA.directory_layout[1].header}
                        </div>
                        <div className="space-y-1">
                          {DATA.directory_layout[1].contacts
                            .filter((doc) =>
                              translateName(doc.name, lang)
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase()),
                            )
                            .map((doc, i) => renderContact(doc, i))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* SAS */}
            <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
              <button
                onClick={() => toggleSection("sas")}
                className="w-full bg-slate-50 p-3 border-b border-slate-100 flex justify-between items-center"
              >
                <span className="font-black text-slate-700 text-[10px] uppercase tracking-wider">
                  {DATA.directory_layout[2].header}
                </span>
                {expandedSections["sas"] ? (
                  <ChevronUp className="h-4 w-4 text-slate-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                )}
              </button>
              <AnimatePresence>
                {expandedSections["sas"] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="p-3 space-y-1 bg-white"
                  >
                    {DATA.directory_layout[2].contacts
                      .filter((doc) =>
                        translateName(doc.name, lang)
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()),
                      )
                      .map((doc, i) => renderContact(doc, i))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* AS */}
            <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
              <button
                onClick={() => toggleSection("as")}
                className="w-full bg-slate-50 p-3 border-b border-slate-100 flex justify-between items-center"
              >
                <span className="font-black text-slate-700 text-[10px] uppercase tracking-wider">
                  {lang === "en" ? "Assistant Surgeons (AS)" : lang === "zh" ? "助理外科医生 (AS)" : "လက်ထောက်ဆရာဝန်များ (AS)"}
                </span>
                {expandedSections["as"] ? (
                  <ChevronUp className="h-4 w-4 text-slate-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                )}
              </button>
              <AnimatePresence>
                {expandedSections["as"] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="p-3 space-y-3 bg-white"
                  >
                    {["1", "2", "3"].map((g) => {
                      const groupContacts =
                        DATA.as_directory[
                          g as keyof typeof DATA.as_directory
                        ] || [];
                      const filtered = groupContacts.filter(
                        (doc: any) =>
                          translateName(doc.name, lang)
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                          (doc.phone && doc.phone.includes(searchQuery)),
                      );
                      if (filtered.length === 0 && searchQuery) return null;
                      return (
                        <div key={g}>
                          <div className="text-[10px] font-bold text-slate-400 mb-1">
                            {lang === "en" ? `Group ${g}` : lang === "zh" ? `${g} 组` : `အုပ်စု ${g}`}
                          </div>
                          <div className="space-y-1">
                            {filtered.map((doc: any, i: number) =>
                              renderContact(doc, i),
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* HO */}
            <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
              <button
                onClick={() => toggleSection("ho")}
                className="w-full bg-slate-50 p-3 border-b border-slate-100 flex justify-between items-center"
              >
                <span className="font-black text-slate-700 text-[10px] uppercase tracking-wider">
                  {lang === "en" ? "House Officers (HO)" : lang === "zh" ? "住院/实习医生 (HO)" : "အလုပ်သင်ဆရာဝန်များ (HO)"}
                </span>
                {expandedSections["ho"] ? (
                  <ChevronUp className="h-4 w-4 text-slate-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                )}
              </button>
              <AnimatePresence>
                {expandedSections["ho"] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="p-3 space-y-3 bg-white"
                  >
                    {["A", "B", "C", "D"].map((g) => {
                      const groupContacts =
                        DATA.ho_directory[
                          g as keyof typeof DATA.ho_directory
                        ] || [];
                      const filtered = groupContacts.filter(
                        (doc: any) =>
                          translateName(doc.name, lang)
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                          (doc.phone && doc.phone.includes(searchQuery)),
                      );
                      if (filtered.length === 0 && searchQuery) return null;
                      return (
                        <div key={g}>
                          <div className="text-[10px] font-bold text-slate-400 mb-1">
                            {lang === "en" ? `Group ${g}` : lang === "zh" ? `${g} 组` : `အုပ်စု ${g}`}
                          </div>
                          <div className="space-y-1">
                            {filtered.map((doc: any, i: number) =>
                              renderContact(doc, i),
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Medical Physicians */}
            <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
              <button
                onClick={() => toggleSection("med")}
                className="w-full bg-slate-50 p-3 border-b border-slate-100 flex justify-between items-center"
              >
                <span className="font-black text-slate-700 text-[10px] uppercase tracking-wider">
                  Medical Physicians (On Call - July Only)
                </span>
                {expandedSections["med"] ? (
                  <ChevronUp className="h-4 w-4 text-slate-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                )}
              </button>
              <AnimatePresence>
                {expandedSections["med"] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="p-3 space-y-1 bg-white"
                  >
                    {MED_PHYSICIANS.filter(
                      (doc) =>
                        translateName(doc.name, lang)
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) ||
                        doc.phone.includes(searchQuery),
                    ).map((doc, i) => renderContact(doc, i))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {subTab === "useful" && (
          <div className="space-y-4">
            <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-slate-50 p-3 border-b border-slate-100 font-black text-slate-700 text-[10px] uppercase tracking-wider">
                Ward Phones
              </div>
              <div className="p-4 flex flex-col gap-3">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                  <span>OG Ward (General)</span>
                  <a
                    href="tel:123456"
                    className="bg-white text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 shadow-sm text-[9px] font-bold"
                  >
                    📱 123456
                  </a>
                </div>
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                  <span>Labour Room</span>
                  <a
                    href="tel:123457"
                    className="bg-white text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 shadow-sm text-[9px] font-bold"
                  >
                    📱 123457
                  </a>
                </div>
              </div>
            </div>

            <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-slate-50 p-3 border-b border-slate-100 font-black text-slate-700 text-[10px] uppercase tracking-wider">
                Emergency & Support
              </div>
              <div className="p-4 flex flex-col gap-3">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                  <span>Blood Bank</span>
                  <a
                    href="tel:123458"
                    className="bg-white text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 shadow-sm text-[9px] font-bold"
                  >
                    📱 123458
                  </a>
                </div>
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                  <span>Ambulance</span>
                  <a
                    href="tel:123459"
                    className="bg-white text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 shadow-sm text-[9px] font-bold"
                  >
                    📱 123459
                  </a>
                </div>
              </div>
            </div>

            <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-slate-50 p-3 border-b border-slate-100 font-black text-slate-700 text-[10px] uppercase tracking-wider">
                Restaurants & Delivery
              </div>
              <div className="p-4 flex flex-col gap-4">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                  <span>Hospital Canteen</span>
                  <a
                    href="tel:123460"
                    className="bg-white text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 shadow-sm text-[9px] font-bold shrink-0"
                  >
                    📱 123460
                  </a>
                </div>

                <div className="border-t border-slate-100 pt-3">
                  <div className="flex justify-between items-start text-xs font-semibold text-slate-700 mb-2">
                    <div>
                      <span className="block text-indigo-700 font-bold">
                        မိဘရိပ် Restaurant
                      </span>
                      <span className="block text-[10px] text-slate-500 font-medium mt-0.5">
                        Delivery Free • Near OG Hospital
                      </span>
                    </div>
                    <button
                      onClick={() => setMenuModalOpen(true)}
                      className="bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-lg border border-indigo-100 shadow-sm text-[10px] font-bold flex items-center shrink-0"
                    >
                      <Utensils className="h-3 w-3 mr-1" /> Menu
                    </button>
                  </div>
                  <div className="flex flex-col gap-2 pl-2 border-l-2 border-indigo-100 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-slate-600">
                        Restaurant Phone
                      </span>
                      <a
                        href="tel:09798354383"
                        className="bg-white text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 shadow-sm text-[9px] font-bold shrink-0"
                      >
                        📱 09 798 354 383
                      </a>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-slate-600">
                        Delivery Man
                      </span>
                      <a
                        href="tel:09899257385"
                        className="bg-white text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 shadow-sm text-[9px] font-bold shrink-0"
                      >
                        📱 09 899 257 385
                      </a>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3">
                  <div className="flex justify-between items-start text-xs font-semibold text-slate-700 mb-2">
                    <div>
                      <span className="block text-indigo-700 font-bold">
                        Tasty Restaurant
                      </span>
                      <span className="block text-[10px] text-slate-500 font-medium mt-0.5">
                        Closed Wednesdays • Near OG Hospital
                      </span>
                    </div>
                    <button
                      onClick={() => setTastyMenuModalOpen(true)}
                      className="bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-lg border border-indigo-100 shadow-sm text-[10px] font-bold flex items-center shrink-0"
                    >
                      <Utensils className="h-3 w-3 mr-1" /> Menu
                    </button>
                  </div>
                  <div className="flex flex-col gap-2 pl-2 border-l-2 border-indigo-100 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-slate-600">
                        Restaurant Phone
                      </span>
                      <a
                        href="tel:09780345954"
                        className="bg-white text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 shadow-sm text-[9px] font-bold shrink-0"
                      >
                        📱 09 780 345 954
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {menuModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 md:p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
            >
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                    <Utensils className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-800 text-sm">
                      မိဘရိပ် Menu
                    </h3>
                    <p className="text-[10px] font-semibold text-slate-500">
                      တရုတ်အစားအစာအစုံ + အအေးနှင့်ကော်ဖီ
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setMenuModalOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200/50 text-slate-500 hover:bg-slate-200 transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-5 overflow-y-auto font-medium text-xs text-slate-700 bg-[#fafafa]">
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ခေါက်ဆွဲကြော်(ကြက်/ဝက်)
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ကြာဇံကြော်(ကြက်/ဝက်)
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ထမင်းကြော်(ကြက်/ဝက်)
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ထမင်းပေါင်း(ကြက်/ဝက်)
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ပသျှူးထမင်းကြော်(ကြက်/ဝက်)
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ကုန်းဘောင်(ကြက်/ဝက်)
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ချိုချဉ်(ကြက်/ဝက်)
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      တောက်တောက်ကြော်(ကြက်/ဝက်)
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      စဉ်းကော(ကြက်/ဝက်)
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ပဲငပိ(ကြက်/ဝက်)
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ပဲထမင်းကြော်
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      လက်ဖက်ထမင်း
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ထမင်းသီးစုံ
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ထမင်းသုပ်
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ပေါင်မုန့်ကြက်ဥကြော်
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ရှမ်းခေါက်ဆွဲ
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      မာလာရှမ်းကော
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      တုံယမ်းဟင်းရည်
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ကန်စွန်းပလိန်း
                    </li>
                  </ul>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      မာလာဟင်း
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      သင်္ဘောသီးထောင်း
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ဆီချက်ခေါက်ဆွဲ
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      မုန့်ဟင်းခါး
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      နန်းကြီးသုပ်
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      မြီးရှည်
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ခေါက်ဆွဲသုပ်
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ကြာဇံသုပ်
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      မုန့်တီသုပ်
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      သင်္ဘောသီးသုပ်(မြို့/တော)
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ကြက်ခြေထောက်သုပ်
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ဝက်ခေါင်းသုပ်
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      လက်ဖက်သုပ်
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ဂျင်းသုပ်
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      မြင်းခွာရွက်သုပ်
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ရှောက်သီးသုပ်
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ကျောက်ပွင့်သုပ်
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ဆေးဘဲဥသုပ်
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      သီးရွက်စုံကြော်
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {tastyMenuModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 md:p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
            >
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                    <Utensils className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-black text-slate-800 text-sm">
                        Tasty Menu
                      </h3>
                      <span className="bg-red-50 text-red-600 px-1.5 py-0.5 rounded-full text-[8px] font-bold">
                        ဗုဒ္ဓဟူးနေ့တိုင်း ပိတ်သည်
                      </span>
                    </div>
                    <p className="text-[10px] font-semibold text-slate-500">
                      တရုတ်အစားအစာ ၊ အအေးနှင့် စားဖွယ်စုံ
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setTastyMenuModalOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200/50 text-slate-500 hover:bg-slate-200 transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-5 overflow-y-auto font-medium text-xs text-slate-700 bg-[#fafafa]">
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      မာလာရှမ်းကော
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      တုံယမ်းဟင်းရည်
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ခေါက်ဆွဲကြော်(ကြက်/ဝက်)
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ကြာဇံကြော်(ကြက်/ဝက်)
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ထမင်းကြော်(ကြက်/ဝက်)
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ပသျှူးထမင်းကြော်(ကြက်/ဝက်)
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ထမင်းပေါင်း(ကြက်/ဝက်)
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ပဲပြုတ်ထမင်းကြော်
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      မားမားခေါက်ဆွဲကြော်
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ကုန်းဘောင်(ကြက်/ဝက်)
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      စဉ်းကော(ကြက်/ဝက်)
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ချိုချဉ်ကြော်(ကြက်/ဝက်)
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      တောက်တောက်ကြော်(ကြက်/ဝက်)
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      မာလာဟင်း
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      မုန့်ဟင်းခါး
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ဆီချက်
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ရှမ်းခေါက်ဆွဲ
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      နန်းကြီးသုပ်
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ခေါက်ဆွဲသုပ်
                    </li>
                  </ul>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ကြာဇံသုပ်
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      တို့ဟူးသုပ်
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ပဲပြားသုပ်
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ကျောက်ပွင့်သုပ်
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      သင်္ဘောသီးသုပ်/ထောင်း
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ဆေးဘဲဥသုပ်
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ဥနီသုပ်
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      မြင်းခွာရွက်သုပ်
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ဝက်ခေါင်းသုပ်
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ကြက်ခြေထောက်ထောင်း/သုပ်
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ရှောက်သီးသုပ်
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      လက်ဖက်သုပ်
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ဂျင်းသုပ်
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ငနီတူသုပ်
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      အာလူးမာလာ
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ကန်စွန်းရွက်ပလိန်း
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      သီးရွက်စုံကြော်
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ကြက်စွပ်ပြုတ်
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-indigo-400 mt-0.5 text-[8px]">
                        ●
                      </span>{" "}
                      ဆန်ပြုတ်
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
