export interface VariableEditorCoreProps {
  className?: string
  value?: string
  dataTree?: Record<string, unknown>
  onChange?: (value: string) => void
  onFocus?: () => void
  onBlur?: (value: string) => void
  editable?: boolean
  placeholder?: string
  readOnly?: boolean
}
