export const dragLeave = (event: Interact.InteractEvent) => {
  const target = event.target as HTMLElement
  target.classList.remove('shadow-inner')
  target.classList.remove('bg-zinc-100')
}
