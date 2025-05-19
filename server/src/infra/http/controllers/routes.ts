import { FastifyInstance } from 'fastify'

import { createLinksRoute } from './links/create'

export const routes = async (app: FastifyInstance) => {
  app.register(createLinksRoute)
}
