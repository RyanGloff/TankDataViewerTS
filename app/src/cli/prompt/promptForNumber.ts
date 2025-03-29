import promptForValue from "./promptForValue";

function parseIfNumber(value: string): number | null {
  if (!isNaN(Number(value)) && value.trim() !== "") {
    return Number(value);
  }
  return null;
}

export default async function promptForNumber(
  prompt: string,
  defaultValue: Number,
): Promise<number | null> {
  const answer = await promptForValue(prompt, `${defaultValue}`);
  const number = parseIfNumber(answer);
  if (number === null) return null;
  return number;
}
