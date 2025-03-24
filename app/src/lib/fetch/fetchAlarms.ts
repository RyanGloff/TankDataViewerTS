import { Client, QueryResultRow } from "pg";
import { Alarm } from "../model/Alarm";
import fetchDataType from "./fetchDataType";

function rowToAlarm(row: QueryResultRow): Alarm {
  return {
    id: row.id,
    name: row.name,
    parameterId: row.parameter_id,
    tankId: row.tank_id,
    highLimit: row.high_limit,
    lowLimit: row.low_limit,
    severity: row.severity,
  };
}

export default async function fetchAlarm(client: Client): Promise<Alarm[]> {
  return fetchDataType(client, "alarm", rowToAlarm);
}
