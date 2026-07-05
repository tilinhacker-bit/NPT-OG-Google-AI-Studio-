import React, { useState, useEffect, useRef } from "react";
import {
  Trash2,
  Pin,
  CalendarClock,
  X,
  Search,
  MoreVertical,
  Palette,
  Archive,
  Grid,
  List,
  Plus,
  Copy,
  Send,
  FileText,
  ArchiveRestore,
  ExternalLink,
  Check,
  ChevronDown,
} from "lucide-react";
import { useStore } from "../store/useStore";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { motion, AnimatePresence } from "motion/react";

// Official Google Keep light-mode pastel colors
export const KeepColors = {
  default: { name: "default", bg: "bg-white", border: "border-slate-200 hover:border-slate-300", dot: "bg-white border-slate-300", hex: "#ffffff", label: "Default", text: "text-slate-800" },
  red: { name: "red", bg: "bg-[#f28b82]/30", border: "border-[#f28b82]/50 hover:border-[#f28b82]/80", dot: "bg-[#f28b82]", hex: "#f28b82", label: "Coral Red", text: "text-red-950" },
  orange: { name: "orange", bg: "bg-[#fbbc04]/20", border: "border-[#fbbc04]/40 hover:border-[#fbbc04]/70", dot: "bg-[#fbbc04]", hex: "#fbbc04", label: "Peach", text: "text-amber-950" },
  yellow: { name: "yellow", bg: "bg-[#fff475]/35", border: "border-[#fff475]/50 hover:border-[#fff475]/80", dot: "bg-[#fff475]", hex: "#fff475", label: "Sand Yellow", text: "text-amber-950" },
  green: { name: "green", bg: "bg-[#ccff90]/30", border: "border-[#ccff90]/50 hover:border-[#ccff90]/80", dot: "bg-[#ccff90]", hex: "#ccff90", label: "Mint Green", text: "text-emerald-950" },
  teal: { name: "teal", bg: "bg-[#a7ffeb]/30", border: "border-[#a7ffeb]/50 hover:border-[#a7ffeb]/80", dot: "bg-[#a7ffeb]", hex: "#a7ffeb", label: "Sage Teal", text: "text-teal-950" },
  blue: { name: "blue", bg: "bg-[#cbf0f8]/40", border: "border-[#cbf0f8]/60 hover:border-[#cbf0f8]/80", dot: "bg-[#cbf0f8]", hex: "#cbf0f8", label: "Fog Blue", text: "text-sky-950" },
  darkblue: { name: "darkblue", bg: "bg-[#aecbfa]/40", border: "border-[#aecbfa]/60 hover:border-[#aecbfa]/80", dot: "bg-[#aecbfa]", hex: "#aecbfa", label: "Storm Blue", text: "text-blue-950" },
  purple: { name: "purple", bg: "bg-[#d7aefb]/30", border: "border-[#d7aefb]/50 hover:border-[#d7aefb]/80", dot: "bg-[#d7aefb]", hex: "#d7aefb", label: "Lavender", text: "text-purple-950" },
  pink: { name: "pink", bg: "bg-[#fdcfe8]/40", border: "border-[#fdcfe8]/60 hover:border-[#fdcfe8]/80", dot: "bg-[#fdcfe8]", hex: "#fdcfe8", label: "Blossom Pink", text: "text-pink-950" },
  clay: { name: "clay", bg: "bg-[#e6c9a8]/30", border: "border-[#e6c9a8]/50 hover:border-[#e6c9a8]/80", dot: "bg-[#e6c9a8]", hex: "#e6c9a8", label: "Clay", text: "text-amber-950" },
  gray: { name: "gray", bg: "bg-[#e8eaed]/40", border: "border-[#e8eaed]/60 hover:border-[#e8eaed]/80", dot: "bg-[#e8eaed]", hex: "#e8eaed", label: "Chalk Gray", text: "text-slate-900" },
};

