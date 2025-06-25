import { AREA_OFFSET, AREA_SIZE } from '@/constants'
import { dragItem } from '@/listeners/drag/dragStart'

export const INSERT_POSITIONS = ['left', 'right', 'top', 'bottom'] as const
export type InsertPositions = (typeof INSERT_POSITIONS)[number]

export interface Rect {
  left: number
  right: number
  top: number
  bottom: number
}

export interface AreaType {
  /** 区域唯一标识id */
  id: string
  /** 容器id */
  containerId: string
  position: InsertPositions
  left: number
  top: number
  // right: number
  // bottom: number
  width: number
  height: number
}

export let nodeAreas: AreaType[] = []

export const generateAreas = () => {
  // const nodes = document.querySelectorAll('[data-node]')
  // 拖放容器
  const dropContainer = document.querySelector('.page-content')!
  const nodes = dropContainer.querySelectorAll('[data-node]')

  const nodesMap = new Map<string, HTMLDivElement>()
  nodes.forEach(node => {
    const nodeId = node.getAttribute('data-node')
    if (nodeId) {
      nodesMap.set(nodeId, node as HTMLDivElement)
    }
  })

  // 遍历所有节点，生成区域
  const queue = [...nodes]
  while (queue.length) {
    const node = queue.shift() as HTMLDivElement
    const nodeId = node.getAttribute('data-node')
    const containerId = node.getAttribute('data-container')

    const parentContainer = nodesMap.get(containerId as string)
    const parentContainerId = parentContainer?.getAttribute('data-container')
    const parentContainerDirection = parentContainer?.getAttribute('data-direction')
    if (
      !nodeId ||
      !containerId ||
      !parentContainerId ||
      !parentContainer ||
      nodeId === dragItem.dragId
    ) {
      continue
    }

    const { left, top, right, bottom } = node.getBoundingClientRect()
    const {
      left: pLeft,
      width: pWidth,
      top: pTop,
      height: pHeight,
    } = parentContainer.getBoundingClientRect()
    const isRow = parentContainerDirection === 'row'
    const nodeIndex = node.getAttribute('data-node-index')
    const nodeCount = parentContainer.getAttribute('data-node-count')
    const isLast = nodeIndex && nodeCount && Number(nodeIndex) === Number(nodeCount) - 1

    nodeAreas.push({
      id: nodeId,
      containerId: containerId,
      position: isRow ? 'left' : 'top',
      width: isRow ? AREA_SIZE : pWidth,
      height: isRow ? pHeight : AREA_SIZE,
      left: isRow ? left - AREA_OFFSET : pLeft,
      top: isRow ? pTop : top - AREA_OFFSET,
    })

    // 如果是最后一个元素，需要额外再生成一个区域
    if (isLast) {
      nodeAreas.push({
        id: nodeId,
        containerId: parentContainerId,
        position: isRow ? 'right' : 'bottom',
        width: isRow ? AREA_SIZE : pWidth,
        height: isRow ? pHeight : AREA_SIZE,
        left: isRow ? right - AREA_OFFSET : pLeft,
        top: isRow ? pTop : bottom - AREA_OFFSET,
      })
    }
  }
}

export const clearAreas = () => {
  nodeAreas = []
}
