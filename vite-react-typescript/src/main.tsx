import React from 'react'
import ReactDOM from 'react-dom'
import '@/assets/scss/index.scss'
import 'swiper/swiper.scss'
import App from './pages/App'
import { init } from './helpers'

const el = document.getElementById('app') as HTMLElement

init(el)

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  el
)
