import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { createLink } from '../api/create-link'
import { queryClient } from '../lib/react-query'
import { Button } from './ui/button'
import { Input } from './ui/input'

const newLinkFormSchema = z.object({
  originalLink: z
    .string({ message: 'Informe uma url válida.' })
    .url({ message: 'Informe uma url válida.' }),
  shortenedLink: z
    .string({
      message: 'Link encurtado é obrigatório.',
    })
    .min(3, {
      message: 'Informe uma url minúscula e sem espaço/caractere especial.',
    })
    .regex(
      /^[a-z0-9-]+$/,
      'Informe uma url minúscula e sem espaço/caractere especial',
    ),
})

type NewLinkFormData = z.infer<typeof newLinkFormSchema>

export function NewLinkContainer() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewLinkFormData>({
    resolver: zodResolver(newLinkFormSchema),
    defaultValues: {
      originalLink: '',
      shortenedLink: '',
    },
  })

  const { mutateAsync: createLinkFn, isPending: isPendingCreateLink } =
    useMutation({
      mutationFn: createLink,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['links'] })
      },
    })

  async function handleNewLink(data: NewLinkFormData) {
    try {
      await createLinkFn({
        originalUrl: data.originalLink,
        shortUrl: data.shortenedLink,
      })

      reset({
        originalLink: '',
        shortenedLink: '',
      })
    } catch (error) {
      if (
        error instanceof AxiosError &&
        error.response?.status === 409 &&
        error.response.data?.message === 'Link already exists.'
      ) {
        return toast.error('Erro no cadastro', {
          description: 'Essa url encurtada já existe.',
        })
      }

      toast.error('Erro no cadastro', {
        description: 'Falha ao cadastrar, tente novamente mais tarde.',
      })
    }
  }

  return (
    <div className="w-[380px] flex flex-col gap-6 max-md:gap-5 bg-gray-100 p-8 h-auto max-md:p-6 rounded-lg max-md:w-full">
      <div className="text-gray-600 text-lg font-bold leading-6">Novo link</div>

      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(handleNewLink)}
      >
        <Controller
          name="originalLink"
          control={control}
          render={({ field }) => (
            <Input
              title="link original"
              id="originalLink"
              placeholder="www.example.com.br"
              error={errors.originalLink?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="shortenedLink"
          control={control}
          render={({ field }) => (
            <Input
              title="link encurtado"
              id="shortenedLink"
              prefix="brev.ly/"
              error={errors.shortenedLink?.message}
              {...field}
            />
          )}
        />

        <Button disabled={isPendingCreateLink}>Salvar link</Button>
      </form>
    </div>
  )
}
