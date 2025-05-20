import type { LinksRepository } from '@/repositories/links-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

export class IncrementAccessLinkUseCase {
  constructor(private linksRepository: LinksRepository) {}

  async execute(linkId: string): Promise<void> {
    const link = await this.linksRepository.findById(linkId)

    if (!link) {
      throw new ResourceNotFoundError()
    }

    await this.linksRepository.incrementAccessCount(link.id)
  }
}
