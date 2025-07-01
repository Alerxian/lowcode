import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@lowcode/shadcn/components/ui/accordion'
import { Controller, useFormContext } from 'react-hook-form'

import { SizeNumberInput } from '../SizeNumberInput'
import { SizeUnitSelector } from './SizeUnitSelector'

export function BlockSettingSize() {
  const { control } = useFormContext()
  return (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1" className="px-4 border-none">
        <AccordionTrigger>尺寸</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2">
          <div className="flex flex-row justify-between items-center">
            <div className="w-[60px]">宽度</div>
            <Controller
              control={control}
              name="props.size.width"
              render={({ field }) => (
                <SizeNumberInput
                  className="w-[180px]"
                  prefix="w"
                  suffix={
                    (field.value !== 'auto' || field.value !== 'full') && (
                      <Controller
                        control={control}
                        name="props.size.widthUnit"
                        render={({ field: innerField }) => (
                          <SizeUnitSelector
                            options={[
                              { label: 'px', value: 'px' },
                              { label: '%', value: '%' },
                            ]}
                            value={innerField.value}
                            onChange={innerField.onChange}
                          >
                            <span className="text-sm font-light">{innerField.value}</span>
                          </SizeUnitSelector>
                        )}
                      />
                    )
                  }
                  {...field}
                />
              )}
            />
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="w-[60px]">高度</div>
            <Controller
              control={control}
              name="props.size.height"
              render={({ field }) => (
                <SizeNumberInput
                  className="w-[180px]"
                  prefix="h"
                  suffix={
                    (field.value !== 'auto' || field.value !== 'full') && (
                      <Controller
                        control={control}
                        name="props.size.heightUnit"
                        render={({ field: innerField }) => (
                          <SizeUnitSelector
                            options={[
                              { label: 'px', value: 'px' },
                              { label: '%', value: '%' },
                            ]}
                            value={innerField.value}
                            onChange={innerField.onChange}
                          >
                            <span className="text-sm font-light">{innerField.value}</span>
                          </SizeUnitSelector>
                        )}
                      />
                    )
                  }
                  {...field}
                />
              )}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
