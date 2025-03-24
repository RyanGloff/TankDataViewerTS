import getILog from "../apex/getILog";
import getStartDay from "../apex/getStartDay";
import getTLog from "../apex/getTLog";

const didToParam: Map<string, string> = new Map();
didToParam.set("2_0", "alk");
didToParam.set("2_1", "calc");
didToParam.set("2_2", "mag");

export type ApexReading = {
  parameterName: string;
  value: number;
  time: Date;
};

function genReading(
  parameterName: string,
  value: number,
  time: Date,
): ApexReading {
  return { parameterName, value, time };
}

async function getILogData(
  host: string,
  username: string,
  password: string,
  startDateStr: string,
  numDays: number,
): Promise<ApexReading[]> {
  const ilog = await getILog(host, username, password, startDateStr, numDays);
  return ilog.record.flatMap((record) => {
    return [
      genReading(
        "temp",
        Number(record.data[0].value),
        new Date(record.date * 1000),
      ),
      genReading(
        "ph",
        Number(record.data[1].value),
        new Date(record.date * 1000),
      ),
    ];
  });
}

async function getTLogData(
  host: string,
  username: string,
  password: string,
  startDateStr: string,
  numDays: number,
): Promise<ApexReading[]> {
  const tlog = await getTLog(host, username, password, startDateStr, numDays);
  return tlog.record.map((record) => {
    return genReading(
      didToParam.get(record.did) as string,
      record.value,
      new Date(record.date * 1000),
    );
  });
}

export default async function fetchApexReadings(
  host: string,
  username: string,
  password: string,
): Promise<ApexReading[]> {
  const numDays = 2;
  const startDateStr = getStartDay(numDays);

  const promises = [
    getILogData(host, username, password, startDateStr, numDays + 1),
    getTLogData(host, username, password, startDateStr, numDays + 1),
  ];

  return Promise.all(promises).then((fulfilled) => fulfilled.flatMap((x) => x));
}
