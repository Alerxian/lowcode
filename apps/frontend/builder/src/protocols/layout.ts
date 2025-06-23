/**
 * block 不含单位尺寸
 */

import type React from 'react'

export type RectSize = number | 'auto' | 'full'

/**
 * block 尺寸单位
 */
export type RectSizeUnit = 'px' | '%'

/**
 * block 尺寸
 */
export interface SizeProtocol {
  width: RectSize
  height: RectSize
  widthUnit?: RectSizeUnit
  heightUnit?: RectSizeUnit
}

/**
 * block 布局
 */
export interface LayoutProtocol {
  flexDirection?: 'row' | 'column'
  justifyContent?: React.CSSProperties['justifyContent']
  alignItems?: React.CSSProperties['alignItems']
  isDistributedAlignment?: boolean
  gap?: number
  padding?: [number, number, number, number]
}

/**
 * block 样式
 */
export interface StyleProtocol {
  backgroundColor?: string
  border?: string
  borderRadius?: string
  boxShadow?: string
  opacity?: number
}
