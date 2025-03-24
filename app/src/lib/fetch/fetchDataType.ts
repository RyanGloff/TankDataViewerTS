import { Client, QueryResultRow } from "pg";

export default async function fetchDataType<T>(
  client: Client,
  tableName: string,
  conversionFn: (row: QueryResultRow) => T,
): Promise<T[]> {
  const sql = `SELECT * FROM tank_data_schema.${tableName};`;
  return (await client.query(sql)).rows.map(conversionFn);
}
