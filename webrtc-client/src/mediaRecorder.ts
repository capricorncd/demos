/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-06 19:14
 */
import { createElement, $ } from '@/src/helpers'

// function startRecord(mediaStream: MediaStream): MediaRecorder | null {
//   // const options = {
//   //   // mimeType: 'video/webp;codecs=vp8'
//   //   mimeType: 'video/mp4'
//   // }
//   //
//   // if (!MediaRecorder.isTypeSupported(options.mimeType)) {
//   //   console.error(`${options.mimeType} is not supported!`)
//   //   return null
//   // }
//   const mediaRecorder = new MediaRecorder(mediaStream)
//   console.log(mediaRecorder)
//   // mediaRecorder.start(10)
//   return mediaRecorder
// }

function stopRecord(mediaRecorder: MediaRecorder): void {
  mediaRecorder.stop()
  console.log(mediaRecorder.state)
  console.log(mediaRecorder.mimeType)
  console.log('recorder stopped')
}

// https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder
export function initMediaRecorder(el: HTMLElement, mediaStream: MediaStream): void {
  const chunks: Blob[] = []
  const video: HTMLVideoElement = $('video')
  // create dom
  const START_RECORD = 'Start Record'
  const STOP_RECORD = 'Stop Record'
  const startBtn: HTMLButtonElement = createElement('button', {}, START_RECORD)
  const playBtn: HTMLButtonElement = createElement('button', { style: 'margin: 0 10px' }, 'Play')
  const downloadBtn: HTMLButtonElement = createElement('button', { }, 'Download')
  const div = createElement('div', { style: 'padding: 10px 0' })
  div.append(startBtn, playBtn, downloadBtn)
  el.append(div)

  playBtn.disabled = true
  downloadBtn.disabled = true

  const mediaRecorder = new MediaRecorder(mediaStream)
  console.log(mediaRecorder)

  mediaRecorder?.addEventListener('dataavailable', (e) => {
    chunks.push(e.data)
  })

  // handle event
  startBtn.addEventListener('click', () => {
    const text = startBtn.textContent
    if (text === START_RECORD) {
      chunks.length = 0
      startBtn.textContent = STOP_RECORD
      playBtn.disabled = true
      downloadBtn.disabled = true
      mediaRecorder.start(10)
      console.log(mediaRecorder.state)
      console.log(mediaRecorder.mimeType)
      console.log('recorder started')
    } else {
      startBtn.textContent = START_RECORD
      playBtn.disabled = false
      downloadBtn.disabled = false
      stopRecord(mediaRecorder)
    }
  })

  playBtn.addEventListener('click', () => {
    console.log(chunks)
    const blob = new Blob(chunks, { type: 'video/webm' })
    video.src = URL.createObjectURL(blob)
    video.srcObject = null
    video.controls = true
    video.play()
  })

  downloadBtn.addEventListener('click', () => {
    const blob = new Blob(chunks, { type: 'video/webm' })
    const url = URL.createObjectURL(blob)
    let a: HTMLAnchorElement = createElement('a', { href: url })
    a.download = +new Date() + '.webm'
    a.click()
    // @ts-ignore
    a = null
  })
}
