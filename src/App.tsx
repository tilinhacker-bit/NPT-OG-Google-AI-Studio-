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
  Sun
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { DATA, MM_NAMES, RosterDay, Contact, DailyInfo } from "./data";

function translateName(name: string, lang: 'en' | 'mm'): string {
  if (lang === 'en') return name;
  let translated = name;
  for (const [enName, mmName] of Object.entries(MM_NAMES)) {
    if (translated.includes(enName)) {
      translated = translated.replace(enName, mmName);
    }
  }
  return translated;
}

const LABELS: { [key: string]: string } = {
  'Duty': 'Duty',
  'Pre': 'Pre-Duty',
  'Ord': 'Ordinary',
  'Off': 'Night Off',
  'Rest': 'Day Off',
  'Anes': 'ANA'
};

const COLOR_PRESETS = {
  pastel: {
    'Duty': { bg: '#ffe4e6', text: '#be123c' },
    'Pre': { bg: '#ffedd5', text: '#ea580c' },
    'Ord': { bg: '#e0f2fe', text: '#0369a1' },
    'Off': { bg: '#f1f5f9', text: '#64748b' },
    'Rest': { bg: '#ccfbf1', text: '#0f766e' },
    'Anes': { bg: '#f3e8ff', text: '#7e22ce' }
  },
  vibrant: {
    'Duty': { bg: '#fecaca', text: '#991b1b' },
    'Pre': { bg: '#fed7aa', text: '#9a3412' },
    'Ord': { bg: '#bae6fd', text: '#075985' },
    'Off': { bg: '#e2e8f0', text: '#475569' },
    'Rest': { bg: '#a7f3d0', text: '#065f46' },
    'Anes': { bg: '#e9d5ff', text: '#5b21b6' }
  },
  ocean: {
    'Duty': { bg: '#e0f2fe', text: '#0369a1' },
    'Pre': { bg: '#bae6fd', text: '#075985' },
    'Ord': { bg: '#38bdf8', text: '#0369a1' },
    'Off': { bg: '#f0f9ff', text: '#0891b2' },
    'Rest': { bg: '#06b6d4', text: '#ffffff' },
    'Anes': { bg: '#0891b2', text: '#ffffff' }
  },
  monochrome: {
    'Duty': { bg: '#334155', text: '#ffffff' },
    'Pre': { bg: '#475569', text: '#ffffff' },
    'Ord': { bg: '#64748b', text: '#ffffff' },
    'Off': { bg: '#f1f5f9', text: '#334155' },
    'Rest': { bg: '#cbd5e1', text: '#0f172a' },
    'Anes': { bg: '#0f172a', text: '#ffffff' }
  },
  sunset: {
    'Duty': { bg: '#fef08a', text: '#854d0e' },
    'Pre': { bg: '#fed7aa', text: '#9a3412' },
    'Ord': { bg: '#fca5a5', text: '#7f1d1d' },
    'Off': { bg: '#e5e7eb', text: '#374151' },
    'Rest': { bg: '#fef9c3', text: '#a16207' },
    'Anes': { bg: '#fbcfe8', text: '#831843' }
  },
  forest: {
    'Duty': { bg: '#dcfce7', text: '#166534' },
    'Pre': { bg: '#bbf7d0', text: '#14532d' },
    'Ord': { bg: '#86efac', text: '#14532d' },
    'Off': { bg: '#f3f4f6', text: '#1f2937' },
    'Rest': { bg: '#ecfccb', text: '#3f6212' },
    'Anes': { bg: '#d9f99d', text: '#3f6212' }
  },
  lavender: {
    'Duty': { bg: '#f3e8ff', text: '#6b21a8' },
    'Pre': { bg: '#e9d5ff', text: '#581c87' },
    'Ord': { bg: '#d8b4fe', text: '#4c1d95' },
    'Off': { bg: '#f8fafc', text: '#475569' },
    'Rest': { bg: '#fae8ff', text: '#701a75' },
    'Anes': { bg: '#f5d0fe', text: '#701a75' }
  },
  midnight: {
    'Duty': { bg: '#1e1b4b', text: '#c7d2fe' },
    'Pre': { bg: '#312e81', text: '#e0e7ff' },
    'Ord': { bg: '#3730a3', text: '#e0e7ff' },
    'Off': { bg: '#0f172a', text: '#cbd5e1' },
    'Rest': { bg: '#172554', text: '#dbeafe' },
    'Anes': { bg: '#1e3a8a', text: '#dbeafe' }
  },
  cherry: {
    'Duty': { bg: '#ffe4e6', text: '#9f1239' },
    'Pre': { bg: '#fecdd3', text: '#881337' },
    'Ord': { bg: '#fda4af', text: '#881337' },
    'Off': { bg: '#f1f5f9', text: '#475569' },
    'Rest': { bg: '#fee2e2', text: '#7f1d1d' },
    'Anes': { bg: '#ffedd5', text: '#7c2d12' }
  },
  amber: {
    'Duty': { bg: '#fef3c7', text: '#92400e' },
    'Pre': { bg: '#fde68a', text: '#78350f' },
    'Ord': { bg: '#fcd34d', text: '#78350f' },
    'Off': { bg: '#f3f4f6', text: '#374151' },
    'Rest': { bg: '#fef9c3', text: '#713f12' },
    'Anes': { bg: '#ffedd5', text: '#7c2d12' }
  },
  emerald: {
    'Duty': { bg: '#d1fae5', text: '#065f46' },
    'Pre': { bg: '#a7f3d0', text: '#064e3b' },
    'Ord': { bg: '#6ee7b7', text: '#064e3b' },
    'Off': { bg: '#f1f5f9', text: '#334155' },
    'Rest': { bg: '#ecfdf5', text: '#022c22' },
    'Anes': { bg: '#ccfbf1', text: '#115e59' }
  },
  ruby: {
    'Duty': { bg: '#ffe4e6', text: '#be123c' },
    'Pre': { bg: '#fecdd3', text: '#9f1239' },
    'Ord': { bg: '#fda4af', text: '#881337' },
    'Off': { bg: '#e5e7eb', text: '#1f2937' },
    'Rest': { bg: '#fff1f2', text: '#4c0519' },
    'Anes': { bg: '#ffe4e6', text: '#881337' }
  }
};

function getContrastColor(hexcolor: string): string {
  const cleanHex = hexcolor.replace("#", "");
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return yiq >= 128 ? '#1e293b' : '#ffffff';
}

const HO_SHORT_LABELS: Record<string, string> = {
  'Duty': 'Duty',
  'Pre': 'Pre-D',
  'Ord': 'Ord',
  'Off': 'NOF',
  'Rest': 'DOF',
  'Anes': 'ANA'
};

