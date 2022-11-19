import React, { Component, Fragment } from 'react'
import './parallax-scrolling.scss'
import { isMacOS } from '~/assets/js'
import { list } from '../GitHub/data'

export default class ParallaxScrolling extends Component {
  constructor(props) {
    super(props)
    this.onScroll = this._onScroll.bind(this)
    this.isMacOS = isMacOS()
  }

  _onScroll() {
    const moreButton = document.querySelector('.more-wrapper')
    const rect = moreButton.getBoundingClientRect()
    if (rect.top < window.innerHeight) {
      // window isn't scrolling in Mac OS
      // see App.jsx componentDidMount() { ... }
      if (this.isMacOS) {
        document.querySelector('#app').scrollTop = 0
      } else {
        window.scrollTo(0, 0)
      }
    }
  }
  /**
   * create npm info
   * @param npm
   * @returns {null|*}
   */
  createNpmInfo(npm) {
    if (!npm) return null
    return <p className="npm-items">
      {
        npm.map((npm, i) => {
          return <a href={npm.url} target="_blank" key={i}>
            <img src={npm.icon} alt={npm.alt} />
          </a>
        })
      }
    </p>
  }

  /**
   * create desc info
   * @param desc
   * @returns {*}
   */
  createDescInfo(desc, src) {
    const arr = []
    // description
    const descItem = desc.find(item => !item.tag && item.text)
    if (descItem) arr.push(<p key="desc">{descItem.text}</p>)
    // tags
    const tagItem = desc.find((item) => item.tag === 'Tags')
    if (tagItem) arr.push(<p key="tags" className="tags">
      {tagItem.tag}: {tagItem.text}
    </p>)
    // urls
    const urls = desc.filter((item) => item.url)
    if (!urls.some(item => item.tag === 'Source')) {
      urls.push({
        tag: 'Source',
        url: src
      })
    }
    const urlNodes = urls.map((item, i) => (
      <a key={i} href={item.url} target="_blank">[{ item.tag }]</a>
    ))
    arr.push(<p key="urls">{urlNodes}</p>)
    return arr
  }

  render() {
    const children = list.map((item, i) => {
      return (
        <Fragment key={i}>
          <div className="img" style={{
            backgroundImage: `url(${item.bgImgUrl || ('https://source.unsplash.com/random?t=' + i)}`
          }} />
          <div className="title">
            <a href={item.url} target="_blank">{ item.name }</a>
          </div>
          <div className="text">
            {/* <a href={item.url} target="_blank">{ item.name }</a> */}
            { this.createDescInfo(item.desc, item.url) }
            { this.createNpmInfo(item.npm) }
          </div>
        </Fragment>
      )
    })
    return <section className="parallax-scrolling-wrap" onScroll={this.onScroll}>{ children }</section>
  }
}