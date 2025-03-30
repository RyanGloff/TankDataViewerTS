import { Router } from "express";

const router = Router();

router.get("/hello", (req, res) => {
  res.json({ hello: "world" });
});

export default router;
