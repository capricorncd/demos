/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-07-20 21:26 (GMT+0900)
 */
import * as PIXI from 'pixi.js'

export default class Background {
  private scrollPosition: number;
  private frame: PIXI.Container;
  private cloudFrame: PIXI.Container;

  constructor(app: PIXI.Application) {
    this.scrollPosition = 0

    this.frame = new PIXI.Container()
    this.frame.y = -2394
    // 600 * 799
    const top = PIXI.Sprite.from('shmupBG_top.jpg')
    const mid = PIXI.Sprite.from('shmupBG_mid.jpg')
    const bot = PIXI.Sprite.from('shmupBG_bot.jpg')
    const topCopy = PIXI.Sprite.from('shmupBG_top.jpg')
    top.y = 0
    mid.y = 798
    bot.y = 1596
    topCopy.y = 2394

    this.frame.addChild(top)
    this.frame.addChild(mid)
    this.frame.addChild(bot)
    this.frame.addChild(topCopy)
    app.stage.addChild(this.frame)

    // 600 * 800
    this.cloudFrame = new PIXI.Container()
    this.cloudFrame.y = -1600
    const cloudTop = PIXI.Sprite.from('cloudsFORE_top.png')
    const cloudBot = PIXI.Sprite.from('cloudsFORE_bot.png')
    const cloudTopCopy = PIXI.Sprite.from('cloudsFORE_top.png')
    cloudTop.position.set(0, 0)
    cloudBot.position.set(0, 800)
    cloudTopCopy.position.set(0, 1600)
    this.cloudFrame.addChild(cloudTop)
    this.cloudFrame.addChild(cloudBot)
    this.cloudFrame.addChild(cloudTopCopy)
    app.stage.addChild(this.cloudFrame)
  }

  update(delta: number): void {
    this.frame.y += 5 * delta
    if (this.frame.y >= 0) {
      this.frame.y = -2394
    }
    this.cloudFrame.y += 8 * delta
    if (this.cloudFrame.y >= 0) {
      this.cloudFrame.y = -1600
    }
  }
}
