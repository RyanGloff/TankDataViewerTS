import { Client, QueryResultRow } from "pg";
import fetchDataType from "./fetchDataType";
import { DeviceType } from "../model/DeviceType";

function rowToDeviceType(row: QueryResultRow): DeviceType {
  return {
    id: row.id,
    name: row.name,
  };
}

export default async function fetchDeviceType(
  client: Client,
): Promise<DeviceType[]> {
  return fetchDataType(client, "device_type", rowToDeviceType);
}
