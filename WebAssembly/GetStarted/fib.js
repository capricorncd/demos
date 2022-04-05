/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/04/05 21:26:56 (GMT+0900)
 */
function fib(x) {
  if (x <= 0) return 0
  if (x <= 2) return 1
  return fib(x - 1) + fib(x - 2)
}

console.time('Test fib speed:')
console.log(fib(40))
console.timeEnd('Test fib speed:')
