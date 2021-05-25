/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-05-25 20:52
 */
import { effectWatch } from './Dependence.js'

export function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      const context = rootComponent.setup()
      effectWatch(() => {
        rootContainer.innerHTML = ''
        const el = rootComponent.render(context)
        rootContainer.append(el)
      })
    }
  }
}
