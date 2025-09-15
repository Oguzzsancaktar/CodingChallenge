export interface IUser {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProfile {
  userId: string;
  name?: string;
  email: string;
  bio?: string;
  updatedAt: string;
}

