import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeDeleteLinkUseCase } from '@/use-cases/factories/make-delete-link-use-case'

export const deleteLinksRoute: FastifyPluginAsyncZod = async (app) => {
  app.delete(
    '/links/:linkId',
    {
      schema: {
        summary: 'Delete link',
        tags: ['links'],
        operationId: 'deleteLink',
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
        const deleteLinkUseCase = makeDeleteLinkUseCase()

        await deleteLinkUseCase.execute(linkId)

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