export default function App() {
  // Onboarding & Role State
  const [userRole, setUserRole] = useState<string | null>(() => localStorage.getItem("userRole"));
  const [userGroup, setUserGroup] = useState<string | null>(() => localStorage.getItem("userGroup"));


  // Tab State
  const [currentTab, setCurrentTab] = useState<string>("dashboard");
  const [directoryTab, setDirectoryTab] = useState<"contacts" | "resources">("contacts");

  // Date Navigation State
  const [dateOffset, setDateOffset] = useState<number>(0);

  // Calendar view State
  const [calMonth, setCalMonth] = useState<number>(7); // July=7, August=8, September=9

  // Admin stealth unlock state
  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(false);
  const [logoTapCount, setLogoTapCount] = useState<number>(0);
  const logoTapTimeout = useRef<NodeJS.Timeout | null>(null);

  // Modals state
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [appTutorialOpen, setAppTutorialOpen] = useState(false);
  const [adminAuthModalOpen, setAdminAuthModalOpen] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  // Notes state
  const [notes, setNotes] = useState<{id: string, text: string, createdAt: string}[]>(() => {
    try {
      const saved = localStorage.getItem("oghub_notes");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
        // Migration from string
        return [{ id: Date.now().toString(), text: saved, createdAt: new Date().toISOString() }];
      }
    } catch {
      // Fallback if parsing fails or old string format
      const savedStr = localStorage.getItem("oghub_notes") || "";
      if (savedStr) return [{ id: Date.now().toString(), text: savedStr, createdAt: new Date().toISOString() }];
    }
    return [];
  });
  const [currentNoteText, setCurrentNoteText] = useState("");

  const handleNoteKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        e.preventDefault();
        addNote();
        return;
      }
      
      const target = e.target as HTMLTextAreaElement;
      const { selectionStart, value } = target;
      
      const textBeforeCursor = value.substring(0, selectionStart);
      const lines = textBeforeCursor.split('\n');
      const currentLine = lines[lines.length - 1];
      
      const bulletMatch = currentLine.match(/^(\s*)([-*•]\s|\d+\.\s)/);
      
      if (bulletMatch) {
        e.preventDefault();
        const bullet = bulletMatch[0];
        
        if (currentLine.trim() === bulletMatch[2].trim()) {
          const textAfterCursor = value.substring(target.selectionEnd);
          const newValue = textBeforeCursor.substring(0, textBeforeCursor.length - bullet.length) + '\n' + textAfterCursor;
          setCurrentNoteText(newValue);
          setTimeout(() => {
            target.selectionStart = target.selectionEnd = selectionStart - bullet.length + 1;
          }, 0);
          return;
        }

        const textAfterCursor = value.substring(target.selectionEnd);
        const newValue = textBeforeCursor + '\n' + bullet + textAfterCursor;
        setCurrentNoteText(newValue);
        
        setTimeout(() => {
          target.selectionStart = target.selectionEnd = selectionStart + 1 + bullet.length;
        }, 0);
      }
    }
  };

  const addNote = () => {
    if (!currentNoteText.trim()) return;
    const newNote = {
      id: Date.now().toString(),
      text: currentNoteText,
      createdAt: new Date().toISOString()
    };
    const updated = [newNote, ...notes];
    setNotes(updated);
    setCurrentNoteText("");
    localStorage.setItem("oghub_notes", JSON.stringify(updated));
  };

  const deleteNote = (id: string) => {
    const updated = notes.filter(n => n.id !== id);
    setNotes(updated);
    localStorage.setItem("oghub_notes", JSON.stringify(updated));
  };

  // Theme settings
  const [theme, setTheme] = useState<{ [role: string]: { bg: string; text: string } }>(() => {
    const saved = localStorage.getItem("rosterTheme");
    return saved ? JSON.parse(saved) : COLOR_PRESETS.pastel;
  });

  // Theme picker state
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"presets" | "custom">("presets");
  const [selectedCustomRole, setSelectedCustomRole] = useState<string>("Duty");
  const [customColorPicker, setCustomColorPicker] = useState<string>("#ffe4e6");

  // Bilingual State (EN/MM)
  const [lang, setLang] = useState<"en" | "mm">("en");

  // PDF Viewer state
  const [readingPdfUrl, setReadingPdfUrl] = useState<string | null>(null);

  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("oghub_darkmode");
    if (saved) return JSON.parse(saved);
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem("oghub_darkmode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Collapsible cards state
  const [expandedCards, setExpandedCards] = useState<{ [key: string]: boolean }>({
    "ho-super": false,
    "as": false,
    "med": false
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
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
  }, []);

  // Sync custom color picker state when role changes
  useEffect(() => {
    if (theme[selectedCustomRole]) {
      setCustomColorPicker(theme[selectedCustomRole].bg);
    }
  }, [selectedCustomRole, theme]);

  // Compute master roster 92 days
  const masterRoster = useMemo<RosterDay[]>(() => {
    const roster: RosterDay[] = [];
    const getDayOfWeek = (m: number, d: number) => new Date(2026, m - 1, d).getDay();
    const isWeekend = (m: number, d: number) => {
      const dow = getDayOfWeek(m, d);
      return dow === 0 || dow === 6;
    };
    const isHoliday = (m: number, d: number) => m === 7 && d === 29;
    const isAnes = (group: string, m: number, d: number) => {
      const current = new Date(2026, m - 1, d).getTime();
      const block = DATA.anesBlocks[group];
      if (!block) return false;
      const start = new Date(2026, block.startM - 1, block.startD).getTime();
      const end = new Date(2026, block.endM - 1, block.endD).getTime();
      return current >= start && current <= end;
    };

    // Build base calendar data
    for (let m = 7; m <= 9; m++) {
      const daysInMonth = m === 9 ? 30 : 31;
      for (let d = 1; d <= daysInMonth; d++) {
        const dayObj: RosterDay = {
          month: m,
          d: d,
          roles: {},
          dateStr: `2026-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`
        };
        ['A', 'B', 'C', 'D'].forEach(g => {
          if (isAnes(g, m, d)) {
            dayObj.roles[g] = 'Anes';
          } else if (DATA.duties[g] && DATA.duties[g][m] && DATA.duties[g][m].includes(d)) {
            dayObj.roles[g] = 'Duty';
          } else if (DATA.nightOffs[g] && DATA.nightOffs[g][m] && DATA.nightOffs[g][m].includes(d)) {
            dayObj.roles[g] = 'Off';
          } else if (isWeekend(m, d) || isHoliday(m, d)) {
            dayObj.roles[g] = 'Rest';
          } else {
            dayObj.roles[g] = 'Ord';
          }
        });
        roster.push(dayObj);
      }
    }

    // Pre-Duty calculation rule:
    // If yesterday was 'Ord' and today is 'Ord', then today is 'Pre-duty' (for groups not in ANA)
    for (let i = 1; i < roster.length; i++) {
      const today = roster[i];
      const yesterday = roster[i - 1];
      if (['A', 'B', 'C', 'D'].every(g => today.roles[g] !== 'Anes')) {
        ['A', 'B', 'C', 'D'].forEach(g => {
          if (yesterday.roles[g] === 'Ord' && today.roles[g] === 'Ord') {
            today.roles[g] = 'Pre';
          }
        });
      }
    }

    return roster;
  }, []);

  // Compute selected Date
  const activeDate = useMemo(() => {
    let date = new Date();
    if (date.getFullYear() !== 2026) {
      date = new Date("2026-07-06T00:00:00");
    }
    date.setDate(date.getDate() + dateOffset);
    return date;
  }, [dateOffset]);

  const activeDateFormatted = useMemo(() => {
    return activeDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  }, [activeDate]);

  const activeDateLabel = useMemo(() => {
    if (dateOffset === 0) return "Today";
    if (dateOffset === 1) return "Tomorrow";
    if (dateOffset === -1) return "Yesterday";
    return `${Math.abs(dateOffset)} Days ${dateOffset > 0 ? 'Ahead' : 'Ago'}`;
  }, [dateOffset]);

  const mNum = activeDate.getMonth() + 1;
  const dNum = activeDate.getDate();
  const dateStr = `2026-${String(mNum).padStart(2, '0')}-${String(dNum).padStart(2, '0')}`;

  const rosterDay = useMemo(() => {
    return masterRoster.find(r => r.month === mNum && r.d === dNum);
  }, [masterRoster, mNum, dNum]);

  const dailyData: DailyInfo | undefined = DATA.dailyInfo[dateStr];

  // Calculate shift type for active role/group
  const currentShiftType = useMemo(() => {
    if (!rosterDay || userRole === 'Others' || !userGroup) return 'Off';
    if (userRole === 'HO') {
      return rosterDay.roles[userGroup] || 'Off';
    }
    return 'Off';
  }, [rosterDay, userRole, userGroup]);

  const currentThemeColor = theme[currentShiftType] || theme['Off'];

  // Handle Logo Tap to Unlock Admin
  const handleLogoTap = () => {
    if (userRole !== "HO" || userGroup !== "B") return;

    setLogoTapCount(prev => {
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
    if (adminPasswordInput === "OG2026") {
      setIsAdminUnlocked(true);
      setCurrentTab("admin");
      setAdminAuthModalOpen(false);
      setAdminPasswordInput("");
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
    setExpandedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
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
        text: getContrastColor(customColorPicker)
      }
    };
    setTheme(newTheme);
    localStorage.setItem("rosterTheme", JSON.stringify(newTheme));
    setIsColorModalOpen(false);
  };

  // Calculate 92-day grand totals statistics
  const adminStats = useMemo(() => {
    const stats = {
      A: { Duty: 0, Off: 0, Pre: 0, Ord: 0, Rest: 0, Anes: 0, total: 0 },
      B: { Duty: 0, Off: 0, Pre: 0, Ord: 0, Rest: 0, Anes: 0, total: 0 },
      C: { Duty: 0, Off: 0, Pre: 0, Ord: 0, Rest: 0, Anes: 0, total: 0 },
      D: { Duty: 0, Off: 0, Pre: 0, Ord: 0, Rest: 0, Anes: 0, total: 0 }
    };

    const monthStats: { [month: number]: typeof stats } = {
      7: {
        A: { Duty: 0, Off: 0, Pre: 0, Ord: 0, Rest: 0, Anes: 0, total: 0 },
        B: { Duty: 0, Off: 0, Pre: 0, Ord: 0, Rest: 0, Anes: 0, total: 0 },
        C: { Duty: 0, Off: 0, Pre: 0, Ord: 0, Rest: 0, Anes: 0, total: 0 },
        D: { Duty: 0, Off: 0, Pre: 0, Ord: 0, Rest: 0, Anes: 0, total: 0 }
      },
      8: {
        A: { Duty: 0, Off: 0, Pre: 0, Ord: 0, Rest: 0, Anes: 0, total: 0 },
        B: { Duty: 0, Off: 0, Pre: 0, Ord: 0, Rest: 0, Anes: 0, total: 0 },
        C: { Duty: 0, Off: 0, Pre: 0, Ord: 0, Rest: 0, Anes: 0, total: 0 },
        D: { Duty: 0, Off: 0, Pre: 0, Ord: 0, Rest: 0, Anes: 0, total: 0 }
      },
      9: {
        A: { Duty: 0, Off: 0, Pre: 0, Ord: 0, Rest: 0, Anes: 0, total: 0 },
        B: { Duty: 0, Off: 0, Pre: 0, Ord: 0, Rest: 0, Anes: 0, total: 0 },
        C: { Duty: 0, Off: 0, Pre: 0, Ord: 0, Rest: 0, Anes: 0, total: 0 },
        D: { Duty: 0, Off: 0, Pre: 0, Ord: 0, Rest: 0, Anes: 0, total: 0 }
      }
    };

    masterRoster.forEach(day => {
      ['A', 'B', 'C', 'D'].forEach(g => {
        const r = day.roles[g] as keyof typeof stats.A;
        if (stats[g as keyof typeof stats] && r in stats[g as keyof typeof stats]) {
          stats[g as keyof typeof stats][r]++;
          stats[g as keyof typeof stats].total++;
        }
        if (monthStats[day.month] && monthStats[day.month][g as keyof typeof stats] && r in monthStats[day.month][g as keyof typeof stats]) {
          monthStats[day.month][g as keyof typeof stats][r]++;
          monthStats[day.month][g as keyof typeof stats].total++;
        }
      });
    });

    return { grand: stats, monthly: monthStats };
  }, [masterRoster]);

  // Calendar render prep
  const calendarPadding = useMemo(() => {
    return new Date(2026, calMonth - 1, 1).getDay();
  }, [calMonth]);

  const activeMonthDays = useMemo(() => {
    return masterRoster.filter(d => d.month === calMonth);
  }, [masterRoster, calMonth]);

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
                  <h2 className="text-2xl font-black text-slate-800 mb-2">Welcome to NPT OG Hub</h2>
                  <p className="text-slate-500 font-medium mb-6 text-sm">Obstetrics & Gynaecology clinical ward organizer. Select your role to get started.</p>
                  
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => handleSetRole("HO")} 
                      className="group py-4 px-5 border-2 border-slate-100 rounded-2xl font-bold text-slate-700 hover:border-pink-500 hover:bg-pink-50/50 transition duration-300 flex items-center justify-between"
                    >
                      <span>⚕️ House Officer (HO)</span>
                      <span className="text-xs text-slate-400 group-hover:text-pink-500 transition">Select &rarr;</span>
                    </button>
                    <button 
                      onClick={() => handleSetRole("Others")} 
                      className="group py-4 px-5 border-2 border-slate-100 rounded-2xl font-bold text-slate-700 hover:border-indigo-500 hover:bg-indigo-50/50 transition duration-300 flex items-center justify-between"
                    >
                      <span>👤 Others</span>
                      <span className="text-xs text-slate-400 group-hover:text-indigo-500 transition">Select &rarr;</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-black text-slate-800 mb-2">Select Your Group</h2>
                  <p className="text-slate-500 font-medium mb-6 text-sm">Which roster group are you assigned to?</p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {["A", "B", "C", "D"].map(g => {
                      const registeredHOGroup = localStorage.getItem("registeredHOGroup");
                      if (registeredHOGroup && registeredHOGroup !== g) return null;
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
                logoTapCount > 0 ? "bg-pink-100 text-pink-600 animate-pulse scale-95" : "bg-pink-50 text-pink-500 hover:bg-pink-100"
              }`}
              title="Tap 5 times for Admin statistics comparison"
            >
              <Heart className={`h-6 w-6 ${logoTapCount > 0 ? "fill-pink-500" : ""}`} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight leading-none">NPT OG Hub</h1>
                {isAdminUnlocked && (
                  <span className="bg-amber-100 text-amber-700 text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 uppercase tracking-wide">
                    <Unlock className="h-2 w-2" /> Admin
                  </span>
                )}
              </div>
              <p className="inline-block mt-1 text-[10px] font-bold uppercase tracking-widest bg-slate-200/80 text-slate-600 px-2.5 py-0.5 rounded-full">
                {userRole === "Others" ? "Others / Guest Mode" : `${userRole} • Group ${userGroup}`}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={() => setSettingsModalOpen(true)}
              className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-50 shadow-sm transition"
              title="Settings"
            >
              <Settings className="h-5 w-5" />
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
                {/* Date Selection Bar */}
                <div className="flex justify-between items-center bg-white p-2.5 rounded-2xl shadow-sm border border-slate-100">
                  <button 
                    onClick={() => setDateOffset(prev => prev - 1)}
                    className="p-2 font-bold text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-xl transition duration-200"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  
                  <div className="text-center">
                    <span className="block font-black text-lg text-slate-800 tracking-tight">{activeDateLabel}</span>
                    <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mt-0.5">{activeDateFormatted}</span>
                  </div>

                  <button 
                    onClick={() => setDateOffset(prev => prev + 1)}
                    className="p-2 font-bold text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-xl transition duration-200"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>

                {/* DYNAMIC SHIFT CARD */}
                <div 
                  style={{ backgroundColor: currentThemeColor.bg, color: currentThemeColor.text }}
                  className="rounded-[2.25rem] p-6 shadow-md transition-colors duration-300 border border-black/5"
                >
                    <div className="flex justify-between items-start mb-5">
                      <div>
                        <p className="font-bold uppercase tracking-widest text-[10px] opacity-80">Your Shift Status</p>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight mt-1">{LABELS[currentShiftType] || currentShiftType}</h2>
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
                          <p className="font-bold uppercase tracking-widest text-[9px] opacity-70 mb-1.5">House Surgeon Groups Overview</p>
                          <div className="flex flex-wrap gap-2.5 text-xs font-black">
                            {['A', 'B', 'C', 'D'].map(g => {
                              const r = rosterDay ? rosterDay.roles[g] : 'Off';
                              return (
                                <span key={g} className="px-2 py-0.5 rounded bg-black/15 border border-white/5 flex items-center gap-1">
                                  <span className="opacity-60">{g}:</span> 
                                  <span style={{ color: theme[r]?.bg }} className="font-extrabold">
                                    {HO_SHORT_LABELS[r] || r}
                                  </span>
                                </span>
                              );
                            })}
                          </div>
                        </div>
                        <div className="pl-2">
                          {expandedCards["ho-super"] ? <ChevronUp className="h-5 w-5 opacity-60" /> : <ChevronDown className="h-5 w-5 opacity-60" />}
                        </div>
                      </div>

                      {/* HO detailed collapse drawer */}
                      <AnimatePresence>
                        {expandedCards["ho-super"] && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-black/20 border-t border-white/5 px-4 py-4 space-y-3.5 text-white"
                          >
                            {['Duty', 'Pre', 'Ord', 'Off', 'Anes', 'Rest'].map(role => {
                              const groups = ['A', 'B', 'C', 'D'].filter(g => rosterDay?.roles[g] === role);
                              if (groups.length === 0) return null;
                              return (
                                <div key={role} className="bg-black/25 rounded-xl p-3 border border-white/5">
                                  <p 
                                    className="font-bold uppercase tracking-wider text-[10px] mb-2 border-b border-white/10 pb-1"
                                    style={{ color: theme[role]?.bg }}
                                  >
                                    {LABELS[role] || role} Team
                                  </p>
                                  <div className="space-y-3">
                                    {groups.map(g => (
                                      <div key={g}>
                                        <div className="text-[10px] font-black uppercase opacity-75">Group {g}</div>
                                        <div className="space-y-1.5 mt-1">
                                          {(DATA.ho_directory[g] || []).map((doc: Contact) => (
                                            <div key={doc.name} className="flex justify-between items-center text-xs">
                                              <span className="font-semibold">⚕️ {translateName(doc.name, lang)}</span>
                                              <a 
                                                href={`tel:${doc.phone}`} 
                                                className="bg-white/15 hover:bg-white/25 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider transition flex items-center gap-1"
                                                onClick={(e) => e.stopPropagation()}
                                              >
                                                <Phone className="h-2.5 w-2.5" /> {doc.phone}
                                              </a>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Seniors Grids (1 + 2 + 2 style layout) */}
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-black/10 backdrop-blur-sm rounded-2xl border border-white/10 dark:border-white/40 dark:shadow-[0_0_10px_rgba(255,255,255,0.05)] p-3.5">
                          <p className="text-[9px] font-bold uppercase tracking-wider opacity-70 mb-1">Consultant (SCS)</p>
                          <p className="font-extrabold text-xs sm:text-sm leading-tight">
                            {dailyData?.SCS !== "-" ? translateName(dailyData?.SCS || "", lang) : "N/A"}
                          </p>
                        </div>
                        <div className="bg-black/10 backdrop-blur-sm rounded-2xl border border-white/10 dark:border-white/40 dark:shadow-[0_0_10px_rgba(255,255,255,0.05)] p-3.5">
                          <p className="text-[9px] font-bold uppercase tracking-wider opacity-70 mb-1">Junior Cons. (JCS)</p>
                          <p className="font-extrabold text-xs sm:text-sm leading-tight">
                            {dailyData?.JCS !== "-" ? translateName(dailyData?.JCS || "", lang) : "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="bg-black/10 backdrop-blur-sm rounded-2xl border border-white/10 dark:border-white/40 dark:shadow-[0_0_10px_rgba(255,255,255,0.05)] p-3.5">
                        <p className="text-[9px] font-bold uppercase tracking-wider opacity-70 mb-1">Senior Assistant Surgeon (SAS)</p>
                        <p className="font-extrabold text-sm leading-tight">
                          {dailyData?.SAS !== "-" ? translateName(dailyData?.SAS || "", lang) : "N/A"}
                        </p>
                      </div>

                      {/* AS Team & Ward Round Super Card */}
                      <div 
                        onClick={() => toggleCard("as")}
                        className="bg-black/10 backdrop-blur-sm rounded-2xl border border-white/10 dark:border-white/40 dark:shadow-[0_0_10px_rgba(255,255,255,0.05)] cursor-pointer hover:bg-black/15 transition-all duration-300 dark:hover:scale-[1.02] overflow-hidden"
                      >
                        <div className="p-3.5 flex justify-between items-center">
                          <div>
                            <p className="text-[9px] font-bold uppercase tracking-wider opacity-70 mb-1">AS Team & Ward Round</p>
                            <p className="font-extrabold text-sm leading-tight">
                              {dailyData ? `Duty Team: Gp ${dailyData.AS_Group.replace("Group ", "")}` : "N/A"}
                            </p>
                          </div>
                          <div>
                            {expandedCards["as"] ? <ChevronUp className="h-4 w-4 opacity-60" /> : <ChevronDown className="h-4 w-4 opacity-60" />}
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
                                <span className="font-bold uppercase tracking-wider text-[9px] opacity-60 block mb-1.5">Duty Surgeons</span>
                                <div className="space-y-2">
                                  {dailyData ? (
                                    (DATA.as_directory[dailyData.AS_Group.replace("Group ", "")] || []).map((doc: Contact) => (
                                      <div key={doc.name} className="flex justify-between items-center">
                                        <span className="font-semibold">⚕️ AS {translateName(doc.name, lang)}</span>
                                        <a 
                                          href={`tel:${doc.phone}`} 
                                          className="bg-white/15 hover:bg-white/25 px-2 py-0.5 rounded font-bold tracking-wider transition flex items-center gap-1 text-[10px]"
                                          onClick={(e) => e.stopPropagation()}
                                        >
                                          <Phone className="h-2.5 w-2.5" /> {doc.phone}
                                        </a>
                                      </div>
                                    ))
                                  ) : (
                                    <span className="opacity-60">No surgeon scheduled</span>
                                  )}
                                </div>
                              </div>

                              {dailyData?.WR && (
                                <div className="pt-2 border-t border-white/5">
                                  <span className="font-bold uppercase tracking-wider text-[9px] opacity-60 block mb-1">Ward Round assignments</span>
                                  <div className="grid grid-cols-2 gap-2 mt-1.5">
                                    <div className="bg-black/15 p-2 rounded-lg border border-white/5">
                                      <span className="block text-[8px] uppercase tracking-widest opacity-60">Post-Op Ward</span>
                                      <span className="font-extrabold text-white text-xs">{dailyData.WR.postop}</span>
                                    </div>
                                    <div className="bg-black/15 p-2 rounded-lg border border-white/5">
                                      <span className="block text-[8px] uppercase tracking-widest opacity-60">PN Ward</span>
                                      <span className="font-extrabold text-white text-xs">{dailyData.WR.pn}</span>
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
                            <p className="text-[9px] font-bold uppercase tracking-wider opacity-70 mb-1">NPTGH Medical OnCall</p>
                            <p className="font-extrabold text-sm leading-tight">
                              {dailyData?.Med_name ? translateName(dailyData.Med_name, lang) : "N/A"}
                            </p>
                          </div>
                          <div>
                            {expandedCards["med"] ? <ChevronUp className="h-4 w-4 opacity-60" /> : <ChevronDown className="h-4 w-4 opacity-60" />}
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
                              <span className="font-bold uppercase tracking-wider text-[9px] opacity-60 block mb-2">Direct Contacts</span>
                              <div className="flex flex-col gap-1.5">
                                {dailyData?.Med_phone ? (
                                  dailyData.Med_phone.split("/").map((p, idx) => {
                                    const cleanPhone = p.trim().replace(/[^0-9]/g, "");
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
                                  <span className="opacity-60 text-xs">No direct contacts provided</span>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-[2.25rem] shadow-sm border border-slate-100 flex flex-col min-h-[16rem] max-h-96">
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">My Notes</p>
                    </div>
                    <div className="flex gap-2 mb-4">
                      <textarea 
                        value={currentNoteText} 
                        onChange={e => setCurrentNoteText(e.target.value)} 
                        onKeyDown={handleNoteKeyDown}
                        placeholder="Write a new note... (Shift+Enter to save)"
                        className="flex-grow bg-slate-50 border border-slate-100 text-sm font-medium text-slate-700 outline-none rounded-xl px-3 py-2 placeholder-slate-300 focus:border-indigo-300 resize-none h-14"
                      />
                      <button 
                        onClick={addNote}
                        className="w-10 h-10 flex-shrink-0 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center hover:bg-indigo-100 transition"
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="flex-grow overflow-y-auto space-y-2">
                      {notes.length === 0 ? (
                        <p className="text-xs text-slate-400 text-center mt-4">No notes yet. Add one above.</p>
                      ) : (
                        notes.map(note => (
                          <div key={note.id} className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex justify-between group">
                            <div className="pr-2">
                              <p className="text-sm font-medium text-slate-700 break-words whitespace-pre-wrap">{note.text}</p>
                              <p className="text-[9px] text-slate-400 mt-1 font-semibold">{new Date(note.createdAt).toLocaleString()}</p>
                            </div>
                            <button 
                              onClick={() => deleteNote(note.id)} 
                              className="text-slate-300 hover:text-red-500 transition p-1"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
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
                {/* Roster Controls */}
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

                {/* Captured Calendar/Matrix Area */}
                <div 
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
                    <Heart className="h-4 w-4 text-pink-500 fill-pink-500/20" />
                  </div>

                  {userRole === "HO" ? (
                    /* DUAL-STATE ROSTER: HO Group Calendar Grid */
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
                          return (
                            <div 
                              key={day.d}
                              style={{ backgroundColor: c.bg, color: c.text }}
                              className="flex flex-col items-center justify-center py-2.5 rounded-xl shadow-sm border border-black/5"
                            >
                              <span className="text-xs md:text-sm font-black">{day.d}</span>
                              <span className="text-[8px] font-black uppercase tracking-widest mt-0.5 opacity-90">
                                {HO_SHORT_LABELS[role] || role}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Calendar Color Legend */}
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
                    /* DUAL-STATE ROSTER: AS & Guest Massive Matrix View */
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
                            
                            return (
                              <tr key={day.d} className="hover:bg-slate-50/50 transition">
                                <td className="sticky left-0 bg-white border-r border-slate-100 z-10 font-black text-xs text-slate-700 p-2.5 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
                                  {day.month}/{day.d}
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
                <div className="flex gap-2 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
                  <button 
                    onClick={() => setDirectoryTab("contacts")}
                    className={`flex-1 py-3 font-black text-xs uppercase tracking-wider rounded-xl transition ${directoryTab === "contacts" ? "bg-indigo-50 text-indigo-700" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"}`}
                  >
                    Ward Contacts
                  </button>
                  <button 
                    onClick={() => setDirectoryTab("resources")}
                    className={`flex-1 py-3 font-black text-xs uppercase tracking-wider rounded-xl transition ${directoryTab === "resources" ? "bg-indigo-50 text-indigo-700" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"}`}
                  >
                    Resources
                  </button>
                </div>

                {directoryTab === "contacts" && (
                  <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
                    <h3 className="text-lg font-black text-slate-800 mb-5 flex items-center gap-2">
                      <Users className="h-5 w-5 text-indigo-500" /> Ward Contacts Directory
                    </h3>

                    <div className="space-y-6">
                    {/* SCS, JCS, SAS Sections */}
                    {DATA.directory_layout.map((section, idx) => (
                      <div key={idx} className="space-y-2">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 pb-1 border-b border-slate-100">
                          {section.header}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {section.contacts.map((contact, cIdx) => (
                            <div 
                              key={cIdx} 
                              className="bg-slate-50/80 p-3 rounded-2xl border border-slate-100 font-bold text-slate-700 text-xs flex justify-between items-center"
                            >
                              <span>⚕️ {translateName(contact.name, lang)}</span>
                              {contact.phone && (
                                <a 
                                  href={`tel:${contact.phone}`} 
                                  className="bg-white text-indigo-600 px-3 py-1 rounded-lg border border-indigo-100 shadow-sm text-[10px] font-bold shrink-0 flex items-center gap-1 hover:bg-indigo-50 transition"
                                >
                                  <Phone className="h-2.5 w-2.5" /> Call
                                </a>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    {/* AS Groups Section */}
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 pb-1 border-b border-slate-100">
                        Assistant Surgeons (AS Groups)
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {["1", "2", "3"].map(g => (
                          <div key={g} className="bg-indigo-50/50 border border-indigo-100/60 rounded-2xl overflow-hidden">
                            <div className="bg-indigo-100/60 px-4 py-2 font-black text-indigo-800 text-[10px] uppercase tracking-wider">
                              Group {g}
                            </div>
                            <div className="p-3 space-y-2">
                              {(DATA.as_directory[g] || []).map(doc => (
                                <div key={doc.name} className="flex justify-between items-center text-xs font-semibold text-slate-700">
                                  <span className="truncate pr-1">{translateName(doc.name, lang)}</span>
                                  <a 
                                    href={`tel:${doc.phone}`} 
                                    className="bg-white text-indigo-600 px-2 py-0.5 rounded-md border border-indigo-100 shadow-sm text-[9px] font-bold shrink-0"
                                  >
                                    📱 {doc.phone}
                                  </a>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* HO Groups Section */}
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 pb-1 border-b border-slate-100">
                        House Officers (HO Groups)
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {["A", "B", "C", "D"].map(g => (
                          <div key={g} className="bg-slate-50 border border-slate-200/60 rounded-2xl overflow-hidden">
                            <div className="bg-slate-200/60 px-4 py-2 font-black text-slate-700 text-[10px] uppercase tracking-wider">
                              Group {g}
                            </div>
                            <div className="p-3 space-y-2">
                              {(DATA.ho_directory[g] || []).map(doc => (
                                <div key={doc.name} className="flex justify-between items-center text-xs font-semibold text-slate-700">
                                  <span className="truncate pr-1">{translateName(doc.name, lang)}</span>
                                  <a 
                                    href={`tel:${doc.phone}`} 
                                    className="bg-white text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 shadow-sm text-[9px] font-bold shrink-0"
                                  >
                                    📱 {doc.phone}
                                  </a>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
                )}

                {directoryTab === "resources" && (
                  <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 space-y-6">
                    <h3 className="text-lg font-black text-slate-800 mb-2 flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-indigo-500" /> Educational Resources
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="bg-blue-100 text-blue-600 p-2 rounded-xl">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-700 text-sm">O&G Guidelines (Placeholder)</h4>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">PDF • 2.4 MB</p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <button 
                            onClick={() => setReadingPdfUrl("/guidelines.pdf")}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl hover:bg-indigo-700 transition shadow-sm dark:bg-indigo-500 dark:hover:bg-indigo-400">
                            <BookOpen className="h-3.5 w-3.5" /> Read
                          </button>
                          <a 
                            href="/guidelines.pdf"
                            download
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold text-xs rounded-xl hover:bg-slate-50 transition shadow-sm dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700">
                            <Download className="h-3.5 w-3.5" /> Download
                          </a>
                        </div>
                      </div>

                      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="bg-emerald-100 text-emerald-600 p-2 rounded-xl">
                            <BookOpen className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-700 text-sm">Clinical Ward Protocol (Placeholder)</h4>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">EBook • 5.1 MB</p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <button 
                            onClick={() => setReadingPdfUrl("/protocol.pdf")}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 transition shadow-sm dark:bg-emerald-500 dark:hover:bg-emerald-400">
                            <BookOpen className="h-3.5 w-3.5" /> Read
                          </button>
                          <a 
                            href="/protocol.pdf"
                            download
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold text-xs rounded-xl hover:bg-slate-50 transition shadow-sm dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700">
                            <Download className="h-3.5 w-3.5" /> Download
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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
                    onClick={() => {
                      setIsAdminUnlocked(false);
                      setCurrentTab("dashboard");
                    }} 
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-xs transition"
                  >
                    Lock Database
                  </button>
                </div>

                {/* Grand Totals comparison table */}
                <div className="bg-white p-5 rounded-[1.75rem] shadow-sm border border-slate-100">
                  <h3 className="text-sm font-black text-slate-800 mb-3 uppercase tracking-wider flex items-center gap-1.5">
                    <ClipboardList className="h-4 w-4 text-pink-500" /> Q3 Grand Total Breakdowns (92 Days)
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[400px]">
                      <thead>
                        <tr className="border-b border-slate-100 text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">
                          <th className="py-2.5">Group</th>
                          <th className="py-2.5 text-center">Duty</th>
                          <th className="py-2.5 text-center">Off</th>
                          <th className="py-2.5 text-center">Pre</th>
                          <th className="py-2.5 text-center">Ord</th>
                          <th className="py-2.5 text-center">Rest</th>
                          <th className="py-2.5 text-center">ANA</th>
                          <th className="py-2.5 text-center">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {["A", "B", "C", "D"].map(g => {
                          const s = adminStats.grand[g as keyof typeof adminStats.grand];
                          return (
                            <tr key={g} className={`text-xs ${g === userGroup && userRole === "HO" ? "bg-pink-50/40 font-black" : ""}`}>
                              <td className="py-3 font-bold text-slate-700">Group {g}</td>
                              <td className="py-3 text-center font-extrabold" style={{ color: theme.Duty?.bg }}>{s.Duty}</td>
                              <td className="py-3 text-center font-extrabold" style={{ color: theme.Off?.bg }}>{s.Off}</td>
                              <td className="py-3 text-center font-extrabold" style={{ color: theme.Pre?.bg }}>{s.Pre}</td>
                              <td className="py-3 text-center font-extrabold" style={{ color: theme.Ord?.bg }}>{s.Ord}</td>
                              <td className="py-3 text-center font-extrabold" style={{ color: theme.Rest?.bg }}>{s.Rest}</td>
                              <td className="py-3 text-center font-extrabold" style={{ color: theme.Anes?.bg }}>{s.Anes}</td>
                              <td className="py-3 text-center font-black text-slate-800">{s.total}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Monthly Breakdowns */}
                {[7, 8, 9].map(m => (
                  <div key={m} className="bg-white p-5 rounded-[1.75rem] shadow-sm border border-slate-100">
                    <h3 className="text-sm font-black text-slate-800 mb-3 uppercase tracking-wider">
                      {m === 7 ? "July" : m === 8 ? "August" : "September"} 2026 Summary
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[400px]">
                        <thead>
                          <tr className="border-b border-slate-100 text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">
                            <th className="py-2.5">Group</th>
                            <th className="py-2.5 text-center">Duty</th>
                            <th className="py-2.5 text-center">Off</th>
                            <th className="py-2.5 text-center">Pre</th>
                            <th className="py-2.5 text-center">Ord</th>
                            <th className="py-2.5 text-center">Rest</th>
                            <th className="py-2.5 text-center">ANA</th>
                            <th className="py-2.5 text-center">Total</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {["A", "B", "C", "D"].map(g => {
                            const s = adminStats.monthly[m][g as keyof typeof adminStats.grand];
                            return (
                              <tr key={g} className={`text-xs ${g === userGroup && userRole === "HO" ? "bg-pink-50/40 font-black" : ""}`}>
                                <td className="py-3 font-bold text-slate-700">Group {g}</td>
                                <td className="py-3 text-center font-extrabold" style={{ color: theme.Duty?.bg }}>{s.Duty}</td>
                                <td className="py-3 text-center font-extrabold" style={{ color: theme.Off?.bg }}>{s.Off}</td>
                                <td className="py-3 text-center font-extrabold" style={{ color: theme.Pre?.bg }}>{s.Pre}</td>
                                <td className="py-3 text-center font-extrabold" style={{ color: theme.Ord?.bg }}>{s.Ord}</td>
                                <td className="py-3 text-center font-extrabold" style={{ color: theme.Rest?.bg }}>{s.Rest}</td>
                                <td className="py-3 text-center font-extrabold" style={{ color: theme.Anes?.bg }}>{s.Anes}</td>
                                <td className="py-3 text-center font-black text-slate-800">{s.total}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Removed Configure Role button from bottom per user request */}

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
                <h3 className="text-md font-black text-slate-800 uppercase tracking-wide">Color Customizer</h3>
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
                  {Object.keys(COLOR_PRESETS).map(presetKey => {
                    const PRESET_LABELS: Record<string, string> = {
                      pastel: "🌸 Pastel Gentle",
                      vibrant: "🩺 Vibrant Clinical",
                      ocean: "🌊 Deep Ocean",
                      monochrome: "🐼 Slate Monochrome",
                      sunset: "🌅 Sunset Glow",
                      forest: "🌲 Forest Canopy",
                      lavender: "💜 Lavender Dream",
                      midnight: "🌃 Midnight Blue",
                      cherry: "🍒 Cherry Blossom",
                      amber: "🍯 Amber Warmth",
                      emerald: "💎 Emerald Shine",
                      ruby: "🛑 Ruby Crimson"
                    };
                    return (
                      <button 
                        key={presetKey}
                        onClick={() => handleApplyPreset(presetKey as keyof typeof COLOR_PRESETS)} 
                        className="p-4 rounded-2xl border border-slate-100 hover:border-indigo-400 text-left font-black text-slate-700 bg-slate-50 hover:bg-indigo-50/20 transition flex justify-between items-center"
                      >
                        <span>{PRESET_LABELS[presetKey] || presetKey}</span>
                        <span className="flex gap-1">
                          {Object.values(COLOR_PRESETS[presetKey as keyof typeof COLOR_PRESETS]).slice(0, 4).map((c, i) => (
                            <span key={i} className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: c.bg }} />
                          ))}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="p-6 flex flex-col gap-5">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">Select Shift / Duty Role</label>
                    <select 
                      value={selectedCustomRole}
                      onChange={(e) => setSelectedCustomRole(e.target.value)}
                      className="w-full p-3.5 rounded-xl border border-slate-200 font-extrabold text-sm text-slate-700 bg-white"
                    >
                      {Object.keys(LABELS).map(roleKey => (
                        <option key={roleKey} value={roleKey}>{LABELS[roleKey]}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">Choose Custom Color</label>
                    <div className="flex items-center gap-4">
                      <input 
                        type="color" 
                        value={customColorPicker}
                        onChange={(e) => setCustomColorPicker(e.target.value)}
                        className="w-14 h-14 rounded-xl cursor-pointer border border-slate-200 p-0"
                      />
                      <div 
                        style={{ backgroundColor: customColorPicker, color: getContrastColor(customColorPicker) }}
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

      {/* SETTINGS MODAL */}
      <AnimatePresence>
        {settingsModalOpen && (
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
              className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col border border-slate-100"
            >
              <div className="px-6 py-4.5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="text-md font-black text-slate-800 uppercase tracking-wide flex items-center gap-2">
                  <Settings className="h-5 w-5 text-slate-500" /> Settings
                </h3>
                <button 
                  onClick={() => setSettingsModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-200/50 rounded-lg transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6 flex flex-col gap-3">
                <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50 flex flex-col gap-3">
                  <div className="flex items-center gap-3 font-black text-slate-700">
                    <Languages className="h-5 w-5 text-indigo-500" /> Choose Language
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        setLang("en");
                        setSettingsModalOpen(false);
                      }}
                      className={`flex-1 py-2 rounded-xl font-bold text-xs transition ${lang === "en" ? "bg-indigo-600 text-white shadow-md" : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-100"}`}
                    >
                      English
                    </button>
                    <button 
                      onClick={() => {
                        setLang("mm");
                        setSettingsModalOpen(false);
                      }}
                      className={`flex-1 py-2 rounded-xl font-bold text-xs transition ${lang === "mm" ? "bg-indigo-600 text-white shadow-md" : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-100"}`}
                    >
                      မြန်မာ (Myanmar)
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3 font-black text-slate-700">
                    {isDarkMode ? <Moon className="h-5 w-5 text-indigo-400" /> : <Sun className="h-5 w-5 text-amber-500" />}
                    Dark Mode
                  </div>
                  <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isDarkMode ? 'bg-indigo-600' : 'bg-slate-300'}`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}`}
                    />
                  </button>
                </div>

                <button 
                  onClick={() => {
                    setIsColorModalOpen(true);
                    setSettingsModalOpen(false);
                  }}
                  className="p-4 rounded-2xl border border-slate-100 hover:border-indigo-400 text-left font-black text-slate-700 bg-slate-50 hover:bg-indigo-50/20 transition flex items-center gap-3"
                >
                  <Palette className="h-5 w-5 text-pink-500" /> Themes
                </button>
                {showInstallBtn && (
                  <button 
                    onClick={async () => {
                      if (!deferredPrompt) return;
                      deferredPrompt.prompt();
                      const { outcome } = await deferredPrompt.userChoice;
                      if (outcome === "accepted") {
                        setShowInstallBtn(false);
                      }
                      setDeferredPrompt(null);
                      setSettingsModalOpen(false);
                    }}
                    className="p-4 rounded-2xl border border-slate-100 hover:border-indigo-400 text-left font-black text-slate-700 bg-slate-50 hover:bg-indigo-50/20 transition flex items-center gap-3"
                  >
                    <Smartphone className="h-5 w-5 text-emerald-500" /> Install App
                  </button>
                )}
                <button 
                  onClick={() => {
                    window.location.reload();
                  }}
                  className="p-4 rounded-2xl border border-slate-100 hover:border-indigo-400 text-left font-black text-slate-700 bg-slate-50 hover:bg-indigo-50/20 transition flex items-center gap-3"
                >
                  <Download className="h-5 w-5 text-blue-500" /> Check for Updates
                </button>
                <button 
                  onClick={() => {
                    setAboutModalOpen(true);
                    setSettingsModalOpen(false);
                  }}
                  className="p-4 rounded-2xl border border-slate-100 hover:border-indigo-400 text-left font-black text-slate-700 bg-slate-50 hover:bg-indigo-50/20 transition flex items-center gap-3"
                >
                  <Info className="h-5 w-5 text-amber-500" /> About App
                </button>
                <button 
                  onClick={() => {
                    setAppTutorialOpen(true);
                    setSettingsModalOpen(false);
                  }}
                  className="p-4 rounded-2xl border border-slate-100 hover:border-indigo-400 text-left font-black text-slate-700 bg-slate-50 hover:bg-indigo-50/20 transition flex items-center gap-3"
                >
                  <HelpCircle className="h-5 w-5 text-purple-500" /> App Tutorial
                </button>
                <button 
                  onClick={() => {
                    resetOnboarding();
                    setSettingsModalOpen(false);
                  }}
                  className="p-4 rounded-2xl border border-slate-100 hover:border-red-400 text-left font-black text-slate-700 bg-slate-50 hover:bg-red-50/50 transition flex items-center gap-3 text-red-600"
                >
                  <LogOut className="h-5 w-5 text-red-500" /> Change Role / Logout
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
                  <HelpCircle className="h-5 w-5 text-purple-500" /> App Tutorial
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
                    <Languages className="h-4 w-4 text-indigo-500" /> Language / ဘာသာစကား
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    You can toggle the app language between English and Myanmar using the Settings menu. Most names in the directory and roster will be translated.
                    <br/><br/>
                    ဆက်တင်များမှတစ်ဆင့် အင်္ဂလိပ် သို့မဟုတ် မြန်မာ ဘာသာစကားကို ပြောင်းလဲနိုင်သည်။ အမည်အများစုကို ဘာသာပြန်ပေးပါမည်။
                  </p>
                </div>
                
                <div>
                  <h4 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2">
                    <Palette className="h-4 w-4 text-pink-500" /> Themes / အပြင်အဆင်
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Select a custom theme from Settings to match your preference. Each theme assigns distinct colors to duty roles to easily differentiate them on the calendar.
                    <br/><br/>
                    ပြက္ခဒိန်တွင် တာဝန်ချိန်အလိုက် အရောင်များဖြင့် ခွဲခြားသိမြင်နိုင်ရန် မိမိနှစ်သက်ရာ Theme ကို ပြောင်းလဲအသုံးပြုနိုင်ပါသည်။
                  </p>
                </div>
                
                <div>
                  <h4 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-emerald-500" /> Offline Install / ဖုန်းတွင်သွင်းရန်
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Tap "Install App" in the Settings menu to save the app to your home screen for offline access without an internet connection.
                    <br/><br/>
                    အင်တာနက်မလိုဘဲ အသုံးပြုနိုင်ရန် "Install App" ကိုနှိပ်၍ ဖုန်း၏ Home Screen တွင် ထည့်သွင်းထားနိုင်ပါသည်။
                  </p>
                </div>
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
              <h3 className="text-xl font-black text-slate-800 mb-2">NPT OG Hub</h3>
              <p className="text-slate-500 font-medium text-sm mb-6 leading-relaxed">
                App developed by <strong>Yawnaka Rajah</strong> with ❤️<br/>
                Tailored exactly to O&G July-September Q3 ward duties.<br/>
                Offline support enabled.
              </p>
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
                <Lock className="h-5 w-5 text-amber-500" /> Admin Access
              </h3>
              <input 
                type="password"
                value={adminPasswordInput}
                onChange={(e) => setAdminPasswordInput(e.target.value)}
                placeholder="Enter access code..."
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

      {/* PDF VIEWER MODAL */}
      <AnimatePresence>
        {readingPdfUrl && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-[100] flex flex-col"
          >
            <div className="flex justify-between items-center p-4 bg-slate-900 text-white border-b border-white/10">
              <h3 className="font-bold text-sm tracking-wide">Reading Material</h3>
              <button 
                onClick={() => setReadingPdfUrl(null)} 
                className="p-2 rounded-full hover:bg-white/10 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 w-full h-full bg-slate-100 dark:bg-slate-800">
              <iframe 
                src={readingPdfUrl} 
                className="w-full h-full border-none" 
                title="PDF Viewer" 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 7. BOTTOM NAVIGATION BAR */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.04)] z-40 pb-safe">
        <div className="max-w-2xl mx-auto flex justify-around">
          <button 
            onClick={() => {
              setCurrentTab("dashboard");
              setIsAdminUnlocked(false);
            }} 
            className={`flex-1 py-4 flex flex-col items-center gap-1.5 transition-colors ${
              currentTab === "dashboard" ? "text-indigo-600 font-black" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <Activity className="h-5 w-5" />
            <span className="text-[9px] font-bold uppercase tracking-widest">Today</span>
          </button>

          <button 
            onClick={() => {
              setCurrentTab("calendar");
              setIsAdminUnlocked(false);
            }} 
            className={`flex-1 py-4 flex flex-col items-center gap-1.5 transition-colors ${
              currentTab === "calendar" ? "text-indigo-600 font-black" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <CalendarIcon className="h-5 w-5" />
            <span className="text-[9px] font-bold uppercase tracking-widest">Roster</span>
          </button>

          <button 
            onClick={() => {
              setCurrentTab("directory");
              setIsAdminUnlocked(false);
            }} 
            className={`flex-1 py-4 flex flex-col items-center gap-1.5 transition-colors ${
              currentTab === "directory" ? "text-indigo-600 font-black" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <Users className="h-5 w-5" />
            <span className="text-[9px] font-bold uppercase tracking-widest">Directory</span>
          </button>
        </div>
      </nav>

    </div>
  );
}
