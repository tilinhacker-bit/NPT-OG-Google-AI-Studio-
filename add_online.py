import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

state_old = "  const [dateOffset, setDateOffset] = useState<number>(0);"
state_new = """  const [dateOffset, setDateOffset] = useState<number>(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);"""

content = content.replace(state_old, state_new)

header_old = """                <h1 className="text-2xl font-black text-slate-800 tracking-tight leading-none">
                  NOGSH Portal 2026
                </h1>"""

header_new = """                <h1 className="text-2xl font-black text-slate-800 tracking-tight leading-none flex items-center gap-2">
                  NOGSH Portal 2026
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${isOnline ? "bg-emerald-500" : "bg-red-500"}`}
                    title={isOnline ? "Online" : "Offline"}
                  />
                </h1>"""

content = content.replace(header_old, header_new)

with open('src/App.tsx', 'w') as f:
    f.write(content)
