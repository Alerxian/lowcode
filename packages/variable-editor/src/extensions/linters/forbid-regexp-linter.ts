import { syntaxTree } from '@codemirror/language'
import { Diagnostic, linter } from '@codemirror/lint'

export const forbidRegExpLinter = linter(view => {
  const diagnostics: Diagnostic[] = []
  syntaxTree(view.state)
    .cursor()
    .iterate(node => {
      if (node.name == 'RegExp')
        diagnostics.push({
          from: node.from,
          to: node.to,
          severity: 'error',
          message: 'Regular expressions are FORBIDDEN',
          actions: [
            {
              name: 'Remove',
              apply(view, from, to) {
                view.dispatch({ changes: { from, to } })
              },
            },
          ],
        })
    })
  return diagnostics
})
