import promptForInteger from "./promptForInteger";

export default async function <T>(
  listName: string,
  list: T[],
  nameField: keyof T,
  defaultIndex: number,
): Promise<T | null> {
  const header = `----- ${listName} -----`;
  console.log(header);
  list.forEach((ele: T, index: number) =>
    console.log(`${index + 1}: ${ele[nameField]}`),
  );
  console.log("-".repeat(header.length));
  const answer = await promptForInteger(`Enter a ${listName} number: `, 1);
  return list[answer - 1];
}
