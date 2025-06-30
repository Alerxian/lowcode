/**
 * 编辑器内容更新监听器参数
 */
export interface ChangeUpdateListenerParams {
  onChange?: (value: string) => void
}

/**
 * 编辑器焦点更新监听器参数
 */
export interface ChangeUpdateListenerParams {
  onFocus?: () => void
  onBlur?: (value: string) => void
}
