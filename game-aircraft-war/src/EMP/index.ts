/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-07-26 20:28 (GMT+0900)
 */
import * as PIXI from 'pixi.js'

export default class EMP {
  private sprite: PIXI.Sprite;
  private firstPhase: boolean;
  private isDead: boolean;
  constructor(app: PIXI.Application) {
    this.firstPhase = true
    this.isDead = false
    this.sprite = PIXI.Sprite.from('./static/EMP.png')
    this.sprite.anchor.set(0.5, 0.5)
    app.stage.addChild(this.sprite)
  }

  reset(x = 100, y = 100): void {
    this.isDead = false
    this.firstPhase = true
    this.sprite.alpha = 1
    this.sprite.position.set(x, y)
    this.sprite.scale.set(1)
  }

  update(): void {
    if (this.isDead) return
    const sprite = this.sprite
    if (this.firstPhase) {
      sprite.rotation += 0.2
      sprite.scale.x += 0.1 * (2 - sprite.scale.y)
      if (sprite.scale.x > 1.99) this.firstPhase = false
    } else {
      sprite.scale.x += 0.3 * (4 - sprite.scale.x)
      sprite.alpha *= 0.8
      if (sprite.alpha < 0.1) {
        sprite.alpha = 0
        this.isDead = true
      }
    }
    sprite.scale.y = sprite.scale.x
  }

  isEnded(): boolean {
    return this.isDead
  }
}
