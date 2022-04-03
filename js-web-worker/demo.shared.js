/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/04/03 10:40:35 (GMT+0900)
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker
 */
const before = document.querySelector('.shared-before-hook')
const after = document.querySelector('.shared-after-hook')
const button = document.querySelector('.shared-button-hook')

const worker = new SharedWorker('./worker.shared.js')

console.log('demo.shared ================')
console.log(worker)
const arr = [60, 3, 9, 32, 100]

button.addEventListener('click', function () {
  // send data to Worker thread
  console.log('send data to SharedWorker thread', arr)
  worker.port.postMessage(arr)
})

// handle data from Worker thread
worker.port.onmessage = function (e) {
  console.log(e)
  after.textContent = e.data.join(', ')
}

worker.port.onerror = function (e) {
  console.log('SharedWorker port onerror', e)
}

worker.onerror = function (e) {
  console.log('SharedWorker onerror', e)
}

before.textContent = arr.join(', ')