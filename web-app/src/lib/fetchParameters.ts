import type { Parameter } from "./models";

export default async function fetchParameters(): Promise<Parameter[]> {
  const response = await fetch("http://192.168.55.12:3001/api/parameters");
  if (!response.ok) {
    console.log(response);
    throw new Error("HTTP status was not ok");
  }
  return (await response.json()) as Parameter[];
}
