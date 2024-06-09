/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-07 10:50
 */
import React, { Component } from 'react'
import './more.scss'

class More extends Component {
  render() {
    return <div className="more-wrapper">
      <a href="https://github.com/capricorncd" target="_blank" rel="noreferrer">More Repositories
        <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" height="24">
          <path d="M729.987756 534.448268 376.290155 888.145869c-18.73776 18.73776-49.092092 18.73776-67.828828 0s-18.73776-49.092092 0-67.828828l285.868773-285.868773L308.461327 248.579495c-18.73776-18.73776-18.73776-49.092092 0-67.828828s49.092092-18.73776 67.828828 0L729.987756 534.448268z" p-id="1609" fill="currentColor" />
        </svg>
      </a>
    </div>
  }
}

export default More
