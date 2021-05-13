<template>
  <div class="web-rtc-wrapper">
    <h1>WebRTC Live</h1>
    <video autoplay ref="video" controls></video>
    <div class="button-wrapper">
      <el-button type="primary" @click="handleLive">{{liveBtnText}}</el-button>
      <el-button type="danger" @click="handleRecord">{{recordBtnText}}</el-button>
      <el-button type="warning" @click="handlePlay">Play</el-button>
      <el-button type="warning" @click="handleDownload">Download</el-button>
    </div>
  </div>
</template>

<script>
  import ZXWebRTC from './webrtc/index'

  export default {
    computed: {
      video () {
        return this.$refs.video
      },
      recordBtnText () {
        return this.isRecording ? 'Stop Record' : 'Start Record'
      },
      liveBtnText () {
        return this.isLiving ? 'Stop' : 'Start'
      },
      canPlay () {
        return this.webRtc && this.webRtc.canPlay()
      }
    },
    data () {
      return {
        webRtc: null,
        isRecording: false,
        isLiving: false
      }
    },
    methods: {
      initWebRtc () {
        this.$nextTick(() => {
          const webRtc = new ZXWebRTC({
            video: this.video
          })
          console.log(webRtc)
          this.webRtc = webRtc
          this.webRtc.on('error', err => {
            console.error(err)
          })
        })
      },
      handleLive () {
        if (this.isLiving) {
          this.webRtc.stopLive()
        } else {
          this.webRtc.startLive()
        }
        this.isLiving = !this.isLiving
      },
      handleRecord () {
        if (this.isRecording) {
          this.webRtc.stopRecord()
        } else {
          this.webRtc.startLive()
          this.webRtc.startRecord()
        }
        this.isRecording = !this.isRecording
      },
      handlePlay () {
        if (!this.webRtc.canPlay()) {
          this.$message.error('没有可播放数据')
          return
        }
        this.webRtc.play()
      },
      handleDownload () {
        if (!this.webRtc.canPlay()) {
          this.$message.error('没有可下载的数据')
          return
        }
        this.webRtc.download()
      }
    },
    mounted () {
      this.initWebRtc()
    },
    beforeDestroy() {
      this.webRtc.distroy()
    }
  }
</script>

<style lang="scss">
  .web-rtc-wrapper {
    text-align: center;
    font-family: Arial;

    video {
      width: 100%;
      height: auto;
    }
    .button-wrapper {
      margin-top: 30px;
    }
  }
</style>
