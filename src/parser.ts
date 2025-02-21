
export interface CronData {
  minute: number[];
  hour: number[];
  dayOfMonth: number[];
  month: number[]; 
  dayOfWeek: number[];
}

export function parseCronString(cronString: string): CronData {
  const cronParts = cronString.split(' ');
  if (cronParts.length !== 5) {
    throw new Error('Invalid Cron String');
  }

  const cronData: CronData = {
    minute: parseMinute(cronParts[0]),
    hour: parseHour(cronParts[1]),
    dayOfMonth: parseDayOfMonth(cronParts[2]),
    month: parseMonth(cronParts[3]),
    dayOfWeek: parseDayOfWeek(cronParts[4])
  }

  return cronData;
}

export function parseMinute(minute: string): number[] {
  if (minute === '*') {
    return Array.from({ length: 59 }, (_, i) => i + 1); // NOTE: is this wasteful in terms of space?
  }

  return [];
}

function parseHour(hour: string): number[] {
  return [];
}

function parseDayOfMonth(dayOfMonth: string): number[] {
  return [];
}

function parseMonth(month: string): number[] {
  return [];
}

function parseDayOfWeek(dayOfWeek: string): number[] {
  return [];
}