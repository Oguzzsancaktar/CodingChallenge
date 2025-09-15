import type { Request, Response, NextFunction, RequestHandler } from "express";
import { z } from "zod";
import { signInOrRegister } from "../services/authService.js";
import { ok, fail } from "@codingchallenge/shared";

const SignInBody = z.object({ email: z.string().email(), name: z.string().optional() });

export const loginController: RequestHandler = async (req, res, next) => {
  try {
    const parse = SignInBody.safeParse(req.body);
    if (!parse.success) return res.status(400).json(fail("Invalid body", parse.error.flatten()));
    const { email, name } = parse.data;
    const { token, userId } = await signInOrRegister(email, name);
    res.json(ok({ token, userId }));
  } catch (err) {
    next(err);
  }
};


