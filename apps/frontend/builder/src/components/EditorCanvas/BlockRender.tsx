import { useMemo } from 'react'

import { ButtonBlock } from '@/blocks/ButtonBlock'
import { ContainerBlock } from '@/blocks/ContainerBlock'
import { DividerBlock } from '@/blocks/DividerBlock'
import { IconBlock } from '@/blocks/IconBlock'
import { ImageBlock } from '@/blocks/ImageBlock'
import { TextBlock } from '@/blocks/TextBlock'
import { ContainerProvider, useContainer } from '@/context/useContainer'
import type { RectSize, RectSizeUnit } from '@/protocols/layout'
import { type BlockTreeNode, useBlockStore } from '@/stores/useBlockStore'

const getWithUnit = (value: RectSize, unit?: RectSizeUnit) => {
  if (unit === 'px' || unit === '%') {
    return `${value}${unit ?? 'px'}`
  }
  if (value === 'auto') {
    return value
  }
  if (value === 'full') {
    return '100%'
  }
  return value
}
const BlockOutline = () => {
  // return (
  //     <div className="absolute pointer-events-none w-[calc(100%+4px)] h-[calc(100%+4px)] rounded-sm top-[-2px] left-[-2px] right-0 bottom-0 border outline outline-purple-300" />
  // )
  return (
    <div className="absolute pointer-events-none w-full h-full top-0 left-0 right-0 bottom-0 outline outline-purple-300" />
  )
}

const BlockRender = ({ node, index }: { node: BlockTreeNode; index: number }) => {
  const data = useBlockStore(state => state.blocks[node.id])
  const setActiveBlock = useBlockStore(state => state.setActiveBlock)
  const activeBlockId = useBlockStore(state => state.activeBlock?.id)
  const { containerId } = useContainer()

  let block: React.ReactNode = null
  switch (data.type) {
    case 'text':
      block = <TextBlock data={data} />
      break
    case 'image':
      block = <ImageBlock data={data} />
      break
    case 'button':
      block = <ButtonBlock data={data} />
      break
    case 'container':
      block = <ContainerBlock data={data} nodes={node.children} />
      break
    case 'icon':
      block = <IconBlock data={data} />
      break
    case 'divider':
      block = <DividerBlock data={data} />
      break
    default:
      break
  }

  const styles = useMemo<React.CSSProperties>(() => {
    const { size } = data.props

    const withUnitWidth = getWithUnit(size?.width ?? 'auto', size?.widthUnit)
    const withUnitHeight = getWithUnit(size?.height ?? 'auto', size?.heightUnit)

    return {
      width: withUnitWidth,
      height: withUnitHeight,
    }
  }, [data])

  if (data.type === 'container') {
    return (
      <ContainerProvider containerId={data.id}>
        <div style={styles} className="relative">
          <div
            className="w-full h-full"
            onClick={e => {
              e.stopPropagation()
              setActiveBlock(node.id)
            }}
            data-node-index={index}
            data-direction={data.props?.layout?.flexDirection}
            data-container={containerId}
            data-node-count={node.children?.length}
          >
            {block}
          </div>
          {activeBlockId === node.id && <BlockOutline />}
        </div>
      </ContainerProvider>
    )
  }

  return (
    <div style={styles} className="relative">
      <div
        className="w-full h-full"
        onClick={e => {
          e.stopPropagation()
          setActiveBlock(node.id)
        }}
        data-node-index={index}
        data-node={node.id}
        data-container={containerId}
      >
        {block}
        {activeBlockId === node.id && <BlockOutline />}
      </div>
    </div>
  )
}

export { BlockRender }
