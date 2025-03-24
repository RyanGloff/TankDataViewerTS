import fetchParameters from "./lib/fetch/fetchParameters";
import fetchTanks from "./lib/fetch/fetchTanks";
import fetchApexReadings, { ApexReading } from "./lib/fetch/fetchApexReadings";
import storeParameterReading from "./lib/store/storeParameterReading";
import usePgClient from "./lib/usePgClient";
import { Client } from "pg";
import { ParameterReading } from "./lib/model/ParameterReading";
import { Tank } from "./lib/model/Tank";
import { Parameter } from "./lib/model/Parameter";

const STOCK_APEX_USERNAME = "admin";
const STOCK_APEX_PASSWORD = "1234";

const parameterCache = new Map<string, Parameter>();

function apexReadingToParameterReading(
  apexReading: ApexReading,
  tank: Tank,
): ParameterReading {
  const parameter = parameterCache.get(apexReading.parameterName);
  if (!parameter || parameter === null) {
    throw new Error(
      `Failed to store reading because apex parameter name was not supported. Parameter: ${apexReading.parameterName}`,
    );
  }
  return {
    tankId: tank.id!,
    parameterId: parameter.id!,
    value: apexReading.value,
    time: apexReading.time,
    showInDashboard: true,
  };
}

async function storeApexReading(
  client: Client,
  reading: ApexReading,
  tank: Tank,
): Promise<ParameterReading | null> {
  let parameterReading: ParameterReading;
  try {
    parameterReading = apexReadingToParameterReading(reading, tank);
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    else console.error(error);
    return null;
  }
  return await storeParameterReading(client, parameterReading);
}

async function fetchAndStoreReadingsForTank(
  client: Client,
  tank: Tank,
): Promise<void> {
  console.log(`Fetching from apex at ${tank.apexHost}`);
  const apexReadings = await fetchApexReadings(
    tank.apexHost,
    STOCK_APEX_USERNAME,
    STOCK_APEX_PASSWORD,
  );
  console.log(`Found ${apexReadings.length} reading from apex`);
  const storedReadings = (
    await Promise.all(
      apexReadings.map((reading) => storeApexReading(client, reading, tank)),
    )
  ).filter((response) => response !== null);
  console.log(`Stored ${storedReadings.length} new readings from apex`);
}

export default async function fetchAndStoreApexData(): Promise<void> {
  console.log(
    `Starting fetchAndStoreApexData. Date: ${new Date(Date.now()).toISOString()}`,
  );
  await usePgClient("tank_data_injector", async (client: Client) => {
    const dataPromises = await Promise.all([
      fetchParameters(client),
      fetchTanks(client),
    ]);
    dataPromises[0].forEach((parameter) => {
      if (parameter.apexName === null) return;
      parameterCache.set(parameter.apexName, parameter);
    });
    const apexTanks = dataPromises[1].filter((tank) => tank.apexHost !== null);
    await Promise.all(
      apexTanks.map((tank) => fetchAndStoreReadingsForTank(client, tank)),
    );
  });
}
