/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-05 21:30
 */
import { AnyObject } from '@/types'
export * from './select'

export function createElement<T extends HTMLElement>(tag: string, attrs: AnyObject = {}, children?: string): T {
  const el = document.createElement(tag)
  Object.keys(attrs).forEach(key => {
    el.setAttribute(key, attrs[key])
  })
  if (typeof children === 'string') {
    el.innerHTML = children
  }
  return el as T
}

export function $<T extends HTMLElement>(selector: string, doc: Document | HTMLElement = document): T {
  return doc.querySelector(selector) as T
}
