/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/03/13 10:16:20 (GMT+0900)
 *
 * sum
 */
function add(x: number): (y: number) => number {
  return (y) => {
    return x + y
  }
}

// currying
function sum(...args: number[]): number {
  return args.reduce((prev, v) => prev + v)
}

// parameters merge
// @ts-ignore TS2393: Duplicate function implementation.
function currying(fn: Function) {
  const args: number[] = []
  return function handler(...rest: number[]) {
    args.push(...rest)
    if (rest.length > 0) {
      return handler
    } else {
      // return result
      return fn.apply(null, args)
    }
  }
}

// sort
function sort(...args: number[]): number[] {
  return args.sort()
}

export {
  add,
  currying,
  sort,
  sum
}
