import { evalScript } from '../codeSandbox'
import { getSnippetString } from '../utilities/getSnippetString'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const intercept = (script: string, dataTree: Record<string, any>) => {
  const snippetScript = getSnippetString(script)
  let evalResult = script
  let evalError = null

  try {
    const results =
      snippetScript?.map(script => {
        const scriptValue = script.replace(/{{|}}/g, '')
        return evalScript(scriptValue, dataTree)
      }) ?? []
    results.forEach((result, i) => {
      evalResult = evalResult.replace(snippetScript?.[i] as string, result)
    })
  } catch (error) {
    if (error instanceof Error) {
      evalError = error.message
    } else {
      evalError = String(error)
    }
  }

  return {
    result: evalResult,
    error: evalError,
  }
}
