<template>
  <div class="peer-connection-page-wrapper">
    <el-row :gutter="20">
      <el-col :span="12">
        <h2>Local</h2>
        <Video @mounted="v => v1 = v"/>
      </el-col>
      <el-col :span="12">
        <h2>Remote</h2>
        <Video @mounted="v => remoteVideo = v"/>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin: 10px -10px 20px;">
      <el-col :span="24">
        <el-button type="primary" @click="onStart" :disabled="isStared">Start</el-button>
        <el-button type="success" @click="onCall" :disabled="!isStared || isCalled">Call</el-button>
        <el-button type="danger" @click="onHangUp" :disabled="!isCalled">Hang Up</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <h2>Offer SDP</h2>
        <el-input type="textarea" readonly :rows="30" :value="offerSDP"></el-input>
      </el-col>
      <el-col :span="12">
        <h2>Answer SDP</h2>
        <el-input type="textarea" readonly :rows="30" :value="answerSDP"></el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Video from './video'
  import { isSupportMediaDevices, fmtSDP } from '../../utils'

  export default {
    components: {
      Video
    },
    data() {
      return {
        isStared: false,
        isCalled: false,
        v1: null,
        remoteVideo: null,
        stream: null,
        pc1: null,
        pc2: null,
        offerSDP: '',
        answerSDP: '',
      }
    },
    methods: {
      onStart() {
        if (!isSupportMediaDevices()) {
          console.error('The getUserMedia is not supported')
          this.$message.error('The getUserMedia is not supported')
          return
        }
        this.isStared = true
        const constraints = {
          video: true,
          audio: false
        }
        navigator.mediaDevices.getUserMedia(constraints).then(stream => {
          console.log('navigator.mediaDevices.getUserMedia')
          this.getMediaStream(stream)
        }).catch(err => {
          this.isStared = false
          console.error(err)
          this.$message.error(err.message)
        })
      },
      onCall() {
        this.isCalled = true
        console.log('instance pc1, pc2')
        this.pc1 = new RTCPeerConnection()
        this.pc2 = new RTCPeerConnection()
        this.pc1.onicecandidate = e => {
          console.log('pc1.onicecandidate', 'pc2.addIceCandidate')
          this.pc2.addIceCandidate(e.candidate)
        }
        this.pc2.onicecandidate = e => {
          console.log('pc2.onicecandidate', 'pc1.addIceCandidate')
          this.pc1.addIceCandidate(e.candidate)
        }
        this.pc2.ontrack = e => {
          console.log('pc1.ontrack')
          this.getRemoteStream(e.streams)
        }

        console.log('stream.getTracks')
        this.stream.getTracks().forEach(track => {
          console.log('pc1.addTrack', track)
          this.pc1.addTrack(track, this.stream)
        })
        // 媒体协商
        console.info('媒体协商开始')
        const offerOptions = {
          offerToReceiveVideo: 1,
          offerToReceiveAudio: 0
        }
        console.log('pc1.createOffer')
        this.pc1.createOffer(offerOptions).then(desc => {
          console.log('pc1 Offer', desc)
          this.offerSDP = fmtSDP(desc.sdp)
          this.getOfferDesc(desc)
        }).catch(err => {
          this.isCalled = false
          console.error(err)
          this.$message.error(err.message)
        })
      },
      onHangUp() {
        if (this.pc1) this.pc1.close()
        if (this.pc2) this.pc2.close()
        // this.isStared = false
        this.isCalled = false
      },
      getMediaStream(stream) {
        console.log('set v1.srcObject')
        this.v1.srcObject = stream
        this.stream = stream
      },
      getRemoteStream(streams) {
        console.log('set remoteVideo.srcObject')
        this.remoteVideo.srcObject = streams[0]
      },
      getOfferDesc(desc) {
        console.log('pc1.setLocalDescription')
        this.pc1.setLocalDescription(desc)
        // send desc to signal
        // receive desc from signal
        this.pc2.setRemoteDescription(desc)
        console.log('pc2.setRemoteDescription end')
        console.log('pc2.createAnswer')
        this.pc2.createAnswer().then(desc => {
          console.log('pc2 Answer', desc)
          this.answerSDP = fmtSDP(desc.sdp)
          this.getAnswerDesc(desc)
        }).catch(err => {
          this.isCalled = false
          console.error(err)
          this.$message.error(err.message)
        })
      },
      getAnswerDesc(desc) {
        console.log('pc2.setLocalDescription', 'pc1.setRemoteDescription')
        this.pc2.setLocalDescription(desc)
        this.pc1.setRemoteDescription(desc)
        console.info('媒体协商结束')
      }
    }
  }
</script>

<style lang="scss">
  .peer-connection-page-wrapper {
    video {
      width: 100%;
      height: 300px;
      background: #ccc;
    }
  }
</style>
