var PIXI = window.PIXI;
window.GAME = {}
GAME.GameObjectPool = function (a) {
  this.classType = a
  this.pool = []
}
GAME.GameObjectPool.constructor = GAME.GameObjectPool
GAME.GameObjectPool.prototype.getObject = function () {
  var a = this.pool.pop()
  a || (a = new this.classType)
  return a
}
GAME.GameObjectPool.prototype.returnObject = function () {
}

GAME.Background = function () {
  PIXI.DisplayObjectContainer.call(this)
  this.scrollPosition = 0
  this.floor = [PIXI.Sprite.fromFrame('shmupBG_mid.jpg'), PIXI.Sprite.fromFrame('shmupBG_bot.jpg'), PIXI.Sprite.fromFrame('shmupBG_top.jpg')]
  this.sky = [PIXI.Sprite.fromFrame('cloudsFORE_bot.png'), PIXI.Sprite.fromFrame('cloudsFORE_top.png')]
  for (var a = 0; a < this.floor.length; a++) this.addChild(this.floor[a])
  for (a = 0; a < this.sky.length; a++) this.addChild(this.sky[a])
}
GAME.Background.constructor = GAME.Background
GAME.Background.prototype = Object.create(PIXI.DisplayObjectContainer.prototype)
GAME.Background.prototype.updateTransform = function () {
  this.scrollPosition += 5 * GAME.time.DELTA_TIME
  for (var a, b = 0; b < this.floor.length; b++) a = this.scrollPosition + 799 * b, a %= 2397, a -= 799, this.floor[b].position.y = Math.round(a)
  for (b = 0; b < this.sky.length; b++) a = 1.4 * this.scrollPosition, a += 800 * b, a %= 1600, a -= 800, this.sky[b].position.y = Math.round(a)
  PIXI.DisplayObjectContainer.prototype.updateTransform.call(this)
}
var playerFrames
GAME.PlayerShip = function (a) {
  PIXI.Sprite.call(this, PIXI.Texture.fromFrameId('fighter_bankLeft_04.png'))
  if (!playerFrames) {
    playerFrames = []
    for (var b = 5; 0 < b; b--) playerFrames.push(PIXI.Texture.fromFrameId('fighter_bankLeft_0' + b + '.png'))
    for (b = 1; 6 > b; b++) playerFrames.push(PIXI.Texture.fromFrameId('fighter_bankRight_0' + b + '.png'))
  }
  this.engine = a
  this.targetPosition = { x: 300, y: 400 }
  this.shieldActivated = this.isDead = !1
  this.shieldCount = 0
  this.anchor.x = 0.5
  this.anchor.y = 0.5
  this.position.x = 300
  this.position.y = 900
  this.targetX = this.previousX = 0
  this.radius = 12.5
  this.shield = PIXI.Sprite.fromFrame('shield.png')
  this.shield.anchor.x = 0.5
  this.shield.anchor.y = 0.5
  this.booster = PIXI.Sprite.fromFrame('thrust.png')
  this.booster.anchor.x = 0.5
  this.booster.anchor.y = -0.5
  this.booster.visible = !1
  this.addChild(this.shield)
  this.shield.visible = !1
}
GAME.PlayerShip.constructor = GAME.PlayerShip
GAME.PlayerShip.prototype = Object.create(PIXI.Sprite.prototype)
GAME.PlayerShip.prototype.updateTransform = function () {
  this.targetX += 0.2 * (this.targetPosition.x - this.previousX - this.targetX)
  var a = this.targetX / 15 + 0.5
  console.log(this.targetX)
  1 < a ? a = 1 : 0 > a && (a = 0)
  a = Math.round(9 * a)
  console.log(a)
  this.setTexture(playerFrames[a])
  600 < this.targetPosition.x ? this.targetPosition.x = 600 : 0 > this.targetPosition.x && (this.targetPosition.x = 0)
  800 < this.targetPosition.y ? this.targetPosition.y = 800 : 0 > this.targetPosition.y && (this.targetPosition.y = 0)
  this.position.x += 0.5 * (this.targetPosition.x -
    this.position.x)
  this.position.y += 0.5 * (this.targetPosition.y - 40 - this.position.y)
  this.shieldActivated && (this.shieldCount--, this.shield.alpha = 120 > this.shieldCount ? 0 == this.shieldCount % 4 ? 1 : 0 : 0 == this.shieldCount % 2 ? 1 : 0.5, 0 == this.shieldCount && this.shieldOff())
  PIXI.DisplayObjectContainer.prototype.updateTransform.call(this)
  this.previousX = this.targetPosition.x
  this.booster.alpha = Math.random()
}
GAME.PlayerShip.prototype.shieldOn = function () {
  this.shieldCount = 600
  this.shieldActivated || (this.shieldActivated = !0, this.shield.visible = !0)
}
GAME.PlayerShip.prototype.shieldOff = function () {
  this.shieldActivated && (this.shieldCount = 0, this.shieldActivated = !1, this.shield.visible = !1)
}
var laserCount = 0
GAME.BulletManager = function (a) {
  this.engine = a
  this.bullets = []
  this.fireCount = 0
  this.bulletPool = new GAME.GameObjectPool(GAME.Bullet)
}
GAME.BulletManager.constructor = GAME.BulletManager
GAME.BulletManager.prototype.update = function () {
  this.fireCount += GAME.time.DELTA_TIME
  for (var a = this.bullets, b = 0; b < a.length; b++) {
    var c = a[b]
    c.position.y -= 20 * GAME.time.DELTA_TIME;
    -50 > c.position.y && (a.splice(b, 1), b--, this.bulletPool.returnObject(c), this.engine.view.actionContainer.removeChild(c))
  }
}
GAME.BulletManager.prototype.fire = function () {
  if (!(2 > this.fireCount)) {
    this.fireCount = 0
    var a = this.bulletPool.getObject()
    laserCount += GAME.time.DELTA_TIME
    var b = Math.round(laserCount / 5) % 15
    a.setTexture(PIXI.TextureCache['PewPew' + (b + 1) + '.png'])
    this.engine.view.actionContainer.addChild(a)
    this.bullets.push(a)
    a.position.x = this.engine.player.position.x
    a.position.y = this.engine.player.position.y - 50
  }
}
GAME.BulletManager.prototype.destroyBullet = function (a) {
  for (var b = 0; b < this.bullets.length; b++) if (this.bullets[b] == a) {
    this.bullets.splice(b, 1)
    this.bulletPool.returnObject(a)
    this.engine.view.actionContainer.removeChild(a)
    break
  }
}
GAME = GAME || {}
GAME.Bullet = function () {
  PIXI.Sprite.call(this, PIXI.Texture.fromFrameId('PewPew1.png'))
  this.anchor.x = 0.5
  this.anchor.y = 0.1
  this.position.x = 300
  this.position.y = 900
  this.radius = 20
}
GAME.Bullet.constructor = GAME.Bullet
GAME.Bullet.prototype = Object.create(PIXI.Sprite.prototype)
GAME = GAME || {}
laserCount = 0
GAME.LaserManager = function (a) {
  this.engine = a
  this.bullets = []
  this.fireCount = 0
  this.view = new GAME.LaserView(PIXI.Texture.fromImage('FlashVHtml/img/MEGAlaser.png'))
  this.view.points = this.bullets
  this.bulletPool = new GAME.GameObjectPool(GAME.LaserSegment)
  GAME.HIGH_MODE && this.engine.view.stage.addChild(this.view)
}
GAME.LaserManager.constructor = GAME.LaserManager
GAME.LaserManager.prototype.update = function () {
  this.fireCount++
  for (var a = this.bullets, b = 0; b < a.length; b++) {
    var c = a[b]
    c.position.y -= 10;
    -150 > c.position.y && (a.splice(b, 1), b--, this.bulletPool.returnObject(c))
  }
}
GAME.LaserManager.prototype.fire = function () {
  if (!(2 > this.fireCount)) {
    this.fireCount = 0
    var a = this.bulletPool.getObject()
    this.bullets.push(a)
    a.position.x = this.engine.player.position.x
    a.position.y = this.engine.player.position.y
  }
}
GAME.LaserManager.prototype.destroyBullet = function (a) {
  for (var b = 0; b < this.bullets.length; b++) if (this.bullets[b] == a) {
    this.bullets.splice(b, 1)
    this.bulletPool.returnObject(a)
    break
  }
}
GAME = GAME || {}
GAME.LaserSegment = function () {
  PIXI.Sprite.call(this, PIXI.Texture.fromFrameId('PewPew1.png'))
  this.anchor.x = 0.5
  this.anchor.y = 0.5
  this.radius = 80
}
GAME.LaserSegment.constructor = GAME.LaserSegment
GAME.LaserSegment.prototype = Object.create(PIXI.Sprite.prototype)
var PIXI = PIXI || {}
GAME.LaserView = function (a) {
  PIXI.Strip.call(this, a)
  this.points = []
  this.count = 0
  this.blendMode = PIXI.blendModes.SCREEN
}
GAME.LaserView.constructor = GAME.LaserView
GAME.LaserView.prototype = Object.create(PIXI.Strip.prototype)
GAME.LaserView.prototype.updateTransform = function () {
  var a = this.points
  if (!(1 > a.length)) {
    var b = [], c = [], e = [], d = [], h = a[0].position, f, g = f = 0, j = a[0]
    this.count -= 0.2
    b[0] = j.x + f
    b[1] = j.y + g
    b[2] = j.x - f
    b[3] = j.y - g
    c[0] = 0
    c[1] = Math.random()
    c[2] = 0
    c[3] = Math.random()
    d[0] = 1
    d[1] = 1
    e[0] = 0
    e[1] = 1
    for (var m = a.length, k = 1; k < m; k++) {
      var j = a[k].position, l = 4 * k
      f = k < a.length - 1 ? a[k + 1].position : j
      g = -(f.x - h.x)
      f = f.y - h.y
      var n = 10 * (1 - k / (m - 1))
      1 < n && (n = 1)
      h = Math.sqrt(f * f + g * g)
      n *= 20 + Math.abs(50 * Math.sin(0.3 * (k + this.count)))
      f /=
        h
      g /= h
      f *= n
      g *= n
      b[l] = j.x + f
      b[l + 1] = j.y + g
      b[l + 2] = j.x - f
      b[l + 3] = j.y - g
      k % 2 ? (c[l] = 0, c[l + 1] = 0, c[l + 2] = 0.1) : (c[l] = 0, c[l + 1] = 0.0010, c[l + 2] = 0.99999)
      c[l + 3] = 1
      l = 2 * k
      d[l] = 1
      d[l + 1] = 1
      l = 2 * k
      e[l] = l
      e[l + 1] = l + 1
      h = j
    }
    try {
      this.verticies = new Float32Array(b), this.uvs = new Float32Array(c), this.colors = new Float32Array(d), this.indices = new Uint16Array(e)
    } catch (p) {
      this.verticies = b, this.uvs = c, this.colors = d, this.indices = e
    }
    this.dirty = !0
  }
}
GAME.LaserView.prototype.setTexture = function (a) {
  this.texture = a
  this.width = a.frame.width
  this.height = a.frame.height
  this.updateFrame = !0
}
var enemyFrames
GAME.Enemy = function () {
  if (!enemyFrames) {
    enemyFrames = []
    for (var a = 1; 20 > a; a++) {
      var b = a
      9 >= a && (b = '0' + a)
      enemyFrames.push(PIXI.Texture.fromFrameId('alienAnim_' + b + '.png'))
    }
  }
  PIXI.MovieClip.call(this, enemyFrames)
  this.anchor.x = 0.5
  this.anchor.y = 0.8
  this.position.x = 300
  this.position.y = 900
  this.life
  this.isDead
  this.speed
  this.offset
  this.sign
  this.waveLength = this.frequency = 100
  this.startX = 0
  this.radius = 30
}
GAME.Enemy.constructor = GAME.Enemy
GAME.Enemy.prototype = Object.create(PIXI.MovieClip.prototype)
GAME.Enemy.prototype.reset = function () {
  this.offset = 100 * Math.random()
  this.isDead = !1
  this.currentFrame = 39 * Math.random()
  this.life = 12
  this.sign = Math2.randomPlusMinus()
  this.speed = 3 + 6 * Math.random()
  this.startX = 0
}
GAME.Enemy.prototype.update = function () {
  this.position.y += 3 * GAME.time.DELTA_TIME
  this.position.x = this.startX + Math.sin(this.position.y / this.frequency) * this.waveLength
  this.rotation = 0.1 * Math.sin(0.02 * this.position.y + this.offset) * this.sign
  0 > this.rotation && (this.rotation *= -1)
  this.scale.x = this.scale.y = 1 + 0.5 * this.rotation
}
GAME = GAME || {}
laserCount = 0
GAME.EnemyManager = function (a) {
  this.engine = a
  this.deadEnemies = []
  this.enemies = []
  this.spawnRate = this.spawnCount = 0
  this.enemyPool = new GAME.GameObjectPool(GAME.Enemy)
  this.startRange = 0
  this.startPoint = 300
  this.spread = 500
  this.waveRatio = this.maxSpeedUpgrade = this.maxSpeedCount = this.maxSpeed = this.waveLength = this.frequency = this.changeUp = this.county = this.speed = this.speedRange = 0
  this.canSpawn = !0
  this.positionShiftSpeed = this.positionShift = this.level = this.easeInMode = 0
  this.multiplier = GAME.HIGE_MODE ? 1 : 2
}
GAME.EnemyManager.constructor = GAME.EnemyManager
GAME.EnemyManager.prototype.update = function () {
  this.engine.canSpawn && (this.changeUp += GAME.time.DELTA_TIME, 200 < this.changeUp && (this.changeUp = 0, this.changeWave()), this.easeInMode += GAME.time.DELTA_TIME, this.spawnCount > this.spawnRate * this.multiplier && (this.spawnCount = 0, this.addEnemy()), this.spawnCount += GAME.time.DELTA_TIME)
  for (var a = 0; a < this.enemies.length; a++) this.enemies[a].update(), 870 < this.enemies[a].position.y && this.deadEnemies.push(this.enemies[a])
  for (a = 0; a < this.deadEnemies.length; a++) this.destroyEnemy(this.deadEnemies[a])
  this.positionShift += this.startRange
  var a = (Math.sin(this.positionShift) + 1) / 2, b = this.spread / 2,
    c = 300 - b + this.startRange / 2 + this.waveLength
  this.startPoint = c + (300 + b - this.startRange / 2 - this.waveLength - c) * a
  this.deadEnemies = []
}
GAME.EnemyManager.prototype.changeWave = function () {
  var a = Math2.map(this.level, 0, 50, 0.2, 1)
  1 < a && (a = 1)
  this.speed = 1.5 + Math2.random(2, 7) * a
  this.speedRange = Math2.random(0, 5) * a
  var a = 300 - this.halfSpread, b = 300 + this.halfSpread
  this.startPoint = Math2.random(a, b)
  this.startRange = 50 + 450 * Math2.random(0, 1)
  this.positionShiftSpeed = 0.8 * Math.random() - 0.4
  this.startPoint - this.startRange / 2 < a && (this.startPoint = a + this.startRange / 2)
  this.startPoint + this.startRange / 2 > b && (this.startPoint = b - this.startRange / 2)
  this.waveLength =
    100 * Math.random()
  this.frequency = 100
  this.spawnRate = Math2.map(this.level, 0, 20, 12, 3)
  3 > this.spawnRate && (this.spawnRate = 3)
  this.level++
  this.easeInMode++
}
GAME.EnemyManager.prototype.addEnemy = function () {
  if (!this.engine.player.isDead) {
    var a = this.enemyPool.getObject()
    a.reset()
    this.county++
    a.position.y = -100
    a.startX = this.startPoint + Math2.random(-this.startRange / 2, this.startRange / 2)
    a.speed = this.speed + Math2.random(-this.speedRange / 2, this.speedRange / 2)
    a.frequency = this.frequency
    a.waveLength = this.waveLength
    this.engine.view.actionContainer.addChild(a)
    this.enemies.push(a)
  }
}
GAME.EnemyManager.prototype.hitEnemy = function (a, b) {
  0 > a.life || (a.life -= b ? b : 10, 0 >= a.life && (this.engine.score += 10 * this.engine.multiplier, a.isDead = !0, this.deadEnemies.push(a), this.engine.explosionManager.addExplosion(a.position.x, a.position.y)))
}
GAME.EnemyManager.prototype.destroyEnemy = function (a) {
  var b = this.enemies.length
  a.alpha = 0.5
  for (var c = 0; c < b; c++) if (this.enemies[c] == a) {
    this.enemies.splice(c, 1)
    this.length--
    this.enemyPool.returnObject(a)
    this.engine.view.actionContainer.removeChild(a)
    break
  }
}
GAME.EnemyManager.prototype.reset = function () {
  this.changeUp = this.waveRatio = this.county = this.level = 0
  this.maxSpeed = 2
  this.maxSpeedCount = 0
  this.maxSpeedUpgrade = 480
  this.speedRange = 0
  this.speed = 10
  this.spawnRate = 100
  this.easeInMode = 0
  this.changeWave()
}
GAME = GAME || {}
GAME.EnemyBullet = function () {
  PIXI.Sprite.call(this, PIXI.Texture.fromFrameId('bad_bullet.png'))
  this.anchor.x = 0.5
  this.anchor.y = 0.5
  this.speedY = this.speedX = 0
  this.radius = 12
}
GAME.EnemyBullet.constructor = GAME.EnemyBullet
GAME.EnemyBullet.prototype = Object.create(PIXI.Sprite.prototype)
GAME = GAME || {}
laserCount = 0
GAME.EnemyBulletManager = function (a) {
  this.engine = a
  this.bullets = []
  this.fireCount = 0
  this.spawnRate = 80
  this.spawnUpgradeCount = 0
  this.spawnRateUpgrade = 400
  this.chainLength = 3
  this.chainCount = this.chainGap = this.chain = 0
  this.badBulletPool = new GAME.GameObjectPool(GAME.EnemyBullet)
}
GAME.EnemyBulletManager.constructor = GAME.EnemyBulletManager
GAME.EnemyBulletManager.prototype.update = function () {
  if (this.engine.canSpawn) {
    this.spawnUpgradeCount += GAME.time.DELTA_TIME
    this.spawnRateUpgrade == this.spawnUpgradeCount && (this.spawnUpgradeCount = 0, this.spawnRate -= 0.75, 78 > this.spawnRate && (0 == this.spawnRate % 10 && this.chainLength++, 15 < this.chainLength && (this.chainLength = 15)), 5 > this.spawnRate && (this.spawnRate = 5))
    this.fireCount += GAME.time.DELTA_TIME
    if (0 < this.engine.enemyManager.enemies.length) {
      var a = this.engine.enemyManager.enemies[this.engine.enemyManager.enemies.length -
      1], b = 2.5 + 2 * Math.random()
      75 < this.spawnRate && (b *= 0.5)
      this.fireCount > this.spawnRate && this.fire(a, b)
    }
    this.chainCount += GAME.time.DELTA_TIME
    150 < this.chainCount && (this.chainCount = 0, 0 != this.engine.enemyManager.enemies.length && (this.chainTarget = this.engine.enemyManager.enemies[this.engine.enemyManager.enemies.length - 1], this.chainGap = 5, this.chain = this.chainLength))
    0 < this.chain && (this.chainGap -= GAME.time.DELTA_TIME, 0 >= this.chainGap && (this.chain -= GAME.time.DELTA_TIME, this.chainGap = 5, this.chainTarget && (this.chainTarget.isDead ||
      this.fire(this.chainTarget, 3.5))))
  }
  a = this.bullets
  for (b = 0; b < a.length; b++) {
    var c = a[b]
    c.position.x -= c.speedX * GAME.time.DELTA_TIME
    c.position.y -= c.speedY * GAME.time.DELTA_TIME
    c.scale.x = c.scale.y = 1 + 0.1 * Math.sin(0.05 * c.position.y)
    if (850 < c.position.y || -50 > c.position.x || 650 < c.position.x) a.splice(b, 1), b--, this.badBulletPool.returnObject(c), this.engine.view.enemyBulletContainer.removeChild(c)
  }
}
GAME.EnemyBulletManager.prototype.update2 = function () {
  this.spawnUpgradeCount += GAME.time.DELTA_TIME
  this.spawnRateUpgrade == this.spawnUpgradeCount && (this.spawnUpgradeCount = 0, this.spawnRate--)
  this.fireCount += GAME.time.DELTA_TIME
  this.fireCount > this.spawnRate && this.fire()
  for (var a = this.bullets, b = 0; b < a.length; b++) {
    var c = a[b]
    c.position.x -= c.speedX * GAME.time.DELTA_TIME
    c.position.y -= c.speedY * GAME.time.DELTA_TIME
    c.scale.x = c.scale.y = 1 + 0.1 * Math.sin(0.05 * c.position.y)
    if (850 < c.position.y || -50 > c.position.x ||
      650 < c.position.x) a.splice(b, 1), b--, this.badBulletPool.returnObject(c), this.engine.view.enemyBulletContainer.removeChild(c)
  }
}
GAME.EnemyBulletManager.prototype.fire = function (a, b) {
  this.fireCount = 0
  var c = this.badBulletPool.getObject()
  this.engine.view.enemyBulletContainer.addChild(c)
  this.bullets.push(c)
  c.position.x = a.position.x
  c.position.y = a.position.y
  var e = c.position.x - this.engine.player.position.x, d = c.position.y - this.engine.player.position.y,
    h = Math.sqrt(e * e + d * d)
  c.speedX = e / h * b
  c.speedY = d / h * b
}
GAME.EnemyBulletManager.prototype.destroyBullet = function (a) {
  for (var b = 0; b < this.bullets.length; b++) if (this.bullets[b] == a) {
    this.bullets.splice(b, 1)
    this.badBulletPool.returnObject(a)
    this.engine.view.enemyBulletContainer.removeChild(a)
    break
  }
}
GAME.EnemyBulletManager.prototype.removeAll = function () {
  for (var a = 0; a < this.bullets.length; a++) this.bullets[a].position.y = 1E3
  this.bullets = []
}
var explosionFrames, debris = []
GAME.Explosion = function () {
  if (!explosionFrames) {
    debris = []
    debris.push('shipDebris_1.png', 'shipDebris_2.png', 'shipDebris_3.png', 'shipDebris_4.png', 'shipDebris_5.png', 'shipDebris_6.png')
    explosionFrames = []
    for (var a = 1; 27 > a; a++) explosionFrames.push(PIXI.Texture.fromFrameId('Explosion_Sequence_A ' + a + '.png'))
  }
  PIXI.MovieClip.call(this, explosionFrames)
  this.debrisPool = new GAME.GameObjectPool(GAME.Debris)
  this.origin = { x: 0, y: 0 }
  this.anchor.x = 0.5
  this.anchor.y = 0.5
  this.life = 25
  this.particals = []
  if (GAME.HIGH_MODE) for (a =
                             0; 6 > a; a++) {
    var b = this.debrisPool.getObject()
    b.alpha = 1
    b.rotationSpeed = 0.8 * (Math.random() - 0.5)
    b.speed.x = 30 * Math.random() - 15
    b.speed.y = 5 + 5 * Math.random()
    this.particals.push(b)
    this.addChild(b)
  }
}
GAME.Explosion.constructor = GAME.Explosion
GAME.Explosion.prototype = Object.create(PIXI.MovieClip.prototype)
GAME.Explosion.prototype.init = function () {
  explosion = this
  explosion.rotation = 2 * Math.random() * Math.PI
  explosion.position.x = this.origin.x
  explosion.position.y = this.origin.y
  this.isDead = !1
}
GAME.Explosion.prototype.update = function () {
  var a = this.particals
  25 == this.currentFrame && (this.alpha = 0)
  if (GAME.HIGH_MODE) for (var b = 0; b < a.length; b++) {
    var c = a[b]
    c.life--
    c.speed.x *= 0.96
    c.position.x += c.speed.x
    c.position.y += c.speed.y
    c.rotation += c.rotationSpeed
    c.scale.x *= 0.96
    c.scale.y *= 0.96
    0 == c.life && (c.alpha = 0)
  }
  this.life -= GAME.time.DELTA_TIME
  0 > this.life && (this.isDead = !0)
}
GAME.Debris = function () {
  PIXI.Sprite.call(this, PIXI.Texture.fromFrameId('shipDebris_1.png'))
  this.anchor.x = 0.5
  this.anchor.y = 0.5
  this.speed = { x: 0, y: 0 }
}
GAME.Debris.constructor = GAME.Debris
GAME.Debris.prototype = Object.create(PIXI.Sprite.prototype)

