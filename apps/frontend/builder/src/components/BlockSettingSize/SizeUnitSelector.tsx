import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@lowcode/shadcn/components/ui/dropdown-menu'

interface SizeUnitSelectorProps {
  options: { label: string; value: string }[]
  value: string
  children?: React.ReactNode
  onChange: (value: string) => void
}

export function SizeUnitSelector(props: SizeUnitSelectorProps) {
  const { value, options, children, onChange } = props
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        side="bottom"
        align="end"
        sideOffset={10}
        alignOffset={-10}
      >
        <DropdownMenuRadioGroup value={value}>
          {options.map(option => (
            <DropdownMenuRadioItem
              key={option.value}
              value={option.value}
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
