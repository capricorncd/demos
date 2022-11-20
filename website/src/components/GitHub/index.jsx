/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-06 20:33
 */
import React, { Component } from 'react'
import './github.scss'
import { list } from './data'

class GitHub extends Component {
  /**
   * click handler
   * @param item
   */
  clickHandler(item) {
    window.open(item.url)
  }

  /**
   * create npm info
   * @param npm
   * @returns {null|*}
   */
  createNpmInfo(npm) {
    if (!npm) return null
    return <dd className="npm-items">
      {
        npm.map((npm, i) => {
          return <a href={npm.url} target="_blank" key={i} rel="noreferrer">
            <img src={npm.icon} alt={npm.alt} />
          </a>
        })
      }
    </dd>
  }

  /**
   * create desc info
   * @param desc
   * @returns {*}
   */
  createDescInfo(desc) {
    return desc.map((desc, i) => {
      return <dd key={i}>
        { desc.tag ? desc.tag + ': ' : '' }
        {
          desc.url ? <a href={desc.url} target="_blank" rel="noreferrer">{ desc.url }</a> : desc.text
        }
      </dd>
    })
  }

  render() {
    const items = list.map((item, i) => {
      return <div className="github-item-wrapper" key={i}>
        <div className="l" style={{ background: item.coverBg }} onClick={() => this.clickHandler(item)}>
          {!item.cover ? item.name.toUpperCase() : <img src={ item.cover } alt=""/>}
        </div>
        <dl className="r">
          <dt>
            <a href={item.url} target="_blank" rel="noreferrer">{ item.name }</a>
          </dt>
          { this.createDescInfo(item.desc) }
          { this.createNpmInfo(item.npm) }
        </dl>
      </div>
    })
    return <div className="github-wrapper">
      { items }
    </div>
  }
}

export default GitHub
