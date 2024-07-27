import { Router } from "express";
import {
  getChartData,
  createChartData,
} from "../controllers/data.controller.js";
const router = Router();

router.get("/:id", getChartData);
router.post("/:id", createChartData);

export default router;
