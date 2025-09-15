import { Router } from "express";
import { getReposController } from "../controllers/githubController.js";

export const githubRouter = Router();

/**
 * @swagger
 * /github/{username}/repos:
 *   get:
 *     tags: [GitHub]
 *     summary: List public repositories for a GitHub user
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of repositories
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetReposResponse'
 *       400:
 *         description: Invalid username
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiFailure'
 */
githubRouter.get("/github/:username/repos", getReposController);


