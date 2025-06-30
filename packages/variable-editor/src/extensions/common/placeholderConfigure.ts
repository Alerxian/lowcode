import { placeholder as placeholderExtension } from '@codemirror/view'

export const placeholderConfigure = (placeholder?: string) =>
  placeholder ? placeholderExtension(placeholder) : []
