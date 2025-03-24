import { Client, QueryResultRow } from "pg";
import { DevicePowerTarget } from "../model/DevicePowerTarget";
import fetchDataType from "./fetchDataType";

function rowToDevicePowerTarget(row: QueryResultRow): DevicePowerTarget {
  return {
    id: row.id,
    deviceId: row.device_id,
    startTime: row.start_time,
    endTime: row.end_time,
    desiredPowerState: row.desired_power_state,
    enforceOnDiscrepancy: row.enforce_on_discrepancy,
    notifyOnDiscrepancy: row.notify_on_discrepancy,
    minAcceptableDraw: row.min_acceptable_draw,
    maxAcceptableDraw: row.max_acceptable_draw,
  };
}

export default async function fetchDevicePowerTargets(
  client: Client,
): Promise<DevicePowerTarget[]> {
  return fetchDataType(client, "device_power_target", rowToDevicePowerTarget);
}
