import { randomUUID } from 'node:crypto'

import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const linksSchema = pgTable('links', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  originalUrl: text('original_url').notNull(),
  shortUrl: text('short_url').notNull().unique(),
  accessCount: integer('access_count').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export type Link = typeof linksSchema.$inferSelect
export type NewLink = typeof linksSchema.$inferInsert
