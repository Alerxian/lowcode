export const dragEnter = (event: Interact.InteractEvent) => {
  const target = event.target as HTMLElement
  target.classList.add('shadow-inner')
  target.classList.add('bg-zinc-100')
}