laserCount = 0
GAME.ExplosionManager = function (a) {
  this.engine = a
  this.explosions = []
  this.explosionPool = new GAME.GameObjectPool(GAME.Explosion)
}
GAME.ExplosionManager.constructor = GAME.ExplosionManager
GAME.ExplosionManager.prototype.update = function () {
  for (var a = this.explosions, b = 0; b < a.length; b++) {
    var c = a[b]
    c.update()
    c.isDead && (a.splice(b, 1), this.engine.view.actionContainer.removeChild(c), this.explosionPool.returnObject(c), b--)
  }
}
GAME.ExplosionManager.prototype.addExplosion = function (a, b) {
  var c = this.explosionPool.getObject()
  c.origin.x = a
  c.origin.y = b
  c.init()
  this.engine.view.actionContainer.addChild(c)
  this.explosions.push(c)
}

GAME.PickupManager = function (a) {
  this.engine = a
  this.pickups = []
  this.pickupPool = new GAME.GameObjectPool(GAME.Pickup)
  this.dropCount = 0
}
GAME.PickupManager.constructor = GAME.PickupManager
GAME.PickupManager.prototype.update = function () {
  this.dropCount += GAME.time.DELTA_TIME
  500 < this.dropCount && (this.dropPickup(), this.dropCount = 0)
  for (var a = this.pickups, b = 0; b < a.length; b++) {
    var c = a[b]
    c.isPickedUp ? (c.ratio += 0.2 * (1 - c.ratio), c.scale.x = 1 - c.ratio, c.scale.y = 1 - c.ratio, c.position.x = c.pickupPosition.x + (this.engine.player.position.x - c.pickupPosition.x) * c.ratio, c.position.y = c.pickupPosition.y + (this.engine.player.position.y - c.pickupPosition.y) * c.ratio, 0.99 < c.ratio && this.destroyPickup(c)) : (c.position.y +=
      3 * GAME.time.DELTA_TIME, 820 < c.position.y && (this.destroyPickup(c), b--))
  }
}
GAME.PickupManager.prototype.dropPickup = function () {
  if (this.engine.canSpawn) {
    var a = this.pickupPool.getObject(), b
    32 == this.engine.multiplier ? b = Math2.randomInt(0, 2) : (b = Math2.randomInt(0, 4), 2 < b && (b = 3))
    this.engine.view.actionContainer.addChild(a)
    switch (b) {
      case 0:
        GAME.HIGH_MODE ? a.setToLaser() : a.setToRocket()
        break
      case 1:
        a.setToRocket()
        break
      case 2:
        a.setToShield()
        break
      case 3:
        a.setToMultiply()
    }
    this.pickups.push(a)
    a.position.x = Math2.random(100, 500)
    a.position.y = -100
  }
}
GAME.PickupManager.prototype.pickup = function (a) {
  if (!a.isPickedUp) switch (a.isPickedUp = !0, a.pickupPosition = {
    x: a.position.x,
    y: a.position.y
  }, a.ratio = 0, a.id) {
    case GAME.Pickup.LASER:
      this.engine.setLaser()
      break
    case GAME.Pickup.ROCKET:
      this.engine.setRockets()
      break
    case GAME.Pickup.MULTIPLY:
      this.engine.increaseMultiplier()
      break
    case GAME.Pickup.SHIELD:
      this.engine.setShield()
  }
}
GAME.PickupManager.prototype.removeAll = function () {
  for (var a = 0; a < this.pickups.length; a++) {
    var b = this.pickups[a]
    this.pickupPool.returnObject(b)
    this.engine.view.actionContainer.removeChild(b)
  }
  this.pickups.length = 0
}
GAME.PickupManager.prototype.destroyPickup = function (a) {
  for (var b = this.pickups.length, c = 0; c < b; c++) if (this.pickups[c] == a) {
    this.pickups.splice(c, 1)
    this.pickupPool.returnObject(a)
    this.engine.view.actionContainer.removeChild(a)
    break
  }
}

