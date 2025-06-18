import { EditorCanvas } from '@/components/EditorCanvas'
import { EditorLeftPanel } from '@/components/EditorLeftPanel'
import { EditorNavigator } from '@/components/EditorNavigator'
import { EditorSettingPanel } from '@/components/EditorSettingPanel'

const EditorPage = () => {
  return (
    <div className="h-screen">
      <EditorNavigator />
      <div className="flex h-full">
        <EditorLeftPanel />
        <EditorCanvas />
        <EditorSettingPanel />
      </div>
    </div>
  )
}

export default EditorPage
