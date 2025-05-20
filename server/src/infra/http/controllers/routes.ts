import { FastifyInstance } from 'fastify'

import { createLinksRoute } from './links/create'
import { deleteLinksRoute } from './links/delete'

export const routes = async (app: FastifyInstance) => {
  app.register(createLinksRoute)
  app.register(deleteLinksRoute)
}
