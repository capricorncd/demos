/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-05 21:34
 */
const DEF_CONSTRAINTS = {
  video: true
}

export async function initUserMedia(video: HTMLVideoElement, options: MediaStreamConstraints = {}): Promise<void> {
  const mediaDevices = navigator.mediaDevices
  // // 可能会弹窗是否允许访问摄像头等硬件
  // const constraints: MediaStreamConstraints = {
  //   video: true,
  //   // boolean | MediaTrackConstraints
  //   // audio: true,
  //   // audio: {
  //   //   // ConstrainULong
  //   //   // sampleRate: {
  //   //   //   min: 16000,
  //   //   //   max: 32000,
  //   //   // }
  //   //   echoCancellation: true,
  //   // }
  // }
  const constraints = {
    ...DEF_CONSTRAINTS,
    ...options
  }
  const mediaStream: MediaStream = await mediaDevices.getUserMedia(constraints)
  console.log(mediaStream)
  video.srcObject = mediaStream
}

/**
 * 获取音视频设备信息
 */
export async function initEnumerateDevices(): Promise<Record<string, MediaDeviceInfo[]>> {
  const res: MediaDeviceInfo[] = await navigator.mediaDevices.enumerateDevices()
  const data: Record<string, MediaDeviceInfo[]> = {}
  res.forEach(item => {
    if (!item.deviceId) return
    if (!data[item.kind]) {
      data[item.kind] = []
    }
    data[item.kind].push(item)
  })
  return data
}
