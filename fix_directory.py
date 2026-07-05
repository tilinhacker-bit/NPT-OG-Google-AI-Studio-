import re

with open('src/components/DirectoryTab.tsx', 'r') as f:
    content = f.read()

# I need to add state for menu modal
imports_old = 'import { Users, Phone, PhoneCall, ChevronDown, ChevronUp } from "lucide-react";'
imports_new = 'import { Users, Phone, PhoneCall, ChevronDown, ChevronUp, Utensils, X } from "lucide-react";'
content = content.replace(imports_old, imports_new)

state_old = 'const [searchQuery, setSearchQuery] = useState("");'
state_new = 'const [searchQuery, setSearchQuery] = useState("");\n  const [menuModalOpen, setMenuModalOpen] = useState(false);'
content = content.replace(state_old, state_new)

restaurant_old = """            <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-slate-50 p-3 border-b border-slate-100 font-black text-slate-700 text-[10px] uppercase tracking-wider">
                Restaurants & Delivery
              </div>
              <div className="p-4 flex flex-col gap-3">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                  <span>Hospital Canteen</span>
                  <a
                    href="tel:123460"
                    className="bg-white text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 shadow-sm text-[9px] font-bold"
                  >
                    📱 123460
                  </a>
                </div>
              </div>
            </div>"""

restaurant_new = """            <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
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
                      <span className="block text-indigo-700 font-bold">မိဘရိပ် Restaurant</span>
                      <span className="block text-[10px] text-slate-500 font-medium mt-0.5">Delivery Free • Near OG Hospital</span>
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
                      <span className="text-[10px] text-slate-600">Restaurant Phone</span>
                      <a
                        href="tel:09798354383"
                        className="bg-white text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 shadow-sm text-[9px] font-bold shrink-0"
                      >
                        📱 09 798 354 383
                      </a>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-slate-600">Delivery Man</span>
                      <a
                        href="tel:09899257385"
                        className="bg-white text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 shadow-sm text-[9px] font-bold shrink-0"
                      >
                        📱 09 899 257 385
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>"""
content = content.replace(restaurant_old, restaurant_new)

