import { SignJWT, jwtVerify } from "jose";
import { loadEnv } from "../config/env.js";
import { findUserByEmail, createUser } from "../repositories/userRepository.js";

const env = loadEnv();
const algo = "HS256";
const key = new TextEncoder().encode(env.AUTH_JWT_SECRET);

export async function signInOrRegister(email: string, name?: string): Promise<{ token: string; userId: string }> {
  const existing = await findUserByEmail(email);
  let userId = existing?.id;
  if (!userId) {
    const user = await createUser({ email, name });
    userId = user.id;
  }
  const token = await new SignJWT({ sub: userId, email })
    .setProtectedHeader({ alg: algo })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
  return { token, userId };
}

export async function verifyToken(token: string): Promise<{ userId: string; email?: string }> {
  const { payload } = await jwtVerify(token, key, { algorithms: [algo] });
  return { userId: String(payload.sub), email: typeof payload.email === "string" ? payload.email : undefined };
}


