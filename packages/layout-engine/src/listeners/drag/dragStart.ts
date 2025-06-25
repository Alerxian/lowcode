import { generateAreas } from '@/core/generateAreas'

export const startOfOffset = {
  x: 0,
  y: 0,
}

export const dragItem = {
  dragId: '',
}
interface Overlay {
  current: HTMLDivElement | null
}
export const overlay: Overlay = {
  current: null,
}

export const dragStart = (event: Interact.InteractEvent) => {
  // 设置拖拽基本样式
  document.body.style.cursor = 'grabbing'
  document.body.style.userSelect = 'none'

  const pageContent = document.querySelector('.page-content')!
  const scrollTop = pageContent.scrollTop
  startOfOffset.y = scrollTop

  const ele = event.target as HTMLDivElement
  dragItem.dragId = ele.getAttribute('data-node')!

  // 创建碰撞区域
  generateAreas()

  // 设置拖拽元素样式
  const overlayDom = document.createElement('div')
  overlayDom.style.pointerEvents = 'none'
  overlayDom.innerHTML = `
    <p>${dragItem.dragId}</p>
    <p class="text-gray-500 mt-2">${ele.textContent}</p>
  `
  overlayDom.className = 'absolute shadow border border-black/10 rounded-md bg-white p-4'
  overlayDom.style.left = `${event.x0 + 8}px`
  overlayDom.style.top = `${event.y0 + 12}px`
  // overlayDom.style.position = 'absolute'
  // overlayDom.style.backgroundColor = 'white'
  // overlayDom.style.padding = '6px'
  // overlayDom.style.borderRadius = '5px'
  // overlayDom.style.border = '1px solid rgba(0,0,0,0.1)'
  document.body.appendChild(overlayDom)

  overlay.current = overlayDom
}
