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

export function toNumber<T>(input: T, initValue = 0): number {
  try {
    const n = Number(input)
    return isNaN(n) ? initValue : n
  } catch (e) {
    return initValue
  }
}

/**
 * add comma
 * 33333 -> 33,333
 * @param input
 */
export function addComma(input: number | string): string {
  return input ? input.toLocaleString() : String(input)
}
