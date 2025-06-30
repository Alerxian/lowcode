// function runUserCode(code: string) {
//   const finalCode = `with(this){
//     return (function(){
//       return (${code})
//     }).call(this)
//   }`

//   return new Function(finalCode)
// }

// const blacklistSet = new Set([
//   'window',
//   'document',
//   'global',
//   'globalThis',
//   'self',
//   'parent',
//   'top',
//   'frames',
//   'fetch',
//   'xmlHttpRequest',
//   'MutationObserver',
// ])
// const globalVarNames = new Set<PropertyKey>(['window', 'global', 'self', 'globalThis'])

// const createBlackHole = () => {
//   return new Proxy(
//     function () {
//       return createBlackHole()
//     },
//     {
//       get(_, prop) {
//         if (prop === 'toString') {
//           return function () {
//             return ''
//           }
//         }
//         if (prop === Symbol.toPrimitive) {
//           return function () {
//             return ''
//           }
//         }

//         return createBlackHole()
//       },
//     },
//   )
// }
