/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-05-25 21:01
 */
import { reactive } from './Dependence.js'
import { h } from './h.js'

export const App = {
  render(context) {
    // 构建视图 b
    // const div = document.createElement('div')
    // div.innerHTML = context.state.value
    // return div
    const children = [
      h('h1', {name: 'title', value: context.state.value}, context.state.value),
      h('p', null, 'hello world')
    ]
    for (let i = 0; i < 1 + Math.round(Math.random() * 10); i++) {
      children.push(h('p', null, 'hello world ' + i))
    }

    return h('div', { 'current-value': context.state.value }, children)
  },
  setup() {
    // 定义响应数据 a
    const state = reactive({
      value: 0
    })
    window.state = state
    return {
      state
    }
  }
}
