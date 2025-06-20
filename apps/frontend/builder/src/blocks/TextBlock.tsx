import type { TextBlockProtocol } from '@/protocols/block'

interface TextBlockProps {
  data: TextBlockProtocol
}

export function TextBlock(props: TextBlockProps) {
  const { data } = props
  return <div className="text-block">{data.id}</div>
}
