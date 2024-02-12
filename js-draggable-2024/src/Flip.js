import { FlipDom } from './FlipDom'

export class Flip {
  constructor(doms, duration = 0.5) {
    this.flipDoms = [...doms].map(el => new FlipDom(el, duration))
    this.flipDoms = new Set(this.flipDoms)
    this.duration = duration
    this.flipDoms.forEach(fd => fd.recordFirst())
  }

  addDom(dom, firstPosition) {
    const flipDom = new FlipDom(dom, this.duration)
    this.flipDoms.add(flipDom)
    flipDom.recordFirst(firstPosition)
  }

  play() {
    let gs = [...this.flipDoms].map((fd) => {
      const generator = fd.play();
      return {
        generator,
        iteratorResult: generator.next(),
      }
    }).filter((g) => !g.iteratorResult.done);

    while (gs.length > 0) {
      document.body.clientWidth;
      gs = gs.map(g => {
        g.iteratorResult = g.generator.next();
        return g;
      }).filter(g => !g.iteratorResult.done)
    }
  }
}