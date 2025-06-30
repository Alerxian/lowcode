import { CompletionContext } from '@codemirror/autocomplete'

export const dynamicCompletion = (context: CompletionContext) => {
  const dynamicOptions = fetchDynamicOptions() // 从外部获取补全数据
  // const word = context.matchBefore(/\w*/)
  const word = context.matchBefore(/.*\{\{\s*/) // 匹配输入的当前单词
  if (word === null || (word && word.from === word.to)) return null // 如果没有输入，返回空
  console.log(word, 'word')
  return {
    // from: word ? word.from : context.pos,
    from: word ? word.from : context.pos,
    // validFor: /^\w*$/,
    options: dynamicOptions.map(item => ({ label: item, type: 'keyword' })),
  }
}

const options: string[] = []
for (let i = 0; i < 10; i++) {
  options.push('newOption' + i++)
}

function fetchDynamicOptions() {
  // 示例：从服务器获取关键词
  return options
}
