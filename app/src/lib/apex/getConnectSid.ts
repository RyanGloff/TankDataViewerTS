import fetchTypedData from "../fetchTypedData";

let connectSid: string;

export type ConnectSid = {
  connectSid: string;
};

export type ConnectSidResponse = {
  "connect.sid": string;
};

export default async function getConnectSid(
  host: string,
  username: string,
  password: string,
): Promise<ConnectSid> {
  if (!connectSid) {
    const response: ConnectSidResponse =
      await fetchTypedData<ConnectSidResponse>(`http://${host}/rest/login`, {
        headers: {
          accept: "application/json, text/javascript, */*; q=0.01",
          "accept-language": "en-US,en;q=0.9",
          "accept-version": "1",
          "content-type": "application/json",
          "x-csrf-token": "undefined",
          "x-requested-with": "XMLHttpRequest",
          Referer: `http://${host}/`,
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
        body: `{\"login\":\"${username}\",\"password\":\"${password}\",\"remember_me\":false}`,
        method: "POST",
      });
    connectSid = response["connect.sid"];
  }
  return { connectSid };
}
