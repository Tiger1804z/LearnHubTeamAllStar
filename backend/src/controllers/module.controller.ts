import type { Request, Response } from "express";
import { z } from "zod";

import{
    createModuleService,
    updateModuleService,
    deleteModuleService,
    getModuleByIdService
} from "../services/module.service";

const createModuleSchema = z.object({
  title: z.string().min(1),
  position: z.number().int().min(0),
});

const updateModuleSchema = createModuleSchema.partial();

export const createModule = async (req: Request, res: Response) => {
  const parsed = createModuleSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: "BAD_REQUEST", details: parsed.error.flatten() });
  }
  if (!req.user) {
    return res.status(401).json({ ok: false, error: "UNAUTHORIZED" });
  }

  const pathId = req.params.pathId;
  if (typeof pathId !== "string") {
    return res.status(400).json({ ok: false, error: "BAD_REQUEST", message: "Invalid pathId" });
  }

  try {
    const result = await createModuleService({
      title: parsed.data.title,
      position: parsed.data.position,
      pathId: pathId,                 
      userId: req.user.userId 
    });

    return res.status(201).json({ ok: true, module: result });
  } catch (e: any) {
    const msg = e?.message ?? "UNKNOWN_ERROR";
    if (msg === "PATH_NOT_FOUND") return res.status(404).json({ ok: false, error: msg });
    if (msg === "FORBIDDEN_OWNER" || msg === "UNAUTHORIZED") return res.status(403).json({ ok: false, error: "FORBIDDEN" });
    return res.status(400).json({ ok: false, error: msg });
  }
};

export const updateModule = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (typeof id !== "string" ){
        return res.status(400).json({ ok: false, error: "BAD_REQUEST", details: "Invalid module ID" });
    }
    if (!req.user) {
        return res.status(401).json({ ok: false, error: "UNAUTHORIZED" });
    }
    const parsed = updateModuleSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ ok: false, error: "BAD_REQUEST", details: parsed.error.flatten() });
    }
    try {
        const updated = await updateModuleService(id, req.user.userId, {
        ...parsed.data,
        });
        return res.status(200).json({ ok: true, module: updated });
    } catch (e: any) {
        const msg = e?.message ?? "UNKNOWN_ERROR";
        if (msg === "MODULE_NOT_FOUND") {
            return res.status(404).json({ ok: false, error: msg });
        }
        if (msg === "UNAUTHORIZED") {
            return res.status(403).json({ ok: false, error: "UNAUTHORIZED" });
        }
        return res.status(400).json({ ok: false, error: msg });
    }
};

export const deleteModule = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (typeof id !== "string" ){
        return res.status(400).json({ ok: false, error: "BAD_REQUEST", details: "Invalid module ID" });
    }
    if (!req.user) {
        return res.status(401).json({ ok: false, error: "UNAUTHORIZED" });
    }
    try {
        const result = await deleteModuleService(id, req.user.userId);
        return res.status(200).json({ ok: true, ...result });
    }
    catch (e: any) {
        const msg = e?.message ?? "UNKNOWN_ERROR";
        if (msg === "MODULE_NOT_FOUND") {
            return res.status(404).json({ ok: false, error: msg });
        }
        if (msg === "UNAUTHORIZED") {
            return res.status(403).json({ ok: false, error: "UNAUTHORIZED" });
        }
        return res.status(400).json({ ok: false, error: msg });
    }   
};

export const getModuleById = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (typeof id !== "string" ){
        return res.status(400).json({ ok: false, error: "BAD_REQUEST", details: "Invalid module ID" });
    }
    try {
        const module =  await getModuleByIdService(id);
        return res.status(200).json({ ok: true, module });
    }
    catch (e: any) {
        const msg = e?.message ?? "UNKNOWN_ERROR";
        if (msg === "MODULE_NOT_FOUND") {
            return res.status(404).json({ ok: false, error: msg });
        }
        return res.status(400).json({ ok: false, error: msg });
    }
};