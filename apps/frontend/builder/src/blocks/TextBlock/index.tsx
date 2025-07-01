import { cn } from '@lowcode/shadcn/lib/utils'
import { intercept } from '@lowcode/variable-editor'

import { useVariableTree } from '@/hooks/useVariableTree'
import { TextBlockProtocol } from '@/protocols/block'

export interface TextBlockProps {
  data?: TextBlockProtocol
}

export function TextBlock(props: TextBlockProps) {
  const { data } = props

  const variableTree = useVariableTree()

  const { result, error } = intercept(data?.props.text ?? '', variableTree)

  return <div className={cn(error && 'outline outline-destructive')}>{result}</div>
}
