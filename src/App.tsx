import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Heart,
  Calendar as CalendarIcon,
  Users,
  Phone,
  Palette,
  Lock,
  Unlock,
  Info,
  ChevronDown,
  ChevronUp,
  Download,
  Languages,
  Activity,
  ArrowLeft,
  ArrowRight,
  X,
  Smartphone,
  Sparkles,
  ClipboardList,
  LogOut,
  Settings,
  Trash2,
  Plus,
  BookOpen,
  FileText,
  ExternalLink,
  HelpCircle,
  Moon,
  Sun,
  Bell,
  Camera,
  CalendarClock,
  NotebookPen,
  Wrench,
  Calculator,
  Search,
  Venus,
  Mars,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { DATA, MM_NAMES, ZH_NAMES, RosterDay, Contact, DailyInfo } from "./data";
import { masterRoster } from "./utils/roster";
import { isWeekend, isHoliday } from "./utils/dateLogic";
import { addDays } from "date-fns";
import { CalendarMatrix } from "./components/CalendarMatrix";
import { DirectoryTab } from "./components/DirectoryTab";
import { NotesWidget, useNotesStore } from "./components/NotesWidget";
import { OBGYNCalculators } from "./components/OBGYNCalculators";
import { OBGYNFacts, OBGYN_FACTS_LIST } from "./components/OBGYNFacts";
import { AdminAudit } from "./components/AdminAudit";
import { OTListWidget } from "./components/OTListWidget";
import { useStore } from "./store/useStore";

const SETTINGS_LANG: Record<string, Record<string, string>> = {
  en: {
    title: "Settings",
    chooseLang: "Choose Language",
    appearance: "Appearance",
    light: "Light",
    dark: "Dark",
    amoled: "AMOLED",
    installApp: "Install App",
    adminAccess: "Admin Access",
    aboutApp: "About App",
    appFeatures: "App Features",
    logout: "Change Role / Logout",
    enterAccessCode: "Enter access code...",
    cancel: "Cancel",
    unlock: "Unlock",
  },
  mm: {
    title: "ပြင်ဆင်မှုများ",
    chooseLang: "ဘာသာစကား ရွေးချယ်ရန်",
    appearance: "အပြင်အဆင်",
    light: "Light",
    dark: "Dark",
    amoled: "AMOLED",
    installApp: "အက်ပ်သွင်းရန်",
    adminAccess: "အက်ဒမင် ဝင်ရောက်ခွင့်",
    aboutApp: "အက်ပ်အကြောင်း",
    appFeatures: "အက်ပ်၏ လုပ်ဆောင်ချက်များ",
    logout: "အသုံးပြုသူအမျိုးအစားပြောင်းရန် / ထွက်ရန်",
    enterAccessCode: "ကုဒ်နံပါတ် ထည့်ပါ...",
    cancel: "မလုပ်တော့ပါ",
    unlock: "ဖွင့်ရန်",
  },
  zh: {
    title: "系统设置",
    chooseLang: "选择语言",
    appearance: "外观主题",
    light: "浅色模式",
    dark: "深色模式",
    amoled: "AMOLED极黑模式",
    installApp: "安装应用",
    adminAccess: "管理权限",
    aboutApp: "关于应用",
    appFeatures: "功能介绍",
    logout: "更改角色 / 退出登录",
    enterAccessCode: "请输入授权密码...",
    cancel: "取消",
    unlock: "解锁",
  }
};

