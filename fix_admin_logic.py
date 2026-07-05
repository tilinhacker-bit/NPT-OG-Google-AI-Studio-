import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

old_logic = """  const handleAdminAuthSubmit = () => {
    if (adminPasswordInput === "OG2026") {
      setIsAdminUnlocked(true);
      setCurrentTab("admin");
      setAdminAuthModalOpen(false);
      setAdminPasswordInput("");
    } else {
      alert("❌ Incorrect password. Access denied.");
    }
  };"""

new_logic = """  const handleAdminAuthSubmit = () => {
    if (userGroup !== "B") {
      alert("❌ Admin access is restricted to Group B members only.");
      setAdminAuthModalOpen(false);
      setAdminPasswordInput("");
      return;
    }
    if (adminPasswordInput === "YAWNAKA") {
      setIsAdminUnlocked(true);
      setCurrentTab("admin");
      setAdminAuthModalOpen(false);
      setAdminPasswordInput("");
    } else {
      alert("❌ Incorrect password. Access denied.");
    }
  };"""

content = content.replace(old_logic, new_logic)

with open('src/App.tsx', 'w') as f:
    f.write(content)
