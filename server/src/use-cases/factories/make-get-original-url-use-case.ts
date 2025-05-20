import { DrizzleLinksRepository } from '@/repositories/drizzle/drizzle-links-repository'

import { GetOriginalUrlUseCase } from '../get-original-url'

export function makeGetOriginalUrlUseCase() {
  const linksRepository = new DrizzleLinksRepository()
  const useCase = new GetOriginalUrlUseCase(linksRepository)

  return useCase
}