GAME.Pickup = function () {
  PIXI.Sprite.call(this, PIXI.Texture.fromFrameId('pickup_rocket.png'))
  this.origin = { x: 0, y: 0 }
  this.anchor.x = 0.5
  this.anchor.y = 0.5
  this.scale.y = -1
  this.life = 29
  this.radius = 40
}
GAME.Pickup.constructor = GAME.Pickup
GAME.Pickup.prototype = Object.create(PIXI.Sprite.prototype)
GAME.Pickup.prototype.reset = function (a) {
  this.rotation = Math.PI
  this.acceleration.y = -2
  this.speed.y = 5 + 5 * Math.random(0, 1)
  this.turn = Math2.random(-0.01, 0.01)
  this.count = 0
  this.speed.x = 5 * a * Math2.randomPlusMinus()
  this.engineCountdown = 10
}
GAME.Pickup.prototype.setToRocket = function () {
  this.id = GAME.Pickup.ROCKET
  this.ratio = 0
  this.scale.x = this.scale.y = 1
  isPickedUp = !1
  this.setTexture(PIXI.Texture.fromFrameId('pickup_rocket.png'))
}
GAME.Pickup.prototype.setToLaser = function () {
  this.id = GAME.Pickup.LASER
  this.ratio = 0
  this.scale.x = this.scale.y = 1
  this.isPickedUp = !1
  this.setTexture(PIXI.Texture.fromFrameId('pickup_megalaser.png'))
}
GAME.Pickup.prototype.setToShield = function () {
  this.id = GAME.Pickup.SHIELD
  this.ratio = 0
  this.scale.x = this.scale.y = 1
  this.isPickedUp = !1
  this.setTexture(PIXI.Texture.fromFrameId('pickup_shield.png'))
}
GAME.Pickup.prototype.setToMultiply = function () {
  this.id = GAME.Pickup.MULTIPLY
  this.ratio = 0
  this.scale.x = this.scale.y = 1
  this.isPickedUp = !1
  this.setTexture(PIXI.Texture.fromFrameId('pickup_X2.png'))
}
GAME.Pickup.ROCKET = 4
GAME.Pickup.LASER = 1
GAME.Pickup.MULTIPLY = 2
GAME.Pickup.SHIELD = 3

