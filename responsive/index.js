/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-05-25 19:40
 */
import { reactive } from './Dependence.js'
import { createApp } from './createApp.js'

// const a = reactive({
//   age: 18
// })
//
// let b
//
// effectWatch(() => {
//   b = a.age + 2
//   console.log(b)
// })
//
// a.age = 23

const App = {
  render(context) {
    // 构建视图 b
    const div = document.createElement('div')
    div.innerHTML = context.state.value
    return div
  },
  setup() {
    // 定义响应数据 a
    const state = reactive({
      value: 0,
    })
    window.state = state
    return {
      state
    }
  }
}

// App.render(App.setup())

createApp(App).mount(document.querySelector('#app'))
