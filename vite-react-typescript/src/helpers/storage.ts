/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-24 22:21 (GMT+0900)
 */
function getStorage(isSessionStorage: boolean): Storage {
  return isSessionStorage ? sessionStorage : localStorage
}

export function setCache<T>(key: string, value: T, isSessionStorage = false): void {
  getStorage(isSessionStorage).setItem(key, JSON.stringify(value))
}

export function getCache<T>(key: string, isSessionStorage = false): T | null {
  try {
    const cache = getStorage(isSessionStorage).getItem(key)
    return cache ? JSON.parse(cache) : null
  } catch (e) {
    return null
  }
}

export function removeCache(key: string, isSessionStorage = false): void {
  getStorage(isSessionStorage).removeItem(key)
}

export function removeCacheAll(isSessionStorage = false) {
  getStorage(isSessionStorage).clear()
}
