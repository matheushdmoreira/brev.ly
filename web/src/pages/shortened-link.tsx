import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router'

import {
  getLinkByShortenedUrl,
  type GetLinkByShortenedUrlResponse,
} from '../api/get-link-by-shortened-url'
import { incrementAccess } from '../api/increment-access'
import { NotFound } from './404'

export function ShortenedLink() {
  const params = useParams()
  const shortenedUrl = params['url-encurtada']

  const { data: responseGetLink, isLoading: isLoadingLink } =
    useQuery<GetLinkByShortenedUrlResponse>({
      queryKey: ['shortenedUrl', shortenedUrl],
      queryFn: () =>
        getLinkByShortenedUrl({
          shortenedUrl: String(shortenedUrl),
        }),
    })

  const { mutateAsync: incrementAccessFn } = useMutation({
    mutationFn: incrementAccess,
  })

  useEffect(() => {
    async function handleRedirect() {
      if (responseGetLink?.link.id && responseGetLink.link.originalUrl) {
        try {
          await incrementAccessFn({ linkId: responseGetLink.link.id })
          window.location.href = responseGetLink.link.originalUrl
        } catch (error) {
          console.error('Erro ao incrementar acesso:', error)
        }
      }
    }

    handleRedirect()
  }, [responseGetLink, incrementAccessFn])

  if (isLoadingLink) {
    return
  }

  if (!responseGetLink) {
    return <NotFound />
  }

  return (
    <div className="flex h-screen items-center justify-center p-5">
      <div className="flex flex-col gap-6 items-center justify-center bg-gray-100 px-12 py-16 rounded-xl">
        <img src="/favicon.svg" className="w-[48px]" alt="Not Found" />

        <h1 className="text-xl text-gray-600 font-bold">Redirecionando...</h1>

        <p className="text-center font-semibold max-w-[488px] text-md text-gray-500">
          O link será aberto automaticamente em alguns instantes. Não foi
          redirecionado?{' '}
          <Link to="/" className="text-blue-base hover:text-blue-dark">
            Acesse aqui
          </Link>
        </p>
      </div>
    </div>
  )
}
