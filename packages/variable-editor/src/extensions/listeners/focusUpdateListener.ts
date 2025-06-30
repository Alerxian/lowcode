import { EditorView } from '@codemirror/view'

import { ChangeUpdateListenerParams } from '../../types/listener'

export const focusUpdateListener = (params: ChangeUpdateListenerParams) => {
  const { onFocus, onBlur } = params
  return EditorView.updateListener.of(update => {
    if (update.focusChanged) {
      if (update.view.hasFocus) {
        onFocus?.()
      } else {
        const value = update.state.doc.toString()
        onBlur?.(value)
      }
    }
  })
}
