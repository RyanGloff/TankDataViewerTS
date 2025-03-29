import { Client } from "pg";
import { ParameterReading } from "../lib/model/ParameterReading";
import storeParameterReading from "../lib/store/storeParameterReading";
import fetchTanks from "../lib/fetch/fetchTanks";
import fetchParameters from "../lib/fetch/fetchParameters";
import promptFromList from "./prompt/promptFromList";
import promptForNumber from "./prompt/promptForNumber";
import promptForBoolean from "./prompt/promptForBoolean";
import promptForDateTime from "./prompt/promptForDateTime";
import usePgClient from "../lib/usePgClient";

export async function addParameterReading(
  client: Client,
): Promise<ParameterReading> {
  const tanks = await fetchTanks(client);
  const parameters = await fetchParameters(client);

  const tank = await promptFromList("Tanks", tanks, "name", 1);
  const parameter = await promptFromList("Parameters", parameters, "name", 1);
  const value = await promptForNumber(
    "What is the parameter reading value: ",
    -1,
  );
  if (value <= 0)
    throw new Error(
      `Invalid parameter reading value: ${value}. Value must be positive`,
    );
  const time = await promptForDateTime(
    "What is the parameter reading time: ",
    new Date(),
  );
  const showInDashboard = await promptForBoolean(
    "Parameter reading should be shown in the dashboard: (Y/n) ",
    true,
  );
  return await storeParameterReading(client, {
    tankId: tank.id,
    parameterId: parameter.id,
    value,
    time,
    showInDashboard,
  });
}

usePgClient("postgres", addParameterReading);
