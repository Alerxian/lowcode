import { create } from 'zustand'

import { generateDefaultBlockData } from '@/constants/defaultBlockData'
import type { BlockProtocol, BlockType } from '@/protocols/block'

export type BlockTreeNode = Pick<BlockProtocol, 'id' | 'type'> & { children?: BlockTreeNode[] }

interface BlockStore {
  blockTree: BlockTreeNode[]
  blocks: Record<string, BlockProtocol>
  activeBlock: BlockProtocol | null
  initBlockTree: (blockTree: BlockTreeNode[]) => void
  initBlocks: (blocks: Record<string, BlockProtocol>) => void
  clearBlocks: () => void
  updateBlock: (block: BlockProtocol) => void
  removeBlock: (blockId: string) => void
  insertBlock: (payload: {
    type: BlockType
    parentId: string
    relativeBlockId?: string
    position?: 'left' | 'right' | 'top' | 'bottom'
  }) => void
  moveBlock: (payload: {
    dragId: string
    parentId: string
    relativeBlockId?: string
    position?: 'left' | 'right' | 'top' | 'bottom'
  }) => void
  setActiveBlock: (blockId: string) => void
  clearActiveBlock: () => void
}

const findNode = (blockTree: BlockTreeNode[], id: string) => {
  let parentId = ''
  let node: BlockTreeNode | undefined

  const rec = (bt: BlockTreeNode[], id: string, pid?: string) => {
    for (const b of bt) {
      if (b.id === id) {
        node = b
        parentId = pid ?? ''
        return
      }
      if (b.children) {
        rec(b.children, id, b.id)
      }
    }
  }

  rec(blockTree, id)
  return { node, parentId }
}

export const useBlockStore = create<BlockStore>((set, get) => ({
  blockTree: [],
  blocks: {},
  activeBlock: null,
  setActiveBlock: blockId => set(() => ({ activeBlock: get().blocks[blockId] })),
  clearActiveBlock: () => set(() => ({ activeBlock: null })),
  initBlockTree: blockTree => set(() => ({ blockTree })),
  initBlocks: blocks => set(() => ({ blocks })),
  clearBlocks: () => set(() => ({ blocks: {} })),
  updateBlock: block =>
    set(state => ({
      blocks: {
        ...state.blocks,
        [block.id]: block,
      },
    })),
  removeBlock: blockId =>
    set(state => {
      const newBlocks = { ...state.blocks }
      delete newBlocks[blockId]
      return { blocks: newBlocks }
    }),
  insertBlock: payload => {
    const { type, parentId, relativeBlockId, position } = payload
    // 默认blocks数据
    const block = generateDefaultBlockData(type)
    set(state => {
      const newBlocks = { ...state.blocks, [block.id]: block }
      return { blocks: newBlocks }
    })
    set(state => {
      const newBlockTree = [...state.blockTree]
      const { node: parentContainer } = findNode(newBlockTree, parentId)
      if (!parentContainer) {
        return state
      }
      const children = parentContainer.children || []
      if (!relativeBlockId) {
        parentContainer.children = [...children, block]
      } else {
        let relativeIndex = children.findIndex(node => node.id === relativeBlockId)
        if (position === 'bottom' || position === 'right') {
          relativeIndex += 1
        }
        parentContainer.children?.splice(relativeIndex, 0, block)
      }
      return { blockTree: newBlockTree }
    })
  },
  moveBlock: payload => {
    const { dragId, parentId, relativeBlockId, position } = payload
    set(state => {
      const newBlockTree = [...state.blockTree]
      const { node: toParentContainer } = findNode(newBlockTree, parentId)
      if (!toParentContainer) {
        return state
      }
      const { node: block, parentId: fromParentId } = findNode(newBlockTree, dragId)
      const { node: fromParentContainer } = findNode(newBlockTree, fromParentId)
      if (!block) {
        return state
      }

      if (fromParentContainer === undefined) {
        // 顶层
        const dragIndex = newBlockTree.findIndex(node => node.id === dragId)
        newBlockTree.splice(dragIndex, 1)
      } else {
        const fromChildren = fromParentContainer?.children || []
        const dragIndex = fromChildren.findIndex(node => node.id === dragId)
        fromChildren.splice(dragIndex, 1)
      }

      const toChildren = toParentContainer.children || []
      // 删除原来的block
      if (!relativeBlockId) {
        toChildren.push(block)
      } else {
        let toDropIndex = toChildren.findIndex(node => node.id === relativeBlockId)
        if (position === 'bottom' || position === 'right') {
          toDropIndex += 1
        }
        toChildren.splice(toDropIndex, 0, block)
      }

      return { blockTree: newBlockTree }
    })
  },
}))
