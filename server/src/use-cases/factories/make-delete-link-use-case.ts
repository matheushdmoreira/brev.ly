import { DrizzleLinksRepository } from '@/repositories/drizzle/drizzle-links-repository'

import { DeleteLinkUseCase } from '../delete-link'

export function makeDeleteLinkUseCase() {
  const linksRepository = new DrizzleLinksRepository()
  const useCase = new DeleteLinkUseCase(linksRepository)

  return useCase
}
