import promptForValue from "./promptForValue";

function stringToBoolean(value: string): boolean | null {
  const lower = value.trim().toLowerCase();
  const trueValues = new Set(["true", "yes", "y", "on", "1"]);
  const falseValues = new Set(["false", "no", "n", "off", "0"]);

  if (trueValues.has(lower)) return true;
  if (falseValues.has(lower)) return false;
  return null;
}

export default async function promptForBoolean(
  prompt: string,
  defaultValue: boolean,
): Promise<boolean | null> {
  const answer = await promptForValue(prompt, `${defaultValue}`);
  return stringToBoolean(answer);
}
