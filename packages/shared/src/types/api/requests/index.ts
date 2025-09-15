export interface IGetProfileRequest { }

export interface IUpdateProfileRequest {
  name?: string;
  email: string;
  bio?: string;
}

export interface IGetReposRequest {
  username: string;
}

export interface ILoginApiRequest {
  email: string;
  name?: string;
}


