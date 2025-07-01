import { useBlockStore } from '@/stores/useBlockStore'

import { BlocksSettings } from './BlocksSettings'
import { PageSettings } from './PageSettings'

export function EditorSettingPanel() {
  const activeBlock = useBlockStore(state => state.activeBlock)

  let content = null
  if (activeBlock) {
    content = <BlocksSettings />
  } else {
    content = <PageSettings />
  }

  return <div className="w-[300px] overflow-x-hidden border-l">{content}</div>
}
