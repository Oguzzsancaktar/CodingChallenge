import { db } from "../db/lowdb.js";
import type { IProfile } from "@codingchallenge/shared";

export async function getProfileByUserId(userId: string): Promise<IProfile | undefined> {
  await db.read();
  return db.data!.profiles.find((p) => p.userId === userId);
}

export async function upsertProfile(
  userId: string,
  input: Partial<Pick<IProfile, "name" | "email" | "bio" | "githubUsername">> & { email: string }
): Promise<IProfile> {
  await db.read();
  const now = new Date().toISOString();
  let profile = db.data!.profiles.find((p) => p.userId === userId);
  if (!profile) {
    profile = { userId, email: input.email, name: input.name, bio: input.bio, githubUsername: input.githubUsername, updatedAt: now };
    db.data!.profiles.push(profile);
  } else {
    profile.email = input.email ?? profile.email;
    if (input.name !== undefined) profile.name = input.name;
    if (input.bio !== undefined) profile.bio = input.bio;
    if (input.githubUsername !== undefined) profile.githubUsername = input.githubUsername;
    profile.updatedAt = now;
  }
  await db.write();
  return profile;
}


