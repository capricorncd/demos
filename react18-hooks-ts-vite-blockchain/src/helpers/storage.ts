/**
 * Created by Xing Zhong.
 * https://github.com/capricorncd
 * https://github.com/xing1984
 * Date: 2022/09/08 20:39:26 (GMT+0900)
 */
/**
 * @method setLocalStorage(key, value)
 * @param key `string`
 * @param value `any`
 * @returns `void`
 */
export function setLocalStorage<T>(key: string, value: T): void {
  console.log(key, value);
  console.log(JSON.stringify(value, null, 2));
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * @method getLocalStorage(key, def)
 * @param key `string`
 * @param def? `any`
 * @returns `any`
 */
export function getLocalStorage<T>(key: string, def: T): T {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : def;
  } catch (err) {
    return def;
  }
}

/**
 * @method removeLocalStorage(key)
 * @param key `string`
 * @returns `void`
 */
export function removeLocalStorage(key: string): void {
  localStorage.removeItem(key);
}
