export const init = () => {
  let isDragging = false
  let dragId: string = ''
  let currentOverlay: HTMLDivElement | null = null

  let start: { x: number; y: number; left: number; top: number } | null = null
  const mouseDownHandler = (e: MouseEvent) => {
    if (e.button !== 0) return
    e.stopPropagation()

    document.body.style.cursor = 'grabbing'
    document.body.style.userSelect = 'none' // 禁用文本选中
    isDragging = true
    const node = e.target as HTMLDivElement
    if (!node) return
    dragId = node.getAttribute('data-node')!

    const nodeRect = node.getBoundingClientRect()
    start = {
      x: e.clientX,
      y: e.clientY,
      left: nodeRect.left,
      top: nodeRect.top,
    }

    const cloneNode = node.cloneNode(true) as HTMLDivElement
    cloneNode.removeAttribute('data-node') // 移除data-node标识，防止重复标识
    cloneNode.style.pointerEvents = 'none' // 禁用事件
    cloneNode.style.position = 'absolute'
    cloneNode.style.left = `${start.x + 8}px`
    cloneNode.style.top = `${start.y + 12}px`
    cloneNode.style.width = `${100}px`
    cloneNode.style.height = `${64}px`

    document.body.appendChild(cloneNode)
    currentOverlay = cloneNode
    console.log(dragId)
  }

  const mouseMoveHandler = (e: MouseEvent) => {
    if (!isDragging || !currentOverlay) return
    const delta = {
      x: e.clientX - start!.x,
      y: e.clientY - start!.y,
    }
    currentOverlay.style.transform = `translate(${delta.x}px, ${delta.y}px)`
  }

  const mouseUpHandler = () => {}

  // document.body.addEventListener('mousedown', mouseDownHandler)
  const nodes = document.querySelectorAll('[data-node]')
  nodes.forEach(node => {
    ;(node as HTMLDivElement).addEventListener('mousedown', mouseDownHandler, false)
  })
  document.body.addEventListener('mousemove', mouseMoveHandler)
  document.body.addEventListener('mouseup', mouseUpHandler)
}
