export type Alarm = {
  id: number | null;
  name: string;
  parameterId: number;
  tankId: number;
  highLimit: number | null;
  lowLimit: number | null;
  severity: number | null;
};
