import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: 'The best gym in the world',
      phone: '123456789',
      latitude: -7.9417934,
      longitude: -34.82929,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: 'The best gym in the world',
      phone: '123456789',
      latitude: -8.0919913,
      longitude: -34.9493757,
    })

    const { gyms } = await sut.execute({
      userLatitude: -7.9417934,
      userLongitude: -34.82929,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual(
      expect.arrayContaining([expect.objectContaining({ title: 'Near Gym' })]),
    )
  })
})