function getInitials(name: string): string {
  let cleanName = name.replace(/Dr\.?\s*/gi, "").trim();
  return cleanName
    .split(/\s+/)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function translateName(name: string, lang: "en" | "mm" | "zh"): string {
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

const LABELS: { [key: string]: string } = {
  Duty: "Duty",
  Pre: "Ordinary/Pre-Duty",
  Ord: "Ordinary",
  Off: "Night Off",
  Rest: "Day Off",
  Anes: "ANA",
};

const COLOR_PRESETS = {
  pastel: {
    Duty: { bg: "#db2777", text: "#ffffff" }, // Heavy Fuchsia (Heavy continuous work)
    Pre: { bg: "#fdf2f8", text: "#db2777" }, // Soft light pink (Light 8-4 work)
    Ord: { bg: "#fdf2f8", text: "#db2777" }, // Soft light pink (Light 8-4 work)
    Off: { bg: "#f3e8ff", text: "#6b21a8" }, // Dreamy sleepy lavender (Night off)
    Rest: { bg: "#22c55e", text: "#ffffff" }, // Joyful green (Very happy day off)
    Anes: { bg: "#ccfbf1", text: "#0f766e" }, // Clean medical teal (Other rotation)
  },
  blossom: {
    Duty: { bg: "#e11d48", text: "#ffffff" }, // Heavy striking rose red
    Pre: { bg: "#fff1f2", text: "#be123c" }, // Extremely soft pale blush
    Ord: { bg: "#fff1f2", text: "#be123c" }, // Extremely soft pale blush
    Off: { bg: "#e0e7ff", text: "#3730a3" }, // Sleepy dusty periwinkle
    Rest: { bg: "#10b981", text: "#ffffff" }, // Cheerful happy emerald green
    Anes: { bg: "#ffedd5", text: "#c2410c" }, // Warm clinical bronze/orange
  },
  lavender: {
    Duty: { bg: "#7e22ce", text: "#ffffff" }, // Heavy dark royal purple
    Pre: { bg: "#faf5ff", text: "#7e22ce" }, // Lightest whisper violet
    Ord: { bg: "#faf5ff", text: "#7e22ce" }, // Lightest whisper violet
    Off: { bg: "#ebd5ff", text: "#5b21b6" }, // Sleepy soothing mauve
    Rest: { bg: "#4ade80", text: "#14532d" }, // Joyful mint green
    Anes: { bg: "#e5e7eb", text: "#374151" }, // Neutral rotation silver-grey
  },
  peach: {
    Duty: { bg: "#ea580c", text: "#ffffff" }, // Heavy fiery deep coral/orange
    Pre: { bg: "#fff7ed", text: "#c2410c" }, // Lightest soft apricot cream
    Ord: { bg: "#fff7ed", text: "#c2410c" }, // Lightest soft apricot cream
    Off: { bg: "#e0f2fe", text: "#0369a1" }, // Soft dreamy sleep blue
    Rest: { bg: "#fbbf24", text: "#78350f" }, // Bright happy golden sunshine
    Anes: { bg: "#f3e8ff", text: "#7e22ce" }, // Clinical lilac
  },
  orchid: {
    Duty: { bg: "#c026d3", text: "#ffffff" }, // Rich striking heavy magenta
    Pre: { bg: "#fdf4ff", text: "#a21caf" }, // Pale lavender blossom
    Ord: { bg: "#fdf4ff", text: "#a21caf" }, // Pale lavender blossom
    Off: { bg: "#e2e8f0", text: "#334155" }, // Sleepy dusty grey slate
    Rest: { bg: "#2dd4bf", text: "#042f2e" }, // Happy vibrant hospital turquoise
    Anes: { bg: "#fef3c7", text: "#92400e" }, // Amber clinical rotation
  },
  berry: {
    Duty: { bg: "#be185d", text: "#ffffff" }, // Striking heavy dark pink/burgundy
    Pre: { bg: "#fff1f2", text: "#be123c" }, // Soft pink powder
    Ord: { bg: "#fff1f2", text: "#be123c" }, // Soft pink powder
    Off: { bg: "#ede9fe", text: "#5b21b6" }, // Sleepy lavender mist
    Rest: { bg: "#16a34a", text: "#ffffff" }, // Joyful lush green
    Anes: { bg: "#d1fae5", text: "#065f46" }, // Medical pale mint
  },
  steel: {
    Duty: { bg: "#1e3a8a", text: "#ffffff" }, // Heavy strong ocean navy
    Pre: { bg: "#f0f9ff", text: "#0369a1" }, // Pale cool light ice-blue
    Ord: { bg: "#f0f9ff", text: "#0369a1" }, // Pale cool light ice-blue
    Off: { bg: "#f1f5f9", text: "#475569" }, // Sleepy dim slate-blue
    Rest: { bg: "#22c55e", text: "#ffffff" }, // Joyful energetic green
    Anes: { bg: "#ffedd5", text: "#ea580c" }, // Clinical bronze orange
  },
  forest: {
    Duty: { bg: "#14532d", text: "#ffffff" }, // Bold heavy pine green
    Pre: { bg: "#f0fdf4", text: "#166534" }, // Soft pale sage light-work
    Ord: { bg: "#f0fdf4", text: "#166534" }, // Soft pale sage light-work
    Off: { bg: "#334155", text: "#ffffff" }, // Sleepy dim forest charcoal
    Rest: { bg: "#fbbf24", text: "#78350f" }, // Cheerful golden-harvest day off
    Anes: { bg: "#ecfeff", text: "#0891b2" }, // External clinical cyan rotation
  },
  charcoal: {
    Duty: { bg: "#0f172a", text: "#ffffff" }, // Striking jet slate-black
    Pre: { bg: "#f8fafc", text: "#475569" }, // Lightest fog-white
    Ord: { bg: "#f8fafc", text: "#475569" }, // Lightest fog-white
    Off: { bg: "#e0e7ff", text: "#1d4ed8" }, // Sleepy dim twilight indigo
    Rest: { bg: "#f97316", text: "#ffffff" }, // Bright joyful solar orange
    Anes: { bg: "#f3e8ff", text: "#6b21a8" }, // Clinical deep purple
  },
  amoled: {
    Duty: { bg: "#9f1239", text: "#ffe4e6" }, // Bold heavy dark velvet red
    Pre: { bg: "#1f2937", text: "#f3f4f6" }, // Soft dark carbon
    Ord: { bg: "#1f2937", text: "#f3f4f6" }, // Soft dark carbon
    Off: { bg: "#312e81", text: "#e0e7ff" }, // Soothing deep midnight indigo
    Rest: { bg: "#064e3b", text: "#d1fae5" }, // Joyful deep emerald
    Anes: { bg: "#451a03", text: "#fef3c7" }, // Warm deep bronze rotation
  },
};

function getContrastColor(hexcolor: string): string {
  const cleanHex = hexcolor.replace("#", "");
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#1e293b" : "#ffffff";
}

const HO_SHORT_LABELS: Record<string, string> = {
  Duty: "Duty",
  Pre: "Pre-D",
  Ord: "Ord",
  Off: "NOF",
  Rest: "DOF",
  Anes: "ANA",
};

export default function App() {
  const {
    userRole,
    userGroup,
    setUserRole,
    setUserGroup,
    currentTab,
    setCurrentTab,
    theme,
    setTheme,
    lang,
    setLang,
    isDarkMode,
    setIsDarkMode,
    appTheme,
    setAppTheme,
  } = useStore();

  const { notes } = useNotesStore();

  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");

  const globalSearchResults = useMemo(() => {
    const query = globalSearchQuery.trim().toLowerCase();
    if (!query) return { directory: [], facts: [], notes: [] };

    // 1. Directory search
    const directoryResults: { category: string; name: string; phone?: string }[] = [];

    // Consultants, SAS from directory_layout
    DATA.directory_layout.forEach((section) => {
      section.contacts.forEach((contact) => {
        const nameTranslated = translateName(contact.name, lang).toLowerCase();
        const nameOriginal = contact.name.toLowerCase();
        if (nameOriginal.includes(query) || nameTranslated.includes(query)) {
          directoryResults.push({
            category: section.header,
            name: contact.name,
            phone: contact.phone,
          });
        }
      });
    });

    // Assistant Surgeons
    Object.entries(DATA.as_directory).forEach(([groupNum, contacts]) => {
      contacts.forEach((contact) => {
        const nameTranslated = translateName(contact.name, lang).toLowerCase();
        const nameOriginal = contact.name.toLowerCase();
        const phone = contact.phone || "";
        if (
          nameOriginal.includes(query) ||
          nameTranslated.includes(query) ||
          phone.includes(query)
        ) {
          directoryResults.push({
            category: `Assistant Surgeons Group ${groupNum}`,
            name: contact.name,
            phone: contact.phone,
          });
        }
      });
    });

    // House Officers
    Object.entries(DATA.ho_directory).forEach(([groupLetter, contacts]) => {
      contacts.forEach((contact) => {
        const nameTranslated = translateName(contact.name, lang).toLowerCase();
        const nameOriginal = contact.name.toLowerCase();
        const phone = contact.phone || "";
        if (
          nameOriginal.includes(query) ||
          nameTranslated.includes(query) ||
          phone.includes(query)
        ) {
          directoryResults.push({
            category: `House Officer Group ${groupLetter}`,
            name: contact.name,
            phone: contact.phone,
          });
        }
      });
    });

    // 2. OBGYN Facts & Guidelines
    const factsResults: { title: string; subtitle: string; bullets: string[]; reference: string }[] = [];
    OBGYN_FACTS_LIST.forEach((item) => {
      const titleEn = item.titleEn.toLowerCase();
      const titleMm = item.titleMm.toLowerCase();
      const subtitle = item.subtitle.toLowerCase();
      const bulletsMatch = item.bullets.some((b) => b.toLowerCase().includes(query));

      if (
        titleEn.includes(query) ||
        titleMm.includes(query) ||
        subtitle.includes(query) ||
        bulletsMatch
      ) {
        factsResults.push({
          title: lang === "en" ? item.titleEn : item.titleMm,
          subtitle: item.subtitle,
          bullets: item.bullets,
          reference: item.reference,
        });
      }
    });

    // 3. Saved Notes
    const notesResults: typeof notes = [];
    notes.forEach((note) => {
      const noteTitle = (note.title || "").toLowerCase();
      const noteText = note.text.toLowerCase();
      if (noteTitle.includes(query) || noteText.includes(query)) {
        notesResults.push(note);
      }
    });

    return {
      directory: directoryResults,
      facts: factsResults,
      notes: notesResults,
    };
  }, [globalSearchQuery, notes, lang]);

  const [dateOffset, setDateOffset] = useState<number>(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(false);
  const [isGroupBCalcsOpen, setIsGroupBCalcsOpen] = useState<boolean>(false);
  const [logoTapCount, setLogoTapCount] = useState<number>(0);
  const logoTapTimeout = useRef<NodeJS.Timeout | null>(null);

  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [appTutorialOpen, setAppTutorialOpen] = useState(false);
  const [adminAuthModalOpen, setAdminAuthModalOpen] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [installModalOpen, setInstallModalOpen] = useState(false);
  const [chineseJokeOpen, setChineseJokeOpen] = useState(false);
  const [utilitySubTab, setUtilitySubTab] = useState<"facts" | "calcs" | "notes">("facts");

  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"presets" | "custom">("presets");
  const [selectedCustomRole, setSelectedCustomRole] = useState<string>("Duty");
  const [customColorPicker, setCustomColorPicker] = useState<string>("#ffe4e6");

  // Collapsible cards state
  const [expandedCards, setExpandedCards] = useState<{
    [key: string]: boolean;
  }>({
    "ho-super": false,
    as: false,
    med: false,
  });

  // PWA install prompt trigger
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    return () =>
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
  }, []);

  // Sync custom color picker state when role changes
  useEffect(() => {
    if (theme[selectedCustomRole]) {
      setCustomColorPicker(theme[selectedCustomRole].bg);
    }
  }, [selectedCustomRole, theme]);

  // Apply theme on mount
  useEffect(() => {
    if (appTheme) setAppTheme(appTheme);
  }, [appTheme, setAppTheme]);

  // Compute selected Date
  const activeDate = useMemo(() => {
    let date = new Date();
    if (date.getFullYear() !== 2026) {
      date = new Date("2026-07-06T00:00:00");
    }
    return addDays(date, dateOffset);
  }, [dateOffset]);

  const activeDateFormatted = useMemo(() => {
    return activeDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }, [activeDate]);

  const activeDateLabel = useMemo(() => {
    if (dateOffset === 0) return "Today";
    if (dateOffset === 1) return "Tomorrow";
    if (dateOffset === -1) return "Yesterday";
    return `${Math.abs(dateOffset)} Days ${dateOffset > 0 ? "Ahead" : "Ago"}`;
  }, [dateOffset]);

  const mNum = activeDate.getMonth() + 1;
  const dNum = activeDate.getDate();
  const dateStr = `2026-${String(mNum).padStart(2, "0")}-${String(dNum).padStart(2, "0")}`;

  const rosterDay = useMemo(() => {
    return masterRoster.find((r) => r.month === mNum && r.d === dNum);
  }, [masterRoster, mNum, dNum]);

  const tomorrowRosterDay = useMemo(() => {
    const tomorrow = new Date(activeDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tmNum = tomorrow.getMonth() + 1;
    const tdNum = tomorrow.getDate();
    return masterRoster.find((r) => r.month === tmNum && r.d === tdNum);
  }, [masterRoster, activeDate]);

  const dailyData: DailyInfo | undefined = DATA.dailyInfo[dateStr];

  // Calculate shift type for active role/group
  const currentShiftType = useMemo(() => {
    if (!rosterDay || userRole === "Others" || !userGroup) return "Off";
    if (userRole === "HO") {
      return rosterDay.roles[userGroup] || "Off";
    }
    return "Off";
  }, [rosterDay, userRole, userGroup]);

  const currentThemeColor = theme[currentShiftType] || theme["Off"];

  // Handle Logo Tap to Unlock Admin
  const handleLogoTap = () => {
    if (userRole !== "HO" || userGroup !== "B") return;

    setLogoTapCount((prev) => {
      const newCount = prev + 1;
      if (logoTapTimeout.current) clearTimeout(logoTapTimeout.current);

      if (newCount >= 5) {
        setAdminAuthModalOpen(true);
        return 0;
      }

      logoTapTimeout.current = setTimeout(() => {
        setLogoTapCount(0);
      }, 2000);

      return newCount;
    });
  };

  const handleAdminAuthSubmit = () => {
    if (userGroup !== "B") {
      alert("❌ Admin access is restricted to Group B members only.");
      setAdminAuthModalOpen(false);
      setAdminPasswordInput("");
      return;
    }
    if (adminPasswordInput.toLowerCase() === "yawnaka") {
      setIsAdminUnlocked(true);
      setCurrentTab("calendar");
      setAdminAuthModalOpen(false);
      setAdminPasswordInput("");
      alert("🔓 Admin Access Unlocked successfully! You can now edit any day on the calendar, customize colors/texts globally, and assign/override Group Shift schedules. Any modifications you make will affect all users (simulated as global changes).");
    } else {
      alert("❌ Incorrect password. Access denied.");
    }
  };

  // Complete Onboarding
  const handleSetRole = (role: string) => {
    if (role === "Others") {
      setUserRole("Others");
      setUserGroup("None");
      localStorage.setItem("userRole", "Others");
      localStorage.setItem("userGroup", "None");
    } else {
      setUserRole(role);
    }
  };

  const handleSetGroup = (group: string) => {
    setUserGroup(group);
    localStorage.setItem("userRole", userRole!);
    localStorage.setItem("userGroup", group);
    if (userRole === "HO") {
      localStorage.setItem("registeredHOGroup", group);
    }
  };

  const resetOnboarding = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userGroup");
    setUserRole(null);
    setUserGroup(null);
    setCurrentTab("dashboard");
    setIsAdminUnlocked(false);
  };

  const toggleCard = (cardId: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  const handleApplyPreset = (presetName: keyof typeof COLOR_PRESETS) => {
    const newTheme = COLOR_PRESETS[presetName];
    setTheme(newTheme);
    localStorage.setItem("rosterTheme", JSON.stringify(newTheme));
    setIsColorModalOpen(false);
  };

  const handleApplyCustomColor = () => {
    const newTheme = {
      ...theme,
      [selectedCustomRole]: {
        bg: customColorPicker,
        text: getContrastColor(customColorPicker),
      },
    };
    setTheme(newTheme);
    localStorage.setItem("rosterTheme", JSON.stringify(newTheme));
    setIsColorModalOpen(false);
  };

  return (
    <div className="min-h-screen pb-28 font-sans">
      {/* 1. ONBOARDING OVERLAY */}
      <AnimatePresence>
        {(!userRole || (userRole === "HO" && !userGroup)) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/95 z-50 flex items-center justify-center p-4 md:p-6 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white p-6 md:p-8 rounded-[2.5rem] w-full max-w-md text-center shadow-2xl border border-white/20"
            >
              <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
                <Heart className="h-8 w-8 fill-pink-600/20" />
              </div>

              {!userRole ? (
                <div>
                  <h2 className="text-2xl font-black text-slate-800 mb-2">
                    {lang === "en"
                      ? "Welcome to NOGSH Portal 2026"
                      : "NOGSH Portal 2026 မှ ကြိုဆိုပါတယ်"}
                  </h2>
                  <p className="text-slate-500 font-medium mb-6 text-sm">
                    Obstetrics & Gynaecology clinical ward organizer. Select
                    your role to get started.
                  </p>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => handleSetRole("HO")}
                      className="group py-4 px-5 border-2 border-slate-100 rounded-2xl font-bold text-slate-700 hover:border-pink-500 hover:bg-pink-50/50 transition duration-300 flex items-center justify-between"
                    >
                      <span>⚕️ House Officer (HO)</span>
                      <span className="text-xs text-slate-400 group-hover:text-pink-500 transition">
                        Select &rarr;
                      </span>
                    </button>
                    <button
                      onClick={() => handleSetRole("Others")}
                      className="group py-4 px-5 border-2 border-slate-100 rounded-2xl font-bold text-slate-700 hover:border-indigo-500 hover:bg-indigo-50/50 transition duration-300 flex items-center justify-between"
                    >
                      <span>👤 Others</span>
                      <span className="text-xs text-slate-400 group-hover:text-indigo-500 transition">
                        Select &rarr;
                      </span>
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-black text-slate-800 mb-2">
                    Select Your Group
                  </h2>
                  <p className="text-slate-500 font-medium text-sm">
                    Which roster group are you assigned to?
                  </p>
                  <p className="text-rose-500 font-bold mb-6 text-xs bg-rose-50 p-2 rounded-lg mt-2">
                    ⚠️ Warning: You cannot change this group later. Please
                    select your correct assigned group!
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    {["A", "B", "C", "D"].map((g) => {
                      const registeredHOGroup =
                        localStorage.getItem("registeredHOGroup");
                      if (registeredHOGroup && registeredHOGroup !== g)
                        return null;
                      return (
                        <button
                          key={g}
                          onClick={() => handleSetGroup(g)}
                          className="py-4 border-2 border-slate-100 rounded-xl font-extrabold text-lg text-slate-700 hover:border-pink-500 hover:bg-pink-50/50 transition duration-300"
                        >
                          Group {g}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => {
                      setUserRole(null);
                      localStorage.removeItem("userRole");
                    }}
                    className="mt-6 text-slate-400 font-bold text-xs hover:text-slate-600 transition flex items-center justify-center gap-1 mx-auto"
                  >
                    <ArrowLeft className="h-3 w-3" /> Go Back
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. MAIN APP CONTAINER */}
      <div className="max-w-2xl mx-auto w-full pt-6 px-4 md:px-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div
              onClick={handleLogoTap}
              className={`w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition shadow-sm border border-pink-100 select-none ${
                logoTapCount > 0
                  ? "bg-pink-100 text-pink-600 animate-pulse scale-95"
                  : "bg-pink-50 text-pink-500 hover:bg-pink-100"
              }`}
              title="Tap 5 times for Admin statistics comparison"
            >
              <Heart
                className={`h-6 w-6 ${logoTapCount > 0 ? "fill-pink-500" : ""}`}
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight leading-none flex items-center gap-2">
                  NOGSH Portal 2026
                  <div className="flex items-center gap-1 ml-1.5 bg-slate-100/70 dark:bg-slate-800/80 px-1.5 py-0.5 rounded-full border border-slate-200/50 dark:border-slate-700/50">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${isOnline ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"}`}
                    />
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      {isOnline ? "Online" : "Offline"}
                    </span>
                  </div>
                </h1>
                {isAdminUnlocked && (
                  <span className="bg-amber-100 text-amber-700 text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 uppercase tracking-wide">
                    <Unlock className="h-2 w-2" /> Admin
                  </span>
                )}
              </div>
              <p className="inline-block mt-1 text-[10px] font-bold uppercase tracking-widest bg-slate-200/80 text-slate-600 px-2.5 py-0.5 rounded-full">
                {userRole === "Others"
                  ? "Others / Guest Mode"
                  : `${userRole} • Group ${userGroup}`}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setIsGlobalSearchOpen(true)}
              className="h-10 w-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 hover:bg-indigo-100 shadow-sm transition"
              title={
                lang === "en"
                  ? "Search App"
                  : lang === "zh"
                  ? "搜索整个应用"
                  : "တစ်ခုလုံး ရှာဖွေရန်"
              }
            >
              <Search className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={() => {
                setModalTab("presets");
                setIsColorModalOpen(true);
              }}
              className="h-10 px-3.5 rounded-full bg-pink-50 border border-pink-100 flex items-center gap-1.5 text-pink-600 hover:bg-pink-100 shadow-sm transition font-black text-[10px] uppercase tracking-wider"
              title={
                lang === "en" ? "Roster Theme" : "တာဝန်ချိန် ဆေးရောင်စုံ"
              }
            >
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">
                {lang === "en" ? "Theme" : "ဆေးရောင်"}
              </span>
            </button>
          </div>
        </header>

        {/* 3. TABS SWITCH */}
        <div className="mb-6">
          <AnimatePresence mode="wait">
            {currentTab === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-5"
              >
                {userRole === "HO" &&
                  userGroup &&
                  tomorrowRosterDay &&
                  (tomorrowRosterDay.roles[userGroup] === "Duty" ||
                    tomorrowRosterDay.roles[userGroup] === "Pre" ||
                    tomorrowRosterDay.roles[userGroup] === "Ord" ||
                    tomorrowRosterDay.roles[userGroup] === "Anes") &&
                  dateOffset === 0 && (
                    <div
                      className={`p-4 rounded-2xl shadow-sm border ${tomorrowRosterDay.roles[userGroup] === "Duty" ? "bg-rose-50/80 border-rose-100" : "bg-amber-50/80 border-amber-100"} flex items-start gap-3`}
                    >
                      <div
                        className={`p-2 rounded-xl ${tomorrowRosterDay.roles[userGroup] === "Duty" ? "bg-rose-100 text-rose-600" : "bg-amber-100 text-amber-600"} shrink-0 mt-0.5`}
                      >
                        <Bell className="h-5 w-5" />
                      </div>
                      <div>
                        <h4
                          className={`font-black text-sm mb-0.5 ${tomorrowRosterDay.roles[userGroup] === "Duty" ? "text-rose-900" : "text-amber-900"}`}
                        >
                          Reminder:{" "}
                          {tomorrowRosterDay.roles[userGroup] === "Duty"
                            ? "Duty"
                            : tomorrowRosterDay.roles[userGroup] === "Anes"
                              ? "ANA"
                              : "Ordinary/Pre-Duty"}{" "}
                          Tomorrow!
                        </h4>
                        <p
                          className={`text-xs font-medium ${tomorrowRosterDay.roles[userGroup] === "Duty" ? "text-rose-700/80" : "text-amber-700/80"}`}
                        >
                          Get some rest tonight. You are scheduled for Group{" "}
                          {userGroup}{" "}
                          {tomorrowRosterDay.roles[userGroup] === "Duty"
                            ? "Duty"
                            : tomorrowRosterDay.roles[userGroup] === "Anes"
                              ? "ANA"
                              : "Ordinary/Pre-Duty"}{" "}
                          tomorrow.
                        </p>
                      </div>
                    </div>
                  )}

                {/* Date Selection Bar */}
                <div className="flex justify-between items-center bg-white p-2.5 rounded-2xl shadow-sm border border-slate-100">
                  <button
                    onClick={() => setDateOffset((prev) => prev - 1)}
                    className="p-2 font-bold text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-xl transition duration-200"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>

                  <div className="text-center">
                    <span className="block font-black text-lg text-slate-800 tracking-tight">
                      {activeDateLabel}
                    </span>
                    <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mt-0.5">
                      {activeDateFormatted}
                    </span>
                  </div>

                  <button
                    onClick={() => setDateOffset((prev) => prev + 1)}
                    className="p-2 font-bold text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-xl transition duration-200"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>

                {/* DYNAMIC SHIFT CARD */}
                <div
                  style={{
                    backgroundColor: currentThemeColor.bg,
                    color: currentThemeColor.text,
                  }}
                  className="rounded-[2.25rem] p-6 shadow-md transition-colors duration-300 border border-black/5"
                >
                  <div className="flex justify-between items-start mb-5">
                    <div>
                      <p className="font-bold uppercase tracking-widest text-[10px] opacity-80">
                        Your Shift Status
                      </p>
                      <h2 className="text-4xl md:text-5xl font-black tracking-tight mt-1">
                        {LABELS[currentShiftType] || currentShiftType}
                      </h2>
                    </div>
                    <div className="bg-white/25 backdrop-blur-sm px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                      {userRole} GROUP {userGroup}
                    </div>
                  </div>

                  {/* SUPER CARD: HO Group Tracker */}
                  <div
                    onClick={() => toggleCard("ho-super")}
                    className="bg-black/10 backdrop-blur-sm rounded-2xl border border-white/10 dark:border-white/40 dark:shadow-[0_0_10px_rgba(255,255,255,0.05)] mb-4 cursor-pointer hover:bg-black/15 transition-all duration-300 dark:hover:scale-[1.02] overflow-hidden"
                  >
                    <div className="p-4 flex justify-between items-center">
                      <div className="flex-grow">
                        <p className="font-bold uppercase tracking-widest text-[9px] opacity-70 mb-1.5">
                          House Surgeon Groups Overview
                        </p>
                        <div className="grid grid-cols-4 gap-1 text-[9px] sm:text-[10px] font-black w-full pr-2">
                          {["A", "B", "C", "D"].map((g) => {
                            const r = rosterDay ? rosterDay.roles[g] : "Off";
                            return (
                              <span
                                key={g}
                                className="px-1.5 py-1 rounded bg-black/15 border border-white/5 flex justify-center items-center gap-1"
                              >
                                <span className="opacity-60">{g}:</span>
                                <span
                                  style={{ color: theme[r]?.bg }}
                                  className="font-extrabold truncate"
                                >
                                  {HO_SHORT_LABELS[r] || r}
                                </span>
                              </span>
                            );
                          })}
                        </div>
                      </div>
                      <div className="pl-2">
                        {expandedCards["ho-super"] ? (
                          <ChevronUp className="h-5 w-5 opacity-60" />
                        ) : (
                          <ChevronDown className="h-5 w-5 opacity-60" />
                        )}
                      </div>
                    </div>

                    {/* HO detailed collapse drawer */}
                    <AnimatePresence>
                      {expandedCards["ho-super"] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="bg-black/20 border-t border-white/5 px-3 py-3 text-white"
                        >
                          <div className="grid grid-cols-2 gap-2">
                            {["Duty", "Pre", "Ord", "Off", "Anes", "Rest"].map(
                              (role) => {
                                const groups = ["A", "B", "C", "D"].filter(
                                  (g) => rosterDay?.roles[g] === role,
                                );
                                if (groups.length === 0) return null;
                                return (
                                  <div
                                    key={role}
                                    className="bg-black/25 rounded-xl p-2.5 border border-white/5"
                                  >
                                    <p
                                      className="font-bold uppercase tracking-wider text-[9px] mb-1.5 border-b border-white/10 pb-1"
                                      style={{ color: theme[role]?.bg }}
                                    >
                                      {LABELS[role] || role} Team
                                    </p>
                                    <div className="space-y-2">
                                      {groups.map((g) => (
                                        <div key={g}>
                                          <div className="text-[9px] font-black uppercase opacity-75 mb-0.5">
                                            Group {g}
                                          </div>
                                          <div className="space-y-1">
                                            {(DATA.ho_directory[g] || []).map(
                                              (doc: Contact) => (
                                                <div
                                                  key={doc.name}
                                                  className="flex flex-col text-[10px]"
                                                >
                                                  <span className="font-semibold truncate">
                                                    ⚕️{" "}
                                                    {translateName(
                                                      doc.name,
                                                      lang,
                                                    )}
                                                  </span>
                                                </div>
                                              ),
                                            )}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                );
                              },
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Seniors Grids (1 + 2 + 2 style layout) */}
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-black/10 backdrop-blur-sm rounded-2xl border border-white/10 dark:border-white/40 dark:shadow-[0_0_10px_rgba(255,255,255,0.05)] p-3.5">
                        <p className="text-[9px] font-bold uppercase tracking-wider opacity-70 mb-1">
                          Consultant (SCS)
                        </p>
                        <p className="font-extrabold text-xs sm:text-sm leading-tight">
                          {dailyData?.SCS !== "-"
                            ? translateName(dailyData?.SCS || "", lang)
                            : "N/A"}
                        </p>
                      </div>
                      <div className="bg-black/10 backdrop-blur-sm rounded-2xl border border-white/10 dark:border-white/40 dark:shadow-[0_0_10px_rgba(255,255,255,0.05)] p-3.5">
                        <p className="text-[9px] font-bold uppercase tracking-wider opacity-70 mb-1">
                          Junior Cons. (JCS)
                        </p>
                        <p className="font-extrabold text-xs sm:text-sm leading-tight">
                          {dailyData?.JCS !== "-"
                            ? translateName(dailyData?.JCS || "", lang)
                            : "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="bg-black/10 backdrop-blur-sm rounded-2xl border border-white/10 dark:border-white/40 dark:shadow-[0_0_10px_rgba(255,255,255,0.05)] p-3.5">
                      <p className="text-[9px] font-bold uppercase tracking-wider opacity-70 mb-1">
                        Senior Assistant Surgeon (SAS)
                      </p>
                      <p className="font-extrabold text-sm leading-tight">
                        {dailyData?.SAS !== "-"
                          ? translateName(dailyData?.SAS || "", lang)
                          : "N/A"}
                      </p>
                    </div>

                    {dailyData?.PG && (
                      <div className="bg-black/10 backdrop-blur-sm rounded-2xl border border-white/10 dark:border-white/40 dark:shadow-[0_0_10px_rgba(255,255,255,0.05)] p-3.5">
                        <p className="text-[9px] font-bold uppercase tracking-wider opacity-70 mb-1">
                          Postgraduate (PG 2)
                        </p>
                        <p className="font-extrabold text-sm leading-tight">
                          {translateName(dailyData.PG, lang)}
                        </p>
                      </div>
                    )}

                    {/* AS Team & Ward Round Super Card */}
                    <div
                      onClick={() => toggleCard("as")}
                      className="bg-black/10 backdrop-blur-sm rounded-2xl border border-white/10 dark:border-white/40 dark:shadow-[0_0_10px_rgba(255,255,255,0.05)] cursor-pointer hover:bg-black/15 transition-all duration-300 dark:hover:scale-[1.02] overflow-hidden"
                    >
                      <div className="p-3.5 flex justify-between items-center">
                        <div className="flex-1 pr-2">
                          <p className="text-[9px] font-bold uppercase tracking-wider opacity-70 mb-1">
                            AS Team & Ward Round
                          </p>
                          <p className="font-extrabold text-xs sm:text-sm leading-tight break-words">
                            {dailyData ? (
                              <>
                                Gp {dailyData.AS_Group.replace("Group ", "")} (
                                {(
                                  DATA.as_directory[
                                    dailyData.AS_Group.replace("Group ", "")
                                  ] || []
                                )
                                  .map(
                                    (doc: Contact) =>
                                      "Dr. " + getInitials(doc.name),
                                  )
                                  .join(" & ")}
                                )
                              </>
                            ) : (
                              "N/A"
                            )}
                          </p>
                        </div>
                        <div>
                          {expandedCards["as"] ? (
                            <ChevronUp className="h-4 w-4 opacity-60 shrink-0" />
                          ) : (
                            <ChevronDown className="h-4 w-4 opacity-60 shrink-0" />
                          )}
                        </div>
                      </div>

                      <AnimatePresence>
                        {expandedCards["as"] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-3.5 pb-4 pt-1 border-t border-white/5 text-xs text-white/90 leading-relaxed space-y-3.5 bg-black/10"
                          >
                            <div>
                              <span className="font-bold uppercase tracking-wider text-[9px] opacity-60 block mb-1.5">
                                Duty AS Team
                              </span>
                              <div className="space-y-2">
                                {dailyData ? (
                                  (
                                    DATA.as_directory[
                                      dailyData.AS_Group.replace("Group ", "")
                                    ] || []
                                  ).map((doc: Contact) => (
                                    <div
                                      key={doc.name}
                                      className="flex flex-col text-[10px]"
                                    >
                                      <span className="font-semibold">
                                        ⚕️ AS {translateName(doc.name, lang)}
                                      </span>
                                    </div>
                                  ))
                                ) : (
                                  <span className="opacity-60">
                                    No surgeon scheduled
                                  </span>
                                )}
                              </div>
                            </div>

                            {dailyData?.WR && (
                              <div className="pt-2 border-t border-white/5">
                                <span className="font-bold uppercase tracking-wider text-[9px] opacity-60 block mb-1">
                                  Ward Round assignments
                                </span>
                                <div className="grid grid-cols-2 gap-2 mt-1.5">
                                  <div className="bg-black/15 p-2 rounded-lg border border-white/5">
                                    <span className="block text-[8px] uppercase tracking-widest opacity-60">
                                      Post-Op Ward
                                    </span>
                                    <span className="font-extrabold text-white text-xs">
                                      {dailyData.WR.postop}
                                    </span>
                                  </div>
                                  <div className="bg-black/15 p-2 rounded-lg border border-white/5">
                                    <span className="block text-[8px] uppercase tracking-widest opacity-60">
                                      PN Ward
                                    </span>
                                    <span className="font-extrabold text-white text-xs">
                                      {dailyData.WR.pn}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Med OnCall Card */}
                    <div
                      onClick={() => toggleCard("med")}
                      className="bg-black/10 backdrop-blur-sm rounded-2xl border border-white/10 dark:border-white/40 dark:shadow-[0_0_10px_rgba(255,255,255,0.05)] cursor-pointer hover:bg-black/15 transition-all duration-300 dark:hover:scale-[1.02] overflow-hidden"
                    >
                      <div className="p-3.5 flex justify-between items-center">
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-wider opacity-70 mb-1">
                            NPTGH Medical OnCall
                          </p>
                          <p className="font-extrabold text-sm leading-tight">
                            {dailyData?.Med_name
                              ? translateName(dailyData.Med_name, lang)
                              : "N/A"}
                          </p>
                        </div>
                        <div>
                          {expandedCards["med"] ? (
                            <ChevronUp className="h-4 w-4 opacity-60" />
                          ) : (
                            <ChevronDown className="h-4 w-4 opacity-60" />
                          )}
                        </div>
                      </div>

                      <AnimatePresence>
                        {expandedCards["med"] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-3.5 pb-4 pt-2 border-t border-white/5 text-xs text-white/90 bg-black/10"
                          >
                            <span className="font-bold uppercase tracking-wider text-[9px] opacity-60 block mb-2">
                              Direct Contacts
                            </span>
                            <div className="flex flex-col gap-1.5">
                              {dailyData?.Med_phone ? (
                                dailyData.Med_phone.split("/").map((p, idx) => {
                                  const cleanPhone = p
                                    .trim()
                                    .replace(/[^0-9]/g, "");
                                  return (
                                    <a
                                      key={idx}
                                      href={`tel:${cleanPhone}`}
                                      className="inline-flex items-center justify-center bg-white/15 hover:bg-white/25 px-3 py-2 rounded-xl font-bold tracking-wider transition text-center gap-1.5 w-full"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <Phone className="h-3 w-3" /> {p.trim()}
                                    </a>
                                  );
                                })
                              ) : (
                                <span className="opacity-60 text-xs">
                                  No direct contacts provided
                                </span>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* OT List Section is buried under the codes for future activation when the user has the latest list and energy. */}
                {/* <OTListWidget lang={lang} /> */}
              </motion.div>
            )}

            {currentTab === "calendar" && (
              <motion.div
                key="calendar"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-5"
              >
                <CalendarMatrix
                  onOpenThemeModal={() => setIsColorModalOpen(true)}
                  isAdminUnlocked={isAdminUnlocked}
                />
                <p className="text-center text-[10px] text-slate-400 mt-2 font-medium px-4">
                  {lang === "en"
                    ? "Note: August and September rosters are algorithmic projections based on July's official roster."
                    : lang === "zh"
                      ? "备注：八月和九月的排班表是根据七月的正式排班表算法投影计算的。"
                      : "မှတ်ချက်။ ။ ဩဂုတ်လနှင့် စက်တင်ဘာလ ဂျူတီဇယားများသည် ဇူလိုင်လ ဂျူတီဇယားအပေါ် အခြေခံ၍ ခန့်မှန်းတွက်ချက်ထားခြင်း ဖြစ်ပါသည်။"}
                </p>
              </motion.div>
            )}

            {currentTab === "notes" && (
              <motion.div
                key="notes"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="bg-white p-5 sm:p-6 rounded-[2rem] shadow-sm border border-slate-100">
                  <div className="flex flex-col border-b border-slate-100 pb-4 mb-6">
                    <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                      <Wrench className="h-6 w-6 text-indigo-500 animate-pulse" />{" "}
                      {lang === "en"
                        ? "OBGYN Utilities"
                        : lang === "zh"
                          ? "妇产科工具箱"
                          : "ဆေးဘက်ဆိုင်ရာ ကိရိယာများ"}
                    </h3>
                    <p className="text-xs text-slate-400 font-bold mt-1">
                      {lang === "en"
                        ? "Evidence-based OBGYN guidelines, clinical calculators, and memo notes"
                        : lang === "zh"
                          ? "循证医学指南、临床计算器与个人备忘录"
                          : "သားဖွားမီးယပ် ညွှန်ကြားချက်များ၊ တွက်ချက်မှုများနှင့် မှတ်စုများ"}
                    </p>
                  </div>

                  {/* 3 Buttons Side by Side with equal width just like Directory */}
                  <div className="flex bg-slate-100/60 p-1 rounded-2xl mb-6 w-full gap-1">
                    <button
                      onClick={() => setUtilitySubTab("facts")}
                      className={`flex-1 py-2 font-black text-[10px] sm:text-xs rounded-xl transition-all duration-200 flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap ${
                        utilitySubTab === "facts"
                          ? "bg-white text-indigo-700 shadow-sm"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      <BookOpen className="h-4 w-4 shrink-0" />
                      <span>
                        {lang === "en"
                          ? "Facts"
                          : lang === "zh"
                            ? "医学指南"
                            : "လမ်းညွှန်"}
                      </span>
                    </button>
                    <button
                      onClick={() => setUtilitySubTab("calcs")}
                      className={`flex-1 py-2 font-black text-[10px] sm:text-xs rounded-xl transition-all duration-200 flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap ${
                        utilitySubTab === "calcs"
                          ? "bg-white text-indigo-700 shadow-sm"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      <Calculator className="h-4 w-4 shrink-0" />
                      <span>
                        {lang === "en"
                          ? "Calculator"
                          : lang === "zh"
                            ? "计算器"
                            : "တွက်ချက်မှု"}
                      </span>
                    </button>
                    <button
                      onClick={() => setUtilitySubTab("notes")}
                      className={`flex-1 py-2 font-black text-[10px] sm:text-xs rounded-xl transition-all duration-200 flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap ${
                        utilitySubTab === "notes"
                          ? "bg-white text-indigo-700 shadow-sm"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      <NotebookPen className="h-4 w-4 shrink-0" />
                      <span>
                        {lang === "en"
                          ? "Notes"
                          : lang === "zh"
                            ? "备忘录"
                            : "မှတ်စုများ"}
                      </span>
                    </button>
                  </div>

                  {/* Conditionally Render Active Tab's Panel */}
                  <AnimatePresence mode="wait">
                    {utilitySubTab === "facts" && (
                      <motion.div
                        key="facts"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="bg-slate-50/55 p-4 rounded-3xl border border-slate-200/50 space-y-4 animate-in fade-in duration-200"
                      >
                        <div className="flex items-center gap-2 border-b border-slate-200/60 pb-3">
                          <BookOpen className="h-5 w-5 text-indigo-500 shrink-0" />
                          <h4 className="font-extrabold text-sm text-slate-700">
                            {lang === "en" ? "Guidelines & Facts" : lang === "zh" ? "循证医学指南" : "ညွှန်ကြားချက်များနှင့် အချက်အလက်များ"}
                          </h4>
                        </div>
                        <OBGYNFacts />
                      </motion.div>
                    )}

                    {utilitySubTab === "calcs" && (
                      <motion.div
                        key="calcs"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="bg-slate-50/55 p-4 rounded-3xl border border-slate-200/50 space-y-4 animate-in fade-in duration-200"
                      >
                        <div className="flex items-center gap-2 border-b border-slate-200/60 pb-3">
                          <Calculator className="h-5 w-5 text-indigo-500 shrink-0" />
                          <h4 className="font-extrabold text-sm text-slate-700">
                            {lang === "en" ? "Calculators" : lang === "zh" ? "临床计算器" : "တွက်ချက်မှုများ"}
                          </h4>
                        </div>
                        <OBGYNCalculators />
                      </motion.div>
                    )}

                    {utilitySubTab === "notes" && (
                      <motion.div
                        key="notes"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="bg-slate-50/55 p-4 rounded-3xl border border-slate-200/50 space-y-4 animate-in fade-in duration-200"
                      >
                        <div className="flex items-center gap-2 border-b border-slate-200/60 pb-3">
                          <NotebookPen className="h-5 w-5 text-indigo-500 shrink-0" />
                          <h4 className="font-extrabold text-sm text-slate-700">
                            {lang === "en" ? "Note Taking" : lang === "zh" ? "个人备忘录" : "မှတ်စုများ ရေးသားခြင်း"}
                          </h4>
                        </div>
                        <div className="space-y-4">
                          <NotesWidget activeDateStr={dateStr} />
                          <p className="text-center text-[10px] text-slate-400 mt-4 font-medium flex items-center justify-center gap-1">
                            <Lock className="h-3 w-3" />{" "}
                            {lang === "en"
                              ? "All notes are stored locally on your device. Privacy guaranteed."
                              : lang === "zh"
                                ? "所有笔记均保存在本地。保护您的隐私。"
                                : "မှတ်စုများကို သင့်ဖုန်းထဲတွင်သာ သိမ်းဆည်းထားမည်ဖြစ်ပြီး လုံခြုံမှုအပြည့်အဝရှိပါသည်။"}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {currentTab === "settings" && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4 pb-12"
              >
                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 space-y-6">
                  <h3 className="text-xl font-black text-slate-800 flex items-center gap-2 mb-4">
                    <Settings className="h-6 w-6 text-slate-500" /> {SETTINGS_LANG[lang]?.title || "Settings"}
                  </h3>

                  <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50 flex flex-col gap-3">
                    <div className="flex items-center gap-3 font-black text-slate-700">
                      <Languages className="h-5 w-5 text-indigo-500" /> {SETTINGS_LANG[lang]?.chooseLang || "Choose Language"}
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setLang("en")}
                        className={`py-2 rounded-xl font-bold text-xs transition ${lang === "en" ? "bg-indigo-600 text-white shadow-md" : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-100"}`}
                      >
                        English
                      </button>
                      <button
                        onClick={() => setLang("mm")}
                        className={`py-2 rounded-xl font-bold text-xs transition ${lang === "mm" ? "bg-indigo-600 text-white shadow-md" : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-100"}`}
                      >
                        မြန်မာ
                      </button>
                      <button
                        onClick={() => {
                          setChineseJokeOpen(true);
                        }}
                        className={`py-2 rounded-xl font-bold text-xs transition ${lang === "zh" ? "bg-indigo-600 text-white shadow-md" : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-100 animate-pulse"}`}
                      >
                        中文
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50 flex flex-col gap-3">
                    <div className="flex items-center gap-3 font-black text-slate-700">
                      <Moon className="h-5 w-5 text-indigo-500" /> {SETTINGS_LANG[lang]?.appearance || "Appearance"}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setAppTheme?.("light")}
                        className={`flex-1 py-2 rounded-xl font-bold text-xs transition ${appTheme === "light" || !appTheme ? "bg-indigo-600 text-white shadow-md" : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-100"}`}
                      >
                        <Sun className="h-4 w-4 inline-block mr-1" /> {SETTINGS_LANG[lang]?.light || "Light"}
                      </button>
                      <button
                        onClick={() => setAppTheme?.("dark")}
                        className={`flex-1 py-2 rounded-xl font-bold text-xs transition ${appTheme === "dark" ? "bg-slate-700 text-white shadow-md" : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-100"}`}
                      >
                        <Moon className="h-4 w-4 inline-block mr-1" /> {SETTINGS_LANG[lang]?.dark || "Dark"}
                      </button>
                      <button
                        onClick={() => setAppTheme?.("amoled")}
                        className={`flex-1 py-2 rounded-xl font-bold text-xs transition ${appTheme === "amoled" ? "bg-black text-white shadow-md" : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-100"}`}
                      >
                        <Moon className="h-4 w-4 inline-block mr-1" /> {SETTINGS_LANG[lang]?.amoled || "AMOLED"}
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => setInstallModalOpen(true)}
                    className="w-full p-4 rounded-2xl border border-slate-100 hover:border-indigo-400 text-left font-black text-slate-700 bg-slate-50 hover:bg-indigo-50/20 transition flex items-center gap-3"
                  >
                    <Smartphone className="h-5 w-5 text-emerald-500" /> {SETTINGS_LANG[lang]?.installApp || "Install App"}
                  </button>
                  {userGroup === "B" && (
                    <button
                      onClick={() => setIsGroupBCalcsOpen(true)}
                      className="w-full p-4 rounded-2xl border border-slate-100 hover:border-indigo-400 text-left font-black text-slate-700 bg-slate-50 hover:bg-indigo-50/20 transition flex items-center gap-3"
                    >
                      <ClipboardList className="h-5 w-5 text-indigo-500" /> Features exclusive to Group B
                    </button>
                  )}
                  <button
                    onClick={() => setAboutModalOpen(true)}
                    className="w-full p-4 rounded-2xl border border-slate-100 hover:border-indigo-400 text-left font-black text-slate-700 bg-slate-50 hover:bg-indigo-50/20 transition flex items-center gap-3"
                  >
                    <Info className="h-5 w-5 text-amber-500" /> {SETTINGS_LANG[lang]?.aboutApp || "About App"}
                  </button>
                  <button
                    onClick={() => setAppTutorialOpen(true)}
                    className="w-full p-4 rounded-2xl border border-slate-100 hover:border-indigo-400 text-left font-black text-slate-700 bg-slate-50 hover:bg-indigo-50/20 transition flex items-center gap-3"
                  >
                    <HelpCircle className="h-5 w-5 text-purple-500" /> {SETTINGS_LANG[lang]?.appFeatures || "App Features"}
                  </button>
                  <button
                    onClick={() => resetOnboarding()}
                    className="w-full p-4 rounded-2xl border border-slate-100 hover:border-red-400 text-left font-black text-slate-700 bg-slate-50 hover:bg-red-50/50 transition flex items-center gap-3 text-red-600"
                  >
                    <LogOut className="h-5 w-5 text-red-500" /> {SETTINGS_LANG[lang]?.logout || "Change Role / Logout"}
                  </button>
                </div>
              </motion.div>
            )}
            {currentTab === "directory" && (
              <motion.div
                key="directory"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-5"
              >
                <DirectoryTab />
              </motion.div>
            )}

            {currentTab === "admin" && isAdminUnlocked && (
              <motion.div
                key="admin"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <AdminAudit
                  activeDateStr={dateStr}
                  onLockDatabase={() => {
                    setIsAdminUnlocked(false);
                    setCurrentTab("dashboard");
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 5. DYNAMIC PRESET COLOR MODAL */}
        <AnimatePresence>
          {isColorModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col border border-slate-100"
              >
                <div className="px-6 py-4.5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <h3 className="text-md font-black text-slate-800 uppercase tracking-wide">
                    Color Customizer
                  </h3>
                  <button
                    onClick={() => setIsColorModalOpen(false)}
                    className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-200/50 rounded-lg transition"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Modal Tabs */}
                <div className="flex border-b border-slate-100 bg-slate-50/50">
                  <button
                    onClick={() => setModalTab("presets")}
                    className={`flex-1 py-3 text-xs font-black uppercase tracking-wider border-b-2 transition duration-200 ${
                      modalTab === "presets"
                        ? "text-indigo-600 border-indigo-600 bg-white"
                        : "text-slate-400 border-transparent hover:bg-slate-100/50"
                    }`}
                  >
                    Theme Presets
                  </button>
                  <button
                    onClick={() => setModalTab("custom")}
                    className={`flex-1 py-3 text-xs font-black uppercase tracking-wider border-b-2 transition duration-200 ${
                      modalTab === "custom"
                        ? "text-indigo-600 border-indigo-600 bg-white"
                        : "text-slate-400 border-transparent hover:bg-slate-100/50"
                    }`}
                  >
                    Custom Pickers
                  </button>
                </div>

                {modalTab === "presets" ? (
                  <div className="p-4 flex flex-col gap-3 max-h-[50vh] overflow-y-auto">
                    {Object.keys(COLOR_PRESETS).map((presetKey) => {
                      const PRESET_LABELS: Record<string, string> = {
                        pastel: "🌸 Pastel Gentle",
                        blossom: "🌸 Cherry Blossom",
                        lavender: "💜 Lavender Dream",
                        peach: "🍑 Peach Coral",
                        orchid: "🌺 Orchid Bloom",
                        berry: "🍓 Very Berry",
                        steel: "⚓ Steel Ocean",
                        forest: "🌲 Forest Canopy",
                        charcoal: "🕶️ Charcoal Amber",
                        amoled: "🌌 True Black (AMOLED)",
                      };
                      const gender =
                        ["pastel", "blossom", "lavender", "peach", "orchid", "berry"].includes(presetKey)
                          ? "female"
                          : ["steel", "forest", "charcoal"].includes(presetKey)
                            ? "male"
                            : "none";
                      return (
                        <button
                          key={presetKey}
                          onClick={() =>
                            handleApplyPreset(
                              presetKey as keyof typeof COLOR_PRESETS,
                            )
                          }
                          className="p-4 rounded-2xl border border-slate-100 hover:border-indigo-400 text-left font-black text-slate-700 bg-slate-50 hover:bg-indigo-50/20 transition flex justify-between items-center"
                        >
                          <span className="flex items-center gap-1.5">
                            <span>{PRESET_LABELS[presetKey] || presetKey}</span>
                            {gender === "female" && (
                              <Venus className="h-4 w-4 text-pink-500 stroke-[3]" />
                            )}
                            {gender === "male" && (
                              <Mars className="h-4 w-4 text-sky-500 stroke-[3]" />
                            )}
                            {presetKey === "amoled" && (
                              <Moon className="h-3.5 w-3.5 text-purple-500 stroke-[3]" />
                            )}
                          </span>
                          <span className="flex gap-1">
                            {Object.values(
                              COLOR_PRESETS[
                                presetKey as keyof typeof COLOR_PRESETS
                              ],
                            )
                              .slice(0, 4)
                              .map((c, i) => (
                                <span
                                  key={i}
                                  className="w-3.5 h-3.5 rounded-full"
                                  style={{ backgroundColor: c.bg }}
                                />
                              ))}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-6 flex flex-col gap-5">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
                        Select Shift / Duty Role
                      </label>
                      <select
                        value={selectedCustomRole}
                        onChange={(e) => setSelectedCustomRole(e.target.value)}
                        className="w-full p-3.5 rounded-xl border border-slate-200 font-extrabold text-sm text-slate-700 bg-white"
                      >
                        {Object.keys(LABELS).map((roleKey) => (
                          <option key={roleKey} value={roleKey}>
                            {LABELS[roleKey]}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
                        Choose Custom Color
                      </label>
                      <div className="flex items-center gap-4">
                        <input
                          type="color"
                          value={customColorPicker}
                          onChange={(e) => setCustomColorPicker(e.target.value)}
                          className="w-14 h-14 rounded-xl cursor-pointer border border-slate-200 p-0"
                        />
                        <div
                          style={{
                            backgroundColor: customColorPicker,
                            color: getContrastColor(customColorPicker),
                          }}
                          className="flex-grow h-14 rounded-2xl flex items-center justify-center font-black text-xs shadow-inner"
                        >
                          {LABELS[selectedCustomRole]} Preview
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleApplyCustomColor}
                      className="w-full py-3.5 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-wider hover:bg-indigo-700 transition shadow-md mt-2"
                    >
                      Apply Custom Color
                    </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* INSTALL MODAL */}
        <AnimatePresence>
          {installModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col border border-slate-100"
              >
                <div className="px-6 py-4.5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <h3 className="text-md font-black text-slate-800 uppercase tracking-wide flex items-center gap-2">
                    <Download className="h-5 w-5 text-indigo-500" />{" "}
                    {lang === "en"
                      ? "Install App"
                      : "App ကို သွင်းရန် (Install)"}
                  </h3>
                  <button
                    onClick={() => setInstallModalOpen(false)}
                    className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-200/50 rounded-lg transition"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4">
                    <h4 className="font-black text-slate-800 text-sm mb-2 flex items-center gap-2">
                      📱 iOS / iPhone
                    </h4>
                    {lang === "en" ? (
                      <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside font-medium leading-relaxed">
                        <li>
                          Open this site in <strong>Safari</strong>
                        </li>
                        <li>
                          Tap the <strong>Share</strong> button{" "}
                          <span className="inline-block border border-slate-300 rounded px-1 ml-1 text-[10px]">
                            ⍐
                          </span>
                        </li>
                        <li>
                          Scroll down and tap{" "}
                          <strong>"Add to Home Screen"</strong>{" "}
                          <span className="inline-block border border-slate-300 rounded px-1 ml-1 text-[10px]">
                            +
                          </span>
                        </li>
                      </ol>
                    ) : (
                      <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside font-medium leading-relaxed">
                        <li>
                          ဤဝက်ဘ်ဆိုက်ကို <strong>Safari</strong> ဖြင့် ဖွင့်ပါ
                        </li>
                        <li>
                          <strong>Share (မျှဝေရန်)</strong> ခလုတ်ကို နှိပ်ပါ{" "}
                          <span className="inline-block border border-slate-300 rounded px-1 ml-1 text-[10px]">
                            ⍐
                          </span>
                        </li>
                        <li>
                          အောက်သို့ရွှေ့ပြီး <strong>"Add to Home Screen" (ပင်မမျက်နှာပြင်သို့ထည့်ရန်)</strong> ကို နှိပ်ပါ{" "}
                          <span className="inline-block border border-slate-300 rounded px-1 ml-1 text-[10px]">
                            +
                          </span>
                        </li>
                      </ol>
                    )}
                  </div>
                  <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4">
                    <h4 className="font-black text-slate-800 text-sm mb-2 flex items-center gap-2">
                      🤖 Android
                    </h4>
                    {lang === "en" ? (
                      <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside font-medium leading-relaxed">
                        <li>
                          Open this site in <strong>Chrome</strong>
                        </li>
                        <li>
                          Tap the <strong>Menu</strong> icon (three dots)
                        </li>
                        <li>
                          Tap <strong>"Add to Home screen"</strong> or{" "}
                          <strong>"Install app"</strong>
                        </li>
                      </ol>
                    ) : (
                      <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside font-medium leading-relaxed">
                        <li>
                          ဤဝက်ဘ်ဆိုက်ကို <strong>Chrome</strong> ဖြင့် ဖွင့်ပါ
                        </li>
                        <li>
                          <strong>Menu (အစက်သုံးစက်)</strong> အိုင်ကွန်ကို နှိပ်ပါ
                        </li>
                        <li>
                          <strong>"Add to Home screen"</strong> သို့မဟုတ်{" "}
                          <strong>"Install app" (အက်ပ်သွင်းရန်)</strong> ကို နှိပ်ပါ
                        </li>
                      </ol>
                    )}
                  </div>
                  <button
                    onClick={() => setInstallModalOpen(false)}
                    className="w-full py-3 bg-slate-100 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-200 transition"
                  >
                    {lang === "en" ? "Got it" : "နားလည်ပါပြီ"}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CHINESE LANGUAGE JOKE MODAL */}
        <AnimatePresence>
          {chineseJokeOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 border border-rose-100 text-center space-y-4"
              >
                <div className="mx-auto w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-lg animate-bounce">
                  ⚠️
                </div>
                <h3 className="text-lg font-black text-rose-600">
                  {lang === "en" ? "Warning!" : "သတိပေးချက်!"}
                </h3>
                <p className="text-sm text-slate-700 font-bold leading-relaxed px-2">
                  Learn Chinese first, you silly son of a bitch! 😂
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => setChineseJokeOpen(false)}
                    className="w-full py-4 px-6 bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-500 hover:from-rose-600 hover:to-indigo-600 text-white rounded-2xl font-black text-base transition active:scale-95 shadow-lg shadow-pink-500/25 ring-2 ring-pink-300"
                  >
                    {lang === "en" ? "Okay, sorry! 🤐" : "ကောင်းပါပြီ၊ ဆောရီးပါ! 🤐"}
                  </button>
                  <button
                    onClick={() => {
                      setLang("zh");
                      setChineseJokeOpen(false);
                    }}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-600 rounded-xl font-bold text-xs transition active:scale-95 border border-slate-200"
                  >
                    I'm Chinese, you jackass 😈
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* APP TUTORIAL MODAL */}
        <AnimatePresence>
          {appTutorialOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col border border-slate-100 max-h-[80vh]"
              >
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
                  <h3 className="text-md font-black text-slate-800 uppercase tracking-wide flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-purple-500" />{" "}
                    {lang === "en" ? "App Features" : "အက်ပ်၏ လုပ်ဆောင်ချက်များ"}
                  </h3>
                  <button
                    onClick={() => setAppTutorialOpen(false)}
                    className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-200/50 rounded-lg transition"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-6 overflow-y-auto space-y-6">
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2">
                      <Languages className="h-4 w-4 text-indigo-500" /> Language
                      / ဘာသာစကား
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {lang === "en"
                        ? "You can toggle the app language between English and Myanmar using the Settings menu. Most names in the directory and roster will be translated."
                        : "Settingsမှတစ်ဆင့် အင်္ဂလိပ် သို့မဟုတ် မြန်မာ ဘာသာစကားကို ပြောင်းလဲနိုင်သည်။ အမည်အများစုကို ဘာသာပြန်ပေးပါမည်။"}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2">
                      <Palette className="h-4 w-4 text-pink-500" /> Themes &
                      AMOLED / အပြင်အဆင်
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {lang === "en"
                        ? "Select a custom theme from Settings to match your preference. You can switch between Light, Dark, and a true black AMOLED theme for battery saving."
                        : "မိမိနှစ်သက်ရာ Theme ကို ပြောင်းလဲအသုံးပြုနိုင်ပါသည်။ Light, Dark အပြင် ဘက်ထရီသက်သာစေရန် အမည်းရောင် AMOLED theme လည်း ရွေးချယ်နိုင်ပါသည်။"}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2">
                      <Smartphone className="h-4 w-4 text-emerald-500" />{" "}
                      Offline Support & Install / ဖုန်းတွင်သွင်းရန်
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {lang === "en"
                        ? 'Tap "Install App" to install it. If not available as popup, use your browser\'s "Add to Home Screen". An indicator next to the title shows if you are Online or Offline. The app works fully offline!'
                        : 'ဖုန်းတွင်ထည့်သွင်းရန် "Install App" သို့မဟုတ် Browser မှ "Add to Home Screen" ကိုအသုံးပြုနိုင်ပါသည်။ Online/Offline အခြေအနေကို ခေါင်းစဉ်နံဘေးတွင် ကြည့်ရှုနိုင်ပြီး အင်တာနက်မရှိလည်း အသုံးပြုနိုင်ပါသည်။'}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2">
                      <Camera className="h-4 w-4 text-amber-500" /> Screenshot /
                      ဓာတ်ပုံရိုက်ရန်
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {lang === "en"
                        ? "You can save your duty calendar as an image directly to your phone by tapping the Camera icon in the Calendar tab."
                        : "ပြက္ခဒိန်တွင် Camera icon ကိုနှိပ်၍ တာဝန်ချိန်ဇယားကို ဓာတ်ပုံအဖြစ် သိမ်းဆည်းနိုင်ပါသည်။"}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2">
                      <CalendarClock className="h-4 w-4 text-rose-500" />{" "}
                      Privacy & Notes / လုံခြုံရေး နှင့် မှတ်စုများ
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {lang === "en"
                        ? "Tap on any day in the calendar to add a note. All notes and preferences are saved locally on your device for absolute privacy."
                        : "ပြက္ခဒိန်တွင် ရက်စွဲကိုနှိပ်၍ မှတ်စုများ ရေးမှတ်နိုင်ပါသည်။ မှတ်စုများအားလုံးကို သင့်ဖုန်းတွင်သာ သိမ်းဆည်းထားမည်ဖြစ်၍ လုံခြုံမှုအပြည့်အဝရှိပါသည်။"}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* GLOBAL SEARCH MODAL */}
        <AnimatePresence>
          {isGlobalSearchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              id="global-search-overlay"
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100 flex flex-col max-h-[85vh]"
                id="global-search-modal"
              >
                {/* Search input header */}
                <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
                  <Search className="h-5 w-5 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={globalSearchQuery}
                    onChange={(e) => setGlobalSearchQuery(e.target.value)}
                    placeholder={
                      lang === "en"
                        ? "Search directory, facts, or notes..."
                        : lang === "zh"
                        ? "搜索通讯录、指南或笔记..."
                        : "ဖုန်းနံပါတ်၊ လမ်းညွှန် သို့မဟုတ် မှတ်စုများ ရှာရန်..."
                    }
                    className="w-full bg-transparent text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      setIsGlobalSearchOpen(false);
                      setGlobalSearchQuery("");
                    }}
                    className="p-1.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Results area */}
                <div className="p-4 overflow-y-auto flex-1 space-y-6">
                  {!globalSearchQuery.trim() ? (
                    <div className="text-center py-12 text-slate-400 space-y-2">
                      <Search className="h-10 w-10 mx-auto opacity-30 stroke-[1.5]" />
                      <p className="text-xs font-bold uppercase tracking-widest">
                        {lang === "en"
                          ? "Type to search everything"
                          : lang === "zh"
                          ? "输入内容开始搜索"
                          : "ရှာဖွေရန် စာလုံးရိုက်ထည့်ပါ"}
                      </p>
                    </div>
                  ) : (globalSearchResults.directory.length === 0 &&
                       globalSearchResults.facts.length === 0 &&
                       globalSearchResults.notes.length === 0) ? (
                    <div className="text-center py-12 text-slate-400 space-y-2">
                      <p className="text-xs font-bold uppercase tracking-widest">
                        {lang === "en"
                          ? "No matches found"
                          : lang === "zh"
                          ? "未找到匹配项"
                          : "ရှာမတွေ့ပါ"}
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* 1. Directory Results */}
                      {globalSearchResults.directory.length > 0 && (
                        <div className="space-y-2.5">
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5 px-1">
                            <Users className="h-3 w-3" />
                            {lang === "en" ? "Directory" : lang === "zh" ? "通讯录" : "ဖုန်းနံပါတ် လမ်းညွှန်"}
                          </h4>
                          <div className="space-y-2">
                            {globalSearchResults.directory.map((item, idx) => (
                              <div
                                key={idx}
                                onClick={() => {
                                  setCurrentTab("directory");
                                  setIsGlobalSearchOpen(false);
                                  setGlobalSearchQuery("");
                                }}
                                className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-100 transition cursor-pointer flex items-center justify-between"
                              >
                                <div>
                                  <div className="font-bold text-slate-800 text-sm">
                                    {translateName(item.name, lang)}
                                  </div>
                                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                    {item.category}
                                  </div>
                                </div>
                                {item.phone && (
                                  <a
                                    href={`tel:${item.phone}`}
                                    onClick={(e) => e.stopPropagation()}
                                    className="p-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-full transition flex items-center justify-center"
                                  >
                                    <Phone className="h-4 w-4" />
                                  </a>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 2. Facts / Guidelines Results */}
                      {globalSearchResults.facts.length > 0 && (
                        <div className="space-y-2.5">
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5 px-1">
                            <BookOpen className="h-3 w-3" />
                            {lang === "en" ? "Medical Facts & Guidelines" : lang === "zh" ? "医学指南与知识" : "ဆေးပညာ လမ်းညွှန်ချက်များ"}
                          </h4>
                          <div className="space-y-2">
                            {globalSearchResults.facts.map((item, idx) => (
                              <div
                                key={idx}
                                onClick={() => {
                                  setCurrentTab("notes");
                                  setUtilitySubTab("facts");
                                  setIsGlobalSearchOpen(false);
                                  setGlobalSearchQuery("");
                                }}
                                className="p-3 bg-indigo-50/30 hover:bg-indigo-50/60 rounded-2xl border border-indigo-50 transition cursor-pointer space-y-1.5"
                              >
                                <div className="font-bold text-indigo-950 text-sm">
                                  {item.title}
                                </div>
                                <p className="text-xs text-indigo-900/80 font-medium line-clamp-2 leading-relaxed">
                                  {item.subtitle}
                                </p>
                                <div className="text-[9px] font-bold text-indigo-400/80 uppercase tracking-widest">
                                  Ref: {item.reference}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 3. Notes Results */}
                      {globalSearchResults.notes.length > 0 && (
                        <div className="space-y-2.5">
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5 px-1">
                            <FileText className="h-3 w-3" />
                            {lang === "en" ? "My Saved Notes" : lang === "zh" ? "我的笔记" : "ကိုယ်ပိုင်မှတ်စုများ"}
                          </h4>
                          <div className="space-y-2">
                            {globalSearchResults.notes.map((item) => (
                              <div
                                key={item.id}
                                onClick={() => {
                                  setCurrentTab("notes");
                                  setUtilitySubTab("notes");
                                  setIsGlobalSearchOpen(false);
                                  setGlobalSearchQuery("");
                                }}
                                className="p-3 bg-amber-50/40 hover:bg-amber-50/70 rounded-2xl border border-amber-100 transition cursor-pointer space-y-1.5"
                              >
                                {item.title && (
                                  <div className="font-bold text-amber-950 text-sm">
                                    {item.title}
                                  </div>
                                )}
                                <p className="text-xs text-amber-900/80 font-medium line-clamp-2 leading-relaxed">
                                  {item.text}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 5. ABOUT MODAL */}
        <AnimatePresence>
          {aboutModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 text-center border border-slate-100"
              >
                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Info className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-black text-slate-800 mb-2">
                  NOGSH Portal 2026
                </h3>
                <div className="text-slate-600 font-medium text-sm mb-6 leading-relaxed text-left space-y-4">
                  <div className="text-center">
                    <p className="font-bold text-slate-800">Version 1.0.0</p>
                  </div>
                  <div>
                    <p>
                      <strong>Developed by:</strong> Yawnaka Rajah
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                    <p className="mb-2">
                      For any issues, feedback, or suggestions, reach me on
                      Telegram:
                    </p>
                    <a
                      href="https://t.me/yawnakarajah"
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 font-bold hover:underline flex items-center gap-1"
                    >
                      @yawnakarajah
                    </a>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 mb-1">
                      About this App
                    </p>
                    <p className="text-xs">
                      A comprehensive clinical ward organizer specifically
                      tailored for Q3 duties (July - September). It features an
                      intelligent roster calendar, a secure local notes system,
                      and offline capabilities to ensure seamless access to
                      critical scheduling data during active ward rounds.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setAboutModalOpen(false)}
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 6. ADMIN AUTH MODAL */}
        <AnimatePresence>
          {adminAuthModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 border border-slate-100"
              >
                <h3 className="text-xl font-black text-slate-800 mb-4 flex items-center justify-center gap-2">
                  <Lock className="h-5 w-5 text-amber-500" /> "Admin Access"
                </h3>
                <input
                  type="password"
                  value={adminPasswordInput}
                  onChange={(e) => setAdminPasswordInput(e.target.value)}
                  placeholder={
                    lang === "en"
                      ? "Enter access code..."
                      : "ကုဒ်နံပါတ် ထည့်ပါ..."
                  }
                  className="w-full p-3 rounded-xl border border-slate-200 mb-4 font-bold text-center outline-none focus:border-amber-400"
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => setAdminAuthModalOpen(false)}
                    className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAdminAuthSubmit}
                    className="flex-1 py-3 bg-amber-500 text-white rounded-xl font-bold hover:bg-amber-600 transition shadow-md"
                  >
                    Unlock
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* GROUP B CALCULATIONS MODAL */}
        <AnimatePresence>
          {isGroupBCalcsOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-6 border border-slate-100 max-h-[90vh] overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-3">
                  <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-indigo-500" />
                    Group B Exclusive: Duty Balance & Fairness Audit
                  </h3>
                  <button
                    onClick={() => setIsGroupBCalcsOpen(false)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition text-xs font-black shadow-sm"
                  >
                    Close
                  </button>
                </div>
                <AdminAudit
                  activeDateStr={dateStr}
                  onLockDatabase={() => setIsGroupBCalcsOpen(false)}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FLOATING ADMIN WARNING BANNER */}
        <AnimatePresence>
          {isAdminUnlocked && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-amber-500 text-white p-3.5 rounded-2xl shadow-2xl border border-amber-400 z-50 flex items-center justify-between gap-3 font-semibold text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="text-base">⚠️</span>
                <span>
                  <strong>Admin Access Active</strong><br />
                  Changes will apply to all users.
                </span>
              </div>
              <button
                onClick={() => {
                  setIsAdminUnlocked(false);
                  setCurrentTab("settings");
                }}
                className="bg-white text-amber-600 px-2.5 py-1.5 rounded-xl font-black shadow-sm hover:bg-slate-100 transition whitespace-nowrap"
              >
                Exit Admin
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 7. BOTTOM NAVIGATION BAR */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.04)] z-40 pb-safe px-2">
          <div className="max-w-2xl mx-auto flex justify-between items-end pb-2 pt-2">
            <button
              onClick={() => {
                setCurrentTab("calendar");
                setIsAdminUnlocked(false);
              }}
              className={`flex-1 flex flex-col items-center gap-1 transition-colors ${
                currentTab === "calendar"
                  ? "text-indigo-600 font-black"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <CalendarIcon className="h-5 w-5" />
              <span className="text-[9px] font-bold uppercase tracking-widest">
                {lang === "en" ? "Roster" : lang === "zh" ? "值班表" : "တာဝန်ဇယား"}
              </span>
            </button>

            <button
              onClick={() => {
                setCurrentTab("directory");
                setIsAdminUnlocked(false);
              }}
              className={`flex-1 flex flex-col items-center gap-1 transition-colors ${
                currentTab === "directory"
                  ? "text-indigo-600 font-black"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <Users className="h-5 w-5" />
              <span className="text-[9px] font-bold uppercase tracking-widest">
                {lang === "en" ? "Directory" : lang === "zh" ? "通讯录" : "လမ်းညွှန်"}
              </span>
            </button>

            <div className="relative flex-1 flex justify-center h-full">
              <button
                onClick={() => {
                  setCurrentTab("dashboard");
                  setIsAdminUnlocked(false);
                }}
                className={`absolute bottom-0 flex flex-col items-center justify-center w-14 h-14 rounded-full shadow-lg border-4 border-white transition-transform transform hover:scale-105 ${
                  currentTab === "dashboard"
                    ? "bg-indigo-600 text-white"
                    : "bg-indigo-500 text-white"
                }`}
              >
                <Activity className="h-6 w-6 mb-0.5" />
                <span className="text-[8px] font-black uppercase tracking-widest">
                  {lang === "en" ? "Today" : lang === "zh" ? "今日" : "ယနေ့"}
                </span>
              </button>
            </div>

            <button
              onClick={() => {
                setCurrentTab("notes");
                setIsAdminUnlocked(false);
              }}
              className={`flex-1 flex flex-col items-center gap-1 transition-colors ${
                currentTab === "notes"
                  ? "text-indigo-600 font-black"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <Wrench className="h-5 w-5" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-center truncate w-full max-w-[64px]">
                {lang === "en" ? "Utilities" : lang === "zh" ? "工具" : "ကိရိယာများ"}
              </span>
            </button>

            <button
              onClick={() => {
                setCurrentTab("settings");
                setIsAdminUnlocked(false);
              }}
              className={`flex-1 flex flex-col items-center gap-1 transition-colors ${
                currentTab === "settings"
                  ? "text-indigo-600 font-black"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <Settings className="h-5 w-5" />
              <span className="text-[9px] font-bold uppercase tracking-widest">
                {lang === "en" ? "Settings" : lang === "zh" ? "设置" : "ပြင်ဆင်မှု"}
              </span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
