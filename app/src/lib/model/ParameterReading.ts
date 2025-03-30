import { z } from "zod";
import ValidationError from "../ValidationError";

export type ParameterReading = {
  id?: number;
  tankId: number;
  parameterId: number;
  value: number;
  time: Date;
  showInDashboard: boolean;
};

const schema = z.object({
  id: z.number().optional(),
  tankId: z.number(),
  parameterId: z.number(),
  value: z.number(),
  time: z.date(),
  showInDashboard: z.boolean(),
});

export function validate(data: any): ParameterReading {
  const result = schema.safeParse(data);

  if (!result.success) {
    throw new ValidationError(result.error);
  }

  return data;
}
