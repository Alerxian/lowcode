import { LayoutEngineOptions } from '@/index'

import { dragItem } from '../drag/dragStart'

export const drop = (
  event: Interact.InteractEvent,
  dropCallback: LayoutEngineOptions['onDrop'],
) => {
  const target = event.target as HTMLElement
  target.classList.remove('shadow-inner')
  target.classList.remove('bg-zinc-100')

  const containerId = target.getAttribute('data-container')
  console.log('containerId', containerId, target)
  if (!containerId) return

  dropCallback(dragItem.dragId, { parentId: containerId })
}
