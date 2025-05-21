import type { Config } from 'drizzle-kit'

import { env } from '@/env'

export default {
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  dialect: 'postgresql',
  schema: 'src/infra/db/schemas/*',
  out: 'drizzle/migrations',
} satisfies Config
