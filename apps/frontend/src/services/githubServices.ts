import { createApi } from '@reduxjs/toolkit/query/react'
import type { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery, type IAxiosBaseQueryFn } from '@/config/axiosBaseQuery'
import type { IGitHubRepo } from '@codingchallenge/shared'
import { API_ENDPOINTS } from '@/constants/API_ENDPOINTS'

const GITHUB_API_REDUCER_PATH = 'githubAPI'
export const GITHUB_API_TAG = 'GitHubTag'

type TagTypes = typeof GITHUB_API_TAG
type ApiTagTypes = TagTypes

type IBuilder = EndpointBuilder<
  IAxiosBaseQueryFn,
  ApiTagTypes,
  typeof GITHUB_API_REDUCER_PATH
>

const getRepos = (builder: IBuilder) => {
  return builder.query<IGitHubRepo[], string>({
    query(username) { return { url: API_ENDPOINTS.GITHUB.REPOS(username), method: 'GET' } }
  })
}

const githubApiSlice = createApi({
  reducerPath: GITHUB_API_REDUCER_PATH,
  tagTypes: [GITHUB_API_TAG],
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getRepos: getRepos(builder)
  })
})

const { useGetReposQuery, useLazyGetReposQuery } = githubApiSlice
export { githubApiSlice, useGetReposQuery, useLazyGetReposQuery }


