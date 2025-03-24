import fetchAndStoreApexData from "./fetchAndStoreApexData";
import path from "path";

const INTERVAL = 1000 * 60;

export default async function apexPollIndex() {
  console.log(`Starting interval for fetchAndStoreApexData`);
  fetchAndStoreApexData();
  setInterval(fetchAndStoreApexData, INTERVAL);
}

if (process.argv[1] === path.resolve(__dirname, "apexPollIndex.js")) {
  apexPollIndex();
}
