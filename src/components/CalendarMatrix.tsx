import React, { useMemo, useState, useRef } from "react";
import {
  Heart,
  Camera,
  Palette,
  Download,
  CalendarClock,
  X,
  Plus,
  Phone,
} from "lucide-react";
import * as htmlToImage from "html-to-image";
import { motion, AnimatePresence } from "motion/react";
import { useNotesStore } from "./NotesWidget";
import { useStore } from "../store/useStore";
import { masterRoster } from "../utils/roster";
import { DATA } from "../data";
import { translateName } from "./DirectoryTab";

const LABELS_LANG: Record<string, Record<string, string>> = {
  en: {
    Duty: "Duty",
    Pre: "Ordinary/Pre-Duty",
    Ord: "Ordinary",
    Off: "Night Off",
    Rest: "Day Off",
    Anes: "Anaesthesia",
    Date: "Date",
    AS_Group: "AS Group",
    save_image: "Save Image",
    save_screenshot: "Save Screenshot",
    group_ho_schedule: "Group {group} House Officer Schedule",
    comparison_matrix: "All Ward Comparison Matrix",
    customize_day: "Customize Day",
    eg_holiday: "e.g. Birthday, Holiday",
    save: "Save",
    clear: "Clear",
    duty_info: "Duty Info",
    add_note_day: "Add Note for this day",
    eg_leave: "e.g., Don't forget to ask for leave...",
    save_note: "Save Note",
  },
  zh: {
    Duty: "Duty",
    Pre: "Ordinary/Pre-Duty",
    Ord: "Ordinary",
    Off: "Night Off",
    Rest: "Day Off",
    Anes: "Anaesthesia",
    Date: "日期",
    AS_Group: "助医组",
    save_image: "保存图片",
    save_screenshot: "保存截图",
    group_ho_schedule: "Group {group} 住院医师值班表",
    comparison_matrix: "所有病房组对比图",
    customize_day: "自定义日程",
    eg_holiday: "例如：生日、节日、门诊",
    save: "保存",
    clear: "清除",
    duty_info: "值班信息",
    add_note_day: "为此日期添加备忘录",
    eg_leave: "例如：别忘了请假...",
    save_note: "保存备忘录",
  },
  mm: {
    Duty: "Duty",
    Pre: "Ordinary/Pre-Duty",
    Ord: "Ordinary",
    Off: "Night Off",
    Rest: "Day Off",
    Anes: "Anaesthesia",
    Date: "ရက်စွဲ",
    AS_Group: "AS အုပ်စု",
    save_image: "ပုံသိမ်းရန်",
    save_screenshot: "ဓာတ်ပုံသိမ်းရန်",
    group_ho_schedule: "အုပ်စု ({group}) အလုပ်သင်ဆရာဝန် တာဝန်ကျဇယား",
    comparison_matrix: "ဆေးရုံတက်လူနာ အုပ်စုအားလုံး နှိုင်းယှဉ်ဇယား",
    customize_day: "နေ့ရက်ပြင်ဆင်ရန်",
    eg_holiday: "ဥပမာ - မွေးနေ့၊ ရုံးပိတ်ရက်",
    save: "သိမ်းဆည်းရန်",
    clear: "ပြန်ဖျက်ရန်",
    duty_info: "တာဝန်အချက်အလက်",
    add_note_day: "မှတ်စုရေးရန်",
    eg_leave: "ဥပမာ - ခွင့်တိုင်ရန် မမေ့ပါနှင့်...",
    save_note: "မှတ်စုသိမ်းရန်",
  },
};

const WEEKDAYS: Record<string, string[]> = {
  en: ["S", "M", "T", "W", "T", "F", "S"],
  zh: ["日", "一", "二", "三", "四", "五", "六"],
  mm: ["တ", "တ", "အ", "ဗ", "က", "သ", "စ"],
};

const HO_SHORT_LABELS_LANG: Record<string, Record<string, string>> = {
  en: {
    Duty: "DUTY",
    Pre: "PRE-D",
    Ord: "ODIN",
    Off: "N-OFF",
    Rest: "D-OFF",
    Anes: "ANAE",
  },
  zh: {
    Duty: "DUTY",
    Pre: "PRE-D",
    Ord: "ODIN",
    Off: "N-OFF",
    Rest: "D-OFF",
    Anes: "ANAE",
  },
  mm: {
    Duty: "DUTY",
    Pre: "PRE-D",
    Ord: "ODIN",
    Off: "N-OFF",
    Rest: "D-OFF",
    Anes: "ANAE",
  },
};

