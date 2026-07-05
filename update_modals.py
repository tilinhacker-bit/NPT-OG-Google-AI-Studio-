import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Replace APP TUTORIAL MODAL
tutorial_start = """      {/* APP TUTORIAL MODAL */}
      <AnimatePresence>
        {appTutorialOpen && ("""

tutorial_end = """      {/* 5. ABOUT MODAL */}"""

tutorial_new = """      {/* APP TUTORIAL MODAL */}
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
                    {lang === 'en' ? "You can toggle the app language between English and Myanmar using the Settings menu. Most names in the directory and roster will be translated." : "ဆက်တင်များမှတစ်ဆင့် အင်္ဂလိပ် သို့မဟုတ် မြန်မာ ဘာသာစကားကို ပြောင်းလဲနိုင်သည်။ အမည်အများစုကို ဘာသာပြန်ပေးပါမည်။"}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2">
                    <Palette className="h-4 w-4 text-pink-500" /> Themes / အပြင်အဆင်
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {lang === 'en' ? "Select a custom theme from Settings to match your preference. Each theme assigns distinct colors to duty roles to easily differentiate them on the calendar." : "ပြက္ခဒိန်တွင် တာဝန်ချိန်အလိုက် အရောင်များဖြင့် ခွဲခြားသိမြင်နိုင်ရန် မိမိနှစ်သက်ရာ Theme ကို ပြောင်းလဲအသုံးပြုနိုင်ပါသည်။"}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-emerald-500" /> Offline Install / ဖုန်းတွင်သွင်းရန်
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {lang === 'en' ? "Tap \\"Install App\\" in the Settings menu to save the app to your home screen for offline access without an internet connection." : "အင်တာနက်မလိုဘဲ အသုံးပြုနိုင်ရန် \\"Install App\\" ကိုနှိပ်၍ ဖုန်း၏ Home Screen တွင် ထည့်သွင်းထားနိုင်ပါသည်။"}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2">
                    <Camera className="h-4 w-4 text-amber-500" /> Screenshot / ဓာတ်ပုံရိုက်ရန်
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {lang === 'en' ? "You can save your duty calendar as an image directly to your phone by tapping the Camera icon in the Calendar tab." : "ပြက္ခဒိန်တွင် Camera icon ကိုနှိပ်၍ တာဝန်ချိန်ဇယားကို ဓာတ်ပုံအဖြစ် သိမ်းဆည်းနိုင်ပါသည်။"}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2">
                    <CalendarClock className="h-4 w-4 text-rose-500" /> Notes & Reminders / မှတ်စုများ
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {lang === 'en' ? "Tap on any specific day in the calendar to view detailed duty information and add a note. The note will appear on the Today tab when that date arrives. Shift+Enter to save notes." : "ပြက္ခဒိန်တွင် ရက်စွဲကိုနှိပ်၍ တာဝန်အသေးစိတ်ကိုကြည့်ရှုနိုင်ပြီး မှတ်စုများ ရေးမှတ်နိုင်ပါသည်။ ရေးမှတ်ထားသော မှတ်စုများသည် ထိုရက်ရောက်လျှင် Today စာမျက်နှာတွင် ပေါ်လာပါမည်။ မှတ်စုသိမ်းရန် Shift+Enter နှိပ်ပါ။"}
                  </p>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. ABOUT MODAL */}"""

content = re.sub(r'      \{\/\* APP TUTORIAL MODAL \*\/}.*?      \{\/\* 5\. ABOUT MODAL \*\/\}', tutorial_new, content, flags=re.DOTALL)


# Replace ABOUT MODAL
about_new = """      {/* 5. ABOUT MODAL */}
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
              <p className="text-slate-600 font-medium text-sm mb-6 leading-relaxed">
                Version 1.0.0 <br/><br/>
                Developed by <strong>Yawnaka Rajah</strong><br/>
                <span className="text-xs text-slate-500">For any improvements or suggestions, please contact on Telegram: <strong>@yawnakarajah</strong></span>
                <br/><br/>
                Tailored exactly to O&G July-September Q3 ward duties. Offline support enabled.
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
      </AnimatePresence>"""

content = re.sub(r'      \{\/\* 5\. ABOUT MODAL \*\/}.*?      \{\/\* 6\. ADMIN AUTH MODAL \*\/\}', about_new + '\n\n      {/* 6. ADMIN AUTH MODAL */}', content, flags=re.DOTALL)

with open('src/App.tsx', 'w') as f:
    f.write(content)
print("Updated Modals")
