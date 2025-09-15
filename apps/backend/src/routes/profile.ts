import { Router } from "express";
import { requireAuth, type AuthenticatedRequest } from "../middleware/auth.js";
import { getProfileController, updateProfileController } from "../controllers/profileController.js";

export const profileRouter = Router();

profileRouter.get("/profile", requireAuth, getProfileController as any);
profileRouter.put("/profile", requireAuth, updateProfileController as any);


