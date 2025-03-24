import fetchAlarms from "../../../lib/fetch/fetchAlarms";
import usePgClient from "../../../lib/usePgClient";

async function testFetchAlarms() {
  const alarms = await usePgClient("postgres", fetchAlarms);
  console.log(alarms);
}

testFetchAlarms();
