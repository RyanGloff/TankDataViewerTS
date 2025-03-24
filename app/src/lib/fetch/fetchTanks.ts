import { Client, QueryResultRow } from "pg";
import { Tank } from "../model/Tank";
import fetchDataType from "./fetchDataType";

function rowToTank(row: QueryResultRow): Tank {
  return {
    id: row.id,
    name: row.name,
    apexHost: row.apex_host,
  };
}

export default async function fetchTanks(client: Client): Promise<Tank[]> {
  return fetchDataType(client, "tank", rowToTank);
}
