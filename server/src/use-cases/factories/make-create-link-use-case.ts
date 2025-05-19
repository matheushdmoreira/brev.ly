import { DrizzleLinksRepository } from '@/repositories/drizzle/drizzle-links-repository'

import { CreateLinkUseCase } from '../create-link'

export function makeCreateLinkUseCase() {
  const linksRepository = new DrizzleLinksRepository()
  const useCase = new CreateLinkUseCase(linksRepository)

  return useCase
}
