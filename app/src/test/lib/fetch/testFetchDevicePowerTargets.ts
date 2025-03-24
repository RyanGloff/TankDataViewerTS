import fetchDevicePowerTargets from "../../../lib/fetch/fetchDevicePowerTargets";
import usePgClient from "../../../lib/usePgClient";

async function testFetchDevicePowerTargets() {
  const devicePowerTargets = await usePgClient(
    "postgres",
    fetchDevicePowerTargets,
  );
  console.log(devicePowerTargets);
}

testFetchDevicePowerTargets();
