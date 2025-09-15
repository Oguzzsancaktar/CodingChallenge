import { Router } from "express";
import { z } from "zod";
import { fetchUserRepos } from "../services/githubService.js";

export const githubRouter = Router();

const Params = z.object({ username: z.string().min(1) });

githubRouter.get("/github/:username/repos", async (req, res) => {
  const parse = Params.safeParse(req.params);
  if (!parse.success) return res.status(400).json({ message: "Invalid username" });
  try {
    const data = await fetchUserRepos(parse.data.username);
    res.json(data);
  } catch (e) {
    res.status(502).json({ message: e instanceof Error ? e.message : "GitHub error" });
  }
});


