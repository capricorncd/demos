/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/04/05 21:38:06 (GMT+0900)
 */
fetch('./fib.wasm').then(res => {
  return res.arrayBuffer()
}).then(bytes => {
  return WebAssembly.compile(bytes)
}).then(mod => {
  const instance = new WebAssembly.Instance(mod)
  const obj = instance.exports
  console.log(obj)

  console.time('Test wasm speed:')
  console.log(obj._Z3fibi(40))
  console.timeEnd('Test wasm speed:')
})
