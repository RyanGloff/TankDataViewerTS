import { Client } from "pg";
import fetchDeviceById from "../../../lib/fetch/fetchDeviceById";
import usePgClient from "../../../lib/usePgClient";

async function testFetchDeviceById() {
  const device = await usePgClient("postgres", (client: Client) =>
    fetchDeviceById(client, 1),
  );
  console.log(device);
}

testFetchDeviceById();
