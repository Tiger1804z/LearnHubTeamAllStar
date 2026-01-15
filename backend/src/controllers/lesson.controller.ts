import type { Request, Response } from "express";
import {z} from "zod";
import { createPathService, getPathByIdService, updatePathService, deletePathService } from "../services/path.service";
import { createLessonService, deleteLessonService, updateLessonService } from "../services/lesson.service";
import { ca } from "zod/locales";

const createPathSchema = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    position: z.number().min(0),
    quiz : z.string().optional(),
});

const updatePathSchema = createPathSchema.partial();

export const createLesson = async (req: Request, res: Response) => {
    
    const parsed = createPathSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ ok: false, error: "BAD_REQUEST", details: parsed.error.flatten() });
    }
    if (!req.user) {
        return res.status(401).json({ ok: false, error: "UNAUTHORIZED" });
    }
    const moduleId = req.params.moduleId;
    if (typeof moduleId !== "string" ){
        return res.status(400).json({ ok: false, error: "BAD_REQUEST", details: "Invalid module ID" });
    }
    try {
        const result = await createLessonService({
            userId: req.user.userId,
            ...parsed.data,
            moduleId,
            
        });
        return res.status(201).json({ ok: true, lesson: result });
    }catch (e: any) {
        const msg = e?.message ?? "UNKNOWN_ERROR";
        if (msg === "MODULE_NOT_FOUND") {
            return res.status(404).json({ ok: false, error: msg });
        }
        if (msg === "UNAUTHORIZED") {
            return res.status(401).json({ ok: false, error: "UNAUTHORIZED" });
        }
        return res.status(400).json({ ok: false, error: msg });
    }
};

export const updateLesson = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (typeof id !== "string" ){
        return res.status(400).json({ ok: false, error: "BAD_REQUEST", details: "Invalid lesson ID" });
    }
    const parsed = updatePathSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ ok: false, error: "BAD_REQUEST", details: parsed.error.flatten() });
    }
    if (!req.user) {
        return res.status(401).json({ ok: false, error: "UNAUTHORIZED" });
    }
    try {
        const updated = await updateLessonService(id, req.user.userId, {
        ...parsed.data,
        });
        return res.status(200).json({ ok: true, lesson: updated });
    } catch (e: any) {
        const msg = e?.message ?? "UNKNOWN_ERROR";
        if (msg === "LESSON_NOT_FOUND") {
            return res.status(404).json({ ok: false, error: msg });
        }
        if (msg === "UNAUTHORIZED") {
            return res.status(403).json({ ok: false, error: "UNAUTHORIZED" });
        }
        return res.status(400).json({ ok: false, error: msg });
    }
};

export const deleteLesson = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (typeof id !== "string" ){
        return res.status(400).json({ ok: false, error: "BAD_REQUEST", details: "Invalid lesson ID" });
    }
    if (!req.user) {
        return res.status(401).json({ ok: false, error: "UNAUTHORIZED" });
    }
    try {
        const result = await deleteLessonService(id, req.user.userId);
        return res.status(200).json({ ok: true, ...result });
    } catch (e: any) {
        const msg = e?.message ?? "UNKNOWN_ERROR";
        if (msg === "LESSON_NOT_FOUND") {
            return res.status(404).json({ ok: false, error: msg });
        }
        if (msg === "UNAUTHORIZED") {
            return res.status(403).json({ ok: false, error: "UNAUTHORIZED" });
        }
        return res.status(400).json({ ok: false, error: msg });
    }
};       