import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

old_p1 = """                <p className="text-center text-[10px] text-slate-400 mt-2 font-medium px-4">
                  Note: August and September rosters are algorithmic projections
                  based on July's official roster.
                </p>"""

new_p1 = """                <p className="text-center text-[10px] text-slate-400 mt-2 font-medium px-4">
                  {lang === "en" ? "Note: August and September rosters are algorithmic projections based on July's official roster." : "မှတ်ချက်။ ။ ဩဂုတ်နှင့် စက်တင်ဘာလ တာဝန်ချိန်များသည် ဇူလိုင်လ၏ တရားဝင်တာဝန်ချိန်ဇယားအပေါ် အခြေခံ၍ တွက်ချက်ထားခြင်းသာ ဖြစ်ပါသည်။"}
                </p>"""

old_p2 = """                  <p className="text-center text-[10px] text-slate-400 mt-4 font-medium flex items-center justify-center gap-1">
                    <Lock className="h-3 w-3" /> All notes are stored locally on
                    your device. Privacy guaranteed.
                  </p>"""

new_p2 = """                  <p className="text-center text-[10px] text-slate-400 mt-4 font-medium flex items-center justify-center gap-1">
                    <Lock className="h-3 w-3" /> {lang === "en" ? "All notes are stored locally on your device. Privacy guaranteed." : "မှတ်စုများကို သင့်ဖုန်းထဲတွင်သာ သိမ်းဆည်းထားမည်ဖြစ်ပြီး လုံခြုံမှုအပြည့်အဝရှိပါသည်။"}
                  </p>"""

content = content.replace(old_p1, new_p1)
content = content.replace(old_p2, new_p2)

with open('src/App.tsx', 'w') as f:
    f.write(content)
