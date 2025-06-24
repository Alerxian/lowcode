import { init } from '@lowcode/layout-engine'
import { useEffect, useLayoutEffect } from 'react'

import { EditorCanvas } from '@/components/EditorCanvas'
import { EditorLeftPanel } from '@/components/EditorLeftPanel'
import { EditorNavigator } from '@/components/EditorNavigator'
import { EditorSettingPanel } from '@/components/EditorSettingPanel'
import type { BlockProtocol } from '@/protocols/block'
import { type BlockTreeNode, useBlockStore } from '@/stores/useBlockStore'

const blockTree: BlockTreeNode[] = [
  {
    id: 'container-xfg1ge',
    type: 'container',
    children: [
      {
        id: 'text-xfg1ge',
        type: 'text',
      },
      {
        id: 'icon-gaw1ge',
        type: 'icon',
      },
      {
        id: 'button-xfg1ge',
        type: 'button',
      },
      {
        id: 'container-f4ag1fa',
        type: 'container',
        children: [
          {
            id: 'text-f1ag1fa',
            type: 'text',
          },
          {
            id: 'button-g1ag1fa',
            type: 'button',
          },
        ],
      },
    ],
  },
  {
    id: 'text-fga1ge',
    type: 'text',
  },
  {
    id: 'container-gaw1ge',
    type: 'container',
    children: [
      {
        id: 'text-gaw1ge',
        type: 'text',
      },
      {
        id: 'image-gaw1ge',
        type: 'image',
      },
      {
        id: 'divider-gaw1ge',
        type: 'divider',
      },
      {
        id: 'button-gaw1ge',
        type: 'button',
      },
    ],
  },
  {
    id: 'container-xag1fa',
    type: 'container',
    children: [
      {
        id: 'text-xag1fa',
        type: 'text',
      },
    ],
  },
]

const blocks: Record<string, BlockProtocol> = {
  'container-xfg1ge': {
    id: 'container-xfg1ge',
    title: 'container1',
    type: 'container',
    props: {
      layout: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      size: {
        width: 100,
        widthUnit: '%',
        height: 500,
        heightUnit: 'px',
      },
    },
  },
  'text-xfg1ge': {
    id: 'text-xfg1ge',
    title: 'text1',
    type: 'text',
    props: {
      text: '会当凌绝顶，一览众山小',
      size: {
        width: 200,
        widthUnit: 'px',
        height: 100,
        heightUnit: '%',
      },
    },
  },
  'icon-gaw1ge': {
    id: 'icon-gaw1ge',
    title: 'icon1',
    type: 'icon',
    props: {
      icon: '🚀',
      size: {
        width: 'auto',
        height: 'auto',
      },
    },
  },
  'button-xfg1ge': {
    id: 'button-xfg1ge',
    title: 'button1',
    type: 'button',
    props: {
      text: '点击我',
      size: {
        width: 'auto',
        height: 'auto',
      },
    },
  },
  'text-fga1ge': {
    id: 'text-fga1ge',
    title: 'text2',
    type: 'text',
    props: {
      text: '非常棒的，非常 Nice',
      size: {
        width: 100,
        widthUnit: '%',
        height: 100,
        heightUnit: '%',
      },
    },
  },
  'container-gaw1ge': {
    id: 'container-gaw1ge',
    title: 'container2',
    type: 'container',
    props: {
      layout: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      size: {
        width: 500,
        widthUnit: 'px',
        height: 300,
        heightUnit: 'px',
      },
    },
  },
  'text-gaw1ge': {
    id: 'text-gaw1ge',
    title: 'text3',
    type: 'text',
    props: {
      text: 'Hello, World!',
      size: {
        width: 100,
        widthUnit: 'px',
        height: 100,
        heightUnit: 'px',
      },
    },
  },
  'image-gaw1ge': {
    id: 'image-gaw1ge',
    title: 'image1',
    type: 'image',
    props: {
      src: 'https://docs.pmnd.rs/_next/static/media/zustand-icon.3261dd51.svg',
      size: {
        width: 150,
        widthUnit: 'px',
        height: 150,
        heightUnit: 'px',
      },
    },
  },
  'divider-gaw1ge': {
    id: 'divider-gaw1ge',
    title: 'divider1',
    type: 'divider',
    props: {
      size: {
        width: 100,
        widthUnit: '%',
        height: 1,
        heightUnit: 'px',
      },
    },
  },
  'button-gaw1ge': {
    id: 'button-gaw1ge',
    title: 'button2',
    type: 'button',
    props: {
      text: '点击我',
      size: {
        width: 'auto',
        height: 'auto',
      },
    },
  },
  'container-xag1fa': {
    id: 'container-xag1fa',
    title: 'container3',
    type: 'container',
    props: {
      layout: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      size: {
        width: 100,
        widthUnit: '%',
        height: 500,
        heightUnit: 'px',
      },
    },
  },
  'text-xag1fa': {
    id: 'text-xag1fa',
    title: 'text4',
    type: 'text',
    props: {
      text: '文本',
      size: {
        width: 200,
        widthUnit: 'px',
        height: 100,
        heightUnit: '%',
      },
    },
  },
  'container-f4ag1fa': {
    id: 'container-f4ag1fa',
    title: 'container4',
    type: 'container',
    props: {
      layout: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      size: {
        width: 100,
        widthUnit: '%',
        height: 500,
        heightUnit: 'px',
      },
    },
  },
  'text-f1ag1fa': {
    id: 'text-f1ag1fa',
    title: 'text5',
    type: 'text',
    props: {
      text: '文本',
      size: {
        width: 200,
        widthUnit: 'px',
        height: 100,
        heightUnit: '%',
      },
    },
  },
  'button-g1ag1fa': {
    id: 'button-g1ag1fa',
    title: 'button3',
    type: 'button',
    props: {
      text: '按钮',
      size: {
        width: 'auto',
        height: 'auto',
      },
    },
  },
}
const EditorPage = () => {
  const initBlocks = useBlockStore(state => state.initBlocks)
  const initBlockTree = useBlockStore(state => state.initBlockTree)

  useEffect(() => {
    initBlockTree(blockTree)
    initBlocks(blocks)
  }, [])
  useLayoutEffect(() => {
    init()
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
