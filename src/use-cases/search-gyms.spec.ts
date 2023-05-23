import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'JavaScript Gym',
      description: 'The best gym in the world',
      phone: '123456789',
      latitude: -7.9417934,
      longitude: -34.82929,
    })

    await gymsRepository.create({
      title: 'TypeScript Gym',
      description: 'The best gym in the world',
      phone: '123456789',
      latitude: -7.9417934,
      longitude: -34.82929,
    })

    const { gyms } = await sut.execute({
      query: 'TypeScript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: 'TypeScript Gym' }),
      ]),
    )
  })

  it('should be able to fetch paginated check-in history', async () => {
    for (let index = 1; index <= 22; index++) {
      await gymsRepository.create({
        title: `TypeScript Gym ${index}`,
        description: 'The best gym in the world',
        phone: '123456789',
        latitude: -7.9417934,
        longitude: -34.82929,
      })
    }

    const { gyms } = await sut.execute({
      query: 'TypeScript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: 'TypeScript Gym 21' }),
        expect.objectContaining({ title: 'TypeScript Gym 22' }),
      ]),
    )
  })
})
