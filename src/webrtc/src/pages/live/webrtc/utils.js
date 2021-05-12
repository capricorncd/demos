/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-07-31 00:26
 */
const DEF_OPTIONS = {
  type: 'video/webm'
}

export function createUrl (buffer, options) {
  const blob = new Blob(buffer, { ...DEF_OPTIONS, ...options })
  return window.URL.createObjectURL(blob)
}
