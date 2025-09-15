export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login'
} as const

export const PROFILE_ENDPOINTS = {
  ROOT: '/profile'
} as const

export const GITHUB_ENDPOINTS = {
  REPOS: (username: string) => `/github/${encodeURIComponent(username)}/repos`
} as const

export const API_ENDPOINTS = {
  AUTH: AUTH_ENDPOINTS,
  PROFILE: PROFILE_ENDPOINTS,
  GITHUB: GITHUB_ENDPOINTS
} as const


