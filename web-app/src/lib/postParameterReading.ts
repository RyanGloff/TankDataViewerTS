import {
  type ParameterReadingPostRequest,
  type ParameterReading,
} from "./models";

export default async function postParameterReading(
  parameterReadingData: ParameterReadingPostRequest,
): Promise<ParameterReading> {
  const response = await fetch(
    "http://192.168.55.12:3001/api/parameter-readings",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parameterReadingData),
    },
  );
  const parameterReading: ParameterReading = await response.json();
  return parameterReading;
}
