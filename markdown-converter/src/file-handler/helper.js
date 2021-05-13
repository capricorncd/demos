/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-07-25 22:27
 */
function getDirPath (target) {
  return isFileName(target) ? target.substr(0, target.lastIndexOf('/')) : target
}

function isFileName(str) {
  return /.*\.\w+$/.test(str)
}

function formatTargetFile(target) {
  return target.toLowerCase()
    .replace(/\.md$/i, '.html')
    .replace(/readme\.html/, 'index.html')
}

module.exports = {
  formatTargetFile,
  getDirPath,
  isFileName,
}
