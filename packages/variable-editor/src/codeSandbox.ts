/* eslint-disable @typescript-eslint/no-explicit-any */
function runUserCode(code: string) {
  const finalCode = `with(this){
    return (function(){
      return (${code})
    }).call(this)
  }`

  return new Function(finalCode)
}

const blacklistSet = new Set([
  'window',
  'document',
  'global',
  'globalThis',
  'self',
  'parent',
  'top',
  'frames',
  'fetch',
  'xmlHttpRequest',
  'MutationObserver',
])
const globalVarNames = new Set<PropertyKey>(['window', 'global', 'self', 'globalThis'])

const createBlackHole = () => {
  return new Proxy(
    function () {
      return createBlackHole()
    },
    {
      get(_, prop) {
        if (prop === 'toString') {
          return function () {
            return ''
          }
        }
        if (prop === Symbol.toPrimitive) {
          return function () {
            return ''
          }
        }

        return createBlackHole()
      },
    },
  )
}

const isDomElement = (obj: any) => {
  return obj instanceof Element || obj instanceof HTMLCollection
}

function getPropertyFromNativeWindow(prop: PropertyKey) {
  const ret = Reflect.get(window, prop)
  if (typeof ret === 'function' && !ret.prototype) {
    return ret.bind(window)
  }

  // 访问dom元素的属性时，返回undefined
  if (isDomElement(ret)) {
    return undefined
  }

  return ret
}

function createMockWindow(base?: object) {
  const win = new Proxy(Object.assign({}, base), {
    has() {
      return true
    },
    get(target, prop) {
      if (prop in target) {
        return Reflect.get(target, prop)
      }
      if (globalVarNames.has(prop)) {
        // 返回代理的window
        return win
      }
      if (typeof prop === 'string' && blacklistSet.has(prop)) {
        return createBlackHole()
      }
      return getPropertyFromNativeWindow(prop)
    },
    set(target, p, newValue) {
      return Reflect.set(target, p, newValue)
    },
  })

  return win
}

function proxySandbox(context: Record<string, unknown>) {
  const mockWindow = createMockWindow()
  const isProtectedProp = (prop: PropertyKey) => {
    return globalVarNames.has(prop) || prop in context
  }

  return new Proxy(mockWindow, {
    has() {
      return true
    },
    get(target, prop, receiver) {
      // 访问不在with语句里的变量时，返回undefined
      if (prop === Symbol.unscopables) {
        return undefined
      }

      if (prop === 'toJSON') {
        return target
      }

      // 访问window对象时，返回mockWindow
      if (globalVarNames.has(prop)) {
        return target
      }

      // 访问受保护的属性
      if (prop in context) {
        const value = Reflect.get(context, prop, receiver)
        if (typeof value === 'object' && value !== null) {
          Object.freeze(value)
          Object.values(value).map(v => Object.freeze(v))
        }

        return value
      }

      return Reflect.get(target, prop, receiver)
    },
    set(target, p, newValue, receiver) {
      if (isProtectedProp(p)) {
        throw new Error(`Can't set protected property ${p.toString()}`)
      }
      return Reflect.set(target, p, newValue, receiver)
    },
    defineProperty(target, property, attributes) {
      if (isProtectedProp(property)) {
        throw new Error(`Can't define protected property ${property.toString()}`)
      }
      return Reflect.defineProperty(target, property, attributes)
    },
    deleteProperty(target, property) {
      if (isProtectedProp(property)) {
        throw new Error(`Can't delete protected property ${property.toString()}`)
      }
      return Reflect.deleteProperty(target, property)
    },
    setPrototypeOf() {
      throw new Error("Can't set prototype")
    },
  })
}

export const evalScript = (script: string, dataTree: Record<string, any>) => {
  const fn = runUserCode(script)
  const sandbox = proxySandbox(dataTree)
  const result = fn.call(sandbox)
  return result
}
