import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Check-ins History (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to list check-ins history', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'TypeScript Gym',
        description: 'A gym to learn javaScript',
        phone: '123456789',
        latitude: -7.9417934,
        longitude: -34.82929,
      })

    const { id } = await request(app.server)
      .get('/gyms/nearby')
      .set('Authorization', `Bearer ${token}`)
      .query({
        latitude: -7.9417934,
        longitude: -34.82929,
      })
      .send()
      .then((response) => response.body.gyms[0])

    await request(app.server)
      .post(`/gyms/${id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -7.9417934,
        longitude: -34.82929,
      })

    const response = await request(app.server)
      .get('/check-ins/history')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.checkIns).toHaveLength(1)
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({
        gym_id: id,
      }),
    ])
  })
})