export interface Note {
  id: string;
  title?: string;
  text: string;
  createdAt: string;
  pinned?: boolean;
  color?: keyof typeof KeepColors;
  archived?: boolean;
  reminderDate?: string | null;
  targetDate?: string | null;
}

interface NotesStore {
  notes: Note[];
  addNote: (text: string, title?: string, color?: keyof typeof KeepColors, targetDate?: string) => void;
  updateNote: (id: string, text: string) => void;
  updateNoteFull: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  togglePin: (id: string) => void;
  setReminder: (id: string, date: string | null) => void;
  makeCopy: (id: string) => void;
}

export const useNotesStore = create<NotesStore>()(
  persist(
    (set) => ({
      notes: [],
      addNote: (text: string, title?: string, color?: keyof typeof KeepColors, targetDate?: string) =>
        set((state) => ({
          notes: [
            {
              id: Date.now().toString(),
              title: title || "",
              text,
              createdAt: new Date().toISOString(),
              pinned: false,
              color: color || "default",
              archived: false,
              reminderDate: null,
              targetDate: targetDate || null,
            },
            ...state.notes,
          ],
        })),
      updateNote: (id: string, text: string) =>
        set((state) => ({
          notes: state.notes.map((n) => (n.id === id ? { ...n, text } : n)),
        })),
      updateNoteFull: (id: string, updates: Partial<Note>) =>
        set((state) => ({
          notes: state.notes.map((n) => (n.id === id ? { ...n, ...updates } : n)),
        })),
      deleteNote: (id: string) =>
        set((state) => ({
          notes: state.notes.filter((n) => n.id !== id),
        })),
      togglePin: (id: string) =>
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === id ? { ...n, pinned: !n.pinned } : n,
          ),
        })),
      setReminder: (id: string, date: string | null) =>
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === id ? { ...n, reminderDate: date } : n,
          ),
        })),
      makeCopy: (id: string) =>
        set((state) => {
          const original = state.notes.find((n) => n.id === id);
          if (!original) return state;
          const copy: Note = {
            ...original,
            id: Date.now().toString() + "-copy",
            title: original.title ? `${original.title} (Copy)` : "Copy",
            createdAt: new Date().toISOString(),
            pinned: false,
          };
          return { notes: [copy, ...state.notes] };
        }),
    }),
    {
      name: "oghub_notes_v2",
      migrate: (persistedState: any, version: number) => {
        if (Array.isArray(persistedState)) {
          return { notes: persistedState };
        }
        if (persistedState && typeof persistedState === "object" && Array.isArray(persistedState.notes)) {
          return persistedState;
        }
        return { notes: [] };
      },
    },
  ),
);

