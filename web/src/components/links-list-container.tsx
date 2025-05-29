import { DownloadSimpleIcon, SpinnerIcon } from '@phosphor-icons/react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import { exportLinksToCSV } from '../api/export-links-to-csv'
import { getLinks, type GetLinksResponse } from '../api/get-links'
import { downloadUrl } from '../utils/download-url'
import { EmptyLinks } from './empty-links'
import { LinksItem } from './links-item'
import { LoadingLinks } from './loading-links'
import { Button } from './ui/button'

export function LinksListContainer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)

  const {
    data: result,
    isLoading: isLoadingLinks,
    isFetching: isFetchingLinks,
  } = useQuery<GetLinksResponse>({
    queryKey: ['links'],
    queryFn: () => getLinks(),
  })

  const {
    mutateAsync: exportLinksToCSVFn,
    isPending: isPendingExportLinksToCSV,
  } = useMutation({
    mutationFn: exportLinksToCSV,
  })

  async function handleExportLinksToCSV() {
    try {
      const response = await exportLinksToCSVFn()

      downloadUrl(response.url)
    } catch {
      toast.error('Erro no exportar', {
        description: 'Falha ao exportar, tente novamente mais tarde.',
      })
    }
  }

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth)
    }

    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-[580px] bg-gray-100 p-8 pr-4 max-md:p-6 max-md:pr-2 rounded-lg max-md:w-full overflow-hidden"
    >
      {isFetchingLinks && containerWidth > 0 && (
        <AnimatePresence>
          <motion.div
            className="absolute top-0 left-0 h-[2px] bg-blue-base"
            style={{ width: '150px' }} // Ajuste a largura conforme o estilo desejado
            initial={{ x: -150 }}
            animate={{ x: containerWidth }}
            exit={{ opacity: 0 }}
            transition={{
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeIn',
              duration: 2,
            }}
          />
        </AnimatePresence>
      )}

      <div className="flex justify-between items-center pb-5 pr-4 max-sm:gap-4 max-sm:items-start">
        <div className="text-gray-600 text-lg font-bold leading-6">
          Meus links
        </div>

        <Button
          variant="secondary"
          onClick={() => handleExportLinksToCSV()}
          disabled={
            !result?.links ||
            result.links.length <= 0 ||
            isPendingExportLinksToCSV
          }
        >
          {isPendingExportLinksToCSV ? (
            <SpinnerIcon className="animate-spin" size={16} />
          ) : (
            <DownloadSimpleIcon size={16} />
          )}
          Baixar CSV
        </Button>
      </div>

      {isLoadingLinks ? (
        <LoadingLinks />
      ) : result?.links && result.links.length > 0 ? (
        <ScrollArea.Root type="scroll" className="overflow-hidden">
          <ScrollArea.Viewport className="flex flex-col gap-2 max-h-[calc(100vh-355px)] max-md:max-h-[350px] mr-4">
            {result.links.map((link) => (
              <LinksItem key={link.id} link={link} />
            ))}
          </ScrollArea.Viewport>

          <ScrollArea.Scrollbar
            className="flex touch-none select-none bg-gray-100 p-0.5 transition-colors duration-[160ms] ease-out data-[orientation=horizontal]:h-4 data-[orientation=vertical]:w-4 data-[orientation=horizontal]:flex-col"
            orientation="vertical"
          >
            <ScrollArea.Thumb className="relative flex-1 bg-blue-base before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-11 before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      ) : (
        <EmptyLinks />
      )}
    </div>
  )
}
