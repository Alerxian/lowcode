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
  moveBlock: (payload: {
    type: BlockType
    parentId: string
    relativeBlockId?: string
    position: 'left' | 'right' | 'top' | 'bottom'
  }) => void
  insertBlock: (payload: {
    type: BlockType
    parentId: string
    relativeBlockId?: string
    position: 'left' | 'right' | 'top' | 'bottom'
  }) => void
  setActiveBlock: (blockId: string) => void
  clearActiveBlock: () => void
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
    const { type } = payload
    const block = generateDefaultBlockData(type)
    // 默认blocks数据
    set(state => {
      const newBlocks = { ...state.blocks, [block.id]: block }
      return { blocks: newBlocks }
    })
    // set(state => {})
  },
  moveBlock: () => {},
}))