modal_code = """
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
                    <h3 className="font-black text-slate-800 text-sm">မိဘရိပ် Menu</h3>
                    <p className="text-[10px] font-semibold text-slate-500">တရုတ်အစားအစာအစုံ + အအေးနှင့်ကော်ဖီ</p>
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
                    <li className="flex items-start gap-1"><span className="text-indigo-400 mt-0.5 text-[8px]">●</span> ခေါက်ဆွဲကြော်(ကြက်/ဝက်)</li>
                    <li className="flex items-start gap-1"><span className="text-indigo-400 mt-0.5 text-[8px]">●</span> ကြာဇံကြော်(ကြက်/ဝက်)</li>
                    <li className="flex items-start gap-1"><span className="text-indigo-400 mt-0.5 text-[8px]">●</span> ထမင်းကြော်(ကြက်/ဝက်)</li>
                    <li className="flex items-start gap-1"><span className="text-indigo-400 mt-0.5 text-[8px]">●</span> ထမင်းပေါင်း(ကြက်/ဝက်)</li>
                    <li className="flex items-start gap-1"><span className="text-indigo-400 mt-0.5 text-[8px]">●</span> ပသျှူးထမင်းကြော်(ကြက်/ဝက်)</li>
                    <li className="flex items-start gap-1"><span className="text-indigo-400 mt-0.5 text-[8px]">●</span> ကုန်းဘောင်(ကြက်/ဝက်)</li>
                    <li className="flex items-start gap-1"><span className="text-indigo-400 mt-0.5 text-[8px]">●</span> ချိုချဉ်(ကြက်/ဝက်)</li>
                    <li className="flex items-start gap-1"><span className="text-indigo-400 mt-0.5 text-[8px]">●</span> တောက်တောက်ကြော်(ကြက်/ဝက်)</li>
                    <li className="flex items-start gap-1"><span className="text-indigo-400 mt-0.5 text-[8px]">●</span> စဉ်းကော(ကြက်/ဝက်)</li>
                    <li className="flex items-start gap-1"><span className="text-indigo-400 mt-0.5 text-[8px]">●</span> ပဲပီ(ကြက်/ဝက်)</li>
                    <li className="flex items-start gap-1"><span className="text-indigo-400 mt-0.5 text-[8px]">●</span> ပဲထမင်းကြော်</li>
                    <li className="flex items-start gap-1"><span className="text-indigo-400 mt-0.5 text-[8px]">●</span> လက်ဖက်ထမင်း</li>
                    <li className="flex items-start gap-1"><span className="text-indigo-400 mt-0.5 text-[8px]">●</span> ထမင်းသီးစုံ</li>
                    <li className="flex items-start gap-1"><span className="text-indigo-400 mt-0.5 text-[8px]">●</span> ထမင်းသုပ်</li>
                    <li className="flex items-start gap-1"><span className="text-indigo-400 mt-0.5 text-[8px]">●</span> ပေါင်မုန့်ကြက်ဥကြော်</li>
                    <li className="flex items-start gap-1"><span className="text-indigo-400 mt-0.5 text-[8px]">●</span> ရှမ်းခေါက်ဆွဲ</li>
                    <li className="flex items-start gap-1"><span className="text-indigo-400 mt-0.5 text-[8px]">●</span> မာလာရှမ်းကော</li>
                    <li className="flex items-start gap-1"><span className="text-indigo-400 mt-0.5 text-[8px]">●</span> တုံယမ်းဟင်းရည်</li>
                    <li className="flex items-start gap-1"><span className="text-indigo-400 mt-0.5 text-[8px]">●</span> ကန်စွန်းပုစွန်</li>
                  </ul>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-1"><span className="text-indigo-400 mt-0.5 text-[8px]">●</span> မာလာဟင်း</li>
                    <li className="flex items-start gap-1"><span className="text-indigo-400 mt-0.5 text-[8px]">●</span> သင်္ဘောသီးထောင်း</li>
                    <li className="flex items-start gap-1"><span className="text-indigo-400 mt-0.5 text-[8px]">●</span> ဆီချက်ခေါက်ဆွဲ</li>
                    <li className="flex items-start gap-1"><span className="text-indigo-400 mt-0.5 text-[8px]">●</span> မုန့်ဟင်းခါး</li>
                    <li className="flex items-start gap-1"><span className="text-indigo-400 mt-0.5 text-[8px]">●</span> နန်းကြီးသုပ်</li>
                    <li className="flex items-start gap-1"><span className="text-indigo-400 mt-0.5 text-[8px]">●</span> မြီးရှည်</li>
                    <li className="flex items-start gap-1"><span className="text-indigo-400 mt-0.5 text-[8px]">●</span> ခေါက်ဆွဲသုပ်</li>
                    <li className="flex items-start gap-1"><span className="text-indigo-400 mt-0.5 text-[8px]">●</span> ကြာဇံသုပ်</li>
                    <li className="flex items-start gap-1"><span className="text-indigo-400 mt-0.5 text-[8px]">●</span> မုန့်တီသုပ်</li>
                    <li className="flex items-start gap-1"><span className="text-indigo-400 mt-0.5 text-[8px]">●</span> သင်္ဘောသီးသုပ်(ချို/ချဉ်)</li>
                    <li className="flex items-start gap-1"><span className="text-indigo-400 mt-0.5 text-[8px]">●</span> ကြက်ခြေထောက်သုပ်</li>
                    <li className="flex items-start gap-1"><span className="text-indigo-400 mt-0.5 text-[8px]">●</span> ဝက်ခေါင်းသုပ်</li>
                    <li className="flex items-start gap-1"><span className="text-indigo-400 mt-0.5 text-[8px]">●</span> လက်ဖက်သုပ်</li>
                    <li className="flex items-start gap-1"><span className="text-indigo-400 mt-0.5 text-[8px]">●</span> ဂျင်းသုပ်</li>
                    <li className="flex items-start gap-1"><span className="text-indigo-400 mt-0.5 text-[8px]">●</span> မြင်းခွာရွက်သုပ်</li>
                    <li className="flex items-start gap-1"><span className="text-indigo-400 mt-0.5 text-[8px]">●</span> ရှောက်သီးသုပ်</li>
                    <li className="flex items-start gap-1"><span className="text-indigo-400 mt-0.5 text-[8px]">●</span> ကျောက်ပွင့်သုပ်</li>
                    <li className="flex items-start gap-1"><span className="text-indigo-400 mt-0.5 text-[8px]">●</span> ဆေးဘဲဥသုပ်</li>
                    <li className="flex items-start gap-1"><span className="text-indigo-400 mt-0.5 text-[8px]">●</span> သီးရွက်စုံကြော်</li>
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
"""

content = content.replace("    </div>\n  );\n}", modal_code)

with open('src/components/DirectoryTab.tsx', 'w') as f:
    f.write(content)
