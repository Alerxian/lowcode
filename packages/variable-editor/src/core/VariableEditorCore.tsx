import '../style.css'

import {
  acceptCompletion,
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  closeCompletion,
  moveCompletionSelection,
} from '@codemirror/autocomplete'
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands'
import { javascript } from '@codemirror/lang-javascript'
import {
  bracketMatching,
  defaultHighlightStyle,
  indentOnInput,
  syntaxHighlighting,
} from '@codemirror/language'
import { Compartment, EditorState, Extension, Prec } from '@codemirror/state'
import { dropCursor, EditorView, hoverTooltip, keymap, tooltips } from '@codemirror/view'
import { FC, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { editConfigure } from '../extensions/common/editableConfigure'
import { placeholderConfigure } from '../extensions/common/placeholderConfigure'
import { readonlyConfigure } from '../extensions/common/readonlyConfigure'
import { generatorDynamicCompletion } from '../extensions/completions/dynamicCompletion'
// import { singleLineConfigure } from '../extensions/common/singleLineConfigure'
import { staticCompletion } from '../extensions/completions/staticCompletion'
import { customHighlightPlugin } from '../extensions/highlight/dynamicHighlight'
import { forbidRegExpLinter } from '../extensions/linters/forbid-regexp-linter'
import { changeUpdateListener } from '../extensions/listeners/changeUpdateListener'
import { focusUpdateListener } from '../extensions/listeners/focusUpdateListener'
import { customTheme } from '../themes/custom'
import { VariableEditorCoreProps } from '../types/editor'
import { intercept } from './VariableInterceptor'

// const language = new Compartment()
const tabSize = new Compartment()

const basicExtensions: Extension = [
  history(),
  dropCursor(),
  indentOnInput(),
  bracketMatching(),
  closeBrackets(),
  keymap.of([...defaultKeymap, ...historyKeymap, ...closeBracketsKeymap]),
]
const keyMapExtensions = Prec.highest(
  keymap.of([
    { key: 'Escape', run: closeCompletion },
    { key: 'ArrowDown', run: moveCompletionSelection(true) },
    { key: 'ArrowUp', run: moveCompletionSelection(false) },
    { key: 'PageDown', run: moveCompletionSelection(true, 'page') },
    { key: 'PageUp', run: moveCompletionSelection(false, 'page') },
    { key: 'Tab', run: acceptCompletion },
    { key: 'Enter', run: acceptCompletion },
  ]),
)

const wordHover = hoverTooltip((view, pos, side) => {
  const { from, to, text } = view.state.doc.lineAt(pos)
  let start = pos,
    end = pos
  while (start > from && /\w/.test(text[start - from - 1])) start--
  while (end < to && /\w/.test(text[end - from])) end++
  if ((start == pos && side < 0) || (end == pos && side > 0)) return null
  return {
    pos: start,
    end,
    above: true,
    create() {
      const dom = document.createElement('div')
      dom.textContent = text.slice(start - from, end - from)
      return { dom }
    },
  }
})

export const VariableEditor: FC<VariableEditorCoreProps> = props => {
  const {
    className,
    value = '',
    dataTree,
    onChange,
    onFocus,
    onBlur,
    editable = true,
    placeholder,
    readOnly = false,
  } = props

  const editorWrapperRef = useRef<HTMLDivElement>(null)
  const codeMirrorEditorViewRef = useRef<EditorView | null>(null)

  const [focused, setFocused] = useState(false)
  const [evalRes, setEvalRes] = useState<string | null>(null)
  const [evalError, setEvalError] = useState<string | null>(null)
  const [snippet, setSnippet] = useState(
    value ?? `Hello，{{user.info.name}}，{{user.info.age f * 2}}`,
  )
  const latestValue = useRef(value)

  const tooltipExtension = useMemo(() => {
    return tooltips({
      position: 'absolute',
      parent: document.querySelector<HTMLElement>('.cm-editor') || document.body,
    })
  }, [])

  useEffect(() => {
    if (latestValue.current !== value) {
      latestValue.current = value
      setSnippet(value)
    }
    return () => {
      latestValue.current = ''
    }
  }, [value])

  useEffect(() => {
    if (!snippet || !dataTree) return
    const { result, error } = intercept(snippet, dataTree)
    setEvalRes(result)
    setEvalError(error)
  }, [dataTree, snippet])

  useEffect(() => {
    if (focused || value === codeMirrorEditorViewRef.current?.state.doc.toString()) return
    if (!editorWrapperRef.current) return

    const state = EditorState.create({
      doc: snippet,
      extensions: [
        basicExtensions,
        tooltipExtension,
        readonlyConfigure(readOnly),
        editConfigure(editable),
        placeholderConfigure(placeholder),
        // singleLineConfigure(false),
        customTheme,
        tabSize.of(EditorState.tabSize.of(2)),
        javascript(),
        // language.of(javascript()),
        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
        // 自定义高亮
        customHighlightPlugin,

        keyMapExtensions,
        wordHover,

        // lineNumbers(),
        autocompletion({
          override: [staticCompletion, generatorDynamicCompletion(Object.keys(dataTree || {}))],
        }),
        forbidRegExpLinter,

        focusUpdateListener({
          onFocus: () => {
            setFocused(true)
            onFocus?.()
          },
          onBlur: value => {
            setFocused(false)
            onBlur?.(value)
          },
        }),
        changeUpdateListener({
          onChange: value => {
            onChange?.(value)
            setSnippet(value)
          },
        }),
      ],
    })
    if (codeMirrorEditorViewRef.current) {
      codeMirrorEditorViewRef.current.setState(state)
    } else {
      codeMirrorEditorViewRef.current = new EditorView({
        state,
        parent: editorWrapperRef.current,
      })
    }
  }, [
    dataTree,
    editable,
    focused,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    readOnly,
    snippet,
    tooltipExtension,
    value,
  ])

  const styles = useMemo(() => {
    const wrapper = editorWrapperRef.current
    if (!wrapper) return {}
    const { top, left, width, height } = wrapper.getBoundingClientRect()
    const commonStyle: React.CSSProperties = {
      position: 'absolute',
      minWidth: width,
      width: width + 2,
      top: top + height + 1,
      left: left - 1,
      zIndex: 100,
      borderRadius: 8,
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0,
      fontSize: 13,
      padding: 8,
    }
    if (evalError) {
      return {
        ...commonStyle,
        borderColor: 'red',
        color: 'red',
        backgroundColor: 'rgb(252,237,232)',
      }
    }
    return {
      ...commonStyle,
      borderColor: focused ? 'rgb(229, 230, 235)' : '',
      color: 'rgb(11, 182, 69)',
      backgroundColor: 'rgb(232, 255, 236)',
    }
  }, [evalError, focused])

  const resultContent = evalError ? (
    <div style={styles}>
      {evalError && (
        <div>
          <p style={{ fontWeight: 'bold', marginBottom: 4 }}>错误：</p>
          <p>{evalError}</p>
        </div>
      )}
    </div>
  ) : (
    <div style={styles}>
      <div>
        <p style={{ fontWeight: 'bold', marginBottom: 4 }}>结果：String</p>
        <p>{evalRes || '-'}</p>
      </div>
    </div>
  )

  return (
    <div
      className={className}
      style={{
        border: '1px solid',
        borderColor: focused ? (evalError ? 'rgb(229,82,67)' : 'rgb(11, 182, 69)') : '#E4E4E7',
        borderRadius: 4,
        borderBottomLeftRadius: focused ? 0 : 4,
        borderBottomRightRadius: focused ? 0 : 4,
      }}
    >
      <div ref={editorWrapperRef}></div>
      {focused && createPortal(resultContent, document.body)}
    </div>
  )
}
