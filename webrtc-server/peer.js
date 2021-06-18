/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-16 21:21 (GMT+0900)
 */
let globalStream, pc1, pc2;
function $(s) {
  return document.querySelector(s)
}

const mediaDevices = navigator.mediaDevices

const localVideo = $('#local')
const remoteVideo = $('#remote')
const btnStart = $('#start')
const btnCall = $('#call')
const btnHangUp = $('#hangup')
const offerInfoEl = $('#offerInfo')
const answerInfoEl = $('#answerInfo')

function getMediaStream(stream) {
  localVideo.srcObject = stream
  globalStream = stream
}

function handleError(e) {
  console.error(e)
  if (e) alert(e.message)
}

btnStart.addEventListener('click', () => {
  if (!mediaDevices || !mediaDevices.getUserMedia) {
    alert('the mediaDevices.getUserMedia is not supported!')
    return
  }
  const constrains = {
    video: true,
    audio: false,
  }
  mediaDevices.getUserMedia(constrains).then(getMediaStream).catch(handleError)
})

function getRemoteStreams(e) {
  remoteVideo.srcObject = e.streams[0]
}

function getAnswer(desc) {
  answerInfoEl.innerText = desc.sdp
  console.log('getAnswer', desc)
  pc2.setLocalDescription(desc)
  // send desc to signal
  // receive desc from signal
  pc1.setRemoteDescription(desc)
}

// Session Description Protocol
// 一种信息格式的描述标准，不属于传输协议，
// 但可以被其他传输协议用来交换必要的信息
function getOffer(desc) {
  offerInfoEl.innerText = desc.sdp
  console.log('getOffer', desc)
  pc1.setLocalDescription(desc)

  // 实际情况：远程发送给pc2
  // send desc to signal
  // receive desc from signal
  pc2.setRemoteDescription(desc)

  pc2.createAnswer().then(getAnswer).then(handleError)
}

btnCall.addEventListener('click', () => {
  if (!pc1) {
    pc1 = new RTCPeerConnection()
    pc2 = new RTCPeerConnection()

    pc1.onicecandidate = (e) => {
      pc2.addIceCandidate(e.candidate)
    }

    pc2.onicecandidate = (e) => {
      pc1.addIceCandidate(e.candidate)
    }

    pc2.ontrack = getRemoteStreams

    globalStream.getTracks().forEach(track => {
      pc1.addTrack(track, globalStream)
    })

    // 媒体协商 Start
    // interface RTCOfferOptions extends RTCOfferAnswerOptions {
    //   iceRestart?: boolean;
    //   offerToReceiveAudio?: boolean;
    //   offerToReceiveVideo?: boolean;
    // }
    const rtcOfferOptions = {
      offerToReceiveAudio: 0,
      offerToReceiveVideo: 1,
    }
    // https://developer.mozilla.org/en-US/docs/Web/API/RTCOfferOptions
    // https://developer.mozilla.org/en-US/docs/Web/API/RTCOfferAnswerOptions
    pc1.createOffer(rtcOfferOptions).then(getOffer).catch(handleError)
    // 媒体协商 End
  }

})

btnHangUp.addEventListener('click', () => {
  pc1 && pc1.close()
  pc2 && pc2.close()
  pc1 = null
  pc2 = null
})
