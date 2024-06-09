/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-06 20:33
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './banner.scss'
// import { initAnimation } from './animate'
import { Fireworks } from './fireworks.js'

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
      {/* <h1>You are welcome here!</h1> */}
      <h1>Thanks for your browsing!</h1>
      {/* <p>Welcome.</p> */}
      {this.props.children}
    </div>
  }
}

export default Banner

Banner.propTypes = {
  children: PropTypes.node
}
