/**
 * Created by dev3cli.
 * https://github.com/capricorncd/dev3cli
 * Date: 2021-05-08 11:10:37
 *
 * 视频出处：
 * https://www.bilibili.com/video/BV1vU4y1b7qR
 */
import './style.scss'
import { random, gerElSize } from '@/helpers'
import { Firework } from '@/Firework'
import { Particle } from '@/Particle'

export function Fireworks(el: HTMLElement | Window): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  canvas.style.background = '#000'

  const fireworks: Firework[] = []
  const particles: Particle[] = []

  let { width, height } = gerElSize(el)
  canvas.width = width
  canvas.height = height

  window.addEventListener('resize', () => {
    const size = gerElSize(el)
    width = size.width
    height = size.height
    canvas.width = width
    canvas.height = height
  })

  function createFireworks(tx?: number, ty?: number): void {
    tx = tx ?? random(width)
    const firework = new Firework({
      x: random(tx + 20, tx - 20),
      y: height,
      targetX: tx,
      targetY: ty ?? random(height / 2),
      particles
    })
    fireworks.push(firework)
  }

  createFireworks()

  const MAX_COUNT = 20
  let count = 0

  function run() {
    requestAnimationFrame(run)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let i = fireworks.length
    while (i--) {
      fireworks[i].update(i, fireworks, ctx)
    }

    let j = particles.length
    while (j--) {
      particles[j].update(j, particles, ctx)
    }

    if (count > MAX_COUNT) {
      count = 0
      createFireworks()
    } else {
      count++
    }
  }

  canvas.addEventListener('mouseup', (e: MouseEvent) => {
    const tx = e.pageX
    const ty = e.pageY
    createFireworks(tx, ty)
  })

  run()

  return canvas
}
