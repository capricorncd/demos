/**
 * Created by dev3cli.
 * https://github.com/capricorncd/dev3cli
 * Date: 2021-06-05 15:01:55
*/
import { initUserMedia, initEnumerateDevices, initUserAudio } from './mediaDevices'
import { createSelects, $, createElement } from './helpers'
import { initMediaRecorder } from './mediaRecorder'
import { initDisplayMedia } from './displayMedia'
import './style.scss'

window.addEventListener('DOMContentLoaded', async () => {
  const el = $('#app')
  const video: HTMLVideoElement = $('video')

  const audio: HTMLAudioElement = createElement('audio', { controls: true })

  video.addEventListener('change', () => {
    // 可实现设备切换
    console.log('video change')
  })

  try {
    const mediaStream = await initUserMedia(video)

    // MediaRecorder
    initMediaRecorder(el, mediaStream)

    el.append(audio)

    // 用户允许访问硬件后，才能获取到相关设备信息
    const data = await initEnumerateDevices()
    const keys = createSelects(data, el)

    // handle event
    console.log(keys)
    keys.forEach(key => {
      const select: HTMLInputElement = $(`select[name="${key}"]`)
      select.addEventListener('change', () => {
        const value = select.value
        switch (key) {
          case 'filters':
            video.style.filter = value
            break
          case 'videoinput':
            initUserMedia(video, {
              video: {
                deviceId: {
                  exact: value
                }
              }
            })
            break
        }
      })
    })

    // screenshot
    const screenshotBtn = createElement('button', {}, 'Screenshot')
    const canvas: HTMLCanvasElement = createElement('canvas', {
      width: 1000,
      height: 600,
      background: '#000'
    })
    const ctx = canvas.getContext('2d')
    el.append(screenshotBtn, canvas)
    screenshotBtn.addEventListener('click', () => {
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height)
    })

    // initUserAudio
    await initUserAudio(audio)

    // 获取视频约束
    const videoTracks: MediaStreamTrack[] = mediaStream.getVideoTracks()
    console.log(videoTracks)
    const videoTrackHtml = videoTracks.map(vt => {
      return JSON.stringify(vt.getSettings(), null, 2)
    }).join('<br>')
    const videoTrackDiv = createElement('div', {}, `<h3>视频约束</h3><pre><code>${videoTrackHtml}</code></pre>`)
    el.append(videoTrackDiv)

    // initDisplayMedia
    await initDisplayMedia()
  } catch (e) {
    console.error(e)
  }
})