GAME.EMP = function () {
  PIXI.Sprite.call(this, PIXI.Texture.fromImage('FlashVHtml/img/EMP.png'))
  this.blendMode = PIXI.blendModes.SCREEN
  this.firstPhase = !0
  this.isDead = !1
  this.anchor.x = 0.5
  this.anchor.y = 0.5
}
GAME.EMP.constructor = GAME.EMP
GAME.EMP.prototype = Object.create(PIXI.Sprite.prototype)
GAME.EMP.prototype.update = function () {
  this.firstPhase ? (this.rotation += 0.2, this.scale.x += 0.1 * (2 - this.scale.y), 1.99 < this.scale.x && (this.firstPhase = !1)) : (this.scale.x += 0.3 * (4 - this.scale.x), this.alpha *= 0.8, 0.1 > this.alpha && (this.alpha = 0, this.isDead = !0))
  this.scale.y = this.scale.x
}

laserCount = 0
GAME.EMPManager = function (a) {
  this.engine = a
  this.emps = []
  this.empCount = 3
}
GAME.EMPManager.constructor = GAME.EMPManager
GAME.EMPManager.prototype.update = function () {
  for (var a = this.emps, b = 0; b < a.length; b++) {
    var c = a[b]
    c.update()
    c.isDead && (a.splice(b, 1), this.engine.view.empContainer.removeChild(c), b--)
  }
}
GAME.EMPManager.prototype.fire = function () {
  var a = new GAME.EMP
  a.name = 'EMP'
  this.engine.pickupManager.removeAll()
  this.engine.view.empContainer.addChild(a)
  this.emps.push(a)
  this.engine.gameCount = 0
  this.engine.gunMode = 0
  this.engine.resetMultiplier()
  a.position.x = this.engine.player.position.x
  a.position.y = this.engine.player.position.y
  for (var a = this.engine.enemyManager.enemies, b = 0; b < a.length; b++) this.engine.enemyManager.hitEnemy(a[b], 1E4)
  this.engine.enemyBulletManager.removeAll()
  this.empCount--
  0 ==
  this.empCount && this.engine.gameover()
}

