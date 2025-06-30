import { autocompletion } from '@codemirror/autocomplete'
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands'
import { javascript } from '@codemirror/lang-javascript'
import {
  bracketMatching,
  HighlightStyle,
  indentOnInput,
  syntaxHighlighting,
} from '@codemirror/language'
import { Compartment, EditorState } from '@codemirror/state'
import { EditorView, highlightActiveLine, keymap } from '@codemirror/view'
import { tags } from '@lezer/highlight'

const theme = EditorView.theme({
  '&': { fontSize: '16px', backgroundColor: '#fafafa' },
  '.cm-content': { padding: '10px' },
})
const language = new Compartment()
const customStyle = HighlightStyle.define([
  {
    tag: tags.keyword,
    color: 'blue',
  },
  {
    tag: tags.string,
    color: 'green',
  },
  {
    tag: tags.variableName,
    color: 'orange',
  },
  {
    tag: tags.number,
    color: '#b6ceaa',
  },
])

export const variableEditorState = EditorState.create({
  doc: 'const a = 1;\nconst b = 2;\nconst c = 3;',
  extensions: [
    theme,
    history(),
    keymap.of([...defaultKeymap, ...historyKeymap]),
    indentOnInput(),
    autocompletion(),
    bracketMatching(),
    language.of(javascript()),
    highlightActiveLine(),
    syntaxHighlighting(customStyle),
  ],
})

export const createVariableEditor = (node: Element) => {
  return new EditorView({
    state: variableEditorState,
    parent: node,
  })
}
