import { AreaType } from './generateAreas'

export let indicator: HTMLElement | null = null

export const createIndicator = (hovered: AreaType, scrollTop = 0) => {
  const { left, top, width, height } = hovered

  if (document.querySelector('[data-indicator]')) {
    indicator = document.querySelector('[data-indicator]') as HTMLElement
  } else {
    indicator = document.createElement('div')
    indicator.setAttribute('data-indicator', 'true')
    document.body.appendChild(indicator)
  }

  indicator.style.left = `${left}px`
  indicator.style.top = `${top - scrollTop}px`
  indicator.style.width = `${width}px`
  indicator.style.height = `${height}px`
  indicator.style.position = 'absolute'
  indicator.style.border = '1px solid orange'
}
