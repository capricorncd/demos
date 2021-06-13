/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-13 18:39 (GMT+0900)
 */
import {$} from "@/helpers";

export function positionHandler(parent: HTMLElement, currentIndex: number): void {
  const lis = $('li', parent)
  for (let k = 0; k < lis.length; k++) {
    if (currentIndex === k) {
      parent.scrollTop = lis[k].offsetTop - parent.offsetTop - 10
      break
    }
  }
}
