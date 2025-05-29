import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const buttonVariants = tv({
  base: 'text-sm font-semibold py-0 cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed',

  variants: {
    variant: {
      primary:
        'h-12 px-5 rounded-lg bg-blue-base text-white enabled:hover:bg-blue-dark',
      secondary:
        'flex items-center gap-2 h-8 px-2 rounded-md bg-gray-200 text-gray-500 border border-gray-200 enabled:hover:border-blue-base',
    },
  },

  defaultVariants: {
    variant: 'primary',
  },
})

export function Button({
  variant,
  className,
  ...props
}: ComponentProps<'button'> & VariantProps<typeof buttonVariants>) {
  return (
    <button className={buttonVariants({ variant, className })} {...props} />
  )
}
