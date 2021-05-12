/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-07-30 22:54
 */
import Observer from './observer'
import { createUrl } from './utils'

const CONSTRAINTS_VIDEO = {
  width: 640,
  height: 360,
  frameRate: 24,
  // 后置摄像头
  // https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/facingMode
  facingMode: 'environment',
}

const CONSTRAINTS_AUDIO = {
  volume: 100,
  sampleRate: 1,
  sampleSize: 1,
  // 回音消除
  echoCancellation: true,
  autoGainControl: true,
  noiseSuppression: true,
  latency: 0,
  channelCount: 2,
  deviceId: '',
  groupId: '',
}

const DEFAULT_OPTIONS = {
  video: null,
}

/**
 * ZX webRTC
 * @constructor
 *
 * $name is HTML Element
 */
function ZXWebRTC(options) {
  this.stream = null
  this.mediaRecorder = null
  this.recorderBuffer = []

  this.$video = options.video

  this.constraints = {
    video: CONSTRAINTS_VIDEO,
    audio: false,
  }
  this._init()
}

ZXWebRTC.prototype = new Observer()

ZXWebRTC.prototype.constructor = ZXWebRTC

/**
 * init
 * @private
 */
ZXWebRTC.prototype._init = function () {
    // navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(console.error)
  navigator.mediaDevices.getUserMedia(this.constraints)
    .then(res => {
      this._getMediaStream(res)
    })
    .catch(err => {
      this.emit('error', err)
    })
}

ZXWebRTC.prototype._getMediaStream = function(stream) {
  this.stream = stream
  // 获取设备信息
  navigator.mediaDevices.enumerateDevices().then(res => {
    this._getDevices(res)
  })
}

ZXWebRTC.prototype._getDevices = function(infos) {
  let obj = {}
  infos.forEach(info => {
    if (!obj[info.kind]) {
      obj[info.kind] = []
    }
    obj[info.kind].push(info)
  })

  console.log(obj)
}

ZXWebRTC.prototype.startLive = function() {
  this.$video.srcObject = this.stream
}

ZXWebRTC.prototype.stopLive = function() {
  this.$video.srcObject = null
}

/**
 * set constraints
 * @param type
 * @param options
 */
ZXWebRTC.prototype.setConstraints = function (type, options) {
  if (typeof type !== 'string' || !/^video|audio$/i.test(type)) return
  this.constraints[type] = options
}

/**
 * start record
 */
ZXWebRTC.prototype.startRecord = function startRecord () {
  this.recorderBuffer = []
  const options = {
    mimeType: 'video/webm;codecs=vp8'
  }
  if (!MediaRecorder.isTypeSupported(options.mimeType)) {
    console.error(`${options.mimeType} is not supported!`)
    return
  }
  try {
    this.mediaRecorder = new MediaRecorder(this.stream, options)
  } catch (e) {
    console.error('Failed to create MediaRecorder', e)
    return
  }
  this.mediaRecorder.ondataavailable = (e) => {
    this._onDataAvailable(e)
  }
  this.mediaRecorder.start(10)
}

ZXWebRTC.prototype._onDataAvailable = function (e) {
  if (e && e.data && e.data.size > 0) {
    this.recorderBuffer.push(e.data)
  }
}

/**
 * stop record
 */
ZXWebRTC.prototype.stopRecord = function stopRecord () {
  if (!this.mediaRecorder) return
  this.mediaRecorder.stop()
}

ZXWebRTC.prototype.play = function () {
  this.stopLive()
  this.$video.src = createUrl(this.recorderBuffer, { type: 'video/webm' })
  this.$video.play()
  this.$video.controller = true
}

ZXWebRTC.prototype.canPlay = function () {
  return this.recorderBuffer.length > 0
}

ZXWebRTC.prototype.pause = function () {
  this.$video.pause()
  this.$video.controller = false
}

ZXWebRTC.prototype.download = function () {
  const a = document.createElement('a')
  a.href = createUrl(this.recorderBuffer, { type: 'video/webm' })
  a.download = `record-${+new Date()}.webm`
  a.click()
}

ZXWebRTC.prototype.distroy = function () {
  this.stream = null
  this.mediaRecorder = null
  this.recorderBuffer = null
  this.$video = null
}

export default ZXWebRTC
