/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/04/03 10:40:35 (GMT+0900)
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
 */
const before = document.querySelector('.normal-before-hook')
const after = document.querySelector('.normal-after-hook')
const button = document.querySelector('.normal-button-hook')

const worker = new Worker('./worker.normal.js')

console.log('demo.normal ================')
console.log(worker)
const arr = [6, 3, 9, 32, 1]

button.addEventListener('click', function () {
  // send data to Worker thread
  console.log('send data to Worker thread', arr)
  worker.postMessage(arr)
})

// handle data from Worker thread
worker.onmessage = function (e) {
  console.log(e)
  after.textContent = e.data.join(', ')
}

worker.onerror = function (e) {
  console.log('onerror', e)
}

before.textContent = arr.join(', ')