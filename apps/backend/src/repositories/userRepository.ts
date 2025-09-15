import { db } from "../db/lowdb";
import type { IUser } from "@codingchallenge/shared";

export async function findUserByEmail(email: string): Promise<IUser | undefined> {
  await db.read();
  return db.data!.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export async function findUserById(userId: string): Promise<IUser | undefined> {
  await db.read();
  return db.data!.users.find((u) => u.id === userId);
}

export async function createUser(input: { email: string; name?: string }): Promise<IUser> {
  await db.read();
  const now = new Date().toISOString();
  const user: IUser = {
    id: globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    email: input.email,
    name: input.name,
    createdAt: now,
    updatedAt: now
  };
  db.data!.users.push(user);
  await db.write();
  return user;
}

export async function updateUser(userId: string, patch: Partial<Pick<IUser, "name" | "email">>): Promise<IUser | undefined> {
  await db.read();
  const user = db.data!.users.find((u) => u.id === userId);
  if (!user) return undefined;
  if (patch.email) user.email = patch.email;
  if (patch.name !== undefined) user.name = patch.name;
  user.updatedAt = new Date().toISOString();
  await db.write();
  return user;
}


