import usePgClient from "../../lib/usePgClient";
import { Client } from "pg";

async function testFunction(client: Client) {
  const sql = `select 1;`;
  return client.query(sql);
}

async function testUsePgClient() {
  const res = await usePgClient("postgres", testFunction);
  console.log(res);
}

testUsePgClient();