GAME.Rocket = function () {
  this.acceleration = { x: 0, y: 0 }
  this.speed = { x: 0, y: 0 }
  this.engineCountdown
  this.turn = 0
  this.rotation = -Math.PI / 2
  this.count
  PIXI.Sprite.call(this, PIXI.Texture.fromFrameId('rocket_on1.png'))
  this.origin = { x: 0, y: 0 }
  this.anchor.x = 0.5
  this.anchor.y = 0.5
  this.scale.y = -1
  this.life = 29
  this.radius = 20
}
GAME.Rocket.constructor = GAME.Rocket
GAME.Rocket.prototype = Object.create(PIXI.Sprite.prototype)
GAME.Rocket.prototype.reset = function (a) {
  this.rotation = Math.PI
  this.acceleration.y = -2
  this.speed.y = 5 + 5 * Math.random(0, 1)
  this.turn = Math2.random(-0.01, 0.01)
  this.count = 0
  this.speed.x = 5 * a * Math2.randomPlusMinus()
  this.engineCountdown = 10
}
GAME.Rocket.prototype.update = function () {
  0 == this.engineCountdown ? (this.count += 0.4, this.speed.y += this.acceleration.y) : (this.rotation += this.turn, this.acceleration.x = 2 * Math.sin(this.rotation), this.acceleration.y = 2 * Math.cos(this.rotation), this.engineCountdown--)
  this.speed.x += this.acceleration.x
  this.speed.x *= 0.95
  this.position.x += this.speed.x * GAME.time.DELTA_TIME
  this.position.y += this.speed.y * GAME.time.DELTA_TIME
}

