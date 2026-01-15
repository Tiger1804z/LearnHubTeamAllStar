import type { Request, Response } from "express";
import {z} from "zod";
import { createPathService, getPathByIdService, updatePathService, deletePathService, publishPathService, getPathTreeService } from "../services/path.service";
import { PathLevel } from "../generated/prisma/enums";
import { ca } from "zod/locales";

const createPathSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    category: z.string().min(1),
    level: z.enum(["beginner", "intermediate", "advanced"]),
    estMinutes: z.number().min(1).optional(),


});

const updatePathSchema = createPathSchema.partial();

export const createPath = async (req: Request, res: Response) => {
    const parsed = createPathSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ ok: false, error: "BAD_REQUEST", details: parsed.error.flatten() });
    }
    if (!req.user) {
        return res.status(401).json({ ok: false, error: "UNAUTHORIZED" });
    }
    try {
        const result = await createPathService({
            creatorId: req.user.userId,
            ...parsed.data,
            level:  parsed.data.level as PathLevel,
            estMinutes: parsed.data.estMinutes ?? null,
        });
        return res.status(201).json({ ok: true, path: result });
    } catch (e: any) {
        const msg = e?.message ?? "UNKNOWN_ERROR";
        return res.status(400).json({ ok: false, error: msg });
    }
};

export const updatePath = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (typeof id !== "string" ){
        return res.status(400).json({ ok: false, error: "BAD_REQUEST", details: "Invalid path ID" });
    }
    const parsed = updatePathSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ ok: false, error: "BAD_REQUEST", details: parsed.error.flatten() });
    }
    if (!req.user) {
        return res.status(401).json({ ok: false, error: "UNAUTHORIZED" });
    }
    
    try {
        const updated = await updatePathService(id, req.user.userId, {
        ...parsed.data,
        level: parsed.data.level as PathLevel | undefined,
        });
        return res.status(200).json({ ok: true, path: updated });
    } catch (e: any) {
        const msg = e?.message ?? "UNKNOWN_ERROR";
        if (msg === "PATH_NOT_FOUND") {
            return res.status(404).json({ ok: false, error: msg });
        }
        if (msg === "UNAUTHORIZED") {
            return res.status(403).json({ ok: false, error: msg });
        }
        return res.status(400).json({ ok: false, error: msg });
    }
};

export const deletePath = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (typeof id !== "string" ){
        return res.status(400).json({ ok: false, error: "BAD_REQUEST", details: "Invalid path ID" });
    }
    if (!req.user) {
        return res.status(401).json({ ok: false, error: "UNAUTHORIZED" });
    }
    try {
        const result = await deletePathService(id, req.user.userId);
        return res.status(200).json({ ok: true, ...result });
    } catch (e: any) {
        const msg = e?.message ?? "UNKNOWN_ERROR";
        if (msg === "PATH_NOT_FOUND") {
            return res.status(404).json({ ok: false, error: msg });
        }
        if (msg === "UNAUTHORIZED") {
            return res.status(403).json({ ok: false, error: "UNAUTHORIZED" });
        }
        return res.status(400).json({ ok: false, error: msg });
    }
};

export const  publishPath = async (req: Request, res: Response) => {
    const id = req.params.id;
    const publish = true ;
    if (typeof id !== "string" ){
        return res.status(400).json({ ok: false, error: "BAD_REQUEST", details: "Invalid path ID" });
    }
    if (!req.user) {
        return res.status(401).json({ ok: false, error: "UNAUTHORIZED" });
    }
    try {
        const updated = await publishPathService(id, req.user.userId, publish);
        return res.status(200).json({ ok: true, path: updated });
    } catch (e: any) {
        const msg = e?.message ?? "UNKNOWN_ERROR";
        if (msg === "PATH_NOT_FOUND") {
            return res.status(404).json({ ok: false, error: msg });
        }
        if (msg === "UNAUTHORIZED") {
            return res.status(403).json({ ok: false, error: "UNAUTHORIZED" });
        }
        return res.status(400).json({ ok: false, error: msg });
    }
};


export const getPathById = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (typeof id !== "string" ){
        return res.status(400).json({ ok: false, error: "BAD_REQUEST", details: "Invalid path ID" });
    }
    try {
        const path = await getPathByIdService(id);
        if (!path) {
            return res.status(404).json({ ok: false, error: "PATH_NOT_FOUND" });
        }
        if (!path.isPublished) {
            if (!req.user||req.user.userId !== path.creatorId){
                return res.status(403).json({ ok: false, error: "UNAUTHORIZED" });
            }
        }
        return res.status(200).json({ ok: true, path });
    } catch (e: any) {
        const msg = e?.message ?? "UNKNOWN_ERROR";
        return res.status(400).json({ ok: false, error: msg });
    }
};

export const getPathTree = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (typeof id !== "string" ){
        return res.status(400).json({ ok: false, error: "BAD_REQUEST", details: "Invalid path ID" });
    }

    const tree =  await getPathTreeService(id);
    if (!tree) {
        return  res.status(404).json({ ok: false, error: "NOT_FOUND" });
    }
    
    return res.status(200).json({ ok: true, tree });
}




  