// Localization helper
const translations = {
  en: {
    pinned: "Pinned",
    others: "Others",
    searchPlaceholder: "Search Keep notes...",
    takeNotePlaceholder: "Take a note...",
    titlePlaceholder: "Title",
    close: "Close",
    delete: "Delete Note",
    archive: "Archive",
    unarchive: "Unarchive",
    makeCopy: "Make a copy",
    copyText: "Copy to Clipboard",
    copyGoogleDocs: "Copy to Google Docs",
    noNotes: "No notes yet. Tap the Floating Button below or click 'Take a note' to start!",
    noArchivedNotes: "No archived notes.",
    archivedNotes: "Archived Notes",
    copiedToast: "Copied to clipboard!",
    copiedDocsToast: "Copied in Google Docs layout format!",
    activeNotes: "My Notes",
    grid: "Grid View",
    list: "List View",
    saved: "Saved",
  },
  my: {
    pinned: "ပင်ထားသော မှတ်စုများ",
    others: "အခြား မှတ်စုများ",
    searchPlaceholder: "မှတ်စုများ ရှာဖွေရန်...",
    takeNotePlaceholder: "မှတ်စုအသစ် ရေးရန်...",
    titlePlaceholder: "ခေါင်းစဉ်",
    close: "ပိတ်မည်",
    delete: "မှတ်စုဖျက်မည်",
    archive: "သိမ်းထားမည် (Archive)",
    unarchive: "ပြန်ထုတ်မည် (Unarchive)",
    makeCopy: "မိတ္တူပွားမည်",
    copyText: "စာသား ကူးယူမည်",
    copyGoogleDocs: "Google Docs စာသား ကူးယူမည်",
    noNotes: "မှတ်စုများ မရှိသေးပါ။ အောက်ရှိ ခလုတ်အဝိုင်းလေး သို့မဟုတ် 'မှတ်စုအသစ် ရေးရန်' ကိုနှိပ်ပြီး စတင်ပါ!",
    noArchivedNotes: "သိမ်းထားသော မှတ်စုများ မရှိသေးပါ။",
    archivedNotes: "သိမ်းဆည်းထားသော မှတ်စုများ",
    copiedToast: "ကူးယူပြီးပါပြီ!",
    copiedDocsToast: "Google Docs ပုံစံဖြင့် ကူးယူပြီးပါပြီ!",
    activeNotes: "မှတ်စုများ",
    grid: "ကွက်လပ်ပုံစံ",
    list: "စာရင်းပုံစံ",
    saved: "သိမ်းဆည်းပြီး",
  },
  zh: {
    pinned: "已固定",
    others: "其他",
    searchPlaceholder: "搜索笔记...",
    takeNotePlaceholder: "记笔记...",
    titlePlaceholder: "标题",
    close: "关闭",
    delete: "删除笔记",
    archive: "归档",
    unarchive: "取消归档",
    makeCopy: "复制一份",
    copyText: "复制到剪贴板",
    copyGoogleDocs: "复制到 Google Docs",
    noNotes: "暂无笔记。点击下方悬浮按钮或“记笔记”开始创建！",
    noArchivedNotes: "无归档笔记。",
    archivedNotes: "归档笔记",
    copiedToast: "已复制到剪贴板！",
    copiedDocsToast: "已复制为 Google Docs 布局格式！",
    activeNotes: "我的笔记",
    grid: "网格视图",
    list: "列表视图",
    saved: "已保存",
  },
};

