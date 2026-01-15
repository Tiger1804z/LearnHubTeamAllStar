import { Router } from "express";
import {
    listPaths  
} from "../controllers/catalog.controller";

const router = Router();

router.get("/paths", listPaths);

export default router;