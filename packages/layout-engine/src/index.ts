import interact from 'interactjs'

import { dragEnd } from './listeners/drag/dragEnd'
import { dragMove, InsertPayload } from './listeners/drag/dragMove'
import { dragStart } from './listeners/drag/dragStart'
import { dragEnter } from './listeners/drop/dragEnter'
import { dragLeave } from './listeners/drop/dragLeave'
import { drop } from './listeners/drop/drop'

/**
 * 布局引擎参数
 */
export interface LayoutEngineOptions {
  onInsert: (dragId: string, payload: InsertPayload) => void
  onDrop: (dragId: string, payload: DropCallback) => void
  // onResize?: (nodeId: string, size: ResizePayload) => void
}

export interface DropCallback {
  parentId: string
}

export const init = ({ onInsert, onDrop }: LayoutEngineOptions) => {
  interact('[data-node]').draggable({
    autoScroll: {
      container: document.querySelector('.page-content') as HTMLElement,
      enabled: true,
    },
    listeners: {
      start: dragStart,
      move: dragMove,
      end: () => dragEnd(onInsert),
    },
  })

  interact('.container-placeholder').dropzone({
    accept: '[data-node]',
    listeners: {
      drop: event => drop(event, onDrop),
      dragenter: dragEnter,
      dragleave: dragLeave,
    },
  })
}
