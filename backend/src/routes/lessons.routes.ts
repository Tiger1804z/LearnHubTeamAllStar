import { Router } from "express";
import {
    createLesson,
    updateLesson,
    deleteLesson

} from "../controllers/lesson.controller";
import { authenticate } from "../middleware/auth.middleware";


const router = Router();

router.post("/modules/:moduleId/lessons", authenticate, createLesson);
router.patch("/lessons/:id", authenticate, updateLesson);
router.delete("/lessons/:id", authenticate, deleteLesson);

export default router;