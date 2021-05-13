/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-07-30 22:31
 */
import Vue from 'vue'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'

Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

