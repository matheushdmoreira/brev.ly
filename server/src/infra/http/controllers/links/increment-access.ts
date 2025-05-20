import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeIncrementAccessLinkUseCase } from '@/use-cases/factories/make-increment-access-link-use-case'

export const incrementAccessLinksRoute: FastifyPluginAsyncZod = async (app) => {
  app.patch(
    '/links/:linkId/increment',
    {
      schema: {
        summary: 'Increment access link',
        tags: ['links'],
        operationId: 'incrementAccessLink',
        params: z.object({
          linkId: z.string().uuid(),
        }),
        response: {
          204: z.null(),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { linkId } = request.params

      try {
        const incrementAccessLinkUseCase = makeIncrementAccessLinkUseCase()

        await incrementAccessLinkUseCase.execute(linkId)

        return reply.status(204).send()
      } catch (err) {
        if (err instanceof ResourceNotFoundError) {
          return reply.status(404).send({ message: err.message })
        }

        throw err
      }
    },
  )
}
