import { Router } from "express";
import { loginController } from "../controllers/authController.js";

export const authRouter = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login or register by email
 *     description: Sends a magic link-like login creating a user if missing and returns JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Invalid body
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiFailure'
 */
authRouter.post("/auth/login", loginController);


