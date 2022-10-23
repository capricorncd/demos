/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-06 20:33
 */
import React, { Component } from 'react'
import './github.scss'

const DEMOS_SOURCE_MAIN_URL = 'https://github.com/capricorncd/demos/tree/main/'
const HOME_URL = 'https://capricorncd.github.io/'

const list = [
  // {
  //   name: '新選組 ～桜華妖乱～',
  //   cover: './static/game-shinsengumi.jpg',
  //   url: 'https://www.shinsengumi-ouka.com/',
  //   desc: [
  //     {
  //       text: '幕末の京都を舞台に繰り広げられる、新たなる新選組の物語。美しく咲く女性隊士と共に妖屍(あやかし)を討ち、歴史を切り拓け！'
  //     },
  //     {
  //       tag: 'Tags',
  //       text: 'TypeScript'
  //     },
  //     {
  //       tag: '公式サイト',
  //       url: 'https://www.shinsengumi-ouka.com'
  //     },
  //     {
  //       tag: 'Yamada Game',
  //       url: 'https://yamada.shinsengumi-ouka.com'
  //     },
  //     {
  //       tag: 'GREE',
  //       url: 'http://jp.apps.gree.net/ja/80174'
  //     }
  //   ]
  // },
  // {
  //   name: 'vite-react-typescript',
  //   cover: './static/vite-react-typescript.png',
  //   url: 'https://github.com/capricorncd/demos/tree/main/vite-react-typescript',
  //   desc: [
  //     {
  //       text: 'レストランのスマホ注文システム'
  //     },
  //     {
  //       tag: 'Tags',
  //       text: 'React(hook)/TypeScript/Vite/Sass'
  //     },
  //     {
  //       tag: 'Source',
  //       url: DEMOS_SOURCE_MAIN_URL + 'vite-react-typescript'
  //     }
  //   ]
  // },
  {
    name: 'image-process',
    coverBg: 'linear-gradient(142deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)',
    url: 'https://github.com/capricorncd/image-process-tools',
    desc: [
      {
        text: 'A Image clipping or scaling, support local or same domain video file screenshot. It\'s implemented in canvas.'
      },
      {
        tag: 'Tags',
        text: 'TypeScript/Vite',
      },
      {
        tag: 'Demo',
        url: 'https://capricorncd.github.io/image-process-tools/demo/'
      },
    ],
    npm: [
      {
        url: 'https://npmcharts.com/compare/image-process?minimal=true',
        icon: 'https://img.shields.io/npm/dm/image-process.svg?sanitize=true',
        alt: 'Downloads'
      },
      {
        url: 'https://www.npmjs.com/package/image-process',
        icon: 'https://img.shields.io/npm/v/image-process.svg?sanitize=true',
        alt: 'Version'
      },
      {
        url: 'https://www.npmjs.com/package/image-process',
        icon: 'https://img.shields.io/npm/l/image-process.svg?sanitize=true',
        alt: 'License'
      }
    ]
  },
  {
    name: 'blockchain',
    coverBg: 'linear-gradient(90deg, rgba(2,0,40,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
    url: 'https://github.com/capricorncd/blockchain',
    desc: [
      {
        text: 'A blockchain is a type of Digital Ledger Technology (DLT) that consists of growing list of records, called blocks, that are securely linked together using cryptography.'
      },
      {
        tag: 'Tags',
        text: 'TypeScript/React/AntDesign/Vite',
      },
      {
        tag: 'Demo',
        url: 'https://capricorncd.github.io/demos/blockchain/'
      },
    ],
  },
  {
    name: 'Music Card Demo',
    cover: './static/music-card.jpg',
    url: HOME_URL + 'demos/music-card/',
    desc: [
      {
        text: 'The music card that Web mini-program application in Smartphone App'
      },
      {
        tag: 'Tags',
        text: 'JavaScript/Vue2.js/Scss/Webpack4',
      },
      {
        tag: 'Demo',
        url: HOME_URL + 'demos/music-card/'
      },
      {
        tag: 'Source',
        url: DEMOS_SOURCE_MAIN_URL + 'music-card'
      }
    ]
  },
  {
    name: 'zx-calendar',
    cover: './static/zx-calendar.png',
    url: 'https://github.com/capricorncd/calendar#zx-calendar',
    desc: [
      {
        text: 'zx-calendar, zx-vue-calendar (Vue2.x.x and Vue3.x.x), zx-react-calendar'
      },
      {
        tag: 'Tags',
        text: 'JavaScript/Vue.js/React.js/TypeScript/Scss/Webpack4',
      },
      {
        tag: 'Demo',
        url: 'https://capricorncd.github.io/calendar/dist/index.html'
      },
      {
        tag: 'Vue2.x',
        url: 'https://capricorncd.github.io/calendar/dist/vue.html'
      },
      {
        tag: 'React',
        url: 'https://capricorncd.github.io/calendar/dist/react.html'
      }
    ],
    npm: [
      {
        url: 'https://npmcharts.com/compare/zx-calendar?minimal=true',
        icon: 'https://img.shields.io/npm/dm/zx-calendar.svg?sanitize=true',
        alt: 'Downloads'
      },
      {
        url: 'https://www.npmjs.com/package/zx-calendar',
        icon: 'https://img.shields.io/npm/v/zx-calendar.svg?sanitize=true',
        alt: 'Version'
      },
      {
        url: 'https://www.npmjs.com/package/zx-calendar',
        icon: 'https://img.shields.io/npm/l/zx-calendar.svg?sanitize=true',
        alt: 'License'
      }
    ]
  },
  {
    name: 'zx-sml',
    coverBg: 'linear-gradient(337deg, rgba(1,48,138,1) 0%, rgba(22,187,212,1) 76%)',
    url: 'https://github.com/capricorncd/zx-sml',
    desc: [
      {
        text: 'zx-sml is some static method library, which contains toSnakeCase, splitValue, getLocalStorage, formatDate, createElement, classNames and other methods. And zx-sml/nodejs is some tool functions used in the Nodejs environment, which contains getCommentsData, outputFile, mkdirSync and other methods. It is mainly used to obtain the comment information in the code, and then output it as a Markdown file.'
      },
      {
        tag: 'Tags',
        text: 'TypeScript/Vite',
      },
    ],
    npm: [
      {
        url: 'https://npmcharts.com/compare/zx-sml?minimal=true',
        icon: 'https://img.shields.io/npm/dm/zx-sml.svg?sanitize=true',
        alt: 'Downloads'
      },
      {
        url: 'https://www.npmjs.com/package/zx-sml',
        icon: 'https://img.shields.io/npm/v/zx-sml.svg?sanitize=true',
        alt: 'Version'
      },
      {
        url: 'https://www.npmjs.com/package/zx-sml',
        icon: 'https://img.shields.io/npm/l/zx-sml.svg?sanitize=true',
        alt: 'License'
      }
    ]
  },
  {
    name: 'Tetris Game. (俄罗斯方块/テトリス)',
    cover: './static/tetris.png',
    url: 'https://github.com/capricorncd/tetris',
    desc: [
      {
        text: 'Tetris is a tile-matching video game created by Russian software engineer Alexey Pajitnov in 1984. '
      },
      {
        tag: 'Tags',
        text: 'TypeScript/Sass/Webpack5/AudioContext'
      },
      {
        tag: 'Play',
        url: 'https://capricorncd.github.io/tetris/dist/index.html',
      },
      {
        tag: 'Source',
        url: 'https://github.com/capricorncd/tetris'
      }
    ],
    npm: [
      {
        url: 'https://npmcharts.com/compare/zx-tetris?minimal=true',
        icon: 'https://img.shields.io/npm/dm/zx-tetris.svg?sanitize=true',
        alt: 'Downloads'
      },
      {
        url: 'https://www.npmjs.com/package/zx-tetris',
        icon: 'https://img.shields.io/npm/v/zx-tetris.svg?sanitize=true',
        alt: 'Version'
      },
      {
        url: 'https://www.npmjs.com/package/zx-tetris',
        icon: 'https://img.shields.io/npm/l/zx-tetris.svg?sanitize=true',
        alt: 'License'
      }
    ]
  },
  {
    name: 'zx-editor',
    cover: './static/zx-editor.png',
    url: 'https://github.com/capricorncd/zx-editor',
    desc: [
      {
        text: 'The HTML document (rich text) editor in Smart phone browser or webview, supporting mixed layout, reference, headline, unordered list, font color, bold and italics.'
      },
      {
        tag: 'Tags',
        text: 'JavaScript/HTML5/Less/Gulp/Rollup',
      },
      {
        tag: 'Demo',
        url: 'https://capricorncd.github.io/zx-editor/'
      },
      {
        tag: 'Source',
        url: 'https://github.com/capricorncd/zx-editor'
      },
      {
        tag: 'Docs',
        url: 'https://capricorncd.github.io/zx-editor/docs/options.html#textStyleheadLeftbtntext'
      }
    ],
    npm: [
      {
        url: 'https://npmcharts.com/compare/zx-editor?minimal=true',
        icon: 'https://img.shields.io/npm/dm/zx-editor.svg?sanitize=true',
        alt: 'Downloads'
      },
      {
        url: 'https://www.npmjs.com/package/zx-editor',
        icon: 'https://img.shields.io/npm/v/zx-editor.svg?sanitize=true',
        alt: 'Version'
      },
      {
        url: 'https://www.npmjs.com/package/zx-editor',
        icon: 'https://img.shields.io/npm/l/zx-editor.svg?sanitize=true',
        alt: 'License'
      }
    ]
  },
  {
    // name: 'C4D + Three.js',
    name: 'C4DとThree.jsで製品の3D表示ページの開発 Demo',
    cover: './static/three.png',
    url: HOME_URL + 'demos/three/index.html#/ClockObj',
    desc: [
      {
        text: 'Developing 3D display pages for products in C4D and Three.js'
      },
      {
        tag: 'Tags',
        text: 'C4D/Three.js/React.js/Scss/Webpack4'
      },
      {
        tag: 'Qiita',
        url: 'https://qiita.com/capricorncd/items/881b22208521e2ae31a4'
      },
      {
        tag: 'Source',
        url: DEMOS_SOURCE_MAIN_URL + 'three'
      }
    ]
  },
  {
    name: 'School Circle Web Site',
    cover: './static/app-site.jpg',
    url: HOME_URL + 'demos/app-website/',
    desc: [
      {
        text: 'Listen,it\'s like falling in love'
      },
      {
        tag: 'Tags',
        text: 'Nuxt.js(Vue.js)/Sass/CSS3(animation)/HTML5'
      },
      {
        tag: 'Source',
        url: DEMOS_SOURCE_MAIN_URL + 'app-website'
      }
    ]
  },
  {
    name: 'Web Audio Demo',
    cover: './static/web-audio.png',
    url: HOME_URL + 'demos/web-audio/',
    desc: [
      {
        text: 'Use AudioContext to achieve cool music playback effects  in the browser'
      },
      {
        tag: 'Tags',
        text: 'JavaScript/AudioContext/Canvas/Scss/Webpack5'
      },
      {
        tag: 'Demo',
        url: HOME_URL + 'demos/web-audio/'
      },
      {
        tag: 'Source',
        url: DEMOS_SOURCE_MAIN_URL + 'web-audio'
      }
    ]
  },
]

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
          return <a href={npm.url} target="_blank" key={i}>
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
          desc.url ? <a href={desc.url} target="_blank">{ desc.url }</a> : desc.text
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
            <a href={item.url} target="_blank">{ item.name }</a>
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