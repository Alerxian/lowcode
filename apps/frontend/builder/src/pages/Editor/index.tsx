import { useEffect } from 'react'

import { EditorCanvas } from '@/components/EditorCanvas'
import { EditorLeftPanel } from '@/components/EditorLeftPanel'
import { EditorNavigator } from '@/components/EditorNavigator'
import { EditorSettingPanel } from '@/components/EditorSettingPanel'
import type { BlockProtocol } from '@/protocols/block'
import { type BlockTreeNode, useBlockStore } from '@/stores/useBlockStore'

const blockTree: BlockTreeNode[] = [
  // {
  //   id: 'root',
  //   type: 'container',
  //   children: [],
  // },
]
const blocks: Record<string, BlockProtocol> = {
  // root: {
  //   id: 'root',
  //   title: 'page-container',
  //   type: 'container',
  //   props: {
  //     size: {
  //       width: 100,
  //       height: 100,
  //       widthUnit: '%',
  //       heightUnit: '%',
  //     },
  //     style: {
  //       backgroundColor: '#fff',
  //     },
  //     layout: {},
  //   },
  // },
}
const EditorPage = () => {
  const initBlocks = useBlockStore(state => state.initBlocks)
  const initBlockTree = useBlockStore(state => state.initBlockTree)

  useEffect(() => {
    initBlockTree(blockTree)
    initBlocks(blocks)
  }, [])

  return (
    <div className="h-screen">
      <EditorNavigator />
      <div className="flex h-full">
        <EditorLeftPanel />
        <EditorCanvas />
        <EditorSettingPanel />
      </div>
    </div>
  )
}

export default EditorPage
