/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-07-20 21:26 (GMT+0900)
 */
import * as PIXI from 'pixi.js'
import { gsap } from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'
import './style.scss'
import Background from './Background2'

// register the plugin
gsap.registerPlugin(PixiPlugin)

// give the plugin a reference to the PIXI object
PixiPlugin.registerPIXI(PIXI)

const app = new PIXI.Application({
  width: 600,
  height: 800,
  resolution: window.devicePixelRatio || 1,
  backgroundColor: 0x000000
})

const container = document.querySelector('#app') as HTMLElement
container.appendChild(app.view)

app.loader
  .add('./static/background.json')
  .load(onAssetsLoaded)

function onAssetsLoaded() {
  const bg = new Background(app)

  app.ticker.add((delta) => {
    bg.update(delta)
  })
}
