import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Add setInstallModalOpen
state_start = """  const [settingsModalOpen, setSettingsModalOpen] = useState(false);"""
state_new = """  const [installModalOpen, setInstallModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);"""
content = content.replace(state_start, state_new)

# Add Install button near settings
btn_start = """          <div className="flex gap-2">
            <button 
              onClick={() => setSettingsModalOpen(true)}"""
btn_new = """          <div className="flex gap-2">
            <button 
              onClick={() => setInstallModalOpen(true)}
              className="h-10 px-3 rounded-full bg-indigo-50 border border-indigo-100 flex items-center gap-1.5 text-indigo-600 hover:bg-indigo-100 shadow-sm transition font-black text-[10px] uppercase tracking-wider"
              title="Install App"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Install App</span>
            </button>
            <button 
              onClick={() => setSettingsModalOpen(true)}"""
content = content.replace(btn_start, btn_new)

# Add installModal
modal_start = """      {/* 9. SETTINGS MODAL */}"""
modal_new = """      {/* 8.5 INSTALL MODAL */}
      <AnimatePresence>
        {installModalOpen && (
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
              className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col border border-slate-100"
            >
              <div className="px-6 py-4.5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="text-md font-black text-slate-800 uppercase tracking-wide flex items-center gap-2">
                  <Download className="h-5 w-5 text-indigo-500" /> Install App
                </h3>
                <button 
                  onClick={() => setInstallModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-200/50 rounded-lg transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4">
                  <h4 className="font-black text-slate-800 text-sm mb-2 flex items-center gap-2">
                    📱 iOS / iPhone
                  </h4>
                  <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside font-medium leading-relaxed">
                    <li>Open this site in <strong>Safari</strong></li>
                    <li>Tap the <strong>Share</strong> button <span className="inline-block border border-slate-300 rounded px-1 ml-1 text-[10px]">⍐</span></li>
                    <li>Scroll down and tap <strong>"Add to Home Screen"</strong> <span className="inline-block border border-slate-300 rounded px-1 ml-1 text-[10px]">+</span></li>
                  </ol>
                </div>
                <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4">
                  <h4 className="font-black text-slate-800 text-sm mb-2 flex items-center gap-2">
                    🤖 Android
                  </h4>
                  <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside font-medium leading-relaxed">
                    <li>Open this site in <strong>Chrome</strong></li>
                    <li>Tap the <strong>Menu</strong> icon (three dots)</li>
                    <li>Tap <strong>"Add to Home screen"</strong> or <strong>"Install app"</strong></li>
                  </ol>
                </div>
                <button 
                  onClick={() => setInstallModalOpen(false)}
                  className="w-full py-3 bg-slate-100 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-200 transition"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 9. SETTINGS MODAL */}"""
content = content.replace(modal_start, modal_new)

with open('src/App.tsx', 'w') as f:
    f.write(content)
print("Updated App.tsx")
