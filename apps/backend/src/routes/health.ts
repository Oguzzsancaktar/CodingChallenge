import { Router } from "express";
import { healthController } from "../controllers/healthController.js";

export const healthRouter = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     tags: [Health]
 *     summary: Health check
 *     description: Returns service status and current timestamp.
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthResponse'
 */
healthRouter.get("/health", healthController);


