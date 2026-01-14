import { Router } from "express";
import { enroll, getProgress } from "../controllers/progress.controller";


const router = Router();

router.post("/enroll/:pathId", enroll);
router.get("/:pathId", getProgress);

export default router;

