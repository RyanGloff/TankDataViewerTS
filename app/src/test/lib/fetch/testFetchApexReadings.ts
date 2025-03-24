import fetchApexReadings from "../../../lib/fetch/fetchApexReadings";

const HOST = "192.168.51.10";
const USERNAME = "admin";
const PASSWORD = "1234";

async function testFetchApexReadings() {
  const readings = await fetchApexReadings(HOST, USERNAME, PASSWORD);
  console.log(readings);
}

testFetchApexReadings();
