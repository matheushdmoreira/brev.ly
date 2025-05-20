import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { makeExportLinksToCsvUseCase } from '@/use-cases/factories/make-export-links-to-csv-use-case'

export const exportLinksRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/links/export',
    {
      schema: {
        summary: 'Export links as CSV',
        tags: ['links'],
        operationId: 'exportLinksCsv',
        response: {
          200: z.object({
            url: z.string().url(),
          }),
        },
      },
    },
    async (_request, reply) => {
      const useCase = makeExportLinksToCsvUseCase()

      const { url } = await useCase.execute()

      return reply.status(200).send({ url })
    },
  )
}
