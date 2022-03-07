import React from 'react'
import ReactDOM from 'react-dom'
import App from './pages/App'
import { Provider } from 'react-redux'
import store from '@/stores'
import '@/assets/scss/index.scss'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('app'),
)
