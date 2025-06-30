/**
 * example {{ 1 + 1 }}  ->['1 + 1']
 * @param snippet
 * @returns
 */
export const getSnippetString = (snippet: string) => {
  return snippet.match(/{{(.*?)}}/g)
}
