/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/03/07 20:04:54 (GMT+0900)
 */

export function isIos(): boolean {
  // @ts-ignore
  const platform = navigator.userAgentData?.platform || navigator.platform
  return /(iphone|ipod|ios|ipad)/ig.test(navigator.userAgent) && /iPhone|ipod|ipad/i.test(platform)
}

export function isWeiXin(): boolean {
  return /MicroMessenger/i.test(navigator.userAgent)
}

export function getBrowserType(): string {
  const userAgent = navigator.userAgent
  if (/(Trident|Edge)/.test(userAgent)) return 'ie'
  if (userAgent.indexOf('Opera') > -1) return 'opera'
  if (userAgent.indexOf('Firefox') > -1) return 'firefox'
  if (userAgent.indexOf('Chrome') > -1) return 'chrome'
  if (userAgent.indexOf('Safari') > -1) return 'safari'
  if (isWeiXin()) return 'weixin'
  if (userAgent.match(/QQ|MQQBrowser/)) return 'qq'
  return ''
}

export function browserVersion(browserType: string): number | null {
  const userAgent = navigator.userAgent
  browserType = browserType || getBrowserType()
  let version: number | null = null
  switch (browserType) {
    case 'ie':
      if (/MSIE (\d+)|rv:(\d+)/.test(userAgent)) {
        version = +(RegExp.$1 || RegExp.$2)
      }
      break
    // case 'opera':
    //   if (/Opera[/ ](\d+)/.test(userAgent)) {
    //     version = +RegExp.$1
    //   }
    //   break
    // firefox, chrome, safari
    default:
      let reg = new RegExp(browserType + '[/ ](\\d+)', 'i')
      if (reg.test(userAgent)) {
        version = +RegExp.$1
      }
  }
  return version
}

export function supportWebp(): boolean {
  try {
    return !![].map
      && 0 === document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp')
      && !isVivoBrowser()
  } catch (e) {
    return false
  }
}

function isVivoBrowser(): boolean {
  return /VivoBrowser/ig.test(navigator.userAgent)
}

export function isMacOS(): boolean {
  // @ts-ignore
  const platform = navigator.userAgentData?.platform || navigator.platform
  return ['Mac68K', 'MacPPC', 'Macintosh', 'MacIntel', 'macOS'].includes(platform)
}

export function isMobile(): boolean {
  const userAgent = navigator.userAgent
  return /(android|iphone|symbianos|ipod|ipad|windows phone)/i.test(userAgent)
}

export function loadImgSource (data: Record<string, string>): Promise<void> {
  return new Promise(resolve => {
    let count = 0
    let len = Object.keys(data).length
    // for
    for (let key in data) {
      // @ts-ignore
      _load(data[key])
    }
    // load
    function _load (url: string): void {
      let $img = new Image()
      $img.src = url
      $img.onload = _count
      $img.onerror = _count
    }
    // count
    function _count () {
      count++
      if (count === len) {
        resolve()
      }
    }
  })
}