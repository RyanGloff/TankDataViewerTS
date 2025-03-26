import fetchAndStoreApexData from "./fetchAndStoreApexData";
import path from "path";

export default async function backfillApexData() {
  console.log(`Starting backfill of Apex data`);
  let startDate = new Date(Date.now());
  startDate.setDate(startDate.getDate() - 10);
  const batchSizeInDays = 10; // I think this only works up to somewhere around 20 days so be careful
  let lastStoreSize = 0;
  do {
    const endDate = new Date();
    endDate.setDate(startDate.getDate() - batchSizeInDays);
    lastStoreSize = await fetchAndStoreApexData(batchSizeInDays, startDate);
    console.log(
      `Pulled from ${startDate.toISOString()} to ${endDate.toISOString()}. Stored: ${lastStoreSize}`,
    );
    startDate.setDate(startDate.getDate() - batchSizeInDays);
  } while (lastStoreSize > 0);
}

backfillApexData();
