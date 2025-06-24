// export { AREA_SIZE } from '@/constants'
import interact from 'interactjs'

// import { dragEnd } from './listeners/drag/dragEnd'
import { dragMove } from './listeners/drag/dragMove'
import { dragStart } from './listeners/drag/dragStart'

// const position = { x: 0, y: 0 }

export const init = () => {
  interact('[data-node]').draggable({
    listeners: {
      start: dragStart,
      move: dragMove,
      // end: dragEnd,
    },
  })
}
