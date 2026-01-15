import { Router } from "express";
import { createPath,updatePath,deletePath,publishPath,getPathById,getPathTree } from "../controllers/path.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// Catalogue / lecture
router.get("/:id", getPathById);
router.get("/:id/tree", getPathTree);

// CRUD (protégé)
router.post("/", authenticate, createPath);
router.patch("/:id", authenticate, updatePath);
router.delete("/:id", authenticate, deletePath);
router.post("/:id/publish", authenticate, publishPath);

export default router;