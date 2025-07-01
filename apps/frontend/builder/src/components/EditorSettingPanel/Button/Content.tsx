import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@lowcode/shadcn/components/ui/accordion'
import { VariableEditor } from '@lowcode/variable-editor'
import { Controller, useFormContext } from 'react-hook-form'

import { useVariableTree } from '@/hooks/useVariableTree'

export function Content() {
  const { control } = useFormContext()

  const variableTree = useVariableTree()

  return (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1" className="px-4 border-none">
        <AccordionTrigger>内容</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2">
          <div className="flex flex-row justify-between items-center">
            <div className="w-[60px] flex-shrink-0">文本</div>
            {/* <Controller control={control} name="props.text" render={({ field }) => <PureTextInput {...field} />} /> */}
            <Controller
              control={control}
              name="props.text"
              render={({ field }) => (
                <VariableEditor
                  className="flex-1"
                  value={field.value}
                  onBlur={field.onChange}
                  dataTree={variableTree}
                />
              )}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
