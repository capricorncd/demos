/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-08-01 21:35
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from './pages/index'
import PeerConnection from './pages/peer-connection/index'
import Live from './pages/live/index'
import ChatRoom from './pages/chat-room/index'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', component: Index },
    { path: '/live', component: Live },
    { path: '/peer-connection', component: PeerConnection },
    { path: '/chat-room', component: ChatRoom }
  ]
})
