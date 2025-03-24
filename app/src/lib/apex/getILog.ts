import getConnectSid from "./getConnectSid";
import fetchTypedData from "../fetchTypedData";

export type ILogResponse = {
  ilog: ILog;
};

export type ILog = {
  hostname: string;
  software: string;
  hardware: string;
  serial: string;
  type: string;
  extra: ILogExtra;
  timezone: string;
  record: ILogRecord[];
};

export type ILogExtra = {
  sdver: string;
  sddate: string;
  sdserial: number;
  sdextDate: string;
  sdhealth: number;
  WWWVer: string;
  TmpUart: string;
  sdstat: ILogSdStat;
};

export type ILogSdStat = {
  reads: number;
  writes: number;
  readErr: number;
  writeErr: number;
};

export type ILogRecord = {
  date: number;
  data: ILogRecordData[];
};

export type ILogRecordData = {
  name: string;
  did: string;
  type: string;
  value: string;
};

export default async function getILog(
  host: string,
  username: string,
  password: string,
  startDay: string,
  numDays: number,
): Promise<ILog> {
  const { connectSid } = await getConnectSid(host, username, password);
  const url = `http://${host}/rest/ilog?days=${numDays || 7}&sdate=${startDay}&_=${Date.now()}`;
  const response = await fetchTypedData<ILogResponse>(url, {
    headers: {
      accept: "application/json, text/javascript, */*; q=0.01",
      "accept-language": "en-US,en;q=0.9",
      "accept-version": "1",
      "x-requested-with": "XMLHttpRequest",
      cookie: `connect.sid=${connectSid}`,
      Referer: `http://${host}/apex/ilog`,
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: null,
    method: "GET",
  });
  return response.ilog;
}
