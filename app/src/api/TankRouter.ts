import { Router } from "express";
import usePgClient from "../lib/usePgClient";
import fetchTanks from "../lib/fetch/fetchTanks";

const router = Router();

router.get("/", async (req, res) => {
  res.json(await usePgClient("postgres", fetchTanks));
});

export default router;
