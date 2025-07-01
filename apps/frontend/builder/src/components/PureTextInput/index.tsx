import { cn } from '@lowcode/shadcn/lib/utils'
import React, { forwardRef, useEffect, useState } from 'react'

export type SizeValue = number | 'auto'

interface PureTextInputProps {
  className?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  value?: SizeValue
  onChange: (value: SizeValue) => void
}

export const PureTextInput: React.FC<PureTextInputProps> = forwardRef<
  HTMLInputElement,
  PureTextInputProps
>(({ className, prefix, suffix, value, onChange }, ref) => {
  const [v, setV] = useState(value)

  useEffect(() => {
    setV(value)
  }, [value])

  return (
    <div
      className={cn(
        className,
        'flex flex-row items-center h-8 rounded-md overflow-hidden bg-zinc-100',
      )}
    >
      {prefix && <div className="ml-2 text-zinc-500">{prefix}</div>}
      <input
        ref={ref}
        className={cn(
          'w-full mx-1 bg-transparent outline-none',
          !prefix && 'ml-2',
          !suffix && 'mr-2',
        )}
        value={v}
        onChange={ev => setV(ev.target.value as SizeValue)}
        onBlur={ev => onChange(ev.target.value as SizeValue)}
      />
      {suffix && <div className="mr-2 text-zinc-500">{suffix}</div>}
    </div>
  )
})
