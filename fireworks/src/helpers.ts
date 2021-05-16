/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-05-10 20:18
 */
export function random(max: number, min = 0, isInt = false): number {
  const result = Math.random() * (max - min) + min
  return isInt ? Math.round(result) : result
}

export function calcDistance(px1: number, py1: number, px2: number, py2: number): number {
  return Math.sqrt(Math.pow(px1 - px2, 2) + Math.pow(py1 - py2, 2))
}

export function gerElSize(el: Window | HTMLElement): { width: number, height: number } {
  const width = el instanceof Window ? window.innerWidth : el.offsetWidth
  const height = el instanceof Window ? window.innerHeight : el.offsetHeight
  return {
    width,
    height
  }
}

export function getElOffset(el: HTMLElement): { top: number; left: number } {
  let top = 0
  let left = 0
  while (el) {
    top += el.offsetTop
    left += el.offsetLeft
    el = el.offsetParent as HTMLElement
  }
  return {
    top,
    left
  }
}
