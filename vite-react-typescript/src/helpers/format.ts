/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-12 15:21 (GMT+0900)
 */
import { isNumberLike } from './check'

export function calc(val: string | number): string {
  // @ts-ignore
  return isNumberLike(val) ? `${val}px` : String(val)
}

export function toNumber(input: string | number): number {
  try {
    const n = Number(input)
    return isNaN(n) ? 0 : n
  } catch (e) {
    return 0
  }
}
