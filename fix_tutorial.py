import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

tutorial_old = """                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2">
                      <Palette className="h-4 w-4 text-pink-500" /> Themes /
                      အပြင်အဆင်
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {lang === "en"
                        ? "Select a custom theme from Settings to match your preference. Each theme assigns distinct colors to duty roles to easily differentiate them on the calendar."
                        : "ပြက္ခဒိန်တွင် တာဝန်ချိန်အလိုက် အရောင်များဖြင့် ခွဲခြားသိမြင်နိုင်ရန် မိမိနှစ်သက်ရာ Theme ကို ပြောင်းလဲအသုံးပြုနိုင်ပါသည်။"}
                    </p>
                  </div>"""

tutorial_new = """                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2">
                      <Palette className="h-4 w-4 text-pink-500" /> Themes & AMOLED /
                      အပြင်အဆင်
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {lang === "en"
                        ? "Select a custom theme from Settings to match your preference. You can switch between Light, Dark, and a true black AMOLED theme for battery saving."
                        : "မိမိနှစ်သက်ရာ Theme ကို ပြောင်းလဲအသုံးပြုနိုင်ပါသည်။ Light, Dark အပြင် ဘက်ထရီသက်သာစေရန် အမည်းရောင် AMOLED theme လည်း ရွေးချယ်နိုင်ပါသည်။"}
                    </p>
                  </div>"""

content = content.replace(tutorial_old, tutorial_new)

install_old = """                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2">
                      <Smartphone className="h-4 w-4 text-emerald-500" />{" "}
                      Offline Install / ဖုန်းတွင်သွင်းရန်
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {lang === "en"
                        ? 'Tap "Install App" in the Settings menu to save the app to your home screen for offline access without an internet connection.'
                        : 'အင်တာနက်မလိုဘဲ အသုံးပြုနိုင်ရန် "Install App" ကိုနှိပ်၍ ဖုန်း၏ Home Screen တွင် ထည့်သွင်းထားနိုင်ပါသည်။'}
                    </p>
                  </div>"""

install_new = """                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2">
                      <Smartphone className="h-4 w-4 text-emerald-500" />{" "}
                      Offline Support & Install / ဖုန်းတွင်သွင်းရန်
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {lang === "en"
                        ? 'Tap "Install App" to install it. If not available as popup, use your browser\\'s "Add to Home Screen". An indicator next to the title shows if you are Online or Offline. The app works fully offline!'
                        : 'ဖုန်းတွင်ထည့်သွင်းရန် "Install App" သို့မဟုတ် Browser မှ "Add to Home Screen" ကိုအသုံးပြုနိုင်ပါသည်။ Online/Offline အခြေအနေကို ခေါင်းစဉ်နံဘေးတွင် ကြည့်ရှုနိုင်ပြီး အင်တာနက်မရှိလည်း အသုံးပြုနိုင်ပါသည်။'}
                    </p>
                  </div>"""

content = content.replace(install_old, install_new)

notes_old = """                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2">
                      <CalendarClock className="h-4 w-4 text-rose-500" /> Notes
                      & Reminders / မှတ်စုများ
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {lang === "en"
                        ? "Tap on any specific day in the calendar to view detailed duty information and add a note. The note will appear on the Today tab when that date arrives. Tap 'Save Note' to save."
                        : "ပြက္ခဒိန်တွင် ရက်စွဲကိုနှိပ်၍ တာဝန်အသေးစိတ်ကိုကြည့်ရှုနိုင်ပြီး မှတ်စုများ ရေးမှတ်နိုင်ပါသည်။ ရေးမှတ်ထားသော မှတ်စုများသည် ထိုရက်ရောက်လျှင် Today စာမျက်နှာတွင် ပေါ်လာပါမည်။ မှတ်စုသိမ်းရန် 'Save Note' ကိုနှိပ်ပါ။"}
                    </p>
                  </div>"""

notes_new = """                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2">
                      <CalendarClock className="h-4 w-4 text-rose-500" /> Privacy & Notes /
                      လုံခြုံရေး နှင့် မှတ်စုများ
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {lang === "en"
                        ? "Tap on any day in the calendar to add a note. All notes and preferences are saved locally on your device for absolute privacy."
                        : "ပြက္ခဒိန်တွင် ရက်စွဲကိုနှိပ်၍ မှတ်စုများ ရေးမှတ်နိုင်ပါသည်။ မှတ်စုများအားလုံးကို သင့်ဖုန်းတွင်သာ သိမ်းဆည်းထားမည်ဖြစ်၍ လုံခြုံမှုအပြည့်အဝရှိပါသည်။"}
                    </p>
                  </div>"""

content = content.replace(notes_old, notes_new)

with open('src/App.tsx', 'w') as f:
    f.write(content)
