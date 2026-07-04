import React, { useState } from 'react';
import { Trash2, Pin, CalendarClock, Bell } from 'lucide-react';
import { useStore } from '../store/useStore';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Note {
  id: string;
  text: string;
  createdAt: string;
  pinned?: boolean;
  reminderDate?: string | null;
}

interface NotesStore {
  notes: Note[];
  addNote: (text: string) => void;
  deleteNote: (id: string) => void;
  togglePin: (id: string) => void;
  setReminder: (id: string, date: string | null) => void;
}

export const useNotesStore = create<NotesStore>()(
  persist(
    (set) => ({
      notes: [],
      addNote: (text: string) => set((state) => ({
        notes: [{ id: Date.now().toString(), text, createdAt: new Date().toISOString(), pinned: false, reminderDate: null }, ...state.notes]
      })),
      deleteNote: (id: string) => set((state) => ({
        notes: state.notes.filter(n => n.id !== id)
      })),
      togglePin: (id: string) => set((state) => ({
        notes: state.notes.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n)
      })),
      setReminder: (id: string, date: string | null) => set((state) => ({
        notes: state.notes.map(n => n.id === id ? { ...n, reminderDate: date } : n)
      }))
    }),
    {
      name: 'oghub_notes',
      migrate: (persistedState: any, version: number) => {
        if (Array.isArray(persistedState)) {
          return { notes: persistedState };
        }
        if (typeof persistedState === 'string') {
          return { notes: [{ id: Date.now().toString(), text: persistedState, createdAt: new Date().toISOString() }] };
        }
        return persistedState;
      }
    }
  )
);

export function NotesWidget() {
  const { notes, addNote, deleteNote, togglePin, setReminder } = useNotesStore();
  const [currentNoteText, setCurrentNoteText] = useState("");

  const handleNoteKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
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

  return (
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
          className="flex-grow p-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 resize-none h-14"
        />
      </div>

      <div className="flex-grow overflow-y-auto space-y-3 pr-1 custom-scrollbar">
        {notes.length === 0 ? (
          <div className="text-center text-slate-400 text-xs italic py-6">
            No notes yet. Use it as a scratchpad!
          </div>
        ) : (
          [...notes].sort((a, b) => {
            if (a.pinned && !b.pinned) return -1;
            if (!a.pinned && b.pinned) return 1;
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          }).map(note => (
            <div key={note.id} className={`p-3 rounded-xl border group relative ${note.pinned ? 'bg-amber-50/50 border-amber-200/50' : 'bg-slate-50 border-slate-100'}`}>
              <div className="whitespace-pre-wrap text-sm text-slate-700 leading-relaxed font-medium pr-16">
                {note.text}
              </div>
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => togglePin(note.id)}
                  className={`p-1.5 rounded-lg shadow-sm transition-colors ${note.pinned ? 'bg-amber-100 text-amber-600' : 'bg-white text-slate-400 hover:text-amber-500'}`}
                >
                  <Pin className="h-3.5 w-3.5" />
                </button>
                <button 
                  onClick={() => setReminder(note.id, note.reminderDate ? null : new Date(Date.now() + 86400000).toISOString())}
                  className={`p-1.5 rounded-lg shadow-sm transition-colors ${note.reminderDate ? 'bg-indigo-100 text-indigo-600' : 'bg-white text-slate-400 hover:text-indigo-500'}`}
                >
                  <Bell className="h-3.5 w-3.5" />
                </button>
                <button 
                  onClick={() => deleteNote(note.id)}
                  className="p-1.5 bg-white rounded-lg shadow-sm text-slate-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="text-[9px] text-slate-400 font-bold mt-2 uppercase tracking-wider flex items-center gap-2">
                <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                {note.reminderDate && (
                  <span className="flex items-center gap-1 text-indigo-500">
                    <CalendarClock className="h-3 w-3" />
                    Reminder set
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
