import { Router } from "express";
import usePgClient from "../lib/usePgClient";
import fetchParameters from "../lib/fetch/fetchParameters";

const router = Router();

router.get("/", async (req, res) => {
  res.json(await usePgClient("postgres", fetchParameters));
});

export default router;
