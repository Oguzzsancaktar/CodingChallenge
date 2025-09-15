export interface IAuthTokenPayload {
  userId: string;
  email?: string;
}

export interface ILoginRequest {
  email: string;
  name?: string;
}

export interface ILoginResponse {
  token: string;
  userId: string;
}

