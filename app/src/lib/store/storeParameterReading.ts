import { Client, DatabaseError, QueryResultRow } from "pg";
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

export default async function storeParameterReading(
  client: Client,
  reading: ParameterReading,
): Promise<ParameterReading | null> {
  const sql = `INSERT INTO tank_data_schema.parameter_reading(tank_id, parameter_id, value, time, show_in_dashboard) VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
  const parameters = [
    reading.tankId,
    reading.parameterId,
    reading.value,
    reading.time,
    reading.showInDashboard,
  ];
  try {
    const pgResult = await client.query(sql, parameters);
    return rowToParameterReading(pgResult.rows[0]);
  } catch (error) {
    if (
      error instanceof DatabaseError &&
      (error as DatabaseError).detail?.includes("already exists")
    ) {
      return null;
    }
    throw error;
  }
}
