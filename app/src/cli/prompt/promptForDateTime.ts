import promptForValue from "./promptForValue";

export default async function promptForDateTime(
  prompt: string,
  defaultTime: Date,
): Promise<Date | null> {
  const answer = await promptForValue(prompt, "");
  const dateObj = new Date(answer);
  if (isNaN(dateObj.getTime())) {
    return defaultTime;
  }
  return dateObj;
}
