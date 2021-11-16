/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-05-26 20:50
 */
export function mountElement(vNode, container) {
  // if (!vNode || typeof vNode !== 'object') {
  //   container.append(document.createTextNode(String(vNode)))
  //   return
  // }
  const { tag, props, children } = vNode
  const el = vNode.el = document.createElement(tag || 'div')
  // props
  if (props) {
    for (let key in props) {
      el.setAttribute(key, props[key])
    }
  }
  // children
  if (Array.isArray(children)) {
    children.forEach(v => mountElement(v, el))
  } else {
    const child = document.createTextNode(String(children))
    el.append(child)
  }

  container.append(el);
}
