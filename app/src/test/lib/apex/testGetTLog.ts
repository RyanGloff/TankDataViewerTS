import getTLog from "../../../lib/apex/getTLog";

const HOST = "192.168.51.10";
const USERNAME = "admin";
const PASSWORD = "1234";
const START_DAY = "250321";
const NUM_DAYS = 2;

async function testGetTLog(): Promise<void> {
  const tlog = await getTLog(HOST, USERNAME, PASSWORD, START_DAY, NUM_DAYS);
  console.log(tlog);
}

testGetTLog();
