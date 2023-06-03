import React, { Component, Fragment } from 'react'
import { isMacOS, throttle } from '~/assets/js'
import { list } from '../GitHub/data'
import './parallax-scrolling.scss'
import { bgImages } from '../GitHub/bg-images'
import { shuffleArray } from '../../utils'

/**
 * 1.去除bgImages中，已被指定背景图片bgImgUrl的url
 * 2.随机顺序
 */
const randomBgImages = shuffleArray(bgImages.filter(url => !list.some(item => item.bgImgUrl === url)))

export default class ParallaxScrolling extends Component {
  constructor(props) {
    super(props)
    this.onScroll = throttle(this._onScroll.bind(this))
    this.isMacOS = isMacOS()
    this.prevScrollY = 0
  }

  _onScroll(e) {
    const scrollTop = e.target.scrollTop
    if (this.prevScrollY > scrollTop) {
      // scroll to top
      const moreButton = document.querySelector('.more-wrapper')
      const { top } = moreButton.getBoundingClientRect()
      if (top < window.innerHeight) {
        // window isn't scrolling in Mac OS
        // see App.jsx componentDidMount() { ... }
        if (this.isMacOS) {
          document.querySelector('#app').scrollTo(0, 0)
        } else {
          window.scrollTo(0, 0)
        }
      }
    }
    this.prevScrollY = scrollTop
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
          return <a href={npm.url} target="_blank" key={i} rel="noreferrer">
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
    if (tagItem) { arr.push(<p key="tags" className="tags">
      {tagItem.tag}: {tagItem.text}
    </p>) }
    // urls
    const urls = desc.filter((item) => item.url)
    if (!urls.some(item => item.tag === 'Source')) {
      urls.push({
        tag: 'Source',
        url: src
      })
    }
    const urlNodes = urls.map((item, i) => (
      <a key={i} href={item.url} target="_blank" rel="noreferrer">[{ item.tag }]</a>
    ))
    arr.push(<p key="urls">{urlNodes}</p>)
    return arr
  }

  render() {
    const children = list.map((item, i) => {
      return (
        <Fragment key={i}>
          <div className="img" style={{
            backgroundImage: `url(${item.bgImgUrl || randomBgImages[i] || ('https://source.unsplash.com/random?t=' + i)}`
          }} />
          <div className="title">
            <a href={item.url} target="_blank" rel="noreferrer">{ item.name }</a>
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
