import { z } from 'zod'
export * from './types/core/user'
export * from './types/core/auth'
export * from './types/core/github'

export * from './types/api/requests/auth'
export * from './types/api/responses/auth'
export * from './types/api/requests/user'
export * from './types/api/responses/user'
export * from './types/api/requests/github'
export * from './types/api/responses/github'

export const ApiErrorSchema = z.object({
  message: z.string(),
  errors: z.unknown().optional()
})

export type ApiError = z.infer<typeof ApiErrorSchema>

export const ApiSuccessSchema = <T extends z.ZodTypeAny>(data: T) => z.object({
  success: z.literal(true),
  data
})

export const ApiFailureSchema = z.object({
  success: z.literal(false),
  error: ApiErrorSchema
})

export type ApiSuccess<T> = { success: true; data: T }
export type ApiFailure = { success: false; error: ApiError }
export type ApiResponse<T> = ApiSuccess<T> | ApiFailure

export function ok<T>(data: T): ApiSuccess<T> {
  return { success: true, data }
}

export function fail(message: string, errors?: unknown): ApiFailure {
  return { success: false, error: { message, errors } }
}

export function isSuccess<T>(resp: ApiResponse<T>): resp is ApiSuccess<T> {
  return resp.success === true
}

export function isFailure<T>(resp: ApiResponse<T>): resp is ApiFailure {
  return resp.success === false
}

export function unwrap<T>(resp: ApiResponse<T>): T {
  if (resp.success) return resp.data
  throw Object.assign(new Error(resp.error.message), { details: resp.error.errors })
}

export const PaginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(100).default(20),
  total: z.number().int().nonnegative().optional()
})

export type Pagination = z.infer<typeof PaginationSchema>


