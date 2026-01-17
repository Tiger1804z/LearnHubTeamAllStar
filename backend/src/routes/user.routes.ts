import {Router} from "express";
import {signup, login,me,  getMyLearningPath} from "../controllers/user.controllers";
import {authenticate} from '../middleware/auth.middleware';

const router = Router();
router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authenticate, me);
router.get("/me/learningpath", authenticate, getMyLearningPath);

export default router;