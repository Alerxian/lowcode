import { Separator } from '@lowcode/shadcn/components/ui/separator'

import { BlockSettingLayout } from '@/components/BlockSettingLayout'
import { BlockSettingSize } from '@/components/BlockSettingSize'

export function ContainerSetting() {
  return (
    <>
      <BlockSettingLayout />
      <Separator className="my-1" />
      <BlockSettingSize />
    </>
  )
}
