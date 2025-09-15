import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fetchUserRepos, type GitHubRepo } from './githubService'

const originalFetch = globalThis.fetch

describe('githubService.fetchUserRepos', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn()
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
    vi.restoreAllMocks()
  })

  it('returns repos and caches subsequent calls', async () => {
    const sample: GitHubRepo[] = [
      { id: 1, name: 'repo', html_url: 'https://x', stargazers_count: 1, fork: false, description: null, language: 'TS' }
    ]
      ; (globalThis.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ ok: true, json: async () => sample })

    const a = await fetchUserRepos('john')
    const b = await fetchUserRepos('john')

    expect(a).toEqual(sample)
    expect(b).toEqual(sample)
    expect((globalThis.fetch as any).mock.calls.length).toBe(1)
  })

  it('throws on non-ok response', async () => {
    ; (globalThis.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ ok: false, status: 500, text: async () => 'boom' })
    await expect(fetchUserRepos('erroruser')).rejects.toThrow()
  })
})


