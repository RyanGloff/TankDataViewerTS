export type ParameterReading = {
  id?: number;
  tankId: number;
  parameterId: number;
  value: number;
  time: Date;
  showInDashboard: boolean;
};
