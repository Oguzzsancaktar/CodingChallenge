import type { Request, Response, RequestHandler } from "express";
import { z } from "zod";
import { getProfileByUserId, upsertProfile } from "../repositories/profileRepository.js";
import type { AuthenticatedRequest } from "../middleware/auth.js";

const UpdateProfileBody = z.object({
  name: z.string().min(1).max(100).optional(),
  email: z.string().email(),
  bio: z.string().max(280).optional()
});

export const getProfileController: RequestHandler = async (req, res, next) => {
  try {
    const userId = (req as AuthenticatedRequest).user!.userId;
    const profile = await getProfileByUserId(userId);
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (err) {
    next(err);
  }
};

export const updateProfileController: RequestHandler = async (req, res, next) => {
  try {
    const parse = UpdateProfileBody.safeParse(req.body);
    if (!parse.success) return res.status(400).json({ message: "Invalid body", errors: parse.error.flatten() });
    const userId = (req as AuthenticatedRequest).user!.userId;
    const updated = await upsertProfile(userId, parse.data);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};


