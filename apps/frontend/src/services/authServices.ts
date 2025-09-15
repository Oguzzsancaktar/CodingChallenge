import { createApi } from '@reduxjs/toolkit/query/react'
import type { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery, type IAxiosBaseQueryFn } from '@/config/axiosBaseQuery'
import type { ILoginResponse, ILoginRequest } from '@codingchallenge/shared'
import { API_ENDPOINTS } from '@/constants/API_ENDPOINTS'

const AUTH_API_REDUCER_PATH = 'authAPI'
export const AUTH_API_TAG = 'AuthTag'

type TagTypes = typeof AUTH_API_TAG
type ApiTagTypes = TagTypes

type IBuilder = EndpointBuilder<
  IAxiosBaseQueryFn,
  ApiTagTypes,
  typeof AUTH_API_REDUCER_PATH
>

const login = (builder: IBuilder) => {
  return builder.mutation<ILoginResponse, ILoginRequest>({
    query(body: ILoginRequest) {
      return { url: API_ENDPOINTS.AUTH.LOGIN, method: 'POST', data: body }
    },
    async onQueryStarted(_arg, { queryFulfilled }) {
      try {
        const { data } = await queryFulfilled
        if (data?.token) localStorage.setItem('token', data.token)
      } catch { /* ignore */ }
    }
  })
}

const authApiSlice = createApi({
  reducerPath: AUTH_API_REDUCER_PATH,
  tagTypes: [AUTH_API_TAG],
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    login: login(builder)
  })
})

const { useLoginMutation } = authApiSlice
export { authApiSlice, useLoginMutation }


