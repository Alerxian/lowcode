import { AlignHorizontalSpaceAround, AlignVerticalSpaceAround } from 'lucide-react'
import React from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { SizeNumberInput } from '../SizeNumberInput'

type GapSizeValue = number | 'auto'

interface GapSizeInputProps {
  value?: GapSizeValue
  onChange: (value: GapSizeValue) => void
}

export const GapSizeInput: React.FC<GapSizeInputProps> = ({ value, onChange }) => {
  const { control } = useFormContext()
  const [direction] = useWatch({
    control,
    name: ['props.layout.flexDirection'],
  })
  const isRow = direction === 'row'

  return (
    <div className="flex w-[180px]">
      <SizeNumberInput
        prefix={
          isRow ? <AlignHorizontalSpaceAround size={16} /> : <AlignVerticalSpaceAround size={16} />
        }
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
