export default function getStartDay(daysAgo: number, startDate?: Date): string {
  const originTime = startDate?.getTime() || Date.now();
  const originDate = new Date(originTime - daysAgo * 24 * 60 * 60 * 1000);
  const yearStr = originDate.getFullYear() % 100;
  const monthStr = `0${originDate.getMonth() + 1}`.slice(-2);
  const dayStr = `0${originDate.getDate()}`.slice(-2);
  const startDateStr = `${yearStr}${monthStr}${dayStr}`;
  return startDateStr;
}
