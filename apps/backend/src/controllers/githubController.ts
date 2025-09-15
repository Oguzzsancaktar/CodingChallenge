import type { Request, Response, RequestHandler } from "express";
import { z } from "zod";
import { fetchUserRepos } from "../services/githubService.js";

const Params = z.object({ username: z.string().min(1) });

export const getReposController: RequestHandler = async (req, res, next) => {
  try {
    const parse = Params.safeParse(req.params);
    if (!parse.success) return res.status(400).json({ message: "Invalid username" });
    const data = await fetchUserRepos(parse.data.username);
    res.json(data);
  } catch (err) {
    next(err);
  }
};


