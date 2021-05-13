/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-07-25 17:01
 */
function $ (s) {
  return document.querySelector(s)
}

function createMenu (arr, isChildren = false) {
  if (!Array.isArray(arr)) {
    return  []
  }
  const result = arr.reduce((prev, item) => {
    if (Array.isArray(item.children) && item.children.length > 0) {
      prev.push(`<li>`)
      prev.push(`<div>${item.text}</div>`)
      prev.push(createMenu(item.children, true))
      prev.push(`</li>`)
    } else if (item.isFile) {
      prev.push(`<li><a href="${item.url}">${item.text}</a></li>`)
    }
    return prev
  }, [])
  if (isChildren) {
    result.unshift('<ul>')
    result.push('</ul>')
  }
  return result.join('')
}

if (Array.isArray(window.MDC_MENU_ARRAY)) {
  let li = createMenu(window.MDC_MENU_ARRAY)
  $('.menu-wrapper').innerHTML = li
}

$('.close').addEventListener('click', function () {
  $('.aside-wrapper').style.transform = 'translateX(-100%)'
  $('.aside-icon-wrapper').style.display = 'block'
}, false)

$('.aside-icon-wrapper').addEventListener('click', function () {
  $('.aside-wrapper').style.display = 'block'
  $('.aside-wrapper').style.transform = 'translateX(0)'
  $('.aside-icon-wrapper').style.display = 'none'
}, false)
