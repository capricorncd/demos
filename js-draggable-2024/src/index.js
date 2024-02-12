import { $ } from 'zx-sml'
import { Flip } from './Flip'

const list = $('#list')

const CLASS_NAME_DRAGSTART = 'drag-start'

let currentEl;
let flip;
/**
 * 
 * @param {HTMLElement} el 
 * @param {string} className 
 */
function asyncAddClass(el, className) {
  setTimeout(() => el.classList.add(className), 0)
}

list.addEventListener('dragstart', (e) => {
  asyncAddClass(e.target, CLASS_NAME_DRAGSTART)
  e.dataTransfer.effectAllowed = 'move'
  currentEl = e.target
  flip = new Flip([...list.children])
})

list.addEventListener('dragover', (e) => {
  e.preventDefault()
})

list.addEventListener('dragenter', (e) => {
  e.preventDefault()
  const el = e.target
  if (el === list || el === currentEl) return
  const children = [...list.children]
  const currentElIndex = children.indexOf(currentEl)
  const targetElIndex = children.indexOf(el)
  if (currentElIndex < targetElIndex) {
    console.log('down')
    list.insertBefore(currentEl, el.nextElementSibling)
  } else {
    console.log('up')
    list.insertBefore(currentEl, el)
  }
  flip.play();
})

list.addEventListener('dragend', (e) => {
  e.target.classList.remove(CLASS_NAME_DRAGSTART)
})