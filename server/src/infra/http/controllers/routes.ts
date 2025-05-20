import { FastifyInstance } from 'fastify'

import { createLinksRoute } from './links/create'
import { deleteLinksRoute } from './links/delete'
import { incrementAccessLinksRoute } from './links/increment-access'

export const routes = async (app: FastifyInstance) => {
  app.register(createLinksRoute)
  app.register(deleteLinksRoute)
  app.register(incrementAccessLinksRoute)
}
