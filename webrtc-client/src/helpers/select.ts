/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-05 22:25
 */
import { createElement } from './index'
import { AnyObject } from '@/types'

function createSelect(name: string, children: AnyObject[]): HTMLElement {
  const dl = createElement('dl', { class: 'option-list-wrapper' })
  const dt = createElement('dt', {}, name)
  const dd = createElement('dd')
  const select = createElement('select', { name })
  let html = ''
  children.forEach(item => {
    html += `<option name="${name}" value="${item.deviceId}"/>${item.label}</label>`
  })
  select.innerHTML = html
  dd.append(select)
  dl.append(dt, dd)
  return dl
}

export function createSelects(data: Record<string, MediaDeviceInfo[]>, el: HTMLElement): string[] {
  const keys = Object.keys(data)
  // create device radio
  keys.forEach(key => {
    el.append(createSelect(key, data[key]))
  })

  createFilterSelect(el)
  keys.push('filters')
  return keys
}

function createFilterSelect(el: HTMLElement): void {
  const filters = [
    'none',
    'grayscale',
    'opacity',
    'sepia',
    'brightness',
    'saturate',
    'contrast',
    'hue-rotate',
    'blur',
    'invert',
    'drop-shadow'
  ].map(key => {
    const value = key === 'blur'
      ? 'blur(5px)'
      : key !== 'none' ? `${key}(1)` : ''
    return {
      label: key,
      deviceId: value
    }
  })
  el.append(createSelect('filters', filters))
}
