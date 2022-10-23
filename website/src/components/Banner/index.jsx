/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-06 20:33
 */
import React, { Component } from 'react'
import './banner.scss'
// import { initAnimation } from './animate'
import { Fireworks } from '../../../../fireworks/dist/index'

class Banner extends Component {
  componentDidMount() {
    // initAnimation('.banner-wrapper')
    const container = document.querySelector('.banner-wrapper')
    const canvas = new Fireworks(container)
    canvas.style.background = 'transparent'
    container.appendChild(canvas)
  }

  render() {
    return <div className="banner-wrapper">
      <h1>You are welcome here!</h1>
      {/* <p>Welcome.</p> */}
    </div>
  }
}

export default Banner
