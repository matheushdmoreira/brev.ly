import { WarningIcon } from '@phosphor-icons/react'
import type { ComponentProps } from 'react'

interface InputProps extends ComponentProps<'input'> {
  title: string
  prefix?: string
  error?: string
}

export function Input({ title, error, prefix, id, ...props }: InputProps) {
  return (
    <div data-error={!!error} className="group flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-gray-500 text-xs font-normal uppercase group-data-[error=true]:text-danger group-data-[error=true]:font-bold group-focus-within:text-blue-base group-focus-within:font-bold"
      >
        {title}
      </label>

      <div className="flex items-center h-12 border border-gray-300 rounded-lg px-4 group-focus-within:border-blue-base group-data-[error=true]:border-danger">
        {!!prefix && <div className="text-md text-gray-400">{prefix}</div>}

        <input
          id={id}
          className="w-full text-gray-600 text-md font-normal h-12 placeholder-gray-400 outline-0"
          {...props}
        />
      </div>

      {!!error && (
        <div className="flex items-center gap-2">
          <WarningIcon className="text-danger" />

          <span className="text-gray-500 text-sm">{error}</span>
        </div>
      )}
    </div>
  )
}
