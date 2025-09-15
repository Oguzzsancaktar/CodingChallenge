import type { Request, RequestHandler } from "express";
import { verifyToken } from "../services/authService.js";
import { fail } from "@codingchallenge/shared";

export type AuthenticatedRequest = Request & { user?: { userId: string; email?: string } };

export const requireAuth: RequestHandler = async (req: AuthenticatedRequest, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json(fail("Unauthorized"));
  }
  try {
    const token = header.slice("Bearer ".length);
    const payload = await verifyToken(token);
    req.user = payload;
    next();
  } catch {
    res.status(401).json(fail("Invalid token"));
  }
};


