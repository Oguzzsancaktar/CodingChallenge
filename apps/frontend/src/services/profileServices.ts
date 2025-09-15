import { createApi } from '@reduxjs/toolkit/query/react'
import type { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery, type IAxiosBaseQueryFn } from '@/config/axiosBaseQuery'
import type { IProfile } from '@codingchallenge/shared'
import type { IUpdateProfileRequest } from '@codingchallenge/shared'
import { API_ENDPOINTS } from '@/constants/API_ENDPOINTS'

const PROFILE_API_REDUCER_PATH = 'profileAPI'
export const PROFILE_API_TAG = 'ProfileTag'

type TagTypes = typeof PROFILE_API_TAG
type ApiTagTypes = TagTypes

type IBuilder = EndpointBuilder<
  IAxiosBaseQueryFn,
  ApiTagTypes,
  typeof PROFILE_API_REDUCER_PATH
>

const getProfile = (builder: IBuilder) => {
  return builder.query<IProfile, void>({
    query() { return { url: API_ENDPOINTS.PROFILE.ROOT, method: 'GET' } },
    providesTags: [PROFILE_API_TAG]
  })
}

const updateProfile = (builder: IBuilder) => {
  return builder.mutation<IProfile, IUpdateProfileRequest>({
    query(body) { return { url: API_ENDPOINTS.PROFILE.ROOT, method: 'PUT', data: body } },
    invalidatesTags: [PROFILE_API_TAG]
  })
}

const profileApiSlice = createApi({
  reducerPath: PROFILE_API_REDUCER_PATH,
  tagTypes: [PROFILE_API_TAG],
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getProfile: getProfile(builder),
    updateProfile: updateProfile(builder)
  })
})

const { useGetProfileQuery, useUpdateProfileMutation } = profileApiSlice
export { profileApiSlice, useGetProfileQuery, useUpdateProfileMutation }


