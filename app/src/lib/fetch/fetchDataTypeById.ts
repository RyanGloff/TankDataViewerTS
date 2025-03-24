import { Client, QueryResultRow } from "pg";

export default async function fetchDataTypeById<T>(
  client: Client,
  tableName: string,
  id: number,
  conversionFn: (row: QueryResultRow) => T,
): Promise<T | null> {
  const sql = `SELECT * FROM tank_data_schema.${tableName} WHERE id = ${id};`;
  const res = await client.query(sql);
  if (res.rows.length === 0) {
    return null;
  }
  return conversionFn(res.rows[0]);
}
