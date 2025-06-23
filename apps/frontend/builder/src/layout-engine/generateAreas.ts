export const generateAreas = () => {
  const nodes = document.querySelectorAll('[data-node]')
  const nodesMap = new Map()
  nodes.forEach(node => {
    const dom = node as HTMLDivElement
    const id = dom.getAttribute('data-node')
    if (id) {
      nodesMap.set(id, dom)
    }
  })

  const queue = [...nodes]

  while (queue.length) {
    const node = queue.shift()
    const dom = node as HTMLDivElement
    const id = dom.getAttribute('data-node')
    const container = dom.getAttribute('data-container')
    const parent = nodesMap.get(container)

    if (!id || !parent || !container) continue
  }
}
