// import { $$, createElement } from 'zx-sml'
import { $ } from 'zx-sml'
import './style.scss'

function random(min, max) {
  return min + Math.floor(Math.random() * max)
}

function randomBoxShadowStyle(max, min, starSize) {
  return `${random(min, max)}px ${random(min, max)}px 0 ${starSize}px rgba(255, 255, 255, ${Math.random()})`
}

function randomStars(count, max, min, starSize) {
  let boxShadowStyle = randomBoxShadowStyle(max, min, starSize)
  for (let i = 0; i < count; i++) {
    boxShadowStyle += ', ' + randomBoxShadowStyle(max, min, starSize)
  }
  return `box-shadow: ${boxShadowStyle}`
}

function createStyle() {
  const style = document.createElement('style')
  document.head.appendChild(style)
  const sheet = style.sheet
  const asteroidBeltStars = randomStars(400, 290, -290 / 2, -104)
  sheet.insertRule(`.asteroid-belt::before {${asteroidBeltStars}}`)

  const wholeBackgroundStars = randomStars(500, 1800, 0, 0)
  sheet.insertRule(`.solar-system::after {${wholeBackgroundStars}}`)
}

// function createTips() {
//   const els = $$('.solar-system div');
//   els.forEach(el => {
//     const text = el.textContent
//     if (text && text !== '小行星带') {
//       el.appendChild(createElement('span', {}, text))
//     }
//   })
// }

function main() {
  document.addEventListener('DOMContentLoaded', () => {
    createStyle()
    // createTips()
    $('.solar-system').addEventListener('click', () => {
      window.open('https://github.com/capricorncd/demos/tree/main/css-solar-system', '_blank')
    })
  })
}

main()