import { describe, it, expect, beforeAll } from 'vitest'
import request from 'supertest'
import { createApp } from '../app'
import { resetDb, initDb } from '../db/lowdb'

const app = createApp('http://localhost:5173')

describe('routes integration', () => {
  beforeAll(async () => {
    await initDb();
    await resetDb();
  })

  it('health ok', async () => {
    const res = await request(app).get('/api/v1/health')
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data.status).toBe('ok')
  })

  it('auth login => profile auto-created then update => get', async () => {
    const login = await request(app).post('/api/v1/auth/login').send({ email: 'a@b.com' })
    expect(login.status).toBe(200)
    const token = login.body.data.token as string

    const initial = await request(app).get('/api/v1/profile').set('Authorization', `Bearer ${token}`)
    expect(initial.status).toBe(200)
    expect(initial.body.success).toBe(true)

    const updated = await request(app)
      .put('/api/v1/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({ email: 'a@b.com', name: 'A', bio: 'hi' })
    expect(updated.status).toBe(200)
    expect(updated.body.success).toBe(true)

    const got = await request(app).get('/api/v1/profile').set('Authorization', `Bearer ${token}`)
    expect(got.status).toBe(200)
    expect(got.body.success).toBe(true)
    expect(got.body.data.email).toBe('a@b.com')
  })
})


