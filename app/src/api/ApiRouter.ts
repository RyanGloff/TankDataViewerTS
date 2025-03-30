import { Router } from "express";
import ParameterRouter from "./ParameterRouter";
import ParameterReadingRouter from "./ParameterReadingRouter";
import TankRouter from "./TankRouter";

const router = Router();

router.get("/hello", (req, res) => {
  res.json({ hello: "world" });
});

router.use("/parameters", ParameterRouter);
router.use("/parameter-readings", ParameterReadingRouter);
router.use("/tanks", TankRouter);

export default router;
