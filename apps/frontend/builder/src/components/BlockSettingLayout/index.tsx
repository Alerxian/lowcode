import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@lowcode/shadcn/components/ui/accordion'
import { Controller, useFormContext } from 'react-hook-form'

import { AlignmentSetting } from './AlignmentSetting'
import { GapSizeInput } from './GapSizeInput'
import { PaddingSetting } from './PaddingSetting'

export function BlockSettingLayout() {
  const { control } = useFormContext()
  return (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1" className="px-4 border-none">
        <AccordionTrigger>布局</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2">
          <div className="flex flex-row justify-between">
            <div className="w-[60px]">对齐</div>
            <AlignmentSetting />
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="w-[60px]">间距</div>
            <Controller
              control={control}
              name="props.layout.gap"
              render={({ field }) => <GapSizeInput value={field.value} onChange={field.onChange} />}
            />
          </div>
          <div className="flex flex-row justify-between">
            <div className="w-[60px]">边距</div>
            <PaddingSetting />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
