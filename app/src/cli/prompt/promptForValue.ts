import performQuestion from "./performQuestion";

export default async function promptForValue(
  prompt,
  defaultAnswer,
): Promise<string> {
  const answer = (await performQuestion(prompt)) as string;
  if (!answer || answer.length === 0) {
    return defaultAnswer;
  }
  return answer;
}
