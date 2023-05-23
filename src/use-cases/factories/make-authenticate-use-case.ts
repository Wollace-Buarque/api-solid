import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUsecase } from '../authenticate'

export function makeAuthenticateCaseUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUsecase(usersRepository)

  return authenticateUseCase
}
