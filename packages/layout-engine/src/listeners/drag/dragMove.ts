import { overlay } from './dragStart'

export const dragMove = (event: Interact.InteractEvent) => {
  if (!overlay.current) return

  const deltaX = event.clientX - event.x0
  const deltaY = event.clientY - event.y0
  overlay.current.style.transform = `translate(${deltaX}px,${deltaY}px)`
}
