import { useBlockStore } from '@/stores/useBlockStore'

export const useVariableTree = () => {
  const blocks = useBlockStore(state => state.blocks)

  // 一些 MOCK 信息，例如用户信息
  const currentUser = {
    name: 'test',
    age: 18,
  }

  const currentAppInfo = {
    name: 'LowCode',
    version: '1.0.0',
  }

  const titleBasedBlocks = new Map()

  Object.entries(blocks).forEach(([, block]) => {
    titleBasedBlocks.set(block.title, JSON.parse(JSON.stringify(block)))
  })

  return { currentUser, currentAppInfo, ...Object.fromEntries(titleBasedBlocks.entries()) }
}
