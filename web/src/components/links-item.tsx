import { CopySimpleIcon, TrashIcon } from '@phosphor-icons/react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { deleteLink } from '../api/delete-link'
import type { Link } from '../api/get-links'
import { env } from '../env'
import { queryClient } from '../lib/react-query'
import { Button } from './ui/button'

type LinksItemProps = {
  link: Link
}

export function LinksItem({ link }: LinksItemProps) {
  const { mutateAsync: deleteLinkFn } = useMutation({
    mutationFn: deleteLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] })
    },
  })

  async function handleDeleteLink(link: Link) {
    const confirmationOfDelete = confirm(
      `Você realmente quer apagar o link ${link.shortUrl}?`,
    )

    if (!confirmationOfDelete) {
      return
    }

    try {
      await deleteLinkFn({ linkId: link.id })
    } catch {
      toast.error('Erro ao deletar', {
        description: 'Falha ao deletar, tente novamente mais tarde.',
      })
    }
  }

  async function handleCopyLink(link: Link) {
    await navigator.clipboard.writeText(
      `${env.VITE_FRONTEND_URL}/${link.shortUrl}`,
    )

    toast.info('Link copiado com sucesso', {
      description: `O link ${link.shortUrl} foi copiado para a área de transferência.`,
    })
  }

  return (
    <div className="py-4 border-t border-gray-200">
      <div className="flex items-center gap-5">
        <div className="flex flex-1 flex-col gap-1">
          <a
            href={`${env.VITE_FRONTEND_URL}/${link.shortUrl}`}
            target="_blank"
            className="text-md font-semibold text-blue-base hover:text-blue-dark"
            rel="noreferrer"
          >
            brev.ly/{link.shortUrl}
          </a>

          <p className="text-sm text-gray-500">{link.originalUrl}</p>
        </div>

        <div className="text-sm text-gray-500">{link.accessCount} acessos</div>

        <div className="flex items-center gap-1">
          <Button variant="secondary" onClick={() => handleCopyLink(link)}>
            <CopySimpleIcon size={12} />
          </Button>

          <Button variant="secondary" onClick={() => handleDeleteLink(link)}>
            <TrashIcon size={12} />
          </Button>
        </div>
      </div>
    </div>
  )
}
