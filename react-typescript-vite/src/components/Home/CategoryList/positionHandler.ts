/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-13 18:39 (GMT+0900)
 */
import { $ } from '@/helpers'
import { Tween, Easing, update } from '@tweenjs/tween.js'

function scrollToTop(el: HTMLElement, offsetTop: number, callback?: () => void): Tween<{ top: number }> {
  let animeId: number | null = null
  let tween: Tween<{ top: number }> | null = new Tween({ top: el.scrollTop })
    .to({ top: offsetTop - el.offsetTop - 10 }, 250)
    .easing(Easing.Quadratic.Out)
    .onUpdate(({ top }) => {
      el.scrollTop = top
    })
    .onComplete(() => {
      if (animeId) {
        cancelAnimationFrame(animeId)
        animeId = null
      }
      if (callback) setTimeout(callback, 250)
      tween = null
    })
    .start()

  function animate() {
    animeId = requestAnimationFrame(animate)
    update()
  }
  animate()

  return tween
}

export function positionHandler(parent: HTMLElement, currentIndex: number, callback?: () => void): void {
  const lis = $('li', parent)
  for (let k = 0; k < lis.length; k++) {
    if (currentIndex === k) {
      // parent.scrollTop = lis[k].offsetTop - parent.offsetTop - 10
      scrollToTop(parent, lis[k].offsetTop, callback)
      break
    }
  }
}
