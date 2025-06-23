import { cn } from '@lowcode/shadcn/lib/utils'

import { type ButtonBlockProtocol } from '@/protocols/block'

export interface ButtonBlockProps {
  data?: ButtonBlockProtocol
}

export function ButtonBlock(props: ButtonBlockProps) {
  const { data } = props

  return (
    <button className={cn('px-2 py-1 text-sm rounded-md bg-primary text-primary-foreground')}>
      button {data?.id}
    </button>
  )
}
