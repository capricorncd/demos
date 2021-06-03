/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-03 22:07
 */
function slice(arrayLike, offset = 0) {
  return Array.prototype.slice.call(arrayLike, offset)
}

function $(selector, parent) {
  parent = parent || document
  return slice(parent.querySelectorAll(selector))
}

module.exports = {
  $,
  slice,
}
