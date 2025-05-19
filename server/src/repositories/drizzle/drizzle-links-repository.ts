import { eq } from 'drizzle-orm'

import { db } from '@/infra/db'
import { type Link, linksSchema, type NewLink } from '@/infra/db/schemas/links'

import type { LinksRepository } from '../links-repository'

export class DrizzleLinksRepository implements LinksRepository {
  async findByShortUrl(shortUrl: string): Promise<Link | null> {
    const result = await db
      .select()
      .from(linksSchema)
      .where(eq(linksSchema.shortUrl, shortUrl))
      .limit(1)

    return result[0] ?? null
  }

  async create(data: NewLink): Promise<Link> {
    const link = await db.insert(linksSchema).values(data).returning()

    return link[0]
  }
}
