import fetchDevices from "../../../lib/fetch/fetchDevices";
import usePgClient from "../../../lib/usePgClient";

async function testFetchDevices() {
  const devices = await usePgClient("postgres", fetchDevices);
  console.log(devices);
}

testFetchDevices();
