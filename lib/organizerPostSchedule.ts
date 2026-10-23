const HOURS = [9, 12, 18, 21];
export function organizerPostSlot(startDate: string, now = new Date()) {
  const jst = new Date(now.getTime() + 9 * 3600000);
  const date = jst.toISOString().slice(0, 10);
  const hour = jst.getUTCHours();
  const position = HOURS.indexOf(hour);
  // Do not unexpectedly deliver an old slot when manually invoked off schedule.
  if (position < 0) return null;
  const day = Math.round((Date.parse(`${date}T00:00:00Z`) - Date.parse(`${startDate}T00:00:00Z`)) / 86400000);
  if (day < 0) return null;
  return { id: `${date}-${String(hour).padStart(2, '0')}`, index: day * 4 + position };
}
