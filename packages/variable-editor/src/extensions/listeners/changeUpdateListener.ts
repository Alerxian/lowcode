import { EditorView } from '@codemirror/view'

import { ChangeUpdateListenerParams } from '../../types/listener'

export const changeUpdateListener = (params: ChangeUpdateListenerParams) => {
  return EditorView.updateListener.of(update => {
    if (update.docChanged) {
      const value = update.state.doc.toString()
      params.onChange?.(value)
    }
  })
}
