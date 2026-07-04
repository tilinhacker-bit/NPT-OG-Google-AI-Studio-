import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { DATA, MM_NAMES } from '../data';
import { useStore } from '../store/useStore';

export function translateName(name: string, lang: 'en' | 'mm'): string {
  if (lang === 'en') return name;
  let translated = name;
  for (const [enName, mmName] of Object.entries(MM_NAMES)) {
    if (translated.includes(enName)) {
      translated = translated.replace(enName, mmName);
    }
  }
  return translated;
}

export function DirectoryTab() {
  const { lang } = useStore();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-2">
          <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
            <Users className="h-5 w-5 text-indigo-500" /> Department Directory
          </h3>
          <div className="relative w-full md:w-64">
            <input 
              type="text" 
              placeholder="Search by name or phone..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-3 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:font-medium placeholder:text-slate-400"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          {DATA.directory_layout.map((section, idx) => {
            const filteredContacts = section.contacts.filter(doc => {
              const nameMatch = translateName(doc.name, lang).toLowerCase().includes(searchQuery.toLowerCase());
              const phoneMatch = doc.phone?.includes(searchQuery);
              return nameMatch || phoneMatch;
            });
            if (filteredContacts.length === 0 && searchQuery) return null;
            return (
            <div key={idx} className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-slate-50 p-3 border-b border-slate-100 font-black text-slate-700 text-[10px] uppercase tracking-wider">
                {section.header}
              </div>
              <div className="p-3 space-y-2">
                {filteredContacts.map((doc, i) => (
                  <div key={doc.name + i} className="flex justify-between items-center text-xs font-semibold text-slate-700">
                    <span className="truncate pr-1">{translateName(doc.name, lang)}</span>
                    {doc.phone && (
                      <a 
                        href={`tel:${doc.phone}`} 
                        className="bg-white text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 shadow-sm text-[9px] font-bold shrink-0"
                      >
                        📱 {doc.phone}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
            );
          })}

          <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-slate-50 p-3 border-b border-slate-100 font-black text-slate-700 text-[10px] uppercase tracking-wider">
              Assistant Surgeons (AS)
            </div>
            <div className="p-3 space-y-4">
              {['1', '2', '3'].map(g => {
                const groupContacts = DATA.as_directory[g] || [];
                const filteredContacts = groupContacts.filter((doc: any) => {
                  const nameMatch = translateName(doc.name, lang).toLowerCase().includes(searchQuery.toLowerCase());
                  const phoneMatch = doc.phone?.includes(searchQuery);
                  return nameMatch || phoneMatch;
                });
                if (filteredContacts.length === 0 && searchQuery) return null;
                return (
                <div key={g}>
                  <div className="text-[10px] font-bold text-slate-400 mb-2">Group {g}</div>
                  <div className="space-y-2">
                    {filteredContacts.map((doc: any, i: number) => (
                      <div key={doc.name + i} className="flex justify-between items-center text-xs font-semibold text-slate-700">
                        <span className="truncate pr-1">{translateName(doc.name, lang)}</span>
                        {doc.phone && (
                          <a 
                            href={`tel:${doc.phone}`} 
                            className="bg-white text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 shadow-sm text-[9px] font-bold shrink-0"
                          >
                            📱 {doc.phone}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                );
              })}
            </div>
          </div>

          <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-slate-50 p-3 border-b border-slate-100 font-black text-slate-700 text-[10px] uppercase tracking-wider">
              House Officers (HO)
            </div>
            <div className="p-3 space-y-4">
              {['A', 'B', 'C', 'D'].map(g => {
                const groupContacts = DATA.ho_directory[g] || [];
                const filteredContacts = groupContacts.filter((doc: any) => {
                  const nameMatch = translateName(doc.name, lang).toLowerCase().includes(searchQuery.toLowerCase());
                  const phoneMatch = doc.phone?.includes(searchQuery);
                  return nameMatch || phoneMatch;
                });
                if (filteredContacts.length === 0 && searchQuery) return null;
                return (
                <div key={g}>
                  <div className="text-[10px] font-bold text-slate-400 mb-2">Group {g}</div>
                  <div className="space-y-2">
                    {filteredContacts.map((doc: any, i: number) => (
                      <div key={doc.name + i} className="flex justify-between items-center text-xs font-semibold text-slate-700">
                        <span className="truncate pr-1">{translateName(doc.name, lang)}</span>
                        {doc.phone && (
                          <a 
                            href={`tel:${doc.phone}`} 
                            className="bg-white text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 shadow-sm text-[9px] font-bold shrink-0"
                          >
                            📱 {doc.phone}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