GAME.RocketManager = function (a) {
  this.engine = a
  this.rockets = []
  this.smoke = []
  this.rocketPool = new GAME.GameObjectPool(GAME.Rocket)
  this.smokePool = new GAME.GameObjectPool(GAME.Smoke)
  this.fireCount = 0
}
GAME.RocketManager.constructor = GAME.RocketManager
GAME.RocketManager.prototype.update = function () {
  this.fireCount++
  for (var a = this.rockets, b = a.length, c = 0; c < b; c++) {
    var e = a[c]
    e.update();
    -50 > e.position.y && (a.splice(c, 1), c--, b--, this.rocketPool.returnObject(e), this.engine.view.actionContainer.removeChild(e))
    if (GAME.HIGH_MODE && this.fireCount % 2 && 0 == e.engineCountdown) {
      var d = this.smokePool.getObject()
      d.position.x = e.position.x
      d.position.y = e.position.y
      d.scale.x = d.scale.y = 0.2
      d.alpha = 0.8
      d.rotationSpeed = 0.2 * Math.random() - 0.1
      d.speed.x = 0
      d.speed.y = 11.25
      this.smoke.push(d)
      this.engine.view.actionContainer.addChild(d)
    }
  }
  b = this.smoke.length
  for (c = 0; c < b; c++) d = this.smoke[c], d.position.x += d.speed.x * GAME.time.DELTA_TIME, d.position.y += d.speed.y * GAME.time.DELTA_TIME, d.rotation += d.rotationSpeed, d.scale.x += 0.04, d.scale.y += 0.04, d.alpha -= 0.03, 0.1 > d.alpha && (this.engine.view.actionContainer.removeChild(d), this.smokePool.returnObject(d), this.smoke.splice(c, 1), c--, b--)
}
GAME.RocketManager.prototype.addCloud = function () {
}
GAME.RocketManager.prototype.fire = function () {
  if (!(40 > this.fireCount)) for (var a = 0; 10 > a; a++) {
    this.fireCount = 0
    var b = this.rocketPool.getObject()
    b.reset((a + 1) / 10)
    this.engine.view.actionContainer.addChild(b)
    this.rockets.push(b)
    b.position.x = this.engine.player.position.x
    b.position.y = this.engine.player.position.y
  }
}
GAME.RocketManager.prototype.destroyRocket = function (a) {
  for (var b = this.rockets.length, c = 0; c < b; c++) if (this.rockets[c] == a) {
    this.rockets.splice(c, 1)
    this.rocketPool.returnObject(a)
    this.engine.view.actionContainer.removeChild(a)
    break
  }
}
GAME.Smoke = function () {
  PIXI.Sprite.call(this, PIXI.Texture.fromFrameId('smoke.png'))
  this.anchor.x = 0.5
  this.anchor.y = 0.5
  this.speed = { x: 0, y: 0 }
}
GAME.Smoke.constructor = GAME.Smoke
GAME.Smoke.prototype = Object.create(PIXI.Sprite.prototype)

