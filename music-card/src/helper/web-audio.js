/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-10-17 21:25
 */
import Vue from 'vue'

export function initAudioContext(audio, parent) {
  // webkitAudioContext
  // fix: safari and weChat that device iphone 7 plus
  const AudioContext = window.AudioContext || window.webkitAudioContext
  const context = new AudioContext()
  // gain
  const gainNode = context.createGain()
  gainNode.gain.value = 0.1
  Vue.prototype.$gainNode = gainNode
  // analyser
  const analyser = context.createAnalyser()
  analyser.fftSize = 512

  const source = context.createMediaElementSource(audio)
  source.connect(gainNode)
  source.connect(analyser)
  gainNode.connect(context.destination)
  // analyser.connect(context.destination)

  context.onstatechange = () => {
    console.log('onstatechange', context.state)
  }

  const bufferLength = analyser.frequencyBinCount
  const dataArray = new Uint8Array(bufferLength)

  const width = !parent ? window.innerWidth : parent.offsetWidth
  const height = !parent ? window.innerHeight : parent.offsetHeight

  const barWidth = width / bufferLength * 1.5
  let barHeight

  const ctx = createCanvasContext(parent, width, height)

  function render() {
    requestAnimationFrame(render)
    // https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getByteFrequencyData
    analyser.getByteFrequencyData(dataArray)
    // console.log(Math.max.apply(null, dataArray), Math.min.apply(null, dataArray), analyser)
    ctx.clearRect(0, 0, width, height)

    for (let i = 0, x = 0; i < bufferLength; i++) {
      barHeight = dataArray[i]
      ctx.fillStyle = `rgb(${barHeight}, 240, 250)`
      ctx.fillRect(x, height - barHeight, barWidth, barHeight)
      x += barWidth + 2
    }
  }

  render()
}

function createCanvasContext(parent, width, height) {
  const el = parent.querySelector('canvas')
  el.width = width
  el.height = height

  return el.getContext('2d')
}
