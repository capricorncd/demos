/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-05 21:30
 */
import { AnyObject } from '@/types'
export * from './select'

export function createElement(tag: string, attrs: AnyObject = {}, children?: string): HTMLElement {
  const el = document.createElement(tag)
  Object.keys(attrs).forEach(key => {
    el.setAttribute(key, attrs[key])
  })
  if (typeof children === 'string') {
    el.textContent = children
  }
  return el
}
