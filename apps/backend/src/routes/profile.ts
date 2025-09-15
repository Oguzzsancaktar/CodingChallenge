import { Router } from "express";
import { requireAuth, type AuthenticatedRequest } from "../middleware/auth.js";
import { getProfileController, updateProfileController } from "../controllers/profileController.js";

export const profileRouter = Router();

/**
 * @swagger
 * /profile:
 *   get:
 *     tags: [Profile]
 *     summary: Get current user's profile
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Current profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetProfileResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiFailure'
 */
profileRouter.get("/profile", requireAuth, getProfileController as any);

/**
 * @swagger
 * /profile:
 *   put:
 *     tags: [Profile]
 *     summary: Update current user's profile
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProfileRequest'
 *     responses:
 *       200:
 *         description: Updated profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateProfileResponse'
 *       400:
 *         description: Invalid body
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiFailure'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiFailure'
 */
profileRouter.put("/profile", requireAuth, updateProfileController as any);


