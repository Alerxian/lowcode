import type { ImageBlockProtocol } from '@/protocols/block'

interface ImageBlockProps {
  data: ImageBlockProtocol
}

export function ImageBlock(props: ImageBlockProps) {
  const { data } = props

  return (
    <div className="image-block" draggable="false">
      <img src={data.props.src} alt={data.title} />
    </div>
  )
}
