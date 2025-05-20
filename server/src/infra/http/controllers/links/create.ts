import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { LinkAlreadyExistsError } from '@/use-cases/errors/link-already-exists-error'
import { makeCreateLinkUseCase } from '@/use-cases/factories/make-create-link-use-case'

export const createLinksRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/links',
    {
      schema: {
        summary: 'Create link',
        tags: ['links'],
        operationId: 'createLink',
        body: z.object({
          originalUrl: z.string().url(),
          shortUrl: z
            .string()
            .min(3)
            .max(20)
            .regex(
              /^[a-z0-9]+$/,
              'Invalid short URL, must contain only lowercase letters and numbers, no spaces or special characters',
            ),
        }),
        response: {
          201: z.object({
            link: z.object({
              id: z.string().uuid(),
            }),
          }),
          409: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { originalUrl, shortUrl } = request.body

      try {
        const createLinkUseCase = makeCreateLinkUseCase()

        const { link } = await createLinkUseCase.execute({
          originalUrl,
          shortUrl,
        })

        const newLink = {
          id: link.id,
        }

        return reply.status(201).send({ link: newLink })
      } catch (err) {
        if (err instanceof LinkAlreadyExistsError) {
          return reply.status(409).send({ message: err.message })
        }

        throw err
      }
    },
  )
}
