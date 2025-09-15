import { Low } from "lowdb";
import { Memory } from "lowdb";
import type { IUser, IProfile } from "@codingchallenge/shared";


export type DbData = {
  users: IUser[];
  profiles: IProfile[];
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

export async function resetDb(): Promise<void> {
  db.data = structuredClone(defaultData);
  await db.write();
}


