<template>
  <div class="chat-room-page-wrapper">
    <el-form ref="form" :model="form" label-width="80px" size="small">
      <el-form-item label="用户名">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="房间号">
        <el-row>
          <el-col :span="20">
            <el-input v-model="form.room"></el-input>
          </el-col>
          <el-col :span="4" style="display: flex;justify-content: flex-end">
            <el-button type="primary" style="flex: 1;margin-left: 20px" @click="onConnect" :disabled="isConnected">{{connectBtnText}}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="聊天内容">
        <el-input type="textarea" rows="10" v-model="form.content" readonly></el-input>
      </el-form-item>
      <el-form-item label="输入">
        <el-input ref="input" type="textarea" v-model="form.input"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSend">发送消息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'ChatRoom',
    computed: {
      connectBtnText() {
        return this.isConnected ? '已链接' : '链接服务器'
      },
      $input() {
        return this.$refs.input
      }
    },
    data() {
      return {
        form: {
          userName: 'Tom',
          room: '100001',
          content: '',
          input: '',
        },
        isConnected: false,
        socket: null,
      }
    },
    methods: {
      onConnect() {
        console.log('onConnect!')
        if (this.isConnected) {
          console.log('is connected!')
        } else {
          this._initSocket()
        }
      },
      _initSocket() {
        // connect
        // this.socket = io.connect()
        const socket = io('ws://capricorncd.com:8080')

        socket.on('connect', () => {
          this.socket = socket
          this.isConnected = true
        })

        socket.on('disconnect', () => {
          this.isConnected = false
        })

        socket.on('chat message', ({room, user, id, data}) => {
          if (room === this.form.room) {
            this.form.content += `${user}(${id}):\n[${data}]\n`
          }
        })
      },
      onSend() {
        if (!this.isConnected) {
          this.$message.error('don\'t connect to server')
          return
        }
        if (!this.form.input) {
          this.$message.error('请输入聊天内容!')
          this.$input.focus()
          return
        }
        // console.log(this.socket)
        this.socket.emit('chat message', {
          data: this.form.input,
          room: this.form.room,
          id: this.socket.id,
          user: this.form.userName,
        })
        this.form.input = ''
      }
    }
  }
</script>

<style lang="scss">
  .chat-room-page-wrapper {
  }
</style>
