import { Button } from '@lowcode/shadcn/components/ui/button'
import { Home } from 'lucide-react'

const EditorNavigator = () => {
  return (
    <div className="w-full flex justify-between items-center border-b border-gray-100 p-4 shadow">
      <div className="flex">
        <Button variant="ghost" size="icon" className="size-8">
          <Home size={24} />
        </Button>
        <h2 className="ml-2 text-lg font-medium">编辑</h2>
      </div>
      <div>
        <Button size="sm">分享</Button>
      </div>
    </div>
  )
}

export { EditorNavigator }
