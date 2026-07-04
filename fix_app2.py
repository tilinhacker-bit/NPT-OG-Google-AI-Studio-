import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

roster_vars_start = """  const rosterDay = useMemo(() => {
    return masterRoster.find(r => r.month === mNum && r.d === dNum);
  }, [masterRoster, mNum, dNum]);"""

roster_vars_new = """  const rosterDay = useMemo(() => {
    return masterRoster.find(r => r.month === mNum && r.d === dNum);
  }, [masterRoster, mNum, dNum]);

  const tomorrowRosterDay = useMemo(() => {
    const tomorrow = new Date(activeDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tmNum = tomorrow.getMonth() + 1;
    const tdNum = tomorrow.getDate();
    return masterRoster.find(r => r.month === tmNum && r.d === tdNum);
  }, [masterRoster, activeDate]);"""

content = content.replace(roster_vars_start, roster_vars_new)

dashboard_start = """              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-5"
              >
                {/* Date Selection Bar */}"""

dashboard_new = """              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-5"
              >
                {userRole === "HO" && userGroup && tomorrowRosterDay && (tomorrowRosterDay.roles[userGroup] === 'Duty' || tomorrowRosterDay.roles[userGroup] === 'Pre' || tomorrowRosterDay.roles[userGroup] === 'Anes') && dateOffset === 0 && (
                  <div className={`p-4 rounded-2xl shadow-sm border ${tomorrowRosterDay.roles[userGroup] === 'Duty' ? 'bg-rose-50/80 border-rose-100' : 'bg-amber-50/80 border-amber-100'} flex items-start gap-3`}>
                    <div className={`p-2 rounded-xl ${tomorrowRosterDay.roles[userGroup] === 'Duty' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'} shrink-0 mt-0.5`}>
                      <Bell className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className={`font-black text-sm mb-0.5 ${tomorrowRosterDay.roles[userGroup] === 'Duty' ? 'text-rose-900' : 'text-amber-900'}`}>
                        Reminder: {tomorrowRosterDay.roles[userGroup] === 'Duty' ? 'Duty' : tomorrowRosterDay.roles[userGroup] === 'Anes' ? 'ANA' : 'Pre-Duty'} Tomorrow!
                      </h4>
                      <p className={`text-xs font-medium ${tomorrowRosterDay.roles[userGroup] === 'Duty' ? 'text-rose-700/80' : 'text-amber-700/80'}`}>
                        Get some rest tonight. You are scheduled for Group {userGroup} {tomorrowRosterDay.roles[userGroup] === 'Duty' ? 'Duty' : tomorrowRosterDay.roles[userGroup] === 'Anes' ? 'ANA' : 'Pre-Duty'} tomorrow.
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Date Selection Bar */}"""
content = content.replace(dashboard_start, dashboard_new)

with open('src/App.tsx', 'w') as f:
    f.write(content)
print("Updated App dashboard UI")
