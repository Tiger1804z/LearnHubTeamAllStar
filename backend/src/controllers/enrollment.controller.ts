import type  { Request, Response } from "express";
import { enrollToPathService } from "../services/enrollment.service";
import path from "node:path";

export const enrollToPath = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ ok: false, error: "UNAUTHORIZED" });
  }

  const pathId = String(req.params.id);
 


  try {
    const enrollment = await enrollToPathService(
      pathId, req.user.userId
    );

    return res.status(201).json({ ok: true, enrollment });
  } catch (e: any) {
    if (e.message === "ALREADY_ENROLLED") {
      return res.status(409).json({ ok: false, error: e.message });
    }

    if (e.message === "PATH_NOT_FOUND") {
      return res.status(404).json({ ok: false, error: e.message });
    }

    return res.status(400).json({ ok: false, error: "UNKNOWN_ERROR" });
  }
};
