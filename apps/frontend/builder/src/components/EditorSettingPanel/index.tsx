import { VariableEditor } from '@lowcode/variable-editor'
import { useState } from 'react'

const EditorSettingPanel = () => {
  const [value, setValue] = useState<string | undefined>(undefined)
  return (
    <div className="w-[300px] overflow-x-hidden border-l h-full">
      <VariableEditor
        // className="h-20"
        // className="h-[300px]"
        value={value}
        onBlur={value => {
          console.log(value)
          setValue(value)
        }}
      />
    </div>
  )
}

export { EditorSettingPanel }
