import { cn } from '@lowcode/shadcn/lib/utils'
import { intercept } from '@lowcode/variable-editor'

import { useVariableTree } from '@/hooks/useVariableTree'
import { type ButtonBlockProtocol } from '@/protocols/block'

export interface ButtonBlockProps {
  data?: ButtonBlockProtocol
}

export function ButtonBlock(props: ButtonBlockProps) {
  const { data } = props

  const variableTree = useVariableTree()

  const { result, error } = intercept(data?.props.text ?? '', variableTree)

  return (
    <button
      className={cn(
        'px-2 py-1 text-sm rounded-md bg-primary text-primary-foreground',
        error && 'outline outline-destructive',
      )}
    >
      {result}
    </button>
  )
}
