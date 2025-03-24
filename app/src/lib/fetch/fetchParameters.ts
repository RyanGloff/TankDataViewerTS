import { Client, QueryResultRow } from "pg";
import { Parameter } from "../model/Parameter";
import fetchDataType from "./fetchDataType";

function rowToParameter(row: QueryResultRow): Parameter {
  return {
    id: row.id,
    name: row.name,
    apexName: row.apex_name,
  };
}

export default async function fetchParameters(
  client: Client,
): Promise<Parameter[]> {
  return fetchDataType(client, "parameter", rowToParameter);
}
