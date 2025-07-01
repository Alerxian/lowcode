import { Separator } from '@lowcode/shadcn/components/ui/separator'

import { BlockSettingSize } from '@/components/BlockSettingSize'

import { Content } from './Content'

export function IconSetting() {
  return (
    <>
      <Content />
      <Separator className="my-1" />
      <BlockSettingSize />
    </>
  )
}
