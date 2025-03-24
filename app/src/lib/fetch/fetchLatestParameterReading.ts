import { Client, QueryResultRow } from "pg";
import { ParameterReading } from "../model/ParameterReading";

function rowToParameterReading(row: QueryResultRow): ParameterReading {
  return {
    id: row.id,
    tankId: row.tank_id,
    parameterId: row.parameter_id,
    value: row.value,
    time: new Date(row.time),
    showInDashboard: row.show_in_dashboard,
  };
}

export default async function fetchLatestParameterReading(
  client: Client,
): Promise<ParameterReading | null> {
  const sql = `SELECT * FROM tank_data_schema.parameter_reading ORDER BY time DESC LIMIT 1;`;
  const res = await client.query(sql);
  if (res.rows.length === 0) {
    return null;
  }
  return rowToParameterReading(res.rows[0]);
}
