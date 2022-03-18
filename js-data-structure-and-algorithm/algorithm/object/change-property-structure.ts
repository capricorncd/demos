/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/03/11 11:00:29 (GMT+0900)
 */
type ObjAny = Record<string, any>

const input = {
  'a.b.c.dd': 'abcdd',
  'a.d.xx': 'adxx',
  'a.e': 'ae',
  d: 2222
}

const output = {
  a: {
    b: {
      c: {
        dd: 'abcdd'
      }
    },
    d: {
      xx: 'adxx'
    },
    e: 'ae'
  },
  d: 2222
}

/**
 * expand properties
 * @param input object
 * @returns {{}}
 */
function expandProperties(input: ObjAny): ObjAny {
  const result = {}
  for (let [keys, value] of Object.entries(input)) {
    keys.split('.').reduce((prev, key, index, arr) => {
      // @ts-ignore
      return prev[key] = index === arr.length - 1 ? value : prev[key] || {}
    }, result)
  }
  return result
}

console.log(expandProperties(input));

/**
 * Collapse Properties
 * @param input object{a: {b: {c: {d: 'abcd'}}}}
 * @returns {{}} {a.b.c.d: 'abcd'}
 */
function collapseProperties(input: ObjAny): ObjAny {
  const result = {}
  for (let [key, value] of Object.entries(input)) {
    handleKeyValue(key, value, result)
  }
  return result
}

/**
 * handle key and value
 * @param key string
 * @param value any
 * @param result {}
 */
function handleKeyValue(key: string, value: any, result: ObjAny): void {
  // null case is not considered
  if (typeof value === 'object') {
    for (let [k, v] of Object.entries(value)) {
      handleKeyValue(key.concat(`.${k}`), v, result)
    }
  } else {
    result[key] = value
  }
}

console.log(collapseProperties(output));

/**
 * flat object
 * @param obj {}
 * @param prevKey
 * @param result {}
 * @returns {{}}
 */
function flatObject(obj: ObjAny, prevKey = '', result = {}) {
  for (let [key, value] of Object.entries(obj)) {
    if (typeof value === 'object') {
      flatObject(value, prevKey.concat(`${key}.`), result)
    } else {
      // @ts-ignore
      result[prevKey.concat(key)] = value
    }
  }
  return result
}

console.log(flatObject(output));

/**
 * flat object with queue
 * @param input
 * @returns {{}}
 */
function flatObjectWithQueue(input: ObjAny): ObjAny {
  const result = {}
  const queue = Object.entries(input)
  while (queue.length) {
    // @ts-ignore
    const [key, value] = queue.pop()
    if (typeof value === 'object') {
      for (let [k, v] of Object.entries(value)) {
        queue.push([`${key}.${k}`, v])
      }
    } else {
      // @ts-ignore
      result[key] = value
    }
  }
  return result
}

console.log(flatObjectWithQueue(output));
