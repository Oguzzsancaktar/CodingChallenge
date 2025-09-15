import { describe, it, expect } from 'vitest'
import { loginController } from './authController'

describe('authController', () => {
  it('rejects invalid body', async () => {
    const req: any = { body: { email: 'not-an-email' } }
    const res: any = { statusCode: 200, status(code: number) { this.statusCode = code; return this }, json(payload: any) { this.payload = payload } }
    await loginController(req, res, () => { })
    expect(res.statusCode).toBe(400)
    expect(res.payload?.success).toBe(false)
  })
})


