import getConnectSid from "../../../lib/apex/getConnectSid";

const HOST = "192.168.51.10";
const USERNAME = "admin";
const PASSWORD = "1234";

async function main(): Promise<void> {
  const result = await getConnectSid(HOST, USERNAME, PASSWORD);
  console.log(result);
}

main();
