import { cn } from '@lowcode/shadcn/lib/utils'
import { PlusCircle, TableOfContents, Variable } from 'lucide-react'
import { useState } from 'react'

import { ComponentPanel } from './ComponentPanel'
import { LayerPanel } from './LayerPanel'
import { VariablesPanel } from './VariablesPanel'

const menus = [
  {
    menu: 'components',
    icon: <PlusCircle size={20} />,
  },
  {
    menu: 'layer',
    icon: <TableOfContents size={20} />,
  },
  {
    menu: 'state',
    icon: <Variable size={20} />,
  },
]

const EditorLeftPanel = () => {
  const [activeMenu, setActiveMenu] = useState('components')
  return (
    <div className="h-full flex border-r select-none">
      <div className="h-full w-[50px] py-4 flex flex-col items-center flex-shrink-0 gap-4">
        {menus.map(menu => {
          return (
            <div
              key={menu.menu}
              className={cn(
                'flex items-center justify-center size-9 rounded-md text-zinc-400 hover:text-foreground cursor-pointer',
                {
                  'text-foreground': activeMenu === menu.menu,
                },
              )}
              onClick={() => setActiveMenu(menu.menu)}
            >
              {menu.icon}
            </div>
          )
        })}
      </div>
      <div className="w-[278px] h-full bg-zinc-50 border-l">
        {activeMenu === 'components' && <ComponentPanel />}
        {activeMenu === 'layer' && <LayerPanel />}
        {activeMenu === 'state' && <VariablesPanel />}
      </div>
    </div>
  )
}

export { EditorLeftPanel }
