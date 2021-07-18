/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-07-11 20:58 (GMT+0900)
 */
const userAgent = navigator.userAgent

export function isWeixin(): boolean {
  return /MicroMessenger/i.test(userAgent)
}

export function isLine() {
  return /Line/i.test(userAgent)
}
