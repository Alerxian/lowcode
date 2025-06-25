/**
 * 指针位置
 */
export interface Pointer {
  x: number
  y: number
}

/**
 * 矩形区域
 */
export interface Rect {
  left: number
  top: number
  width: number
  height: number
}
/**
 * 插入位置
 */
export const INSERT_POSITIONS = ['left', 'right', 'top', 'bottom'] as const

/**
 * 插入位置类型
 */
export type InsertPositions = (typeof INSERT_POSITIONS)[number]

/**
 * 区域类型
 * id: 区域唯一标识
 * containerId: 容器唯一标识
 * position: 插入位置
 * width: 宽度
 * height: 高度
 * left: 左坐标
 * top: 上坐标
 */
export type AreaType = {
  id: string
  containerId: string
  position: InsertPositions
  width: number
  height: number
  left: number
  // right: number;
  top: number
  // bottom: number;
  subAreas?: AreaType[]
}

/**
 * 插入参数
 */
export interface InsertPayload {
  nodeId: string
  parentId: string
  position?: InsertPositions
}

/**
 * 拖拽内容放置到容器空白区参数
 */
export interface DropPayload {
  parentId: string
}

/**
 * block 调整大小参数
 */
export interface ResizePayload {
  width: number
  height: number
}

/**
 * 布局引擎参数
 */
export interface LayoutEngineOptions {
  onInsert: (dragId: string, payload: InsertPayload) => void
  onDrop: (dragId: string, payload: DropPayload) => void
  onResize?: (nodeId: string, size: ResizePayload) => void
}
