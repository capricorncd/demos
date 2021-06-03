/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-03 22:04
 */
const { $ } = require('../helpers')

window.addEventListener('DOMContentLoaded', () => {
  const el = $('#app')[0]

  function createNode(text, ver) {
    const div = document.createElement('div')
    div.textContent = text + ver
    el.append(div)
  }

  console.log(process.versions)
  window.versions = process.versions
  for (const dependency of ['chrome', 'node', 'electron']) {
    createNode(`${dependency}-version`, process.versions[dependency])
  }
})
