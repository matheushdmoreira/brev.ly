import type { Link } from '@/infra/db/schemas/links'
import type { LinksRepository } from '@/repositories/links-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetOriginalUrlUseCaseResponse {
  link: Link
}

export class GetOriginalUrlUseCase {
  constructor(private linksRepository: LinksRepository) {}

  async execute(shortUrl: string): Promise<GetOriginalUrlUseCaseResponse> {
    const link = await this.linksRepository.findByShortUrl(shortUrl)

    if (!link) {
      throw new ResourceNotFoundError()
    }

    return { link }
  }
}
