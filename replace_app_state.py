import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

start_str = 'export default function App() {'
end_str = '  // Collapsible cards state'

start_idx = content.find(start_str)
end_idx = content.find(end_str)

if start_idx != -1 and end_idx != -1:
    new_state = '''export default function App() {
  const {
    userRole, userGroup, setUserRole, setUserGroup,
    currentTab, setCurrentTab,
    theme, setTheme,
    lang, setLang,
    isDarkMode, setIsDarkMode
  } = useStore();

  const [dateOffset, setDateOffset] = useState<number>(0);
  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(false);
  const [logoTapCount, setLogoTapCount] = useState<number>(0);
  const logoTapTimeout = useRef<NodeJS.Timeout | null>(null);

  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [appTutorialOpen, setAppTutorialOpen] = useState(false);
  const [adminAuthModalOpen, setAdminAuthModalOpen] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"presets" | "custom">("presets");
  const [selectedCustomRole, setSelectedCustomRole] = useState<string>("Duty");
  const [customColorPicker, setCustomColorPicker] = useState<string>("#ffe4e6");

'''
    new_content = content[:start_idx] + new_state + content[end_idx:]
    with open('src/App.tsx', 'w') as f:
        f.write(new_content)
    print("Replaced state block successfully")
else:
    print("Could not find start or end bounds.")
