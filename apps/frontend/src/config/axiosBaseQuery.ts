import { AxiosError, type Method } from 'axios'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { ApiResponse, ApiFailure, ApiSuccess } from '@codingchallenge/shared'
import apiClient from './axiosInstance'

export type AxiosBaseQueryArgs = {
  url: string
  method: Method
  data?: unknown
  params?: Record<string, unknown>
}

export type IAxiosBaseQueryFn = BaseQueryFn<AxiosBaseQueryArgs, unknown, { status?: number; data?: unknown }>

export const axiosBaseQuery = (): IAxiosBaseQueryFn => {
  return async ({ url, method, data, params }) => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : undefined
      const result = await apiClient.request({
        url,
        method,
        data,
        params,
        headers: token ? { Authorization: `Bearer ${token}` } : undefined
      })
      const payload = result.data as ApiResponse<unknown>
      if (payload && typeof payload === 'object' && 'success' in payload) {
        if ((payload as ApiSuccess<unknown>).success) {
          return { data: (payload as ApiSuccess<unknown>).data }
        }
        const failure = payload as ApiFailure
        return { error: { status: result.status, data: failure.error } }
      }
      // fallback for legacy
      return { data: result.data }
    } catch (rawError) {
      const err = rawError as AxiosError
      return {
        error: {
          status: (err.response?.status ?? 500),
          data: err.response?.data ?? err.message
        }
      }
    }
  }
}


