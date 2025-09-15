import type { IProfile } from '../../core/user'
import type { IGitHubRepo } from '../../core/github'
import type { ILoginResponse } from '../../core/auth'

export interface IGetProfileResponse extends IProfile { }
export interface IUpdateProfileResponse extends IProfile { }
export interface IGetReposResponse extends Array<IGitHubRepo> { }
export interface ILoginApiResponse extends ILoginResponse { }


