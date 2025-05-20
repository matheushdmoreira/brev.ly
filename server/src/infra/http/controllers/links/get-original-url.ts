import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetOriginalUrlUseCase } from '@/use-cases/factories/make-get-original-url-use-case'

export const getOriginalUrlRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/links/:shortUrl',
    {
      schema: {
        summary: 'Get original URL by short URL',
        tags: ['links'],
        operationId: 'getOriginalUrl',
        params: z.object({
          shortUrl: z.string(),
        }),
        response: {
          200: z.object({
            originalUrl: z.string().url(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { shortUrl } = request.params

      try {
        const getOriginalUrlUseCase = makeGetOriginalUrlUseCase()

        const { link } = await getOriginalUrlUseCase.execute(shortUrl)

        return reply.status(200).send({ originalUrl: link.originalUrl })
      } catch (err) {
        if (err instanceof ResourceNotFoundError) {
          return reply.status(404).send({ message: err.message })
        }

        throw err
      }
    },
  )
}
