/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-10-30 17:51
 */
export function isMacOS() {
  const ua = navigator.userAgent
  return ['Mac68K', 'MacPPC', 'Macintosh', 'MacIntel'].some((os) => ua.includes(os))
}
