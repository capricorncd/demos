/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/04/03 10:17:57 (GMT+0900)
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker
 */
onconnect = function (evt) {
  const port = evt.ports[0]

  port.onmessage = function (e) {
    const data = e.data
    // async task
    setTimeout(() => {
      // Firefox/98.0 会触发onerror；
      // Chrome/97.0 无异常抛出，即没有任何反应
      throw new Error(data.join(', '))
      // port.postMessage(data.sort((a, b) => a - b))
    }, 500)
  }

  port.onerror = function (e) {
    console.error(e)
  }
}

onerror = function (e) {
  // Firefox/98.0
  console.log('worker.shared =====')
  console.error(e)
}
