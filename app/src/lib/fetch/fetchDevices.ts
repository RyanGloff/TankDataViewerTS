import { Client, QueryResultRow } from "pg";
import { Device } from "../model/Device";
import fetchDataType from "./fetchDataType";

function rowToDevice(row: QueryResultRow): Device {
  return {
    id: row.id,
    name: row.name,
    host: row.host,
    childName: row.child_name,
    deviceTypeId: row.device_type_id,
  };
}

export default async function fetchDevice(client: Client): Promise<Device[]> {
  return fetchDataType(client, "device", rowToDevice);
}
