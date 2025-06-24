import { dragItem, overlay } from './dragStart'

export const dragEnd = () => {
  // 清除检测区域

  overlay.current?.remove()
  document.body.style.cursor = ''
  // document.body.style.userSelect = ''
  dragItem.dragId = ''
  overlay.current = null
}