export function getInitials(name: string): string {
  let cleanName = name.replace(/Dr\.?\s*/gi, "").trim();
  return cleanName
    .split(/\s+/)
    .map((part: string) => part[0]?.toUpperCase())
    .join("");
}

export function CalendarMatrix({
  onOpenThemeModal,
  isAdminUnlocked = false,
}: {
  onOpenThemeModal?: () => void;
  isAdminUnlocked?: boolean;
}) {
  const captureRef = useRef<HTMLDivElement>(null);

  const handleCapture = async () => {
    if (!captureRef.current) return;
    try {
      const imgData = await htmlToImage.toPng(captureRef.current, {
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.href = imgData;
      link.download = `roster-${calMonth}-2026.png`;
      link.click();
    } catch (err) {
      console.error("Failed to capture screenshot", err);
    }
  };
  const {
    userRole,
    userGroup,
    theme,
    lang,
    customDays,
    setCustomDay,
    clearCustomDay,
    globalCustomDays,
    setGlobalCustomDay,
    clearGlobalCustomDay,
    globalRosterOverrides,
    setGlobalRosterOverride,
    clearGlobalRosterOverrides,
    personalRosterOverrides,
    setPersonalRosterOverride,
    clearPersonalRosterOverrides,
  } = useStore();
  const [customColor, setCustomColor] = useState("#f43f5e");
  const [customText, setCustomText] = useState("");
  const [calMonth, setCalMonth] = useState<number>(7);
  const [selectedDay, setSelectedDay] = useState<any>(null);
  const [newNote, setNewNote] = useState("");
  const addNote = useNotesStore((state) => state.addNote);

  const handleAddNoteForDay = () => {
    if (newNote.trim() && selectedDay) {
      addNote(newNote, selectedDay.dateStr);
      setNewNote("");
      setSelectedDay(null);
    }
  };

  const calendarPadding = useMemo(() => {
    return new Date(2026, calMonth - 1, 1).getDay();
  }, [calMonth]);

  const activeMonthDays = useMemo(() => {
    return masterRoster.filter((d) => d.month === calMonth);
  }, [calMonth]);

  const todayDate = new Date();
  const todayDateStr = `${todayDate.getFullYear()}-${String(todayDate.getMonth() + 1).padStart(2, "0")}-${String(todayDate.getDate()).padStart(2, "0")}`;

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        <div className="flex-grow flex bg-white p-1 rounded-xl shadow-sm border border-slate-100">
          {[7, 8, 9].map((m) => {
            const mText =
              m === 7
                ? lang === "zh" ? "七月" : lang === "mm" ? "ဇူလိုင်" : "July"
                : m === 8
                  ? lang === "zh" ? "八月" : lang === "mm" ? "ဩဂုတ်" : "August"
                  : lang === "zh" ? "九月" : lang === "mm" ? "စက်တင်ဘာ" : "September";
            return (
              <button
                key={m}
                onClick={() => setCalMonth(m)}
                className={`flex-1 py-2 font-bold text-xs md:text-sm rounded-lg transition duration-200 ${
                  calMonth === m
                    ? "bg-indigo-50 text-indigo-700 shadow-sm font-black"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {mText} 2026
              </button>
            );
          })}
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
              {calMonth === 7
                ? lang === "zh" ? "七月" : lang === "mm" ? "ဇူလိုင်" : "July"
                : calMonth === 8
                  ? lang === "zh" ? "八月" : lang === "mm" ? "ဩဂုတ်" : "August"
                  : lang === "zh" ? "九月" : lang === "mm" ? "စက်တင်ဘာ" : "September"}{" "}
              {lang === "zh" ? "值班表" : lang === "mm" ? "တာဝန်ဇယား" : "Roster"}
            </h3>
            <p className="text-[10px] text-slate-400 font-bold mt-0.5">
              {userRole === "HO"
                ? lang === "zh"
                  ? `Group ${userGroup} 住院医师值班表`
                  : lang === "mm"
                    ? `အုပ်စု (${userGroup}) အလုပ်သင်ဆရာဝန် တာဝန်ကျဇယား`
                    : `Group ${userGroup} House Officer Schedule`
                : lang === "zh"
                  ? "所有病房组对比图"
                  : lang === "mm"
                    ? "ဆေးရုံတက်လူနာ အုပ်စုအားလုံး နှိုင်းယှဉ်ဇယား"
                    : "All Ward Groups Comparison Matrix"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCapture}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-bold text-xs shadow-sm transition"
              title={lang === "en" ? "Save Screenshot" : lang === "zh" ? "保存截图" : "ဓာတ်ပုံသိမ်းရန်"}
            >
              <Camera className="h-4 w-4" />
              <span className="hidden sm:inline">
                {lang === "en" ? "Save Image" : lang === "zh" ? "保存图片" : "ပုံသိမ်းရန်"}
              </span>
            </button>
            <Heart className="h-4 w-4 text-pink-500 fill-pink-500/20 hidden sm:block" />
          </div>
        </div>

        {userRole === "HO" ? (
          <div className="p-5">
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-black text-slate-400 uppercase mb-3 tracking-wider">
              {(WEEKDAYS[lang] || WEEKDAYS.en).map((dayName, idx) => (
                <div key={idx}>{dayName}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 md:gap-2">
              {Array.from({ length: calendarPadding }).map((_, idx) => (
                <div key={`padding-${idx}`} className="bg-transparent" />
              ))}

              {activeMonthDays.map((day) => {
                const baseRole = day.roles[userGroup!] || "Off";
                const personalOverrides = (personalRosterOverrides || {})[day.dateStr] || {};
                const globalOverrides = (globalRosterOverrides || {})[day.dateStr] || {};
                const role = personalOverrides[userGroup!] || globalOverrides[userGroup!] || baseRole;
                const c = theme[role] || theme["Off"];
                const isToday = day.dateStr === todayDateStr;
                const custom = (customDays || {})[day.dateStr] || (globalCustomDays || {})[day.dateStr];
                return (
                  <div
                    key={day.d}
                    style={
                      custom
                        ? { backgroundColor: custom.color, color: "#ffffff" }
                        : { backgroundColor: c.bg, color: c.text }
                    }
                    className={`flex flex-col items-center justify-center py-2.5 rounded-xl shadow-sm border cursor-pointer hover:scale-105 transition-transform ${isToday ? "border-2 border-indigo-500 shadow-md ring-2 ring-indigo-500/20" : "border-black/5"}`}
                    onClick={() => setSelectedDay(day)}
                  >
                    <span className="text-xs md:text-sm font-black">
                      {day.d}
                    </span>
                    <span className="text-[8px] font-black uppercase tracking-widest mt-0.5 opacity-90 truncate px-1 max-w-full">
                      {custom ? custom.text : (HO_SHORT_LABELS_LANG[lang] || HO_SHORT_LABELS_LANG.en)[role] || role}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest pt-5 border-t border-slate-100">
              {Object.keys(LABELS_LANG[lang] || LABELS_LANG.en)
                .filter((k) => k !== "Ord" && k !== "Date" && k !== "AS_Group" && k !== "save_image" && k !== "save_screenshot" && k !== "group_ho_schedule" && k !== "comparison_matrix" && k !== "customize_day" && k !== "eg_holiday" && k !== "save" && k !== "clear" && k !== "duty_info" && k !== "add_note_day" && k !== "eg_leave" && k !== "save_note")
                .map((k) => {
                  const c = theme[k] || theme["Off"];
                  const dict = LABELS_LANG[lang] || LABELS_LANG.en;
                  return (
                    <div key={k} className="flex items-center gap-1.5">
                      <div
                        className="w-3.5 h-3.5 rounded border border-black/5 shadow-sm"
                        style={{ backgroundColor: c.bg }}
                      />
                      <span
                        style={{ color: c.text === "#ffffff" ? c.bg : c.text }}
                      >
                        {dict[k]}
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto w-full max-h-[600px]">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="sticky left-0 bg-slate-50 border-r border-slate-200/50 z-10 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider p-3">
                    {LABELS_LANG[lang]?.Date || "Date"}
                  </th>
                  <th className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider p-3">
                    SCS
                  </th>
                  <th className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider p-3">
                    JCS
                  </th>
                  <th className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider p-3">
                    SAS
                  </th>
                  <th className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider p-3 border-r border-slate-200/50">
                    {LABELS_LANG[lang]?.AS_Group || "AS Group"}
                  </th>
                  <th className="text-center text-[10px] font-extrabold text-slate-400 uppercase tracking-wider p-3">
                    A
                  </th>
                  <th className="text-center text-[10px] font-extrabold text-slate-400 uppercase tracking-wider p-3">
                    B
                  </th>
                  <th className="text-center text-[10px] font-extrabold text-slate-400 uppercase tracking-wider p-3">
                    C
                  </th>
                  <th className="text-center text-[10px] font-extrabold text-slate-400 uppercase tracking-wider p-3">
                    D
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activeMonthDays.map((day) => {
                  const dInfo = DATA.dailyInfo[day.dateStr] || {
                    SCS: "-",
                    JCS: "-",
                    SAS: "-",
                    AS_Group: "-",
                  };
                  const personalOverrides = (personalRosterOverrides || {})[day.dateStr] || {};
                  const globalOverrides = (globalRosterOverrides || {})[day.dateStr] || {};
                  const roles = ["A", "B", "C", "D"].map(
                    (g) => personalOverrides[g] || globalOverrides[g] || day.roles[g] || "Off",
                  );
                  const isToday = day.dateStr === todayDateStr;

                  const custom = (customDays || {})[day.dateStr] || (globalCustomDays || {})[day.dateStr];
                  return (
                    <tr
                      key={day.d}
                      className={`transition ${isToday ? "bg-indigo-50/60" : "hover:bg-slate-50/50"}`}
                    >
                      <td
                        className={`sticky left-0 border-r border-slate-100 z-10 font-black text-xs p-2.5 shadow-[2px_0_5px_rgba(0,0,0,0.02)] ${isToday && !custom ? "bg-indigo-50 text-indigo-700" : !custom ? "bg-white text-slate-700" : ""}`}
                        style={
                          custom
                            ? {
                                backgroundColor: custom.color,
                                color: "#ffffff",
                              }
                            : {}
                        }
                        onClick={() => setSelectedDay(day)}
                      >
                        <div className="flex flex-col cursor-pointer">
                          <span>
                            {day.month}/{day.d}
                            {isToday && (
                              <span
                                className={`ml-1.5 inline-block w-2 h-2 rounded-full ${custom ? "bg-white" : "bg-indigo-500"} animate-pulse`}
                              ></span>
                            )}
                          </span>
                          {custom && (
                            <span className="text-[8px] truncate mt-1 opacity-90 font-semibold">
                              {custom.text}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="text-xs font-semibold text-slate-500 p-2.5 truncate max-w-[120px]">
                        {dInfo.SCS}
                      </td>
                      <td className="text-xs font-semibold text-slate-500 p-2.5 truncate max-w-[120px]">
                        {dInfo.JCS}
                      </td>
                      <td className="text-xs font-semibold text-slate-500 p-2.5 truncate max-w-[120px]">
                        {dInfo.SAS}
                      </td>
                      <td className="text-xs font-bold text-indigo-600 p-2.5 border-r border-slate-100">
                        {dInfo.AS_Group.replace("Group ", "Gp ")}
                      </td>
                      {["A", "B", "C", "D"].map((g, idx) => {
                        const r = roles[idx];
                        const c = theme[r] || theme["Off"];
                        return (
                          <td
                            key={g}
                            style={{
                              backgroundColor: c.bg,
                              color: c.text === "#ffffff" ? c.bg : c.text,
                            }}
                            className="text-center font-black text-[10px] p-2"
                          >
                            {(HO_SHORT_LABELS_LANG[lang] || HO_SHORT_LABELS_LANG.en)[r] || r}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* Legend for SCS, JCS, SAS */}
          <div className="mt-3.5 p-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] sm:text-xs font-semibold text-slate-500 space-y-1.5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
              <div>
                <span className="text-indigo-600 font-extrabold">SCS / JCS:</span>{" "}
                <span>
                  {lang === "mm" ? "အထူးကုဆရာဝန်ကြီးများ" : lang === "zh" ? "特级/高级专科顾问医生" : "Senior / Junior Specialist Consultants"}
                </span>
              </div>
              <div>
                <span className="text-indigo-600 font-extrabold">SAS:</span>{" "}
                <span>
                  {lang === "mm" ? "အထူးကုဆရာဝန်များ" : lang === "zh" ? "专科助理医生" : "Specialist Assistant Surgeons"}
                </span>
              </div>
            </div>
          </div>
          </>
        )}
      </div>

      <AnimatePresence>
        {selectedDay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col border border-slate-100"
            >
              <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="font-black text-slate-800 tracking-wide">
                  {selectedDay.dateStr}
                </h3>
                <button
                  onClick={() => setSelectedDay(null)}
                  className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-200/50 rounded-lg transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-5 space-y-4">
                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span>{LABELS_LANG[lang]?.customize_day || "Customize Day"}</span>
                    {isAdminUnlocked && (
                      <span className="text-[8px] bg-amber-100 text-amber-700 font-bold px-1 py-0.5 rounded uppercase tracking-wide">
                        Admin Mode
                      </span>
                    )}
                  </h4>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={customColor}
                      onChange={(e) => setCustomColor(e.target.value)}
                      className="h-9 w-9 p-0.5 rounded-xl border border-slate-200 cursor-pointer shrink-0"
                    />
                    <input
                      type="text"
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      placeholder={LABELS_LANG[lang]?.eg_holiday || "e.g. Birthday, Holiday"}
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                    <button
                      onClick={() => {
                        if (customText.trim()) {
                          if (isAdminUnlocked) {
                            const proceed = window.confirm("⚠️ Warning: You are editing in ADMIN MODE. This change will affect all users (simulated as global). Do you want to proceed?");
                            if (!proceed) return;
                            setGlobalCustomDay(
                              selectedDay.dateStr,
                              customColor,
                              customText,
                            );
                          } else {
                            setCustomDay(
                              selectedDay.dateStr,
                              customColor,
                              customText,
                            );
                          }
                          setCustomText("");
                        }
                      }}
                      className="bg-indigo-600 text-white px-3 py-2 rounded-xl text-xs font-bold hover:bg-indigo-700 transition"
                    >
                      {LABELS_LANG[lang]?.save || "Save"}
                    </button>
                    {((isAdminUnlocked ? globalCustomDays : customDays) || {})[selectedDay.dateStr] && (
                      <button
                        onClick={() => {
                          if (isAdminUnlocked) {
                            const proceed = window.confirm("⚠️ Warning: You are clearing in ADMIN MODE. This change will affect all users (simulated as global). Do you want to proceed?");
                            if (!proceed) return;
                            clearGlobalCustomDay(selectedDay.dateStr);
                          } else {
                            clearCustomDay(selectedDay.dateStr);
                          }
                        }}
                        className="bg-red-50 text-red-600 px-3 py-2 rounded-xl text-xs font-bold hover:bg-red-100 transition"
                      >
                        {LABELS_LANG[lang]?.clear || "Clear"}
                      </button>
                    )}
                  </div>
                </div>

                {/* Group Shift Assignment overrides */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {isAdminUnlocked ? "Group Shift Assignment (Admin - Global)" : "Group Shift Assignment (Personal Override)"}
                  </h4>
                  <div className="grid grid-cols-4 gap-1.5">
                    {["A", "B", "C", "D"].map((g) => {
                      const baseRole = selectedDay.roles[g] || "Off";
                      const personalOverrides = personalRosterOverrides || {};
                      const globalOverrides = globalRosterOverrides || {};
                      const currentOverride = isAdminUnlocked
                        ? (globalOverrides[selectedDay.dateStr]?.[g] || "")
                        : (personalOverrides[selectedDay.dateStr]?.[g] || "");
                      const activeRole = currentOverride || baseRole;

                      return (
                        <div key={g} className="flex flex-col gap-1 text-center bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                          <span className="text-[9px] font-extrabold text-slate-500">Gp {g}</span>
                          <select
                            value={activeRole}
                            onChange={(e) => {
                              const newRole = e.target.value;
                              if (isAdminUnlocked) {
                                const proceed = window.confirm(`⚠️ Warning: You are changing Group ${g}'s role to "${newRole}" in ADMIN MODE. This will affect all users. Proceed?`);
                                if (!proceed) return;
                                setGlobalRosterOverride(selectedDay.dateStr, g, newRole);
                              } else {
                                setPersonalRosterOverride(selectedDay.dateStr, g, newRole);
                              }
                            }}
                            className="bg-white border border-slate-200 text-[9px] font-black p-0.5 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500 text-indigo-700"
                          >
                            {["Duty", "Pre", "Ord", "Off", "Rest", "Anes"].map((r) => (
                              <option key={r} value={r}>
                                {r}
                              </option>
                            ))}
                          </select>
                        </div>
                      );
                    })}
                  </div>
                  {(isAdminUnlocked
                    ? globalRosterOverrides[selectedDay.dateStr]
                    : personalRosterOverrides[selectedDay.dateStr]) && (
                    <button
                      onClick={() => {
                        if (isAdminUnlocked) {
                          const proceed = window.confirm("⚠️ Warning: You are clearing all roster overrides for this day in ADMIN MODE. This will affect all users. Proceed?");
                          if (!proceed) return;
                          clearGlobalRosterOverrides(selectedDay.dateStr);
                        } else {
                          clearPersonalRosterOverrides(selectedDay.dateStr);
                        }
                      }}
                      className="w-full py-1 text-center text-[9px] font-black text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition"
                    >
                      Clear Group Shift Overrides
                    </button>
                  )}
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {LABELS_LANG[lang]?.duty_info || "Duty Info"}
                  </h4>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-slate-500">
                        <span className="text-slate-400 w-8 inline-block">
                          SCS:
                        </span>{" "}
                        {DATA.dailyInfo[selectedDay.dateStr]?.SCS || "-"}
                      </p>
                      <p className="text-xs font-semibold text-slate-500">
                        <span className="text-slate-400 w-8 inline-block">
                          JCS:
                        </span>{" "}
                        {DATA.dailyInfo[selectedDay.dateStr]?.JCS || "-"}
                      </p>
                      <p className="text-xs font-semibold text-slate-500">
                        <span className="text-slate-400 w-8 inline-block">
                          SAS:
                        </span>{" "}
                        {DATA.dailyInfo[selectedDay.dateStr]?.SAS || "-"}
                      </p>
                      {DATA.dailyInfo[selectedDay.dateStr]?.PG && (
                        <p className="text-xs font-semibold text-slate-500">
                          <span className="text-slate-400 w-8 inline-block">
                            PG 2:
                          </span>{" "}
                          {translateName(
                            DATA.dailyInfo[selectedDay.dateStr].PG,
                            lang,
                          )}
                        </p>
                      )}
                      <p className="text-xs font-semibold text-slate-500">
                        <span className="text-slate-400 w-8 inline-block">
                          AS (G
                          {DATA.dailyInfo[
                            selectedDay.dateStr
                          ]?.AS_Group?.replace("Group ", "") || "-"}
                          ):
                        </span>
                        {DATA.dailyInfo[selectedDay.dateStr]?.AS_Group
                          ? (
                              DATA.as_directory[
                                DATA.dailyInfo[
                                  selectedDay.dateStr
                                ].AS_Group.replace(
                                  "Group ",
                                  "",
                                ) as keyof typeof DATA.as_directory
                              ] || []
                            )
                              .map((doc: any) =>
                                lang === "mm"
                                  ? translateName(doc.name, lang)
                                  : "Dr. " + getInitials(doc.name),
                              )
                              .join(", ")
                          : "-"}
                      </p>
                      <div className="pt-3 border-t border-slate-200/60 mt-3">
                        <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                          {["A", "B", "C", "D"].map((g) => (
                            <div
                              key={g}
                              className="bg-white p-2 rounded-lg border border-slate-100 flex justify-between items-center shadow-sm"
                            >
                              <span className="text-slate-400">{g}:</span>
                              <span className="text-slate-700">
                                {(HO_SHORT_LABELS_LANG[lang] || HO_SHORT_LABELS_LANG["en"])[selectedDay.roles[g] || "Off"]}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {LABELS_LANG[lang]?.add_note_day || "Add Note for this day"}
                  </h4>
                  <div className="flex gap-2">
                    <textarea
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder={LABELS_LANG[lang]?.eg_leave || "e.g., Don't forget to ask for leave..."}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 resize-none h-16"
                    />
                  </div>
                  <button
                    onClick={handleAddNoteForDay}
                    disabled={!newNote.trim()}
                    className="w-full py-2 bg-pink-500 text-white rounded-xl text-xs font-bold shadow-sm hover:bg-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                  >
                    <Plus className="h-4 w-4" /> {LABELS_LANG[lang]?.save_note || "Save Note"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
