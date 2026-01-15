import type { Request, Response } from "express";
import {z} from "zod";
import { signupService,loginService } from "../services/user.services";
import type {UserRole} from "@prisma/client";


const signupSchema = z.object({
  first_name: z.string().min(1, "first_name required"),
  last_name: z.string().min(1, "last_name required"),
  email: z.string().email("invalid email"),
  password: z.string().min(6, "password must be at least 6 chars"),
  role: z.enum(["learner", "creator", "mentor"]).optional(), 
});

const loginSchema = z.object({
  email: z.string().email("invalid email"),
  password: z.string().min(1, "password required"),
});

export const signup = async (req: Request, res: Response) => {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ ok: false, error: "BAD_REQUEST", details: parsed.error.flatten() });
    }
   
    try {
        const result = await signupService(parsed.data);


        return res.status(201).json({ ok: true, ...result });
    } catch (e: any) {
        const msg = e?.message ?? "UNKNOWN_ERROR";

        if (msg === "EMAIL_ALREADY_EXISTS") {
        return res.status(409).json({ ok: false, error: msg });
        }
        if (msg === "INVALID_ROLE") {
        return res.status(400).json({ ok: false, error: msg });
        }
        return res.status(400).json({ ok: false, error: msg });
    }
        
};


export const login = async (req: Request, res: Response) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ ok: false, error: "BAD_REQUEST", details: parsed.error.flatten() });
    }
    try {
        const result = await loginService(parsed.data);
        return res.status(200).json({ ok: true, ...result });
    } catch (e: any) {
        const msg = e?.message ?? "UNKNOWN_ERROR";  
        if (msg === "INVALID_CREDENTIALS") {
            return res.status(401).json({ ok: false, error: msg });
        }
        return res.status(400).json({ ok: false, error: msg });
    }
};

export const me = async (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ ok: false, error: "UNAUTHORIZED" });
    }
    return res.status(200).json({ ok: true, user: req.user });
}