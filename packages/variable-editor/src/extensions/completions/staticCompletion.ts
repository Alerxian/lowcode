import { CompletionContext } from '@codemirror/autocomplete'

export const staticCompletion = (context: CompletionContext) => {
  // const word = context.matchBefore(/\w*/) // 匹配输入的当前单词
  const word = context.matchBefore(/{\{\s*\w*/) // 匹配输入的当前单词
  if (word === null || (word && word.from === word.to)) return null // 如果没有输入，返回空
  // console.log(word, 'static word')
  return {
    from: word ? word.to : context.pos,
    validFor: /^\w*$/,
    options: [
      { label: 'function', type: 'keyword', detail: 'Keyword' },
      { label: 'const', type: 'keyword', detail: 'Keyword' },
      { label: 'let', type: 'keyword', detail: 'Keyword' },
      { label: 'var', type: 'keyword', detail: 'Keyword' },
    ],
  }
}
