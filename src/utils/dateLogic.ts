import { isWeekend as isWeekendFns, getDay, isWithinInterval } from 'date-fns';
import { DATA } from '../data';

export const getDayOfWeek = (m: number, d: number) => {
  return getDay(new Date(2026, m - 1, d));
};

export const isWeekend = (m: number, d: number) => {
  return isWeekendFns(new Date(2026, m - 1, d));
};

export const isHoliday = (m: number, d: number) => {
  return m === 7 && d === 29;
};

export const isAnes = (group: string, m: number, d: number) => {
  const current = new Date(2026, m - 1, d);
  const block = DATA.anesBlocks[group];
  if (!block) return false;
  
  const start = new Date(2026, block.startM - 1, block.startD);
  const end = new Date(2026, block.endM - 1, block.endD);
  
  return isWithinInterval(current, { start, end });
};
