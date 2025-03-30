import { ZodError } from "zod";

export default class ValidationError extends Error {
  public errorObj: ZodError;

  constructor(errorObj: ZodError) {
    super(JSON.stringify(errorObj));
    this.errorObj = errorObj;
  }
}
