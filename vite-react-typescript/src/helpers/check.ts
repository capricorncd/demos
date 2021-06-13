/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-12 15:21 (GMT+0900)
 */
export function isNumber(val: string | number): boolean {
  return typeof val === 'number' && !isNaN(val)
}

export function isNumberLike(val: string | number): boolean {
  return isNumber(val) || isNumber(Number(val))
}
