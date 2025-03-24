import getConnectSid from "./getConnectSid";
import fetchTypedData from "../fetchTypedData";

export type TLogResponse = {
  tlog: TLog;
};

export type TLog = {
  hostname: string;
  software: string;
  hardware: string;
  serial: string;
  type: string;
  extra: TLogExtra;
  timezone: string;
  record: TLogRecord[];
};

export type TLogExtra = {
  sdver: string;
  sddate: string;
  sdserial: number;
  sdextDate: string;
  sdhealth: number;
  WWWVer: string;
  TmpUart: string;
  sdstat: TLogSdStat;
};

export type TLogSdStat = {
  reads: number;
  writes: number;
  readErr: number;
  writeErr: number;
};

export type TLogRecord = {
  date: number;
  did: string;
  value: number;
  confidence: number;
};

export default async function getILog(
  host: string,
  username: string,
  password: string,
  startDay: string,
  numDays: number,
): Promise<TLog> {
  const { connectSid } = await getConnectSid(host, username, password);
  const url = `http://${host}/rest/tlog?days=${numDays || 7}&sdate=${startDay}&_=${Date.now()}`;
  const response = await fetchTypedData<TLogResponse>(url, {
    headers: {
      accept: "application/json, text/javascript, */*; q=0.01",
      "accept-language": "en-US,en;q=0.9",
      "accept-version": "1",
      "x-requested-with": "XMLHttpRequest",
      cookie: `connect.sid=${connectSid}`,
      Referer: `http://${host}/apex/tlog`,
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: null,
    method: "GET",
  });
  return response.tlog;
}
