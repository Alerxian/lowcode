import { indicator } from '@/core/createIndicator'
import { clearAreas } from '@/core/generateAreas'
import { LayoutEngineOptions } from '@/index'

import { insertPayload } from './dragMove'
import { dragItem, overlay } from './dragStart'

export const dragEnd = (onInsert: LayoutEngineOptions['onInsert']) => {
  // 清除检测区域
  indicator?.remove()
  clearAreas()

  if (insertPayload.current) {
    onInsert(dragItem.dragId, insertPayload.current)
  }

  overlay.current?.remove()
  overlay.current = null
  document.body.style.cursor = ''
  dragItem.dragId = ''
  insertPayload.current = null
}
