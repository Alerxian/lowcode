import { EditorState } from '@codemirror/state'
import { EditorView } from '@codemirror/view'

export const singleLineConfigure = (single: boolean) =>
  single
    ? EditorState.transactionFilter.of(tr => (tr.newDoc.lines > 1 ? [] : [tr]))
    : EditorView.lineWrapping
