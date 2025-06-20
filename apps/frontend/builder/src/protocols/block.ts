import type { LayoutProtocol, SizeProtocol, StyleProtocol } from './layout'

/** block 类型 */
export const blockTypes = ['button', 'container', 'icon', 'image', 'divider', 'text'] as const

export type BlockType = (typeof blockTypes)[number]

export interface BaseBlockProtocol {
  id: string
  title: string
  type: BlockType
  props: {
    size?: SizeProtocol
    style?: StyleProtocol
  }
}

/**
 * text block 协议
 */
export type TextBlockProtocol = BaseBlockProtocol & {
  type: 'text'
  props: {
    text: string
  }
}

export type ButtonBlockProtocol = BaseBlockProtocol & {
  type: 'button'
  props: {
    text: string
  }
}

export type ContainerBlockProtocol = BaseBlockProtocol & {
  type: 'container'
  props: {
    layout: LayoutProtocol
  }
}

export type IconBlockProtocol = BaseBlockProtocol & {
  type: 'icon'
  props: {
    icon: string
  }
}

export type ImageBlockProtocol = BaseBlockProtocol & {
  type: 'image'
  props: {
    src: string
  }
}

export type DividerBlockProtocol = BaseBlockProtocol & {
  type: 'divider'
}

export type BlockProtocol =
  | TextBlockProtocol
  | ButtonBlockProtocol
  | ContainerBlockProtocol
  | IconBlockProtocol
  | ImageBlockProtocol
  | DividerBlockProtocol
