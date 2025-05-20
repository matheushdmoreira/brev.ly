import type { Link } from '@/infra/db/schemas/links'
import type { LinksRepository } from '@/repositories/links-repository'

interface GetAllLinksUseCaseResponse {
  links: Link[]
}

export class GetAllLinksUseCase {
  constructor(private linksRepository: LinksRepository) {}

  async execute(): Promise<GetAllLinksUseCaseResponse> {
    const links = await this.linksRepository.getAll()

    return {
      links,
    }
  }
}
