import { Router } from "express";
import {
    createModule,
    updateModule,
    deleteModule,
    getModuleById
} from "../controllers/module.controller";


import { authenticate } from "../middleware/auth.middleware";


const router = Router();

router.post("/paths/:pathId/modules", authenticate,  createModule);
router.patch("/modules/:id", authenticate, updateModule);
router.delete("/modules/:id", authenticate, deleteModule);

export default router;