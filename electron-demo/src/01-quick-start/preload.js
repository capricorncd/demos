/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-03 22:04
 */
const { contextBridge } = require('electron')
const { $ } = require('../helpers')

// set versions to global window
contextBridge.exposeInMainWorld('versions', process.versions)

window.addEventListener('DOMContentLoaded', () => {
  const el = $('#app')[0]

  function createNode(text, ver) {
    const div = document.createElement('div')
    div.textContent = text + ver
    el.append(div)
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    createNode(`${dependency}-version`, process.versions[dependency])
  }
})
