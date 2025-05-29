import { SpinnerIcon } from '@phosphor-icons/react'

export function LoadingLinks() {
  return (
    <div className="flex flex-col items-center gap-3 pt-4 pb-6 px-0 [&>svg]:text-gray-400 border-gray-200 border-t">
      <SpinnerIcon className="animate-spin" size={32} />

      <p className="text-gray-500 text-xs font-normal leading-[14px] uppercase">
        Carregando links...
      </p>
    </div>
  )
}
