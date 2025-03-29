import promptForValue from "./promptForValue";

function parseInteger(value: string): number | null {
  if (/^-?\d+$/.test(value)) {
    return parseInt(value, 10);
  }
  return null;
}

export default async function promptForInteger(
  prompt: string,
  defaultValue: number,
): Promise<number | null> {
  const answer = await promptForValue(prompt, defaultValue);
  const parsedInt = parseInteger(answer);
  if (parsedInt === null) {
    return defaultValue;
  }
  return parsedInt;
}
