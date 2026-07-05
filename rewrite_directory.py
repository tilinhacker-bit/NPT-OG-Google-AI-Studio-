import re

with open('src/components/DirectoryTab.tsx', 'r') as f:
    content = f.read()

new_content = """import React, { useState } from 'react';
import { Users, Phone, PhoneCall, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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
  const [subTab, setSubTab] = useState<'doctors' | 'useful'>('doctors');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const renderContact = (doc: any, i: number) => (
    <div key={doc.name + i} className="flex justify-between items-center text-xs font-semibold text-slate-700 py-1">
      <span className="truncate pr-1">{translateName(doc.name, lang)}</span>
      {doc.phone && (
        <a 
          href={`tel:${doc.phone.split(' / ')[0]}`} 
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
        
        <div className="flex bg-slate-100/50 p-1 rounded-xl mb-4">
          <button 
            onClick={() => setSubTab('doctors')}
            className={`flex-1 py-2 font-bold text-xs rounded-lg transition ${subTab === 'doctors' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Users className="h-4 w-4 inline-block mr-1" /> Doctors
          </button>
          <button 
            onClick={() => setSubTab('useful')}
            className={`flex-1 py-2 font-bold text-xs rounded-lg transition ${subTab === 'useful' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Phone className="h-4 w-4 inline-block mr-1" /> Useful Contacts
          </button>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-2">
          <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
            <Users className="h-5 w-5 text-indigo-500" /> Department Directory
          </h3>
          {subTab === 'doctors' && (
            <div className="relative w-full md:w-64">
              <input 
                type="text" 
                placeholder="Search by name or phone..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-3 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:font-medium placeholder:text-slate-400"
              />
            </div>
          )}
        </div>
        
        {subTab === 'doctors' && (
          <div className="space-y-4">
            {/* SCS & JCS Combined */}
            <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
              <button 
                onClick={() => toggleSection('scs_jcs')}
                className="w-full bg-slate-50 p-3 border-b border-slate-100 flex justify-between items-center"
              >
                <span className="font-black text-slate-700 text-[10px] uppercase tracking-wider">Consultants (SCS & JCS)</span>
                {expandedSections['scs_jcs'] ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
              </button>
              <AnimatePresence>
                {expandedSections['scs_jcs'] && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="p-3 bg-white"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 mb-2">{DATA.directory_layout[0].header}</div>
                        <div className="space-y-1">
                          {DATA.directory_layout[0].contacts.filter(doc => translateName(doc.name, lang).toLowerCase().includes(searchQuery.toLowerCase())).map((doc, i) => renderContact(doc, i))}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 mb-2">{DATA.directory_layout[1].header}</div>
                        <div className="space-y-1">
                          {DATA.directory_layout[1].contacts.filter(doc => translateName(doc.name, lang).toLowerCase().includes(searchQuery.toLowerCase())).map((doc, i) => renderContact(doc, i))}
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
                onClick={() => toggleSection('sas')}
                className="w-full bg-slate-50 p-3 border-b border-slate-100 flex justify-between items-center"
              >
                <span className="font-black text-slate-700 text-[10px] uppercase tracking-wider">{DATA.directory_layout[2].header}</span>
                {expandedSections['sas'] ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
              </button>
              <AnimatePresence>
                {expandedSections['sas'] && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="p-3 space-y-1 bg-white"
                  >
                    {DATA.directory_layout[2].contacts.filter(doc => translateName(doc.name, lang).toLowerCase().includes(searchQuery.toLowerCase())).map((doc, i) => renderContact(doc, i))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* AS */}
            <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
              <button 
                onClick={() => toggleSection('as')}
                className="w-full bg-slate-50 p-3 border-b border-slate-100 flex justify-between items-center"
              >
                <span className="font-black text-slate-700 text-[10px] uppercase tracking-wider">Assistant Surgeons (AS)</span>
                {expandedSections['as'] ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
              </button>
              <AnimatePresence>
                {expandedSections['as'] && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="p-3 space-y-3 bg-white"
                  >
                    {['1', '2', '3'].map(g => {
                      const groupContacts = DATA.as_directory[g as keyof typeof DATA.as_directory] || [];
                      const filtered = groupContacts.filter((doc: any) => translateName(doc.name, lang).toLowerCase().includes(searchQuery.toLowerCase()) || (doc.phone && doc.phone.includes(searchQuery)));
                      if (filtered.length === 0 && searchQuery) return null;
                      return (
                        <div key={g}>
                          <div className="text-[10px] font-bold text-slate-400 mb-1">Group {g}</div>
                          <div className="space-y-1">
                            {filtered.map((doc: any, i: number) => renderContact(doc, i))}
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
                onClick={() => toggleSection('ho')}
                className="w-full bg-slate-50 p-3 border-b border-slate-100 flex justify-between items-center"
              >
                <span className="font-black text-slate-700 text-[10px] uppercase tracking-wider">House Officers (HO)</span>
                {expandedSections['ho'] ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
              </button>
              <AnimatePresence>
                {expandedSections['ho'] && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="p-3 space-y-3 bg-white"
                  >
                    {['A', 'B', 'C', 'D'].map(g => {
                      const groupContacts = DATA.ho_directory[g as keyof typeof DATA.ho_directory] || [];
                      const filtered = groupContacts.filter((doc: any) => translateName(doc.name, lang).toLowerCase().includes(searchQuery.toLowerCase()) || (doc.phone && doc.phone.includes(searchQuery)));
                      if (filtered.length === 0 && searchQuery) return null;
                      return (
                        <div key={g}>
                          <div className="text-[10px] font-bold text-slate-400 mb-1">Group {g}</div>
                          <div className="space-y-1">
                            {filtered.map((doc: any, i: number) => renderContact(doc, i))}
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
                onClick={() => toggleSection('med')}
                className="w-full bg-slate-50 p-3 border-b border-slate-100 flex justify-between items-center"
              >
                <span className="font-black text-slate-700 text-[10px] uppercase tracking-wider">Medical Physicians (Consults)</span>
                {expandedSections['med'] ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
              </button>
              <AnimatePresence>
                {expandedSections['med'] && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="p-3 space-y-1 bg-white"
                  >
                    {MED_PHYSICIANS.filter(doc => translateName(doc.name, lang).toLowerCase().includes(searchQuery.toLowerCase()) || doc.phone.includes(searchQuery)).map((doc, i) => renderContact(doc, i))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
          </div>
        )}

        {subTab === 'useful' && (
          <div className="space-y-4">
            <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-slate-50 p-3 border-b border-slate-100 font-black text-slate-700 text-[10px] uppercase tracking-wider">
                Ward Phones
              </div>
              <div className="p-4 flex flex-col gap-3">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                  <span>OG Ward (General)</span>
                  <a href="tel:123456" className="bg-white text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 shadow-sm text-[9px] font-bold">📱 123456</a>
                </div>
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                  <span>Labour Room</span>
                  <a href="tel:123457" className="bg-white text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 shadow-sm text-[9px] font-bold">📱 123457</a>
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
                  <a href="tel:123458" className="bg-white text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 shadow-sm text-[9px] font-bold">📱 123458</a>
                </div>
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                  <span>Ambulance</span>
                  <a href="tel:123459" className="bg-white text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 shadow-sm text-[9px] font-bold">📱 123459</a>
                </div>
              </div>
            </div>

            <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-slate-50 p-3 border-b border-slate-100 font-black text-slate-700 text-[10px] uppercase tracking-wider">
                Restaurants & Delivery
              </div>
              <div className="p-4 flex flex-col gap-3">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                  <span>Hospital Canteen</span>
                  <a href="tel:123460" className="bg-white text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 shadow-sm text-[9px] font-bold">📱 123460</a>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
"""

with open('src/components/DirectoryTab.tsx', 'w') as f:
    f.write(new_content)
print("Updated DirectoryTab")
