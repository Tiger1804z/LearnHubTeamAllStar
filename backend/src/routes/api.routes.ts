import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { completeLesson } from "../controllers/lessonComplete.controller";
import { getMyDashboard } from "../controllers/dashboard.controller";

const router = Router();

router.post("/lessons/:id/complete", authenticate, completeLesson);
router.get("/dashboard/me", authenticate, getMyDashboard);

export default router;
