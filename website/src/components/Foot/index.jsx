/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-10-30 17:56
 */
import React, { Component } from 'react'
import './footer.scss'

class Footer extends Component {
  render() {
    return <footer>
      © 2016-{ new Date().getFullYear() } Capricorncd. kaneoki1984@gmail.com / capricorncd@qq.com
    </footer>
  }
}

export default Footer
