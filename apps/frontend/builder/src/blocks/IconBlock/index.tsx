import { IconBlockProtocol } from '@/protocols/block'

export interface IconBlockProps {
  data?: IconBlockProtocol
}

export function IconBlock(props: IconBlockProps) {
  const { data } = props
  return <div>{data?.props.icon}</div>
}
