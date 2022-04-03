/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/04/03 10:17:57 (GMT+0900)
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
 */
// GlobalScope = self
onmessage = function (e) {
  console.log('Worker:: onmessage')
  const data = e.data
  // async task
  setTimeout(() => {
    // onerror
    // throw new Error(data.join(', '))
    postMessage(data.sort((a, b) => a - b))
  }, 500)
}

onerror = function (e) {
  console.error(e)
}