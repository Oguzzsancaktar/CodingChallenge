import type { Request, Response, RequestHandler } from "express";
import { z } from "zod";
import { getProfileByUserId, upsertProfile } from "../repositories/profileRepository.js";
import type { AuthenticatedRequest } from "../middleware/auth.js";
import { ok, fail } from "@codingchallenge/shared";
import type { IProfile, IUpdateProfileRequest } from "@codingchallenge/shared";
import { findUserById } from "../repositories/userRepository.js";

const UpdateProfileBody = z.object({
  name: z.string().min(1).max(100).optional(),
  email: z.string().email(),
  bio: z.string().max(280).optional(),
  githubUsername: z.string().min(1).max(39).optional()
});

export const getProfileController: RequestHandler = async (req, res, next) => {
  try {
    const { userId, email } = (req as AuthenticatedRequest).user!;
    let profile = await getProfileByUserId(userId);
    if (!profile) {
      // Auto-create a minimal profile from auth payload and stored user for name
      const user = await findUserById(userId);
      profile = await upsertProfile(userId, { email: email ?? user?.email ?? "", name: user?.name });
    }
    res.json(ok(profile as IProfile));
  } catch (err) {
    next(err);
  }
};

export const updateProfileController: RequestHandler = async (req, res, next) => {
  try {
    const parse = UpdateProfileBody.safeParse(req.body);
    if (!parse.success) return res.status(400).json(fail("Invalid body", parse.error.flatten()));
    const userId = (req as AuthenticatedRequest).user!.userId;
    const updated = await upsertProfile(userId, parse.data as IUpdateProfileRequest);
    res.json(ok(updated as IProfile));
  } catch (err) {
    next(err);
  }
};


