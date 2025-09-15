import { Router } from "express";
import { z } from "zod";
import { signInOrRegister } from "../services/authService.js";

export const authRouter = Router();

const SignInBody = z.object({ email: z.string().email(), name: z.string().optional() });

authRouter.post("/auth/login", async (req, res) => {
  const parse = SignInBody.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ message: "Invalid body", errors: parse.error.flatten() });
  const { email, name } = parse.data;
  const { token, userId } = await signInOrRegister(email, name);
  res.json({ token, userId });
});


