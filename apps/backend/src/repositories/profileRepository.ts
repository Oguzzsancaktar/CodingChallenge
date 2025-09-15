import { db, type Profile } from "../db/lowdb.js";

export async function getProfileByUserId(userId: string): Promise<Profile | undefined> {
  await db.read();
  return db.data!.profiles.find((p) => p.userId === userId);
}

export async function upsertProfile(userId: string, input: Partial<Pick<Profile, "name" | "email" | "bio">> & { email: string }): Promise<Profile> {
  await db.read();
  const now = new Date().toISOString();
  let profile = db.data!.profiles.find((p) => p.userId === userId);
  if (!profile) {
    profile = { userId, email: input.email, name: input.name, bio: input.bio, updatedAt: now };
    db.data!.profiles.push(profile);
  } else {
    profile.email = input.email ?? profile.email;
    if (input.name !== undefined) profile.name = input.name;
    if (input.bio !== undefined) profile.bio = input.bio;
    profile.updatedAt = now;
  }
  await db.write();
  return profile;
}