export function NotesWidget({
  activeDateStr = "",
}: {
  activeDateStr?: string;
}) {
  const { lang } = useStore();
  const t = translations[lang === "mm" ? "my" : lang === "zh" ? "zh" : "en"] as typeof translations.en;

  const {
    notes,
    addNote,
    updateNoteFull,
    deleteNote,
    togglePin,
    makeCopy,
  } = useNotesStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentTab, setNotesTab] = useState<"active" | "archived">("active");
  const [layoutMode, setLayoutMode] = useState<"grid" | "list">("grid");

  // Expanded creator state
  const [isCreatorExpanded, setIsCreatorExpanded] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newText, setNewText] = useState("");
  const [newColor, setNewColor] = useState<keyof typeof KeepColors>("default");
  const [newPinned, setNewPinned] = useState(false);
  const [showColorPickerNew, setShowColorPickerNew] = useState(false);

  // Active edit note modal state
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingText, setEditingText] = useState("");
  const [editingColor, setEditingColor] = useState<keyof typeof KeepColors>("default");
  const [showColorPickerEdit, setShowColorPickerEdit] = useState(false);

  // Active Dropdown state per note ID
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const [activePaletteId, setActivePaletteId] = useState<string | null>(null);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const creatorRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const paletteRef = useRef<HTMLDivElement>(null);

  // Close creator on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (creatorRef.current && !creatorRef.current.contains(event.target as Node)) {
        // Save note if text or title exists
        if (newText.trim() || newTitle.trim()) {
          addNote(newText, newTitle, newColor, activeDateStr);
          // Show quick saved status
          showToast(t.saved);
        }
        resetCreator();
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdownId(null);
      }
      if (paletteRef.current && !paletteRef.current.contains(event.target as Node)) {
        setActivePaletteId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [newTitle, newText, newColor, newPinned, addNote, activeDateStr, t]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const resetCreator = () => {
    setIsCreatorExpanded(false);
    setNewTitle("");
    setNewText("");
    setNewColor("default");
    setNewPinned(false);
    setShowColorPickerNew(false);
  };

  const handleSaveNote = () => {
    if (newText.trim() || newTitle.trim()) {
      addNote(newText, newTitle, newColor, activeDateStr);
      showToast(t.saved);
    }
    resetCreator();
  };

  // Actions
  const handleArchiveToggle = (id: string) => {
    const note = notes.find((n) => n.id === id);
    if (note) {
      updateNoteFull(id, { archived: !note.archived });
      showToast(note.archived ? "Note restored" : "Note archived");
    }
    setActiveDropdownId(null);
  };

  const handleCopyNote = (id: string) => {
    makeCopy(id);
    showToast(t.copiedToast);
    setActiveDropdownId(null);
  };

  const handleSendToClipboard = (note: Note) => {
    const content = `${note.title ? `*${note.title}*\n` : ""}${note.text}`;
    navigator.clipboard.writeText(content);
    showToast(t.copiedToast);
    setActiveDropdownId(null);
  };

  const handleCopyToGoogleDocs = (note: Note) => {
    const content = `=========================\n${note.title ? `TITLE: ${note.title}\n` : ""}${note.text}\n=========================`;
    navigator.clipboard.writeText(content);
    showToast(t.copiedDocsToast);
    setActiveDropdownId(null);
  };

  const handleColorChange = (noteId: string, color: keyof typeof KeepColors) => {
    updateNoteFull(noteId, { color });
    setActivePaletteId(null);
  };

  // Filter notes based on active date and search query
  const filteredNotes = notes.filter((n) => {
    const matchesSearch =
      n.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (n.title && n.title.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDate = !n.targetDate || n.targetDate <= activeDateStr;

    const matchesTab = currentTab === "active" ? !n.archived : n.archived;

    return matchesSearch && matchesDate && matchesTab;
  });

  const pinnedNotes = filteredNotes.filter((n) => n.pinned);
  const otherNotes = filteredNotes.filter((n) => !n.pinned);

  // Color bubble helper
  const renderColorOptions = (onSelect: (color: keyof typeof KeepColors) => void, selectedColor: string) => (
    <div className="grid grid-cols-4 gap-1.5 p-2 bg-white rounded-xl shadow-xl border border-slate-200">
      {Object.entries(KeepColors).map(([key, value]) => (
        <button
          key={key}
          onClick={() => onSelect(key as keyof typeof KeepColors)}
          title={value.label}
          className={`w-6 h-6 rounded-full ${value.dot} border transition transform hover:scale-110 flex items-center justify-center`}
        >
          {selectedColor === key && (
            <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
          )}
        </button>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col min-h-[30rem] space-y-4">
      {/* 1. KEEP TOP BAR (SEARCH & CONTROLS) */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-slate-100/50 p-3 rounded-[1.5rem] border border-slate-100">
        <div className="relative w-full sm:flex-1">
          <Search className="h-5 w-5 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 justify-end w-full sm:w-auto">
          {/* Active / Archive toggler */}
          <div className="flex bg-slate-200/60 p-1 rounded-xl">
            <button
              onClick={() => setNotesTab("active")}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition uppercase tracking-wider ${
                currentTab === "active"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {t.activeNotes}
            </button>
            <button
              onClick={() => setNotesTab("archived")}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition uppercase tracking-wider ${
                currentTab === "archived"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {t.archivedNotes}
            </button>
          </div>

          {/* Grid / List toggle */}
          <button
            onClick={() => setLayoutMode(layoutMode === "grid" ? "list" : "grid")}
            className="p-2 bg-white rounded-xl shadow-sm border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-200 transition"
            title={layoutMode === "grid" ? t.list : t.grid}
          >
            {layoutMode === "grid" ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* 2. TAKE A NOTE (EXPANDABLE CREATOR) */}
      {currentTab === "active" && (
        <div ref={creatorRef} className="max-w-xl mx-auto w-full">
          <div
            className={`transition-all duration-300 rounded-2xl border bg-white shadow-md overflow-hidden ${
              isCreatorExpanded
                ? `${KeepColors[newColor].bg} ${KeepColors[newColor].border}`
                : "border-slate-200 hover:shadow-lg"
            }`}
          >
            {/* Expanded Title Box */}
            {isCreatorExpanded ? (
              <div className="px-4 pt-3 flex justify-between items-center">
                <input
                  type="text"
                  placeholder={t.titlePlaceholder}
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="bg-transparent w-full text-sm font-bold text-slate-800 placeholder-slate-400 focus:outline-none"
                />
                <button
                  onClick={() => setNewPinned(!newPinned)}
                  className={`p-1.5 rounded-full transition ${
                    newPinned ? "bg-amber-100 text-amber-600" : "text-slate-400 hover:bg-slate-200/50"
                  }`}
                  title="Pin Note"
                >
                  <Pin className="h-4 w-4" />
                </button>
              </div>
            ) : null}

            {/* Note text field */}
            <div className="px-4 py-3 flex items-center">
              <textarea
                placeholder={isCreatorExpanded ? t.takeNotePlaceholder : t.takeNotePlaceholder}
                value={newText}
                onFocus={() => setIsCreatorExpanded(true)}
                onChange={(e) => setNewText(e.target.value)}
                rows={isCreatorExpanded ? 4 : 1}
                className="bg-transparent w-full text-xs font-semibold text-slate-700 placeholder-slate-400 focus:outline-none resize-none"
              />
              {!isCreatorExpanded && (
                <div className="flex gap-2 text-slate-400 shrink-0">
                  <button onClick={() => setIsCreatorExpanded(true)} className="p-1 hover:text-slate-600">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Bottom toolbar for expanded note */}
            {isCreatorExpanded && (
              <div className="px-4 py-2 border-t border-black/5 bg-black/5 flex justify-between items-center text-xs">
                <div className="flex items-center gap-1.5 relative">
                  {/* Palette toggler */}
                  <button
                    onClick={() => setShowColorPickerNew(!showColorPickerNew)}
                    className="p-1.5 rounded-full text-slate-500 hover:text-slate-800 hover:bg-black/5 transition"
                    title="Change Color"
                  >
                    <Palette className="h-4 w-4" />
                  </button>
                  {showColorPickerNew && (
                    <div className="absolute bottom-full left-0 mb-2 z-30">
                      {renderColorOptions((c) => {
                        setNewColor(c);
                        setShowColorPickerNew(false);
                      }, newColor)}
                    </div>
                  )}

                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest pl-1">
                    {KeepColors[newColor].label}
                  </span>
                </div>

                <div className="flex items-center gap-2 font-black">
                  <button
                    onClick={() => {
                      resetCreator();
                    }}
                    className="px-3 py-1.5 text-slate-500 hover:bg-black/5 rounded-lg transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveNote}
                    className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm transition"
                  >
                    {t.close}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. MASONRY NOTE LISTS */}
      <div className="space-y-6">
        {/* PINNED SECTION */}
        {pinnedNotes.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
              <Pin className="h-3 w-3 fill-amber-500 text-amber-500 rotate-45" />
              {t.pinned} ({pinnedNotes.length})
            </h4>
            <div
              className={`transition-all duration-300 ${
                layoutMode === "grid"
                  ? "columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
                  : "flex flex-col gap-3"
              }`}
            >
              <AnimatePresence>
                {pinnedNotes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    t={t}
                    layoutMode={layoutMode}
                    onEdit={() => {
                      setEditingNote(note);
                      setEditingTitle(note.title || "");
                      setEditingText(note.text);
                      setEditingColor(note.color || "default");
                    }}
                    onTogglePin={() => togglePin(note.id)}
                    onDelete={() => {
                      deleteNote(note.id);
                      showToast("Note deleted");
                    }}
                    onArchive={() => handleArchiveToggle(note.id)}
                    onColorChange={(color) => handleColorChange(note.id, color)}
                    onMakeCopy={() => handleCopyNote(note.id)}
                    onSend={() => handleSendToClipboard(note)}
                    onCopyGoogleDocs={() => handleCopyToGoogleDocs(note)}
                    activeDropdownId={activeDropdownId}
                    setActiveDropdownId={setActiveDropdownId}
                    activePaletteId={activePaletteId}
                    setActivePaletteId={setActivePaletteId}
                    dropdownRef={dropdownRef}
                    paletteRef={paletteRef}
                    renderColorOptions={renderColorOptions}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* OTHERS SECTION */}
        <div className="space-y-2">
          {pinnedNotes.length > 0 && otherNotes.length > 0 && (
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              {t.others} ({otherNotes.length})
            </h4>
          )}
          {filteredNotes.length === 0 ? (
            <div className="text-center bg-slate-50 py-12 px-6 rounded-3xl border border-slate-100 flex flex-col items-center justify-center space-y-2">
              <span className="text-3xl">📝</span>
              <p className="text-slate-500 font-semibold text-xs leading-relaxed max-w-sm">
                {currentTab === "active" ? t.noNotes : t.noArchivedNotes}
              </p>
            </div>
          ) : (
            <div
              className={`transition-all duration-300 ${
                layoutMode === "grid"
                  ? "columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
                  : "flex flex-col gap-3"
              }`}
            >
              <AnimatePresence>
                {otherNotes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    t={t}
                    layoutMode={layoutMode}
                    onEdit={() => {
                      setEditingNote(note);
                      setEditingTitle(note.title || "");
                      setEditingText(note.text);
                      setEditingColor(note.color || "default");
                    }}
                    onTogglePin={() => togglePin(note.id)}
                    onDelete={() => {
                      deleteNote(note.id);
                      showToast("Note deleted");
                    }}
                    onArchive={() => handleArchiveToggle(note.id)}
                    onColorChange={(color) => handleColorChange(note.id, color)}
                    onMakeCopy={() => handleCopyNote(note.id)}
                    onSend={() => handleSendToClipboard(note)}
                    onCopyGoogleDocs={() => handleCopyToGoogleDocs(note)}
                    activeDropdownId={activeDropdownId}
                    setActiveDropdownId={setActiveDropdownId}
                    activePaletteId={activePaletteId}
                    setActivePaletteId={setActivePaletteId}
                    dropdownRef={dropdownRef}
                    paletteRef={paletteRef}
                    renderColorOptions={renderColorOptions}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* 4. FLOATING ACTION BUTTON (FAB) */}
      {currentTab === "active" && (
        <button
          onClick={() => {
            setIsCreatorExpanded(true);
            creatorRef.current?.scrollIntoView({ behavior: "smooth" });
            // focus new title or text area
            setTimeout(() => {
              const el = document.querySelector('textarea[placeholder="Take a note..."]');
              if (el) (el as HTMLElement).focus();
            }, 300);
          }}
          className="fixed bottom-6 right-6 sm:bottom-20 sm:right-10 z-40 bg-[#c2e7ff] text-[#001d35] hover:bg-[#b0dbf9] shadow-xl hover:shadow-2xl rounded-2xl w-14 h-14 flex items-center justify-center transition-all duration-300 scale-100 hover:scale-105"
          title={t.takeNotePlaceholder}
        >
          <Plus className="h-6 w-6 font-black" />
        </button>
      )}

      {/* 5. NOTES EDITING MODAL */}
      <AnimatePresence>
        {editingNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className={`w-full max-w-xl rounded-[2rem] shadow-2xl overflow-hidden border transition-all duration-300 ${
                KeepColors[editingColor].bg
              } ${KeepColors[editingColor].border}`}
            >
              <div className="p-5 space-y-3">
                <div className="flex justify-between items-center gap-2">
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    placeholder={t.titlePlaceholder}
                    className="bg-transparent w-full font-black text-slate-800 placeholder-slate-400 text-base focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      const updatedPin = !editingNote.pinned;
                      updateNoteFull(editingNote.id, { pinned: updatedPin });
                      setEditingNote({ ...editingNote, pinned: updatedPin });
                    }}
                    className={`p-2 rounded-full transition ${
                      editingNote.pinned ? "bg-amber-100 text-amber-600" : "text-slate-400 hover:bg-black/5"
                    }`}
                  >
                    <Pin className="h-4.5 w-4.5" />
                  </button>
                </div>

                <textarea
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  placeholder={t.takeNotePlaceholder}
                  rows={8}
                  className="bg-transparent w-full text-xs font-semibold text-slate-700 placeholder-slate-400 focus:outline-none resize-none leading-relaxed"
                />

                <div className="flex justify-between items-center pt-3 border-t border-black/5">
                  <div className="flex items-center gap-1.5 relative">
                    <button
                      onClick={() => setShowColorPickerEdit(!showColorPickerEdit)}
                      className="p-1.5 rounded-full text-slate-500 hover:text-slate-800 hover:bg-black/5 transition"
                      title="Change Color"
                    >
                      <Palette className="h-4.5 w-4.5" />
                    </button>
                    {showColorPickerEdit && (
                      <div className="absolute bottom-full left-0 mb-2 z-30">
                        {renderColorOptions((c) => {
                          setEditingColor(c);
                          updateNoteFull(editingNote.id, { color: c });
                          setShowColorPickerEdit(false);
                        }, editingColor)}
                      </div>
                    )}
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider pl-1">
                      {KeepColors[editingColor].label}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        deleteNote(editingNote.id);
                        setEditingNote(null);
                        showToast("Note deleted");
                      }}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition"
                      title={t.delete}
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                    <button
                      onClick={() => {
                        const isArchived = editingNote.archived;
                        updateNoteFull(editingNote.id, { archived: !isArchived });
                        setEditingNote(null);
                        showToast(isArchived ? "Note restored" : "Note archived");
                      }}
                      className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-xl transition"
                      title={editingNote.archived ? t.unarchive : t.archive}
                    >
                      <Archive className="h-4.5 w-4.5" />
                    </button>
                    <button
                      onClick={() => {
                        updateNoteFull(editingNote.id, {
                          title: editingTitle,
                          text: editingText,
                          color: editingColor,
                        });
                        setEditingNote(null);
                        showToast("Note updated");
                      }}
                      className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition"
                    >
                      {t.close}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOAST MESSAGE */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-slate-800 text-white font-semibold text-xs px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2"
          >
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Separate component for Note Card to reduce re-renders and enable clean masonry
function NoteCard({
  note,
  t,
  layoutMode,
  onEdit,
  onTogglePin,
  onDelete,
  onArchive,
  onColorChange,
  onMakeCopy,
  onSend,
  onCopyGoogleDocs,
  activeDropdownId,
  setActiveDropdownId,
  activePaletteId,
  setActivePaletteId,
  dropdownRef,
  paletteRef,
  renderColorOptions,
}: {
  key?: React.Key;
  note: Note;
  t: typeof translations.en;
  layoutMode: "grid" | "list";
  onEdit: () => void;
  onTogglePin: () => void;
  onDelete: () => void;
  onArchive: () => void;
  onColorChange: (color: keyof typeof KeepColors) => void;
  onMakeCopy: () => void;
  onSend: () => void;
  onCopyGoogleDocs: () => void;
  activeDropdownId: string | null;
  setActiveDropdownId: (id: string | null) => void;
  activePaletteId: string | null;
  setActivePaletteId: (id: string | null) => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  paletteRef: React.RefObject<HTMLDivElement | null>;
  renderColorOptions: (onSelect: (color: keyof typeof KeepColors) => void, selectedColor: string) => React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);
  const colorKey = note.color || "default";
  const colorObj = KeepColors[colorKey] || KeepColors.default;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setActivePaletteId(null);
        setActiveDropdownId(null);
      }}
      className={`break-inside-avoid relative w-full border rounded-2xl p-4 flex flex-col gap-2 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md ${
        colorObj.bg
      } ${colorObj.border} ${layoutMode === "list" ? "mb-0" : "mb-4"}`}
    >
      {/* Pin state overlay */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onTogglePin();
        }}
        className={`absolute top-3.5 right-3.5 p-1.5 rounded-full transition-colors z-10 ${
          note.pinned
            ? "bg-amber-100 text-amber-600"
            : hovered
            ? "text-slate-400 hover:text-slate-600 hover:bg-black/5"
            : "opacity-0"
        }`}
        title="Pin Note"
      >
        <Pin className="h-4 w-4" />
      </button>

      {/* Main clickable area for edit */}
      <div onClick={onEdit} className="space-y-1.5 flex-grow pr-6">
        {note.title && (
          <h4 className="font-black text-slate-800 text-xs sm:text-sm tracking-tight leading-tight">
            {note.title}
          </h4>
        )}
        <p className="text-xs font-semibold text-slate-600 leading-relaxed whitespace-pre-wrap">
          {note.text}
        </p>
      </div>

      {/* Note Metadata & Action Toolbar */}
      <div className="flex justify-between items-center mt-3 pt-2 border-t border-black/5 text-[9px] font-black text-slate-400">
        <span className="uppercase tracking-wider">
          {new Date(note.createdAt).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
          })}
        </span>

        {/* Action icons row (visible on card hover or permanently on mobile) */}
        <div
          className={`flex items-center gap-1 transition-opacity duration-200 ${
            hovered ? "opacity-100" : "opacity-0 sm:opacity-0"
          }`}
        >
          {/* Palette button */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActivePaletteId(activePaletteId === note.id ? null : note.id);
                setActiveDropdownId(null);
              }}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-black/5 transition"
              title="Change Color"
            >
              <Palette className="h-3.5 w-3.5" />
            </button>
            {activePaletteId === note.id && (
              <div ref={paletteRef} className="absolute bottom-full right-0 mb-1 z-30">
                {renderColorOptions((c) => onColorChange(c), colorKey)}
              </div>
            )}
          </div>

          {/* Archive / Restore */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onArchive();
            }}
            className="p-1.5 rounded-full text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition"
            title={note.archived ? t.unarchive : t.archive}
          >
            {note.archived ? <ArchiveRestore className="h-3.5 w-3.5" /> : <Archive className="h-3.5 w-3.5" />}
          </button>

          {/* Delete directly */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1.5 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition"
            title={t.delete}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>

          {/* More options dots */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveDropdownId(activeDropdownId === note.id ? null : note.id);
                setActivePaletteId(null);
              }}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-black/5 transition"
              title="More"
            >
              <MoreVertical className="h-3.5 w-3.5" />
            </button>

            {activeDropdownId === note.id && (
              <div
                ref={dropdownRef}
                className="absolute right-0 bottom-full mb-1 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-30 text-xs font-bold text-slate-700"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onMakeCopy();
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 transition"
                >
                  <Copy className="h-3.5 w-3.5 text-slate-400" />
                  <span>{t.makeCopy}</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSend();
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 transition"
                >
                  <Send className="h-3.5 w-3.5 text-slate-400" />
                  <span>{t.copyText}</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCopyGoogleDocs();
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 transition"
                >
                  <FileText className="h-3.5 w-3.5 text-slate-400" />
                  <span>{t.copyGoogleDocs}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
