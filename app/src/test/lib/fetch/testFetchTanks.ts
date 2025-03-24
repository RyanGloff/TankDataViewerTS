import fetchTanks from "../../../lib/fetch/fetchTanks";
import usePgClient from "../../../lib/usePgClient";

async function testFetchTanks() {
  const tanks = await usePgClient("postgres", fetchTanks);
  console.log(tanks);
}

testFetchTanks();
