import { RosterDay, DATA } from '../data';
import { isAnes, isHoliday, isWeekend } from './dateLogic';
import { getDaysInMonth } from 'date-fns';

export function generateMasterRoster(): RosterDay[] {
  const roster: RosterDay[] = [];
  
  // Build base calendar data
  for (let m = 7; m <= 9; m++) {
    const daysInMonth = getDaysInMonth(new Date(2026, m - 1, 1));
    for (let d = 1; d <= daysInMonth; d++) {
      const dayObj: RosterDay = {
        month: m,
        d: d,
        roles: {},
        dateStr: `2026-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`
      };
      
      ['A', 'B', 'C', 'D'].forEach(g => {
        if (isAnes(g, m, d)) {
          dayObj.roles[g] = 'Anes';
        } else if (DATA.duties[g] && DATA.duties[g][m] && DATA.duties[g][m].includes(d)) {
          dayObj.roles[g] = 'Duty';
        } else if (DATA.nightOffs[g] && DATA.nightOffs[g][m] && DATA.nightOffs[g][m].includes(d)) {
          dayObj.roles[g] = 'Off';
        } else if (isWeekend(m, d) || isHoliday(m, d)) {
          dayObj.roles[g] = 'Rest';
        } else {
          dayObj.roles[g] = 'Ord';
        }
      });
      roster.push(dayObj);
    }
  }

  // Pre-Duty calculation rule:
  // If yesterday was 'Ord' and today is 'Ord', then today is 'Pre-duty' (for groups not in ANA)
  for (let i = 1; i < roster.length; i++) {
    const today = roster[i];
    const yesterday = roster[i - 1];
    if (['A', 'B', 'C', 'D'].every(g => today.roles[g] !== 'Anes')) {
      ['A', 'B', 'C', 'D'].forEach(g => {
        if (yesterday.roles[g] === 'Ord' && today.roles[g] === 'Ord') {
          today.roles[g] = 'Pre';
        }
      });
    }
  }

  return roster;
}

// Compute the master roster once since it's based on static DATA for 2026
export const masterRoster = generateMasterRoster();
