import { Client, QueryResultRow } from "pg";
import fetchDataType from "./fetchDataType";
import { ParameterReading } from "../model/ParameterReading";

function rowToParameterReading(row: QueryResultRow): ParameterReading {
  return {
    id: row.id,
    tankId: row.tank_id,
    parameterId: row.parameter_id,
    value: row.value,
    time: new Date(row.time),
    showInDashboard: row.showInDashboard,
  };
}

export default async function fetchParameterReading(
  client: Client,
): Promise<ParameterReading[]> {
  return fetchDataType(client, "parameter_reading", rowToParameterReading);
}
