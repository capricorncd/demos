/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-05-30 15:44
 */
import * as PIXI from 'pixi.js'

export class Slime {
  constructor(app: PIXI.Application) {
    const screen = app.screen
    const midPoints = {
      x: screen.width / 2,
      y: screen.height / 2
    }

    const graphics = new PIXI.Graphics()
    graphics.blendMode = PIXI.BLEND_MODES.ADD
    // @ts-ignore
    graphics.speedfactor = Math.random()
    // @ts-ignore
    graphics.scale.set(1 - graphics.speedfactor / 1.5)
    // @ts-ignore
    graphics.color = Math.random() * 0xFFFFFF
    // @ts-ignore
    graphics.customX = 600 * Math.random() - 300
    // @ts-ignore
    graphics.customY = 600 * Math.random() - 300

    const width = Math.cos(1) * 30
    const height = Math.sin(2) * 30
    // @ts-ignore
    graphics.beginFill(graphics.color) // Blue
    // Draw an ellipse
    // @ts-ignore
    graphics.drawEllipse(graphics.customX, graphics.customY, 50 + height, 50 + width) // drawEllipse(x, y, width, height)
    graphics.endFill()
    graphics.position.x = (midPoints.x + (150 * Math.cos(12)))
    graphics.position.y = (midPoints.y + (25 * Math.sin(21)))

    app.stage.addChild(graphics)
  }
}