GAME.CollisionManager = function (a) {
  this.engine = a
  this.count = 0
}
GAME.CollisionManager.constructor = GAME.CollisionManager
GAME.CollisionManager.prototype.update = function () {
  this.hitTestSuperLaserVsEnemy()
  0 == this.count ? this.hitTestLaserVsEnemy() : 1 == this.count ? (this.hitTestPlayerVsPickups(), this.hitTestRocketsVsEnemy()) : 2 == this.count && this.hitTestPlayerVsEnemy()
  this.hitTestPlayerVsEnemyBullet()
  this.count++
  this.count %= 3
}
GAME.CollisionManager.prototype.hitTestLaserVsEnemy = function () {
  for (var a = this.engine.bulletManager.bullets, b = this.engine.enemyManager.enemies, c = a.length, e = 0; e < c; e++) for (var d = a[e], h = b.length, f = 0; f < h; f++) {
    var g = b[f], j = d.position.x - g.position.x, m = d.position.y - g.position.y, k = d.radius + g.radius
    if (j * j + m * m < k * k) {
      this.engine.bulletManager.destroyBullet(d)
      this.engine.enemyManager.hitEnemy(g)
      e--
      c--
      break
    }
  }
}
GAME.CollisionManager.prototype.hitTestSuperLaserVsEnemy = function () {
  for (var a = this.engine.laserManager.bullets, b = this.engine.enemyManager.enemies, c = a.length, e = 0; e < c; e++) for (var d = a[e], h = b.length, f = 0; f < h; f++) {
    var g = b[f], j = d.position.x - g.position.x, m = d.position.y - g.position.y, k = d.radius + g.radius
    if (j * j + m * m < k * k) {
      this.engine.enemyManager.hitEnemy(g)
      e--
      c--
      break
    }
  }
}
GAME.CollisionManager.prototype.hitTestRocketsVsEnemy = function () {
  for (var a = this.engine.rocketManager.rockets, b = this.engine.enemyManager.enemies, c = a.length, e = 0; e < c; e++) for (var d = a[e], h = b.length, f = 0; f < h; f++) {
    var g = b[f], j = d.position.x - g.position.x, m = d.position.y - g.position.y, k = d.radius + g.radius
    if (j * j + m * m < k * k) {
      this.engine.rocketManager.destroyRocket(d)
      this.engine.enemyManager.hitEnemy(g)
      e--
      c--
      break
    }
  }
}
GAME.CollisionManager.prototype.hitTestPlayerVsPickups = function () {
  for (var a = this.engine.player, b = this.engine.pickupManager.pickups, c = b.length, e = 0; e < c; e++) {
    var d = b[e], h = a.position.x - d.position.x, f = a.position.y - d.position.y, g = a.radius + d.radius
    if (h * h + f * f < g * g) {
      this.engine.pickupManager.pickup(d)
      break
    }
  }
}
GAME.CollisionManager.prototype.hitTestPlayerVsEnemy = function () {
  for (var a = this.engine.player, b = this.engine.enemyManager.enemies, c = b.length, e = 0; e < c; e++) {
    var d = b[e], h = a.position.x - d.position.x, f = a.position.y - 28 - 1 - d.position.y, g = a.radius + d.radius
    if (h * h + f * f < g * g) {
      this.engine.enemyManager.hitEnemy(d)
      if (a.shieldActivated) break
      this.engine.empManager.fire()
      break
    }
  }
}
GAME.CollisionManager.prototype.hitTestPlayerVsEnemyBullet = function () {
  for (var a = this.engine.player, b = this.engine.enemyBulletManager.bullets, c = b.length, e = 0; e < c; e++) {
    var d = b[e], h = a.position.x - d.position.x, f = a.position.y - 19 - d.position.y, g = a.radius + d.radius
    if (h * h + f * f < g * g) {
      this.engine.enemyBulletManager.destroyBullet(d)
      if (a.shieldActivated) break
      this.engine.empManager.fire()
      break
    }
  }
}

GAME.ShootyView = function (a) {
  this.engine = a
  this.renderer = window.renderer
  GAME.HIGH_MODE = this.renderer instanceof PIXI.WebGLRenderer
  this.stage = stage
  this.background = new GAME.Background
  this.stage.addChild(this.background)
  this.scoreView = document.createElement('div')
  this.scoreView.onmousedown = function () {
    return !1
  }
  this.scoreView.className = 'scoreView'
  this.actionContainer = new PIXI.DisplayObjectContainer
  this.enemyBulletContainer = new PIXI.DisplayObjectContainer
  this.empContainer = new PIXI.DisplayObjectContainer
  this.stage.addChild(this.actionContainer)
  this.stage.addChild(this.enemyBulletContainer)
  this.stage.addChild(this.empContainer)
  this.vignette = PIXI.Sprite.fromImage('FlashVHtml/img/vignette.png')
  GAME.HIGH_MODE && this.stage.addChild(this.vignette)
  this.vignette.visible = !1
  this.vignette.alpha = 0
  a = document.getElementById('app')
  a.appendChild(this.scoreView)
  this.multiplyerTextures = {}
  this.multiplyerTextures[1] = PIXI.Texture.fromFrameId('combo_HUD_none.png')
  this.multiplyerTextures[2] = PIXI.Texture.fromFrameId('combo_HUD_x2.png')
  this.multiplyerTextures[4] =
    PIXI.Texture.fromFrameId('combo_HUD_x4.png')
  this.multiplyerTextures[8] = PIXI.Texture.fromFrameId('combo_HUD_x8.png')
  this.multiplyerTextures[16] = PIXI.Texture.fromFrameId('combo_HUD_x16.png')
  this.multiplyerTextures[32] = PIXI.Texture.fromFrameId('combo_HUD_x32.png')
  this.multiplyerSprite = new PIXI.Sprite(this.multiplyerTextures[1])
  this.stage.addChild(this.multiplyerSprite)
  this.lives = [PIXI.Sprite.fromFrame('EMP_life_icon.png'), PIXI.Sprite.fromFrame('EMP_life_icon.png'), PIXI.Sprite.fromFrame('EMP_life_icon.png')]
  for (var b = 0; 3 > b; b++) this.lives[b].position.x = 555, this.lives[b].position.y = 40 * b + 108, this.stage.addChild(this.lives[b])
  this.gameoverScreen = document.createElement('div')
  this.gameoverScreen.className = 'gameoverView'
  this.gameoverScreen.style.display = 'none'
  a.appendChild(this.gameoverScreen)
  this.multiplyerSprite.position.x = 600 - this.multiplyerSprite.width
}
GAME.ShootyView.constructor = GAME.ShootyView

// GAME.ShootyView.prototype.renderer = null

