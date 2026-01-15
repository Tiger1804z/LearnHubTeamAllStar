import type {Request, Response, NextFunction} from 'express';
import {verifyToken} from '../services/auth.services';


export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ ok: false, error: "UNAUTHORIZED" });
  }
  const token = header.slice("Bearer ".length).trim();
  if (!token) {
    return res.status(401).json({ ok: false, error: "UNAUTHORIZED" });
  }
  try {
    const payload = verifyToken(token);
    req.user = payload;
    return next();
  } catch (error) {
    return res.status(401).json({ ok: false, error: "UNAUTHORIZED" });
  }
};