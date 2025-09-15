import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getReposController } from './githubController'

const originalFetch = globalThis.fetch

describe('githubController', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn()
  })
  afterEach(() => {
    globalThis.fetch = originalFetch
    vi.restoreAllMocks()
  })

  it('validates username', async () => {
    const req: any = { params: { username: '' } }
    const res: any = { statusCode: 200, status(code: number) { this.statusCode = code; return this }, json(payload: any) { this.payload = payload } }
    await getReposController(req, res, () => { })
    expect(res.statusCode).toBe(400)
  })

  it('returns repos from service', async () => {
    ; (globalThis.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ ok: true, json: async () => [] })
    const req: any = { params: { username: 'john' } }
    const res: any = { statusCode: 200, body: undefined, status(code: number) { this.statusCode = code; return this }, json(payload: any) { this.body = payload } }
    await getReposController(req, res, () => { })
    expect(res.statusCode ?? 200).toBe(200)
    expect(res.body?.success).toBe(true)
    expect(Array.isArray(res.body?.data)).toBe(true)
  })
})


