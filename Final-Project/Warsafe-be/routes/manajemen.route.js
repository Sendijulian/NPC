import { Router } from "express";
import {
  getManajemen,
  createManajemen,
} from "../controllers/manajemen.controller.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = Router();

router.get("/:id", getManajemen);
router.post("/:id", createManajemen);
export default router;
