import { TextBlockProtocol } from '@/protocols/block'

export interface TextBlockProps {
  data?: TextBlockProtocol
}

export function TextBlock(props: TextBlockProps) {
  const { data } = props

  return <div>{data?.id}</div>
}
