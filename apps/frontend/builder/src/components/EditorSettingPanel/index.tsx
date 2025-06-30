import { createVariableEditor } from '@lowcode/variable-editor'
import { useEffect, useRef } from 'react'

const EditorSettingPanel = () => {
  const editorRef = useRef<unknown>(null)
  const editorContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (editorRef.current) return
    if (editorContainerRef.current) {
      editorRef.current = createVariableEditor(editorContainerRef.current)
    }
  }, [])
  return (
    <div className="w-[300px] overflow-x-hidden border-l">
      <div ref={editorContainerRef} className="w-full"></div>
    </div>
  )
}

export { EditorSettingPanel }
