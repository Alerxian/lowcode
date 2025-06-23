import { ImageBlockProtocol } from '@/protocols/block'

export interface ImageBlockProps {
  data?: ImageBlockProtocol
}

export function ImageBlock(props: ImageBlockProps) {
  const { data } = props
  return (
    <div>
      <img draggable={false} src={data?.props.src} alt={data?.title} />
    </div>
  )
}
