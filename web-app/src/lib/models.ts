export type Tank = {
  id: number;
  name: string;
  apexHost: string | null;
};

export type Parameter = {
  id: number;
  name: string;
  apexName: string;
};

export type ParameterReadingPostRequest = {
  tankId: number;
  parameterReading: number;
  value: number;
  time: Date;
  showInDashboard: boolean;
};

export type ParameterReading = {
  id: number;
  tankId: number;
  parameterReading: number;
  value: number;
  time: Date;
  showInDashboard: boolean;
};
