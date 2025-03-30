import type { Tank } from "./models";

export default async function fetchTanks(): Promise<Tank[]> {
  const response = await fetch("http://192.168.55.12:3001/api/tanks");
  if (!response.ok) {
    console.log(response);
    throw new Error("HTTP status was not ok");
  }
  return (await response.json()) as Tank[];
}
