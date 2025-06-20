import { Button } from '@lowcode/shadcn/components/ui/button'

import type { ButtonBlockProtocol } from '@/protocols/block'

interface ButtonBlockProps {
  data: ButtonBlockProtocol
}

export function ButtonBlock(props: ButtonBlockProps) {
  const { data } = props

  return <Button>{data.props.text}</Button>
}
