/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-05-26 21:13
 */
import { mountElement } from './renderer.js'

export function diff(newTree, oldTree) {
  // 1.tag changed
  if (newTree.tag !== oldTree.tag) {
    oldTree.el.replaceWith(document.createElement(newTree.tag))
  }
  // 2.props changed
  // 3.children changed
  else {
    // 2.props changed
    const { props: newProps = {} } = newTree
    const { props: oldProps } = oldTree
    if (newProps && oldProps) {
      let newVal, oldVal
      Object.keys(newProps).forEach(key => {
        newVal = newProps[key]
        oldVal = oldProps[key]
        if (newVal !== oldVal) {
          oldTree.el.setAttribute(key, newVal)
        }
      })
    }

    if (oldProps) {
      Object.keys(oldProps).forEach(key => {
        if (typeof newProps[key] === 'undefined') {
          oldTree.el.removeAttribute(key)
        }
      })
    }
    // 3.children changed
    const { children: newChildren } = newTree
    const { children: oldChildren } = oldTree
    // newChildren is an array
    if (Array.isArray(newChildren)) {
      if (Array.isArray(oldChildren)) {

        // if (newChildren.length === oldChildren.length) {
        //   newChildren.forEach((newVNode, i) => {
        //     diff(newVNode, oldChildren[i])
        //   })
        // } else {
        //   oldTree.el.innerHTML = ''
        //   newChildren.forEach(v => {
        //     mountElement(v, oldTree.el)
        //   })
        // }

        const minLen = Math.min(newChildren.length, oldChildren.length)
        for (let i = 0; i < minLen; i++) {
          diff(newChildren[i], oldChildren[i])
        }

        if (newChildren.length > minLen) {
          // 新增DOM节点
          newChildren.slice(minLen).forEach(v => {
            mountElement(v, oldTree.el)
          })
        } else {
          // 删除旧的DOM节点
          oldChildren.slice(minLen).forEach(v => {
            v.el.parentElement.removeChild(v.el)
          })
        }

      } else {
        oldTree.el.innerHTML = ''
        newChildren.forEach(v => {
          mountElement(v, oldTree.el)
        })
      }
    }
    // newChildren is a string
    else {
      // oldTree.el.innerHTML = ''
      // oldTree.el.append(document.createTextNode(String(newChildren)))
      // if (Array.isArray(oldChildren)) {
      //   oldTree.el.innerHTML = ''
      //   oldTree.el.append(document.createTextNode(String(newChildren)))
      // } else {
      //   if (newChildren !== oldChildren) {
      //     oldTree.el.innerHTML = ''
      //     oldTree.el.append(document.createTextNode(String(newChildren)))
      //   }
      // }
      if (newChildren !== oldChildren) {
        oldTree.el.textContent = newChildren
      }
    }
  }
  newTree.el = oldTree.el
}
