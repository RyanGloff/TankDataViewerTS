export type DevicePowerTarget = {
  id: number | null;
  deviceId: number;
  startTime: string | null;
  endTime: string | null;
  desiredPowerState: boolean;
  enforceOnDiscrepancy: boolean;
  notifyOnDiscrepancy: boolean;
  minAcceptableDraw: number | null;
  maxAcceptableDraw: number | null;
};
