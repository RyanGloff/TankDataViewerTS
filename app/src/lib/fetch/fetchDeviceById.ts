import { Client, QueryResultRow } from "pg";
import fetchDataTypeById from "./fetchDataTypeById";
import { Device } from "../model/Device";

function rowToDevice(row: QueryResultRow): Device {
  return {
    id: row.id,
    name: row.name,
    host: row.host,
    childName: row.child_name,
    deviceTypeId: row.device_type_id,
  };
}

export default async function fetchDeviceById(
  client: Client,
  id: number,
): Promise<Device | null> {
  return fetchDataTypeById(client, "device", id, rowToDevice);
}
