import { CronData } from "parser";


/**
 * Parse time from format "YYYY-MM-DD HH:MM" into a Date object
 * @param timeString
 * @returns Date
 */
export function parseTimeString(timeString: string): Date {
  // TODO: write tests for all valid/invalid cases
  // TODO: handle invalid input
  const [date, time] = timeString.split(' ');
  const [year, month, day] = date.split('-').map(Number);
  const [hour, minute] = time.split(':').map(Number);

  return new Date(year, month - 1, day, hour, minute);
}

/**
 * Check if a given cron data is valid for a given time
 * @param cronData 
 * @param time 
 * @returns 
 */
export function checkCronValidForTime(cronData: CronData, time: Date): boolean {
  // 21 Feb 2025, 4:55PM, Friday
  const min = time.getMinutes(); // 55
  const hour = time.getHours(); // 16
  const dayOfMonth = time.getDate(); // 21
  const month = time.getMonth() + 1; // 2
  const dayOfWeek = time.getDay(); // 5



  if (!cronData.minute.includes(min)) {
    return false;
  }
  if (!cronData.hour.includes(hour)) {
    return false;
  }
  if (!cronData.dayOfMonth.includes(dayOfMonth)) {
    return false;
  }
  if (!cronData.month.includes(month)) {
    return false;
  }
  if (!cronData.dayOfWeek.includes(dayOfWeek)) {
    return false;
  }
  return true;
}