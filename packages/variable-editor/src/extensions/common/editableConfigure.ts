import { EditorView } from '@codemirror/view'

export const editConfigure = (editable: boolean) => EditorView.editable.of(editable)
