/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-12 16:38 (GMT+0900)
 */
// @ts-ignore
window.__CALC_WIDTH__ = 414

export function init(el: HTMLElement): void {
  setRootCaleWidth(el)
  window.addEventListener('resize', () => {
    setRootCaleWidth(el)
  })
}

function setRootCaleWidth(el: HTMLElement): void {
  const winWidth = window.innerWidth
  const calcWidth = winWidth > 640 ? winWidth * 0.6 : 414
  // @ts-ignore
  window.__CALC_WIDTH__ = calcWidth
  el.setAttribute('style', `--root-calc-width: ${calcWidth};`)
}
