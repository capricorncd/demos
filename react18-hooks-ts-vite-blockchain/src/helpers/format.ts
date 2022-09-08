/**
 * Created by Xing Zhong.
 * https://github.com/capricorncd
 * https://github.com/xing1984
 * Date: 2022/09/08 20:39:26 (GMT+0900)
 */

/**
 * @method padStart(n)
 * @param n `number | string`
 * @returns
 */
export function padStart(n: number | string): string {
  return String(n).padStart(5, '0');
}
