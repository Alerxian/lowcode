import { init } from '@lowcode/layout-engine'
import { Sun } from 'lucide-react'
import { useLayoutEffect } from 'react'

import { ContainerProvider } from '@/context/useContainer'
import { BlockType } from '@/protocols/block'
import { type BlockTreeNode, useBlockStore } from '@/stores/useBlockStore'

import { BlockRender } from './BlockRender'

const EditorCanvas = () => {
  const blockTree = useBlockStore(state => state.blockTree)
  const insertBlock = useBlockStore(state => state.insertBlock)
  const moveBlock = useBlockStore(state => state.moveBlock)

  useLayoutEffect(() => {
    init({
      onInsert(dragId, payload) {
        const [dragType = '', type = ''] = dragId.split('-')
        console.log(type, dragType, payload)
        if (dragType === 'insert') {
          insertBlock({
            type: type as BlockType,
            parentId: payload.parentId,
            relativeBlockId: payload.nodeId,
            position: payload.position,
          })
          return
        }
        moveBlock({
          dragId: dragId,
          parentId: payload.parentId,
          relativeBlockId: payload.nodeId,
          position: payload.position,
        })
      },
      onDrop(dragId, insertPayload) {
        if (!insertPayload) {
          return
        }
        const [dragType = '', type = ''] = dragId.split('-')
        if (dragType === 'insert') {
          insertBlock({
            type: type as BlockType,
            parentId: insertPayload.parentId,
          })
          return
        }
        moveBlock({
          dragId: dragId,
          parentId: insertPayload.parentId,
        })
      },
    })
  }, [])

  const renderLayout = (blockTree: BlockTreeNode[]) => {
    return (
      <ContainerProvider containerId="root">
        {blockTree.map((node, index) => (
          <BlockRender key={node.id} node={node} index={index} />
        ))}
      </ContainerProvider>
    )
  }

  return (
    <div className="flex-1 bg-zinc-100">
      <div
        className="editor-canvas-simulator-outer relative h-[calc(100%-16px)] mx-[3%] my-2 rounded-xl bg-white overflow-hidden"
        style={{
          boxShadow:
            'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(62, 65, 86, 0.376) 0px 0px 1px 0px, rgba(62, 65, 86, 0.15) 0px 12px 24px 0px, rgba(62, 65, 86, 0.1) 0px 20px 40px 0px',
        }}
      >
        <div className="editor-canvas-simulator">
          <div className="flex flex-row items-center gap-2 h-10 px-4 bg-zinc-100">
            <div className="size-3 rounded-full bg-red-500"></div>
            <div className="size-3 rounded-full bg-yellow-500"></div>
            <div className="size-3 rounded-full bg-green-500"></div>
          </div>
        </div>
        <div className="page-content w-full h-full overflow-y-auto">
          <div className="flex flex-col w-full h-full page-content-inner max-w-[1024px] m-auto">
            {renderLayout(blockTree)}
          </div>
        </div>
        <div className="flex items-center absolute bottom-4 right-4 px-2 py-1 text-xs rounded-md bg-primary text-primary-foreground">
          <Sun size={16} className="mr-1 animate-spin" />
        </div>
      </div>
    </div>
  )
}

export { EditorCanvas }
