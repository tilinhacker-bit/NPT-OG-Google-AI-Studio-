import React, { useState, useEffect } from "react";
import {
  Trash2,
  Pin,
  CalendarClock,
  Bell,
  Edit2,
  Check,
  X,
  Search,
} from "lucide-react";
import { useStore } from "../store/useStore";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Note {
  id: string;
  text: string;
  createdAt: string;
  pinned?: boolean;
  reminderDate?: string | null;
  targetDate?: string | null;
}

interface NotesStore {
  notes: Note[];
  addNote: (text: string, targetDate?: string) => void;
  updateNote: (id: string, text: string) => void;
  deleteNote: (id: string) => void;
  togglePin: (id: string) => void;
  setReminder: (id: string, date: string | null) => void;
}

export const useNotesStore = create<NotesStore>()(
  persist(
    (set) => ({
      notes: [],
      addNote: (text: string, targetDate?: string) =>
        set((state) => ({
          notes: [
            {
              id: Date.now().toString(),
              text,
              createdAt: new Date().toISOString(),
              pinned: false,
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
    }),
    {
      name: "oghub_notes",
      migrate: (persistedState: any, version: number) => {
        if (Array.isArray(persistedState)) {
          return { notes: persistedState };
        }
        if (typeof persistedState === "string") {
          return {
            notes: [
              {
                id: Date.now().toString(),
                text: persistedState,
                createdAt: new Date().toISOString(),
              },
            ],
          };
        }
        return persistedState;
      },
    },
  ),
);

function NoteItem({
  note,
  togglePin,
  deleteNote,
  updateNote,
}: {
  key?: React.Key;
  note: Note;
  togglePin: (id: string) => void;
  deleteNote: (id: string) => void;
  updateNote: (id: string, text: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editNoteText, setEditNoteText] = useState(note.text);
  const [expanded, setExpanded] = useState(false);

  // Check if text is long
  const isLong = note.text.length > 150 || note.text.split("\n").length > 4;

  if (isEditing) {
    return (
      <div
        className={`p-4 rounded-xl border flex flex-col gap-3 ${note.pinned ? "bg-amber-50/50 border-amber-200/50" : "bg-slate-50 border-slate-100"}`}
      >
        <textarea
          value={editNoteText}
          onChange={(e) => setEditNoteText(e.target.value)}
          className="w-full p-3 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 min-h-[6rem]"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 bg-white rounded-xl shadow-sm text-slate-500 hover:text-slate-700 transition-colors border border-slate-200 font-bold text-xs"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (editNoteText.trim()) {
                updateNote(note.id, editNoteText);
                setIsEditing(false);
              }
            }}
            className="px-4 py-2 bg-pink-500 rounded-xl shadow-sm text-white hover:bg-pink-600 transition-colors font-bold text-xs"
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`p-4 rounded-xl border flex flex-col gap-3 ${note.pinned ? "bg-amber-50/50 border-amber-200/50" : "bg-slate-50 border-slate-100"}`}
    >
      <div className="flex flex-col gap-1">
        <div
          className={`whitespace-pre-wrap text-sm text-slate-700 leading-relaxed font-medium ${!expanded && isLong ? "line-clamp-3" : ""}`}
        >
          {note.text}
        </div>
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs font-bold text-indigo-500 self-start mt-1 hover:text-indigo-600"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-200/50 mt-1">
        <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-2">
          <span>{new Date(note.createdAt).toLocaleDateString()}</span>
          {note.reminderDate && (
            <span className="flex items-center gap-1 text-indigo-500">
              <CalendarClock className="h-3 w-3" />
              Reminder set
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => togglePin(note.id)}
            className={`p-2 rounded-lg transition-colors ${note.pinned ? "bg-amber-100 text-amber-600" : "bg-white text-slate-400 hover:text-amber-500 shadow-sm border border-slate-100"}`}
            aria-label="Pin Note"
          >
            <Pin className="h-4 w-4" />
          </button>
          <button
            onClick={() => {
              setIsEditing(true);
              setEditNoteText(note.text);
            }}
            className="p-2 bg-white rounded-lg shadow-sm border border-slate-100 text-slate-400 hover:text-blue-500 transition-colors"
            aria-label="Edit Note"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => deleteNote(note.id)}
            className="p-2 bg-white rounded-lg shadow-sm border border-slate-100 text-slate-400 hover:text-red-500 transition-colors"
            aria-label="Delete Note"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function NotesWidget({
  activeDateStr = "",
}: {
  activeDateStr?: string;
}) {
  const { notes, addNote, updateNote, deleteNote, togglePin, setReminder } =
    useNotesStore();
  const [currentNoteText, setCurrentNoteText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Check for notifications
  useEffect(() => {
    if (
      "Notification" in window &&
      Notification.permission !== "granted" &&
      Notification.permission !== "denied"
    ) {
      Notification.requestPermission();
    }

    const interval = setInterval(() => {
      const now = new Date();
      notes.forEach((note) => {
        if (note.reminderDate) {
          const remTime = new Date(note.reminderDate);
          if (now >= remTime && now.getTime() - remTime.getTime() < 60000) {
            if (
              "Notification" in window &&
              Notification.permission === "granted"
            ) {
              new Notification("Reminder", { body: note.text });
            }
            // Clear reminder after triggering
            setReminder(note.id, null);
          }
        }
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [notes, setReminder]);

  const handleNoteKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        e.preventDefault();
        if (currentNoteText.trim()) {
          addNote(currentNoteText);
          setCurrentNoteText("");
        }
        return;
      }

      const target = e.target as HTMLTextAreaElement;
      const { selectionStart, value } = target;

      const textBeforeCursor = value.substring(0, selectionStart);
      const lines = textBeforeCursor.split("\n");
      const currentLine = lines[lines.length - 1];

      const bulletMatch = currentLine.match(/^(\s*)([-*•]\s|\d+\.\s)/);

      if (bulletMatch) {
        e.preventDefault();
        const bullet = bulletMatch[0];

        if (currentLine.trim() === bulletMatch[2].trim()) {
          const textAfterCursor = value.substring(target.selectionEnd);
          const newValue =
            textBeforeCursor.substring(
              0,
              textBeforeCursor.length - bullet.length,
            ) +
            "\n" +
            textAfterCursor;
          setCurrentNoteText(newValue);
          setTimeout(() => {
            target.selectionStart = target.selectionEnd =
              selectionStart - bullet.length + 1;
          }, 0);
          return;
        }

        const textAfterCursor = value.substring(target.selectionEnd);
        const newValue = textBeforeCursor + "\n" + bullet + textAfterCursor;
        setCurrentNoteText(newValue);

        setTimeout(() => {
          target.selectionStart = target.selectionEnd =
            selectionStart + 1 + bullet.length;
        }, 0);
      }
    }
  };

  return (
    <div className="bg-white p-5 rounded-[2.25rem] shadow-sm border border-slate-100 flex flex-col min-h-[16rem] max-h-96">
      <div className="flex justify-between items-center mb-4 gap-2">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 mb-4">
        <textarea
          value={currentNoteText}
          onChange={(e) => setCurrentNoteText(e.target.value)}
          onKeyDown={handleNoteKeyDown}
          placeholder="Write a new note..."
          className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 resize-none min-h-[4rem]"
        />
        <div className="flex justify-end">
          <button
            onClick={() => {
              if (currentNoteText.trim()) {
                addNote(currentNoteText);
                setCurrentNoteText("");
              }
            }}
            disabled={!currentNoteText.trim()}
            className="px-4 py-2 bg-pink-500 text-white rounded-xl text-xs font-bold shadow-sm hover:bg-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Note
          </button>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto space-y-3 pr-1 custom-scrollbar">
        {notes.filter(
          (n) =>
            (!n.targetDate || n.targetDate <= activeDateStr) &&
            n.text.toLowerCase().includes(searchQuery.toLowerCase()),
        ).length === 0 ? (
          <div className="text-center text-slate-400 text-xs italic py-6">
            No notes yet. Use it as a scratchpad!
          </div>
        ) : (
          [...notes]
            .filter(
              (n) =>
                (!n.targetDate || n.targetDate <= activeDateStr) &&
                n.text.toLowerCase().includes(searchQuery.toLowerCase()),
            )
            .sort((a, b) => {
              if (a.pinned && !b.pinned) return -1;
              if (!a.pinned && b.pinned) return 1;
              return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
              );
            })
            .map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                togglePin={togglePin}
                deleteNote={deleteNote}
                updateNote={updateNote}
              />
            ))
        )}
      </div>
    </div>
  );
}
