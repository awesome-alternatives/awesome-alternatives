const DAILY = /^(\d{1,2}) (\d{1,2}) \* \* \*$/;

export function dailyTime(cron: string): string {
  const match = DAILY.exec(cron.trim());
  const minute = Number(match?.[1]);
  const hour = Number(match?.[2]);
  if (!match || minute > 59 || hour > 23) throw new Error(`not a once-a-day schedule: ${cron}`);
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")} UTC`;
}
