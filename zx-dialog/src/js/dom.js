import util from './util'
export default {
  /**
   * 获取满足selector条件$el的最近的父级元素
   * @param selector
   * @param $el
   * @returns {*}
   */
  closest (selector, $el) {
    const matchesSelector = $el.matches
      || $el.webkitMatchesSelector
      || $el.mozMatchesSelector
      || $el.msMatchesSelector

    while ($el) {
      if (matchesSelector.call($el, selector)) {
        break
      }
      // console.log($el)
      $el = $el.parentNode
    }
    return $el
  },

  /**
   * 创建Vdom
   * @param vnode
   * @returns {*}
   */
  createVdom (vnode) {
    if (!vnode) return null
    if (typeof vnode === 'string') {
      return document.createTextNode(vnode)
    }
    let tag = vnode.tag
    let attrs = vnode.attrs
    let child = vnode.child
    if (!tag && !attrs && !child) return null
    // 创建dom
    const $el = this.createElm(vnode.tag || 'div', vnode.attrs)
    if (Array.isArray(child) && child.length) {
      let $itemNode
      child.forEach(item => {
        $itemNode = this.createVdom(item)
        if ($itemNode) $el.appendChild($itemNode)
      })
    } else if (child && typeof child === 'string') {
      $el.appendChild(document.createTextNode(child))
    }
    return $el
  },
  /**
   * 创建DOM元素
   * @param tag 标签名称
   * @param opts 标签属性
   * @returns {Element}
   */
  createElm (tag = 'div', opts) {
    let elm = document.createElement(tag)
    if (opts && opts instanceof Object) {
      for (let key in opts) {
        if (opts.hasOwnProperty(key)) {
          elm.setAttribute(key, opts[key])
        }
      }
    }
    return elm
  },

  /**
   * 获取$el的css样式
   * @param $el
   * @param prop 指定属性
   * @returns {*}
   */
  getStyle ($el, prop) {
    if (!this.isHTMLElement($el)) return null
    const style = window.getComputedStyle($el, null)
    let result = null
    if (prop) {
      try {
        result = style[util.strToHump(prop)]
      } catch (e) {}
    } else {
      result = style
    }
    return result
  },

  /**
   * $el是否为HTML元素节点
   * @param $el
   * @returns {*|boolean}
   */
  isHTMLElement ($el) {
    return $el && $el instanceof HTMLElement
  },

  /**
   * dom节点选择器
   * @param selector 元素id、class、属性等
   * @param context 作用域，默认为documet
   * @returns {*}
   */
  query (selector, context = document) {
    return context.querySelector(selector)
  },

  queryAll (selector, context = document) {
    return context.querySelectorAll(selector)
  },

  /**
   * 事件绑定
   * @param $el
   * @param eventName 事件名称
   * @param handler 事件处理函数
   * @param useCapture 是否在冒泡阶段
   */
  addEvent ($el, eventName, handler, useCapture = false) {
    if (!$el || !eventName || !handler) return
    if ($el.length) {
      for (let i = 0; i < $el.length; i++) {
        $el[i].addEventListener(eventName, handler, useCapture)
      }
    } else {
      $el.addEventListener(eventName, handler, useCapture)
    }
  },
  removeEvent ($el, eventName, handler, useCapture = false) {
    if (!$el || !eventName || !handler) return
    if ($el.length) {
      for (let i = 0; i < $el.length; i++) {
        $el[i].removeEventListener(eventName, handler, useCapture)
      }
    } else {
      $el.removeEventListener(eventName, handler, useCapture)
    }
  },
  /**
   * 获取最大z-index
   * @returns {Number}
   */
  maxZIndex () {
    const $els = document.getElementsByTagName('*')
    let $el, css, zindex
    let arr = []
    for (let i = 0; i < $els.length; i++) {
      $el = $els[i]
      if ($el.nodeType !== 1) continue
      css = this.getStyle($el) || {}
      if (css.position !== 'static') {
        zindex = util.int(css.zIndex)
        if (zindex > 0) arr.push(zindex)
      }
    }
    return util.int(Math.max.apply(null, arr))
  },
  /**
   * overflow: hidden
   * @param $el
   */
  lock ($el) {
    if (typeof $el === 'undefined') {
      $el = this.query('body')
    }
    if (this.isHTMLElement($el)) {
      $el.style.overflow = 'hidden'
    }
  },

  /**
   * overflow: ''
   * @param $el
   */
  unlock ($el) {
    if (typeof $el === 'undefined') {
      $el = this.query('body')
    }
    if (this.isHTMLElement($el)) {
      $el.style.overflow = ''
    }
  }
}
