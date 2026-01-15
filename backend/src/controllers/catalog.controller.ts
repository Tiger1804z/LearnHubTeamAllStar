import type { Request, Response } from "express";
import { z } from "zod";
import type { PathLevel } from "../generated/prisma/enums";
import { listPathService } from "../services/catalog.service";

const querySchema = z.object({
    search: z.string().optional(),
    category: z.string().optional(),
    level: z.enum(["beginner", "intermediate", "advanced"]).optional(),
    published: z.string().optional(),
    page: z.string().optional(),
    pageSize: z.string().optional(),
    sort: z.enum(["newest", "oldest"]).optional(),
});

export const listPaths =  async (req: Request, res: Response) => {
    const parsed = querySchema.safeParse(req.query);
    if (!parsed.success) {
        return res.status(400).json({ ok: false, error: "BAD_REQUEST", details: parsed.error.flatten() });
    }
    try {
        const { search, category, level, published, page, pageSize, sort } = parsed.data;
        const result = await listPathService({
            search,
            category,
            level: level as PathLevel | undefined,
            published: published ? published === "true" : undefined,
            page: page ? parseInt(page, 10) : 1,
            pageSize: pageSize ? parseInt(pageSize, 10) : 10,
            sort,
        });
        return  res.status(200).json({ ok: true, ...result });
    } catch (e: any) {
        const msg = e?.message ?? "UNKNOWN_ERROR";
        return res.status(400).json({ ok: false, error: msg });
    }
};
