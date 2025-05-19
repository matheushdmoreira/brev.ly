import { randomUUID } from 'node:crypto'

import { numeric, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const linksSchema = pgTable('links', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  originalUrl: text('original_url').notNull(),
  shortUrl: text('short_url').notNull().unique(),
  accessCount: numeric('access_count').notNull().default('0'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
