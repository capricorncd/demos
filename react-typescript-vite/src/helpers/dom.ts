/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-13 18:42 (GMT+0900)
 */
export function $<T extends HTMLElement>(selector: string, doc: Document | HTMLElement): T[] {
  return Array.prototype.slice.call(doc.querySelectorAll(selector), 0)
}

export function setBodyScrollStatus(visible: boolean): void {
  const body = document.querySelector('body') as HTMLBodyElement
  if (visible) {
    body.classList.add('overflow')
  } else {
    body.classList.remove('overflow')
  }
}
