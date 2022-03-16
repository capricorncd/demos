/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-13 09:22 (GMT+0900)
 */
// import { AnyObject } from '@/types'

// export function getStyles(styles: AnyObject, defaultStyles: AnyObject = {}) {}

export function getClasses(...args: any[]): string {
  return args
    .reduce((arr: string[], item: string | string[]) => {
      if (Array.isArray(item)) {
        arr.push(...item)
      } else if (item) {
        arr.push(item)
      }
      return arr
    }, new Array<string>())
    .join(' ')
}
