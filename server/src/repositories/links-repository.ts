import type { Link, NewLink } from '@/infra/db/schemas/links'

export interface LinksRepository {
  findById(id: string): Promise<Link | null>
  findByShortUrl(shortUrl: string): Promise<Link | null>
  create(data: NewLink): Promise<Link>
  incrementAccessCount(linkId: string): Promise<void>
  deleteById(linkId: string): Promise<void>
}
