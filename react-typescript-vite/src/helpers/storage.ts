/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-24 22:21 (GMT+0900)
 */
export function setCache<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value))
}

export function getCache<T>(key: string, defaultValue: T | null = null): T | null {
  try {
    const cache = localStorage.getItem(key)
    return cache ? JSON.parse(cache) : defaultValue
  } catch (e) {
    return defaultValue
  }
}

export function removeCache(key: string): void {
  localStorage.removeItem(key)
}

export function clearCache() {
  localStorage.clear()
}
