import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeFetchNearbyGymsCase() {
  const prismaGymsRepository = new PrismaGymsRepository()
  const useCase = new FetchNearbyGymsUseCase(prismaGymsRepository)

  return useCase
}
