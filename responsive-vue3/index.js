/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-05-25 19:40
 */
import { App } from './App.js'
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

// App.render(App.setup())

createApp(App).mount(document.querySelector('#app'))
