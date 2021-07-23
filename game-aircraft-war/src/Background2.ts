/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-07-20 21:26 (GMT+0900)
 */
import * as PIXI from 'pixi.js'

export default class Background {
  private scrollPosition: number;
  private frames: PIXI.Sprite[];
  private cloudFrames: PIXI.Sprite[];

  constructor(app: PIXI.Application) {
    this.scrollPosition = 0

    this.frames = [
      PIXI.Sprite.from('shmupBG_mid.jpg'),
      PIXI.Sprite.from('shmupBG_bot.jpg'),
      PIXI.Sprite.from('shmupBG_top.jpg')
    ]
    this.cloudFrames = [
      PIXI.Sprite.from('cloudsFORE_bot.png'),
      PIXI.Sprite.from('cloudsFORE_top.png')
    ]

    this.frames.forEach(sprite => {
      app.stage.addChild(sprite)
    })
    this.cloudFrames.forEach(sprite => {
      app.stage.addChild(sprite)
    })
  }

  update(delta: number): void {
    this.scrollPosition += 5 * delta
    for (let a, i = 0; i < this.frames.length; i++) {
      a = this.scrollPosition + 799 * i
      a %= 2397
      a -= 799
      this.frames[i].position.y = Math.round(a)
    }
    for (let a, i = 0; i < this.cloudFrames.length; i++) {
      a = 1.4 * this.scrollPosition
      a += 800 * i
      a %= 1600
      a -= 800
      this.cloudFrames[i].position.y = Math.round(a)
    }
  }
}
