import { EditorState } from '@codemirror/state'

export const readonlyConfigure = (readonly: boolean) => EditorState.readOnly.of(readonly)
