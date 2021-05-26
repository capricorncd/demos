/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-05-25 20:52
 */
import { effectWatch } from './Dependence.js'
import { mountElement } from './renderer.js'
import { diff } from './diff.js'

export function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      const context = rootComponent.setup()

      let isInitialed = false
      let prvTree

      effectWatch(() => {
        if (!isInitialed) {
          // init
          rootContainer.innerHTML = ''
          const tree = rootComponent.render(context)
          mountElement(tree, rootContainer)
          prvTree = tree
          console.log(tree)
          isInitialed = true
        } else {
          // update
          const tree = rootComponent.render(context)
          diff(tree, prvTree)
          prvTree = tree
        }
        // const tree = rootComponent.render(context)
        // mountElement(tree, rootContainer)
        // rootContainer.append(el)
      })
    }
  }
}
