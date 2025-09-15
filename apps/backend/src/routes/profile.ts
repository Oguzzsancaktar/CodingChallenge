import { Router } from "express";
import { z } from "zod";
import { requireAuth, type AuthenticatedRequest } from "../middleware/auth.js";
import { getProfileByUserId, upsertProfile } from "../repositories/profileRepository.js";

export const profileRouter = Router();

profileRouter.get("/profile", requireAuth, async (req: AuthenticatedRequest, res) => {
  const userId = req.user!.userId;
  const profile = await getProfileByUserId(userId);
  if (!profile) return res.status(404).json({ message: "Profile not found" });
  res.json(profile);
});

const UpdateProfileBody = z.object({
  name: z.string().min(1).max(100).optional(),
  email: z.string().email(),
  bio: z.string().max(280).optional()
});

profileRouter.put("/profile", requireAuth, async (req: AuthenticatedRequest, res) => {
  const parse = UpdateProfileBody.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ message: "Invalid body", errors: parse.error.flatten() });
  const userId = req.user!.userId;
  const updated = await upsertProfile(userId, parse.data);
  res.json(updated);
});


