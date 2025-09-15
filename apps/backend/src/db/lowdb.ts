import { Low } from "lowdb";
import { Memory } from "lowdb";

export type User = {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
};

export type Profile = {
  userId: string;
  name?: string;
  email: string;
  bio?: string;
  updatedAt: string;
};

export type DbData = {
  users: User[];
  profiles: Profile[];
};

const defaultData: DbData = { users: [], profiles: [] };

const adapter = new Memory<DbData>();
export const db = new Low<DbData>(adapter, structuredClone(defaultData));

export async function initDb(): Promise<void> {
  await db.read();
  if (!db.data) {
    db.data = structuredClone(defaultData);
  }
}


