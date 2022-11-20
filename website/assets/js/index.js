/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-10-30 17:51
 */
import { isMacOS } from './device'

export {
  isMacOS
}

export function throttle(fn, wait = 250) {
  let lastExecMsec, timer

  return function throttled (...args) {
    const context = this
    const now = +new Date()

    if (lastExecMsec && lastExecMsec + wait > now) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        lastExecMsec = now
        fn.apply(context, args)
      }, wait)
    } else {
      lastExecMsec = now
      fn.apply(context, args)
    }
  }
}