GAME.ShootyView.prototype.update = function () {
  this.cachMultiplyer != this.engine.multiplier && (this.cachMultiplyer = this.engine.multiplier, this.multiplyerSprite.setTexture(this.multiplyerTextures[this.engine.multiplier]))
  if (this.cachEmpCount != this.engine.empManager.empCount) {
    this.cachEmpCount = this.engine.empManager.empCount
    for (var a = 0; 3 > a; a++) this.lives[a].position.x = a < this.cachEmpCount ? 555 : 600
  }
  if (this.cacheScore != this.engine.score) {
    this.cacheScore = this.engine.score
    for (var b = this.engine.score.toString().split(''),
           c = '', e = b.length, d = e % 3 - 1, a = 0; a < e; a++) c += b[a], 0 == (a - d) % 3 && a != e - 1 && (c += ',')
    this.scoreView.innerHTML = '' + c
  }
  this.renderer.render(this.stage)
}
GAME.ShootyView.prototype.tick = function () {
  this.renderer.render(this.stage)
}
GAME.ShootyView.prototype.showGameover = function () {
  $(this.gameoverScreen).fadeIn()
}
GAME.ShootyView.prototype.hideGameover = function () {
  $(this.gameoverScreen).fadeOut()
}
GAME.ShootyView.prototype.resize = function (a, b) {
  this.scoreView.style.top = 0.0050 * b + 'px'
  this.scoreView.style.left = '0px'
  this.scoreView.style.width = 0.8 * a + 'px'
  this.scoreView.style.fontSize = 80 * (b / 800) + 'px'
  this.gameoverScreen.style.width = 439 * (a / 600) + 'px'
  this.gameoverScreen.style.height = 240 * (a / 600) + 'px'
  this.gameoverScreen.style.left = a / 2 - 439 * (a / 600) / 2 + 'px'
  this.gameoverScreen.style.top = b / 2 - 240 * (a / 600) / 2 + 'px'
}

GAME.HIGH_MODE = !0
GAME.ShootyEngine = function () {
  this.view = new GAME.ShootyView(this)
  this.mouse = { x: 0, y: 0 }
  this.player = new GAME.PlayerShip(this)
  this.bulletManager = new GAME.BulletManager(this)
  this.laserManager = new GAME.LaserManager(this)
  this.enemyBulletManager = new GAME.EnemyBulletManager(this)
  this.rocketManager = new GAME.RocketManager(this)
  this.pickupManager = new GAME.PickupManager(this)
  this.enemyManager = new GAME.EnemyManager(this)
  this.empManager = new GAME.EMPManager(this)
  this.collisionManger = new GAME.CollisionManager(this)
  this.explosionManager = new GAME.ExplosionManager(this)
  this.gunMode = 0
  this.isFiring = !1
  this.player.booster.position = this.player.position
  this.view.actionContainer.addChild(this.player.booster)
  this.view.actionContainer.addChild(this.player)
  this.canSpawn = !0
  this.enemyManager.reset()
  this.multiplier = 1
  this.gameCount = this.score = 0
  this.canSpawn = this.gamePlaying = this.canSpawn = !1
  this.player.visible = !1
  this.gunMode = 0
}
GAME.ShootyEngine.constructor = GAME.ShootyEngine
GAME.ShootyEngine.prototype.update = function () {
  this.gamePlaying && (this.gameCount += GAME.time.DELTA_TIME, this.canSpawn = 250 < this.gameCount)
  0 == this.gunMode || this.gunMode == GAME.Pickup.SHIELD ? this.isFiring && this.gamePlaying && this.bulletManager.fire() : this.gunMode == GAME.Pickup.ROCKET ? this.isFiring && (this.bulletManager.fire(), this.rocketManager.fire()) : this.gunMode == GAME.Pickup.LASER && (this.isFiring ? (this.laserManager.fire(), this.view.vignette.alpha += 0.1 * (1 - this.view.vignette.alpha)) : this.view.vignette.alpha +=
    0.1 * (0 - this.view.vignette.alpha))
  this.powerUpCountdown -= GAME.time.DELTA_TIME
  0 >= this.powerUpCountdown && (this.gunMode = this.powerUpCountdown = 0, 0.01 > this.view.vignette.alpha ? (this.view.vignette.alpha = 0, this.view.vignette.visible = !1) : this.view.vignette.alpha += 0.1 * (0 - this.view.vignette.alpha))
  this.player.targetPosition.x = this.mouse.x
  this.player.targetPosition.y = this.mouse.y
  this.bulletManager.update()
  this.laserManager.update()
  this.enemyBulletManager.update()
  this.rocketManager.update()
  this.pickupManager.update()
  this.enemyManager.update()
  this.empManager.update()
  this.collisionManger.update()
  this.explosionManager.update()
  this.view.update()
}
GAME.addHitArea = function (a) {
  var b = PIXI.Sprite.fromImage('FlashVHtml/img/hitTest.png')
  b.anchor.x = 0.5
  b.anchor.y = 0.5
  b.scale.x = 2 * (a.radius / 20)
  b.scale.y = 2 * (a.radius / 20)
  b.alpha = 0.5
  a.addChild(b)
}
GAME.ShootyEngine.prototype.gameover = function () {
  this.view.showGameover()
  this.canSpawn = this.gamePlaying = !1
  this.player.visible = !1
  this.player.booster.visible = !1
  this.gunMode = 0
}
GAME.ShootyEngine.prototype.increaseMultiplier = function () {
  this.multiplier *= 2
  32 < this.multiplier && (this.multiplier = 32)
}
GAME.ShootyEngine.prototype.resetMultiplier = function () {
  this.multiplier = 1
}
GAME.ShootyEngine.prototype.restart = function () {
  this.gamePlaying = !0
  this.empManager.empCount = 3
  this.score = 0
  this.enemyManager.reset()
  this.player.visible = !0
  this.player.booster.visible = !0
  this.view.hideGameover()
}
GAME.ShootyEngine.prototype.setLaser = function () {
  this.powerUpCountdown = 600
  this.gunMode = GAME.Pickup.LASER
  this.view.vignette.visible = !0
}
GAME.ShootyEngine.prototype.setRockets = function () {
  this.powerUpCountdown = 600
  this.gunMode = GAME.Pickup.ROCKET
}
GAME.ShootyEngine.prototype.setShield = function () {
  powerUpCountdown = 600
  this.gunMode = GAME.Pickup.SHIELD
  this.player.shieldOn()
}
