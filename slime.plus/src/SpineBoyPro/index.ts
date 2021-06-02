/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-05-30 21:22
 */
import * as PIXI from 'pixi.js'
import { Spine, AnimationState } from 'pixi-spine'
import { SpineResource } from '@/types'

export class SpineBoyPro {
  constructor(app: PIXI.Application) {
    app.stage.interactive = true

    function onAssetsLoaded(loader: PIXI.Loader, res: Record<string, SpineResource>) {
      // create a spine boy
      const spineBoyPro = new Spine(res.spineBoyPro.spineData)

      // set the position
      spineBoyPro.x = app.screen.width / 2
      spineBoyPro.y = app.screen.height

      spineBoyPro.scale.set(0.5)

      app.stage.addChild(spineBoyPro)

      const singleAnimations = ['aim', 'death', 'jump', 'portal']
      const loopAnimations = ['hoverBoard', 'idle', 'run', 'shoot', 'walk']
      // @ts-ignore
      const allAnimations: string[] = [].concat(singleAnimations, loopAnimations)

      let lastAnimation = 'walk'
      const state = spineBoyPro.state as AnimationState
      state.setAnimation(0, lastAnimation, true)

      // Press the screen to play a random animation
      app.stage.on('pointerdown', () => {
        let animation = ''
        do {
          animation = allAnimations[Math.floor(Math.random() * allAnimations.length)]
        } while (animation === lastAnimation)

        state.setAnimation(0, animation, loopAnimations.includes(animation))

        lastAnimation = animation
      })
    }

    // load spine data
    app.loader.add('spineBoyPro', './static/spine-boy-pro.json').load(onAssetsLoaded)
  }
}
