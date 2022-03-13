/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/03/13 10:16:20 (GMT+0900)
 *
 * sum
 */
function add(x) {
  return (y) => {
    return x + y
  }
}

console.log('add: 1 + 3 =', add(1)(3))

// currying
function sum(...args) {
  return args.reduce((prev, v) => prev + v)
}

// parameters merge
function currying(fn) {
  const args = []
  return function handler(...rest) {
    args.push(...rest)
    if (rest.length > 0) {
      return handler
    } else {
      // return result
      return fn.apply(null, args)
    }
  }
}

console.log(currying(sum)(1, 3)());
console.log(currying(sum)(1, 3)(9, 3)());
console.log(currying(sum)(1, 3)(90)());
console.log(currying(sum)(1, 3)(2)(3)(4)(5)());

// sort
function sort(...args) {
  return args.sort()
}
console.log(currying(sort)(1, 3)(2)(3)(4)(5)());
