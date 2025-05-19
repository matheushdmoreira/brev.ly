import type { Link } from '@/infra/db/schemas/links'
import type { LinksRepository } from '@/repositories/links-repository'

import { LinkAlreadyExistsError } from './errors/link-already-exists-error'

interface CreateLinkUseCaseRequest {
  originalUrl: string
  shortUrl: string
}

interface CreateLinkUseCaseResponse {
  link: Link
}

export class CreateLinkUseCase {
  constructor(private linksRepository: LinksRepository) {}

  async execute({
    originalUrl,
    shortUrl,
  }: CreateLinkUseCaseRequest): Promise<CreateLinkUseCaseResponse> {
    const linkWithSameShortUrl =
      await this.linksRepository.findByShortUrl(shortUrl)

    if (linkWithSameShortUrl) {
      throw new LinkAlreadyExistsError()
    }

    const link = await this.linksRepository.create({
      originalUrl,
      shortUrl,
    })

    return {
      link,
    }
  }
}
