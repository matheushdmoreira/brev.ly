import { eq, sql } from 'drizzle-orm'

import { db } from '@/infra/db'
import { type Link, linksSchema, type NewLink } from '@/infra/db/schemas/links'

import type { LinksRepository } from '../links-repository'

export class DrizzleLinksRepository implements LinksRepository {
  async findById(id: string): Promise<Link | null> {
    const result = await db
      .select()
      .from(linksSchema)
      .where(eq(linksSchema.id, id))
      .limit(1)

    return result[0] ?? null
  }

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

  async getAll(): Promise<Link[]> {
    const result = await db
      .select()
      .from(linksSchema)
      .orderBy(linksSchema.createdAt)

    return result
  }

  async incrementAccessCount(linkId: string): Promise<void> {
    await db
      .update(linksSchema)
      .set({
        accessCount: sql`${linksSchema.accessCount} + 1`,
      })
      .where(eq(linksSchema.id, linkId))
  }

  async deleteById(linkId: string): Promise<void> {
    await db.delete(linksSchema).where(eq(linksSchema.id, linkId))
  }

  async *streamAll(): AsyncIterable<Link> {
    const batchSize = 1000
    let offset = 0

    while (true) {
      const batch = await db
        .select()
        .from(linksSchema)
        .limit(batchSize)
        .offset(offset)

      if (batch.length === 0) {
        break
      }

      for (const link of batch) {
        yield link
      }

      offset += batchSize
    }
  }
}
