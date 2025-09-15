import { z } from "zod";
import { signInOrRegister } from "../services/authService.js";
import { ok, fail } from "@codingchallenge/shared";
import type { ILoginResponse } from "@codingchallenge/shared";
import type { RequestHandler } from "express";

const SignInBody = z.object({ email: z.string().email(), name: z.string().optional() });

export const loginController: RequestHandler = async (req, res, next) => {
  try {
    const parse = SignInBody.safeParse(req.body);
    if (!parse.success) return res.status(400).json(fail("Invalid body", parse.error.flatten()));
    const { email, name } = parse.data;
    const { token, userId } = await signInOrRegister(email, name);
    const payload: ILoginResponse = { token, userId };
    res.json(ok(payload));
  } catch (err) {
    next(err);
  }
};


