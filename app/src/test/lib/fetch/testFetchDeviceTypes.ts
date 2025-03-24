import fetchDeviceTypes from "../../../lib/fetch/fetchDeviceTypes";
import usePgClient from "../../../lib/usePgClient";

async function testFetchDeviceTypes() {
  const deviceTypes = await usePgClient("postgres", fetchDeviceTypes);
  console.log(deviceTypes);
}

testFetchDeviceTypes();
