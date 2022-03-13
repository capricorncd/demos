/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/03/13 10:45:21 (GMT+0900)
 *
 * 提前确认
 * Confirm in advance
 */
function on(el, event, handler) {
  if (el && event && handler) {
    if (!!document.addEventListener) {
      el.addEventListener(event, handler, false)
    } else {
      // old IE browser
      el.attachEvent(`on${event}`, handler)
    }
  }
}

on(document.createElement('div'), 'click', (e) => console.log(e))

function curring() {
  if (!document.addEventListener) {
    return (el, event, handler) => {
      if (el && event && handler) {
        el.attachEvent(`on${event}`, handler)
      }
    }
  }
  return (el, event, handler) => {
    if (el && event && handler) {
      el.addEventListener(event, handler, false)
    }
  }
}

const handleOnEvent = curring()
handleOnEvent(document.createElement('div'), 'click', (e) => console.log(e))
