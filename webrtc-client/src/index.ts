/**
 * Created by dev3cli.
 * https://github.com/capricorncd/dev3cli
 * Date: 2021-06-05 15:01:55
*/
import { initUserMedia, initEnumerateDevices } from './mediaDevices'
import { createSelects } from './helpers'
import './style.scss'

window.addEventListener('DOMContentLoaded', async () => {
  const el = document.querySelector('#app') as HTMLElement
  const video = document.querySelector('video') as HTMLVideoElement

  video.addEventListener('change', () => {
    // 可实现设备切换
    console.log('video change')
  })

  try {
    await initUserMedia(video)
    // 用户允许访问硬件后，才能获取到相关设备信息
    const data = await initEnumerateDevices()
    const keys = createSelects(data, el)

    // handle event
    console.log(keys)
    keys.forEach(key => {
      const select = document.querySelector(`select[name="${key}"]`) as HTMLInputElement
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
  } catch (e) {
    console.error(e)
  }
})
