import type { LinksRepository } from '@/repositories/links-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

export class DeleteLinkUseCase {
  constructor(private linksRepository: LinksRepository) {}

  async execute(linkId: string): Promise<void> {
    const link = await this.linksRepository.findById(linkId)

    if (!link) {
      throw new ResourceNotFoundError()
    }

    await this.linksRepository.deleteById(link.id)
  }
}
