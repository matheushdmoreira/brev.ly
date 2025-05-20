import { DrizzleLinksRepository } from '@/repositories/drizzle/drizzle-links-repository'

import { GetAllLinksUseCase } from '../get-all-links'

export function makeGetAllLinksUseCase() {
  const linksRepository = new DrizzleLinksRepository()
  const useCase = new GetAllLinksUseCase(linksRepository)

  return useCase
}
