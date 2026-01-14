import {Router} from "express";
import {signup, login,me} from "../controllers/user.controllers";
import {authenticate} from '../middleware/auth.middleware';

const router = Router();
router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authenticate, me);

export default router;