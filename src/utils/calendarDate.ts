/**
 * Calendar Date & Progress Synchronization Utilities
 * Handles the start date tracking, current day calculation, and date formatting
 */

export interface CalendarDateInfo {
  startDate: Date;
  startDateFormatted: string;
  currentDayNumber: number; // 1 to 24 (or >24 if past Christmas)
  daysElapsed: number;
  daysRemainingToChristmas: number;
  isDecemberActive: boolean;
  isStarted: boolean;
}

/**
 * Calculates calendar progression based on the recorded start date or today's date.
 */
export function getCalendarDateInfo(startDateIso?: string, language: string = 'hu'): CalendarDateInfo {
  const now = new Date();
  
  // If no start date has been saved yet, default to Dec 1 of current year or today if in Dec
  let start: Date;
  if (startDateIso) {
    start = new Date(startDateIso);
    if (isNaN(start.getTime())) {
      start = new Date(now.getFullYear(), 11, 1);
    }
  } else {
    // Default start date: December 1st of current year (e.g. 2026-12-01)
    // or if current month is December, the 1st of December
    start = new Date(now.getFullYear(), 11, 1);
  }

  // Target Christmas date: Dec 24 of current year
  const christmasEve = new Date(now.getFullYear(), 11, 24, 23, 59, 59);
  const diffMsToChristmas = christmasEve.getTime() - now.getTime();
  const daysRemainingToChristmas = Math.max(0, Math.ceil(diffMsToChristmas / (1000 * 60 * 60 * 24)));

  // Calculate day index based on start date or December calendar day
  // If user is in December: the day is December's date (1 to 24)
  // Otherwise, calculate relative days from startDate
  let currentDayNumber = 1;
  if (now.getMonth() === 11) {
    // It's December!
    currentDayNumber = Math.min(24, Math.max(1, now.getDate()));
  } else {
    // If started with custom date, calculate day offset
    const diffMsFromStart = now.getTime() - start.getTime();
    const daysSinceStart = Math.floor(diffMsFromStart / (1000 * 60 * 60 * 24)) + 1;
    if (daysSinceStart > 0) {
      currentDayNumber = Math.min(24, Math.max(1, daysSinceStart));
    } else {
      currentDayNumber = 1;
    }
  }

  // Format start date nicely in the requested language
  const monthNamesHu = ['január', 'február', 'március', 'április', 'május', 'június', 'július', 'augusztus', 'szeptember', 'október', 'november', 'december'];
  const monthNamesRo = ['ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie', 'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie'];
  const monthNamesEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  let formatted = '';
  const y = start.getFullYear();
  const m = start.getMonth();
  const d = start.getDate();

  if (language === 'hu') {
    formatted = `${y}. ${monthNamesHu[m]} ${d}.`;
  } else if (language === 'ro') {
    formatted = `${d} ${monthNamesRo[m]} ${y}`;
  } else {
    formatted = `${monthNamesEn[m]} ${d}, ${y}`;
  }

  const isDecemberActive = now.getMonth() === 11;

  return {
    startDate: start,
    startDateFormatted: formatted,
    currentDayNumber,
    daysElapsed: currentDayNumber,
    daysRemainingToChristmas,
    isDecemberActive,
    isStarted: Boolean(startDateIso),
  };
}
