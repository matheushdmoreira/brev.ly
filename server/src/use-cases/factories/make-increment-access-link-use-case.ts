import { DrizzleLinksRepository } from '@/repositories/drizzle/drizzle-links-repository'

import { IncrementAccessLinkUseCase } from '../increment-access-link'

export function makeIncrementAccessLinkUseCase() {
  const linksRepository = new DrizzleLinksRepository()
  const useCase = new IncrementAccessLinkUseCase(linksRepository)

  return useCase
}
