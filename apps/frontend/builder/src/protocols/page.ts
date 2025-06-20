import type { BlockProtocol } from './block'
import type { LayoutProtocol } from './layout'

export type PageProtocol = {
  id: string
  title: string
  type: 'page'
  props: {
    children: LayoutProtocol
  }
  children: BlockProtocol[]
}
