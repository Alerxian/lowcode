import { createIndicator, indicator } from '@/core/createIndicator'
import { InsertPositions, nodeAreas } from '@/core/generateAreas'

import { overlay, startOfOffset } from './dragStart'

export interface InsertPayload {
  nodeId: string
  parentId: string
  position?: InsertPositions
}
export const insertPayload: {
  current: InsertPayload | null
} = {
  current: null,
}

export const dragMove = (event: Interact.InteractEvent) => {
  if (!overlay.current) return

  const deltaX = event.clientX - event.x0
  const deltaY = event.clientY - event.y0
  overlay.current.style.transform = `translate(${deltaX}px,${deltaY}px)`

  // 获取最外层容器偏移量
  const pageContent = document.querySelector('.page-content')!
  const scrollTop = pageContent.scrollTop - startOfOffset.y

  // 碰撞检测 即检测是否有节点拖放到容器area上
  const hovered = nodeAreas.find(node => {
    const { left, top, width, height } = node
    return (
      event.clientX >= left &&
      event.clientX <= left + width &&
      event.clientY >= top - scrollTop &&
      event.clientY <= top - scrollTop + height
    )
  })

  if (hovered) {
    insertPayload.current = {
      nodeId: hovered.id,
      parentId: hovered.containerId,
      position: hovered.position,
    }
    createIndicator(hovered, scrollTop)
  } else {
    insertPayload.current = null
    indicator?.remove()
  }
}
