import { FastifyInstance } from 'fastify'

import { createLinksRoute } from './links/create'
import { deleteLinksRoute } from './links/delete'
import { exportLinksRoute } from './links/export-to-csv'
import { getOriginalUrlRoute } from './links/get-original-url'
import { incrementAccessLinksRoute } from './links/increment-access'
import { listLinksRoute } from './links/list'

export const routes = async (app: FastifyInstance) => {
  app.register(createLinksRoute)
  app.register(deleteLinksRoute)
  app.register(incrementAccessLinksRoute)
  app.register(listLinksRoute)
  app.register(getOriginalUrlRoute)
  app.register(exportLinksRoute)
}
