import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { makeGetAllLinksUseCase } from '@/use-cases/factories/make-get-all-links-use-case'

export const listLinksRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/links',
    {
      schema: {
        summary: 'List all links',
        tags: ['links'],
        operationId: 'listAllLinks',
        response: {
          200: z.object({
            links: z.array(
              z.object({
                id: z.string().uuid(),
                originalUrl: z.string().url(),
                shortUrl: z.string(),
                accessCount: z.number(),
                createdAt: z.date(),
              }),
            ),
          }),
        },
      },
    },
    async (_request, reply) => {
      const useCase = makeGetAllLinksUseCase()

      const { links } = await useCase.execute()

      return reply.status(200).send({
        links,
      })
    },
  )
}
