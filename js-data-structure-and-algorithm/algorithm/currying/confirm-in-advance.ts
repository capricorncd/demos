/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/03/13 10:45:21 (GMT+0900)
 *
 * 提前确认
 * Confirm in advance
 */
function on<T>(el: HTMLElement, event: string, handler: (e: Event) => T): void {
  if (!!document.addEventListener) {
    el.addEventListener(event, handler, false)
  } else {
    // old IE browser
    // @ts-ignore
    el.attachEvent(`on${event}`, handler)
  }
}

on(document.createElement('div'), 'click', (e) => console.log(e))

function curring<T>() {
  if (!document.addEventListener) {
    return (el: HTMLElement, event: string, handler: (e: Event) => T) => {
      // @ts-ignore
      el.attachEvent(`on${event}`, handler)
    }
  }
  return (el: HTMLElement, event: string, handler: (e: Event) => T) => {
    el.addEventListener(event, handler, false)
  }
}

const handleOnEvent = curring()
handleOnEvent(document.createElement('div'), 'click', (e) => console.log(e))
