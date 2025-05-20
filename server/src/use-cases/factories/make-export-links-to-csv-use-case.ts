import { DrizzleLinksRepository } from '@/repositories/drizzle/drizzle-links-repository'

import { ExportLinksToCsvUseCase } from '../export-links-to-csv'

export function makeExportLinksToCsvUseCase() {
  const linksRepository = new DrizzleLinksRepository()
  const useCase = new ExportLinksToCsvUseCase(linksRepository)

  return useCase
}
