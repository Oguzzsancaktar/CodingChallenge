import { Router } from "express";
import { getReposController } from "../controllers/githubController.js";

export const githubRouter = Router();

githubRouter.get("/github/:username/repos", getReposController);


