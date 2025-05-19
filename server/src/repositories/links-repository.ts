import type { Link, NewLink } from '@/infra/db/schemas/links'

export interface LinksRepository {
  findByShortUrl(shortUrl: string): Promise<Link | null>
  create(data: NewLink): Promise<Link>
}
