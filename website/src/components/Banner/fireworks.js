function o(a, t = 0, s = !1) {
  const i = Math.random() * (a - t) + t
  return s ? Math.round(i) : i
}
function g(a, t, s, i) {
  return Math.sqrt(Math.pow(a - s, 2) + Math.pow(t - i, 2))
}
function p(a) {
  const t = a instanceof Window ? window.innerWidth : a.offsetWidth; const s = a instanceof Window ? window.innerHeight : a.offsetHeight
  return {
    width: t,
    height: s
  }
}
class y {
  constructor(t) {
    this.options = t
    const { x: s, y: i, hue: e } = t
    for (this.x = s, this.y = i, this.angle = o(Math.PI * 2), this.speed = o(10, 1), this.friction = 0.95, this.gravity = 1, this.hue = o(e + 20, e - 20), this.brightness = o(80, 50), this.alpha = 1, this.decay = o(0.03, 0.015), this.coordinates = [], this.coordinateCount = 5; this.coordinateCount--;)
    { this.coordinates.push([this.x, this.y]) }
  }

  draw(t) {
    const { hue: s } = this.options; const [i = 0, e = 0] = this.coordinates[this.coordinates.length - 1]
    t.beginPath(), t.moveTo(i, e), t.lineTo(this.x, this.y), t.strokeStyle = `hsl(${s}, 100%, ${this.brightness}%, ${this.alpha})`, t.stroke()
  }

  update(t, s, i) {
    this.draw(i), this.coordinates.pop(), this.coordinates.unshift([this.x, this.y]), this.speed *= this.friction, this.x += Math.cos(this.angle) * this.speed, this.y += Math.sin(this.angle) * this.speed + this.gravity, this.alpha -= this.decay, this.alpha <= 0 && s.splice(t, 1)
  }
}
class v {
  constructor(t) {
    this.options = t
    const { x: s, y: i, targetX: e, targetY: n } = t
    for (this.x = s, this.y = i, this.startX = s, this.startY = i, this.targetX = e, this.targetY = n, this.distanceTarget = g(s, i, e, n), this.distanceTraveled = 0, this.angle = Math.atan2(n - i, e - s), this.speed = 2, this.acceleration = 1.02, this.brightness = o(70, 50), this.targetRadius = 1, this.coordinateCount = 3, this.coordinates = []; this.coordinateCount--;)
    { this.coordinates.push([s, i]) }
    this.hue = o(120, 50)
  }

  draw(t) {
    const [s = 0, i = 0] = this.coordinates[this.coordinates.length - 1]
    t.beginPath(), t.moveTo(s, i), t.lineTo(this.x, this.y), t.strokeStyle = `hsl(${this.hue}, 100%, ${this.brightness}%)`, t.stroke(), t.beginPath(), t.arc(this.targetX, this.targetY, this.targetRadius, 0, Math.PI * 2), t.stroke()
  }

  update(t, s, i) {
    this.draw(i), this.coordinates.pop(), this.coordinates.unshift([this.x, this.y]), this.targetRadius < 8 ? this.targetRadius += 0.2 : this.targetRadius = 1, this.speed *= this.acceleration
    const e = Math.cos(this.angle) * this.speed; const n = Math.sin(this.angle) * this.speed
    this.distanceTraveled = g(this.startX, this.startY, this.x + e, this.y + n), this.distanceTraveled >= this.distanceTarget ? (s.splice(t, 1), this.createParticles()) : (this.x += e, this.y += n)
  }

  createParticles() {
    const { targetX: t, targetY: s, particles: i } = this.options
    let e = o(120, 30, !0)
    for (; e--;)
    { i.push(new y({
      x: t,
      y: s,
      hue: this.hue
    })) }
  }
}
function T(a) {
  const t = document.createElement('canvas'); const s = t.getContext('2d')
  t.style.background = '#000'
  const i = []; const e = []
  let { width: n, height: r } = p(a)
  t.width = n, t.height = r, window.addEventListener('resize', () => {
    const h = p(a)
    n = h.width, r = h.height, t.width = n, t.height = r
  })
  function d(h, c) {
    h = h ?? o(n)
    const f = new v({
      x: o(h + 20, h - 20),
      y: r,
      targetX: h,
      targetY: c ?? o(r / 2),
      particles: e
    })
    i.push(f)
  }
  d()
  const w = 20
  let l = 0
  function u() {
    requestAnimationFrame(u), s.fillStyle = 'rgba(0, 0, 0, 0.5)', s.clearRect(0, 0, t.width, t.height)
    let h = i.length
    for (; h--;)
    { i[h].update(h, i, s) }
    let c = e.length
    for (; c--;)
    { e[c].update(c, e, s) }
    l > w ? (l = 0, d()) : l++
  }
  return t.addEventListener('mouseup', (h) => {
    d(h.offsetX, h.offsetY)
  }), u(), t
}
export {
  T as Fireworks
}
