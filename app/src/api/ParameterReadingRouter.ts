import { Router, Request, Response } from "express";
import usePgClient from "../lib/usePgClient";
import {
  ParameterReading,
  validate as validateParameterReading,
} from "../lib/model/ParameterReading";
import storeParameterReading from "../lib/store/storeParameterReading";
import ValidationError from "../lib/ValidationError";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const bodyData = await req.body.json();
  let parameterReading: ParameterReading;
  try {
    parameterReading = validateParameterReading(bodyData);
  } catch (validationError) {
    if (validationError instanceof ValidationError) {
      console.warn(`Request Body failed validation: ${validationError}`);
      res.status(400).json(validationError.errorObj.format());
      return;
    }
    res.sendStatus(500);
    return;
  }

  const result = await usePgClient("postgres", (client) =>
    storeParameterReading(client, parameterReading),
  );
  if (result === null) {
    res.status(409).json({ error: "Record already exists" });
    return;
  }
  res.json(result);
});

export default router;
