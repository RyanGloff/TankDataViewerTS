import { Client } from "pg";
import { ParameterReading } from "../../../lib/model/ParameterReading";
import storeParameterReading from "../../../lib/store/storeParameterReading";
import usePgClient from "../../../lib/usePgClient";

const reading: ParameterReading = {
  tankId: 1,
  parameterId: 1,
  value: 1000,
  time: new Date(Date.now()),
  showInDashboard: true,
};

async function testStoreParameterReading() {
  console.log(`Running basic test`);
  await usePgClient("postgres", async (client: Client) => {
    const res = await storeParameterReading(client, reading);
    console.log(res);
  });

  console.log(`Attempting duplicate error test`);
  await usePgClient("postgres", async (client: Client) => {
    const res = await storeParameterReading(client, reading);
    console.log(res);
  });
}

testStoreParameterReading();
