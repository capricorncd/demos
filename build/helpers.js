/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-03-01 20:47
 */
function getIPAddress() {
  const networkInterfaces = require('os').networkInterfaces()
  for (const [key, val] of Object.entries(networkInterfaces)) {
    if (/^vboxnet.*/.test(key)) continue
    for (const item of val) {
      if (item.family === 'IPv4' && item.address !== '127.0.0.1') {
        return item.address
      }
    }
  }
  return ''
}

function createScript(list) {
  if (!Array.isArray(list)) return [];
  return list.map(src => {
    return `<script src="${src}"></script>`
  })
}

function createLinks(list) {
  if (!Array.isArray(list)) return [];
  return list.map(href => {
    return `<link rel="stylesheet" href="${href}">`
  })
}

function getPageInput(args) {
  const input = args.find(word => /^-+\w+/.test(word))
  return input ? input.replace(/^-+/, '') : ''
}

module.exports = {
  getPageInput,
  getIPAddress,
  createScript,
  createLinks,
}
