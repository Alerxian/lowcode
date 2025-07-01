import JsonView from '@uiw/react-json-view'

import { useVariableTree } from '@/hooks/useVariableTree'

export function VariablesPanel() {
  const variableTree = useVariableTree()

  return (
    <div className="w-full h-full py-2">
      <div className="px-4 py-2 mb-1 text-sm font-semibold">变量系统</div>
      <div className="w-full h-[calc(100%-36px)] px-4 overflow-auto">
        <JsonView value={variableTree} enableClipboard={false} displayObjectSize={false} />
      </div>
    </div>
  )
}
