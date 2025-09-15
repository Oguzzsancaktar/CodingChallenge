import { describe, it, expect } from 'vitest'
import { signInOrRegister, verifyToken } from './authService'

describe('authService', () => {
  it('signs and verifies JWT', async () => {
    const { token, userId } = await signInOrRegister('test@example.com', 'Test')
    expect(token).toBeTypeOf('string')
    const payload = await verifyToken(token)
    expect(payload.userId).toBe(userId)
    expect(payload.email).toBe('test@example.com')
  })
})


