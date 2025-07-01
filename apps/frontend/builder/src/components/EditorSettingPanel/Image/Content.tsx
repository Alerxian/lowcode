import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@lowcode/shadcn/components/ui/accordion'
import { Controller, useFormContext } from 'react-hook-form'

import { PureTextInput } from '@/components/PureTextInput'

export function Content() {
  const { control } = useFormContext()
  return (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1" className="px-4 border-none">
        <AccordionTrigger>内容</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2">
          <div className="flex flex-row justify-between items-center">
            <div className="w-[60px]">链接</div>
            <Controller
              control={control}
              name="props.src"
              render={({ field }) => <PureTextInput {...field} />}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
