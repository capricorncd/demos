var playerFrames,PIXI=window.PIXI;window.GAME={},GAME.GameObjectPool=function(t){this.classType=t,this.pool=[]},GAME.GameObjectPool.constructor=GAME.GameObjectPool,GAME.GameObjectPool.prototype.getObject=function(){var t=this.pool.pop();return t||(t=new this.classType),t},GAME.GameObjectPool.prototype.returnObject=function(){},GAME.Background=function(){PIXI.DisplayObjectContainer.call(this),this.scrollPosition=0,this.floor=[PIXI.Sprite.fromFrame("shmupBG_mid.jpg"),PIXI.Sprite.fromFrame("shmupBG_bot.jpg"),PIXI.Sprite.fromFrame("shmupBG_top.jpg")],this.sky=[PIXI.Sprite.fromFrame("cloudsFORE_bot.png"),PIXI.Sprite.fromFrame("cloudsFORE_top.png")];for(var t=0;t<this.floor.length;t++)this.addChild(this.floor[t]);for(t=0;t<this.sky.length;t++)this.addChild(this.sky[t])},GAME.Background.constructor=GAME.Background,GAME.Background.prototype=Object.create(PIXI.DisplayObjectContainer.prototype),GAME.Background.prototype.updateTransform=function(){this.scrollPosition+=5*GAME.time.DELTA_TIME;for(var t,e=0;e<this.floor.length;e++)t=this.scrollPosition+799*e,t%=2397,t-=799,this.floor[e].position.y=Math.round(t);for(e=0;e<this.sky.length;e++)t=1.4*this.scrollPosition,t+=800*e,t%=1600,t-=800,this.sky[e].position.y=Math.round(t);PIXI.DisplayObjectContainer.prototype.updateTransform.call(this)},GAME.PlayerShip=function(t){if(PIXI.Sprite.call(this,PIXI.Texture.fromFrameId("fighter_bankLeft_04.png")),!playerFrames){playerFrames=[];for(var e=5;0<e;e--)playerFrames.push(PIXI.Texture.fromFrameId("fighter_bankLeft_0"+e+".png"));for(e=1;6>e;e++)playerFrames.push(PIXI.Texture.fromFrameId("fighter_bankRight_0"+e+".png"))}this.engine=t,this.targetPosition={x:300,y:400},this.shieldActivated=this.isDead=!1,this.shieldCount=0,this.anchor.x=.5,this.anchor.y=.5,this.position.x=300,this.position.y=900,this.targetX=this.previousX=0,this.radius=12.5,this.shield=PIXI.Sprite.fromFrame("shield.png"),this.shield.anchor.x=.5,this.shield.anchor.y=.5,this.booster=PIXI.Sprite.fromFrame("thrust.png"),this.booster.anchor.x=.5,this.booster.anchor.y=-.5,this.booster.visible=!1,this.addChild(this.shield),this.shield.visible=!1},GAME.PlayerShip.constructor=GAME.PlayerShip,GAME.PlayerShip.prototype=Object.create(PIXI.Sprite.prototype),GAME.PlayerShip.prototype.updateTransform=function(){this.targetX+=.2*(this.targetPosition.x-this.previousX-this.targetX);var t=this.targetX/15+.5;console.log(this.targetX),1<t?t=1:0>t&&(t=0),t=Math.round(9*t),console.log(t),this.setTexture(playerFrames[t]),600<this.targetPosition.x?this.targetPosition.x=600:0>this.targetPosition.x&&(this.targetPosition.x=0),800<this.targetPosition.y?this.targetPosition.y=800:0>this.targetPosition.y&&(this.targetPosition.y=0),this.position.x+=.5*(this.targetPosition.x-this.position.x),this.position.y+=.5*(this.targetPosition.y-40-this.position.y),this.shieldActivated&&(this.shieldCount--,this.shield.alpha=120>this.shieldCount?0==this.shieldCount%4?1:0:0==this.shieldCount%2?1:.5,0==this.shieldCount&&this.shieldOff()),PIXI.DisplayObjectContainer.prototype.updateTransform.call(this),this.previousX=this.targetPosition.x,this.booster.alpha=Math.random()},GAME.PlayerShip.prototype.shieldOn=function(){this.shieldCount=600,this.shieldActivated||(this.shieldActivated=!0,this.shield.visible=!0)},GAME.PlayerShip.prototype.shieldOff=function(){this.shieldActivated&&(this.shieldCount=0,this.shieldActivated=!1,this.shield.visible=!1)};var enemyFrames,laserCount=0;GAME.BulletManager=function(t){this.engine=t,this.bullets=[],this.fireCount=0,this.bulletPool=new GAME.GameObjectPool(GAME.Bullet)},GAME.BulletManager.constructor=GAME.BulletManager,GAME.BulletManager.prototype.update=function(){this.fireCount+=GAME.time.DELTA_TIME;for(var t=this.bullets,e=0;e<t.length;e++){var i=t[e];i.position.y-=20*GAME.time.DELTA_TIME,-50>i.position.y&&(t.splice(e,1),e--,this.bulletPool.returnObject(i),this.engine.view.actionContainer.removeChild(i))}},GAME.BulletManager.prototype.fire=function(){if(!(2>this.fireCount)){this.fireCount=0;var t=this.bulletPool.getObject();laserCount+=GAME.time.DELTA_TIME;var e=Math.round(laserCount/5)%15;t.setTexture(PIXI.TextureCache["PewPew"+(e+1)+".png"]),this.engine.view.actionContainer.addChild(t),this.bullets.push(t),t.position.x=this.engine.player.position.x,t.position.y=this.engine.player.position.y-50}},GAME.BulletManager.prototype.destroyBullet=function(t){for(var e=0;e<this.bullets.length;e++)if(this.bullets[e]==t){this.bullets.splice(e,1),this.bulletPool.returnObject(t),this.engine.view.actionContainer.removeChild(t);break}},GAME=GAME||{},GAME.Bullet=function(){PIXI.Sprite.call(this,PIXI.Texture.fromFrameId("PewPew1.png")),this.anchor.x=.5,this.anchor.y=.1,this.position.x=300,this.position.y=900,this.radius=20},GAME.Bullet.constructor=GAME.Bullet,GAME.Bullet.prototype=Object.create(PIXI.Sprite.prototype),GAME=GAME||{},laserCount=0,GAME.LaserManager=function(t){this.engine=t,this.bullets=[],this.fireCount=0,this.view=new GAME.LaserView(PIXI.Texture.fromImage("static/FlashVHtml/img/MEGAlaser.png")),this.view.points=this.bullets,this.bulletPool=new GAME.GameObjectPool(GAME.LaserSegment),GAME.HIGH_MODE&&this.engine.view.stage.addChild(this.view)},GAME.LaserManager.constructor=GAME.LaserManager,GAME.LaserManager.prototype.update=function(){this.fireCount++;for(var t=this.bullets,e=0;e<t.length;e++){var i=t[e];i.position.y-=10,-150>i.position.y&&(t.splice(e,1),e--,this.bulletPool.returnObject(i))}},GAME.LaserManager.prototype.fire=function(){if(!(2>this.fireCount)){this.fireCount=0;var t=this.bulletPool.getObject();this.bullets.push(t),t.position.x=this.engine.player.position.x,t.position.y=this.engine.player.position.y}},GAME.LaserManager.prototype.destroyBullet=function(t){for(var e=0;e<this.bullets.length;e++)if(this.bullets[e]==t){this.bullets.splice(e,1),this.bulletPool.returnObject(t);break}},GAME=GAME||{},GAME.LaserSegment=function(){PIXI.Sprite.call(this,PIXI.Texture.fromFrameId("PewPew1.png")),this.anchor.x=.5,this.anchor.y=.5,this.radius=80},GAME.LaserSegment.constructor=GAME.LaserSegment,GAME.LaserSegment.prototype=Object.create(PIXI.Sprite.prototype),PIXI=PIXI||{},GAME.LaserView=function(t){PIXI.Strip.call(this,t),this.points=[],this.count=0,this.blendMode=PIXI.blendModes.SCREEN},GAME.LaserView.constructor=GAME.LaserView,GAME.LaserView.prototype=Object.create(PIXI.Strip.prototype),GAME.LaserView.prototype.updateTransform=function(){var t=this.points;if(!(1>t.length)){var e,i=[],s=[],n=[],o=[],a=t[0].position,r=e=0,h=t[0];this.count-=.2,i[0]=h.x+e,i[1]=h.y+r,i[2]=h.x-e,i[3]=h.y-r,s[0]=0,s[1]=Math.random(),s[2]=0,s[3]=Math.random(),o[0]=1,o[1]=1,n[0]=0,n[1]=1;for(var p=t.length,l=1;l<p;l++){h=t[l].position;var c=4*l;r=-((e=l<t.length-1?t[l+1].position:h).x-a.x),e=e.y-a.y;var u=10*(1-l/(p-1));1<u&&(u=1),e/=a=Math.sqrt(e*e+r*r),r/=a,e*=u*=20+Math.abs(50*Math.sin(.3*(l+this.count))),r*=u,i[c]=h.x+e,i[c+1]=h.y+r,i[c+2]=h.x-e,i[c+3]=h.y-r,l%2?(s[c]=0,s[c+1]=0,s[c+2]=.1):(s[c]=0,s[c+1]=.001,s[c+2]=.99999),s[c+3]=1,o[c=2*l]=1,o[c+1]=1,n[c=2*l]=c,n[c+1]=c+1,a=h}try{this.verticies=new Float32Array(i),this.uvs=new Float32Array(s),this.colors=new Float32Array(o),this.indices=new Uint16Array(n)}catch(t){this.verticies=i,this.uvs=s,this.colors=o,this.indices=n}this.dirty=!0}},GAME.LaserView.prototype.setTexture=function(t){this.texture=t,this.width=t.frame.width,this.height=t.frame.height,this.updateFrame=!0},GAME.Enemy=function(){if(!enemyFrames){enemyFrames=[];for(var t=1;20>t;t++){var e=t;9>=t&&(e="0"+t),enemyFrames.push(PIXI.Texture.fromFrameId("alienAnim_"+e+".png"))}}PIXI.MovieClip.call(this,enemyFrames),this.anchor.x=.5,this.anchor.y=.8,this.position.x=300,this.position.y=900,this.life,this.isDead,this.speed,this.offset,this.sign,this.waveLength=this.frequency=100,this.startX=0,this.radius=30},GAME.Enemy.constructor=GAME.Enemy,GAME.Enemy.prototype=Object.create(PIXI.MovieClip.prototype),GAME.Enemy.prototype.reset=function(){this.offset=100*Math.random(),this.isDead=!1,this.currentFrame=39*Math.random(),this.life=12,this.sign=Math2.randomPlusMinus(),this.speed=3+6*Math.random(),this.startX=0},GAME.Enemy.prototype.update=function(){this.position.y+=3*GAME.time.DELTA_TIME,this.position.x=this.startX+Math.sin(this.position.y/this.frequency)*this.waveLength,this.rotation=.1*Math.sin(.02*this.position.y+this.offset)*this.sign,0>this.rotation&&(this.rotation*=-1),this.scale.x=this.scale.y=1+.5*this.rotation},GAME=GAME||{},laserCount=0,GAME.EnemyManager=function(t){this.engine=t,this.deadEnemies=[],this.enemies=[],this.spawnRate=this.spawnCount=0,this.enemyPool=new GAME.GameObjectPool(GAME.Enemy),this.startRange=0,this.startPoint=300,this.spread=500,this.waveRatio=this.maxSpeedUpgrade=this.maxSpeedCount=this.maxSpeed=this.waveLength=this.frequency=this.changeUp=this.county=this.speed=this.speedRange=0,this.canSpawn=!0,this.positionShiftSpeed=this.positionShift=this.level=this.easeInMode=0,this.multiplier=GAME.HIGE_MODE?1:2},GAME.EnemyManager.constructor=GAME.EnemyManager,GAME.EnemyManager.prototype.update=function(){this.engine.canSpawn&&(this.changeUp+=GAME.time.DELTA_TIME,200<this.changeUp&&(this.changeUp=0,this.changeWave()),this.easeInMode+=GAME.time.DELTA_TIME,this.spawnCount>this.spawnRate*this.multiplier&&(this.spawnCount=0,this.addEnemy()),this.spawnCount+=GAME.time.DELTA_TIME);for(var t=0;t<this.enemies.length;t++)this.enemies[t].update(),870<this.enemies[t].position.y&&this.deadEnemies.push(this.enemies[t]);for(t=0;t<this.deadEnemies.length;t++)this.destroyEnemy(this.deadEnemies[t]);this.positionShift+=this.startRange,t=(Math.sin(this.positionShift)+1)/2;var e=this.spread/2,i=300-e+this.startRange/2+this.waveLength;this.startPoint=i+(300+e-this.startRange/2-this.waveLength-i)*t,this.deadEnemies=[]},GAME.EnemyManager.prototype.changeWave=function(){1<(t=Math2.map(this.level,0,50,.2,1))&&(t=1),this.speed=1.5+Math2.random(2,7)*t,this.speedRange=Math2.random(0,5)*t;var t=300-this.halfSpread,e=300+this.halfSpread;this.startPoint=Math2.random(t,e),this.startRange=50+450*Math2.random(0,1),this.positionShiftSpeed=.8*Math.random()-.4,this.startPoint-this.startRange/2<t&&(this.startPoint=t+this.startRange/2),this.startPoint+this.startRange/2>e&&(this.startPoint=e-this.startRange/2),this.waveLength=100*Math.random(),this.frequency=100,this.spawnRate=Math2.map(this.level,0,20,12,3),3>this.spawnRate&&(this.spawnRate=3),this.level++,this.easeInMode++},GAME.EnemyManager.prototype.addEnemy=function(){if(!this.engine.player.isDead){var t=this.enemyPool.getObject();t.reset(),this.county++,t.position.y=-100,t.startX=this.startPoint+Math2.random(-this.startRange/2,this.startRange/2),t.speed=this.speed+Math2.random(-this.speedRange/2,this.speedRange/2),t.frequency=this.frequency,t.waveLength=this.waveLength,this.engine.view.actionContainer.addChild(t),this.enemies.push(t)}},GAME.EnemyManager.prototype.hitEnemy=function(t,e){0>t.life||(t.life-=e||10,0>=t.life&&(this.engine.score+=10*this.engine.multiplier,t.isDead=!0,this.deadEnemies.push(t),this.engine.explosionManager.addExplosion(t.position.x,t.position.y)))},GAME.EnemyManager.prototype.destroyEnemy=function(t){var e=this.enemies.length;t.alpha=.5;for(var i=0;i<e;i++)if(this.enemies[i]==t){this.enemies.splice(i,1),this.length--,this.enemyPool.returnObject(t),this.engine.view.actionContainer.removeChild(t);break}},GAME.EnemyManager.prototype.reset=function(){this.changeUp=this.waveRatio=this.county=this.level=0,this.maxSpeed=2,this.maxSpeedCount=0,this.maxSpeedUpgrade=480,this.speedRange=0,this.speed=10,this.spawnRate=100,this.easeInMode=0,this.changeWave()},GAME=GAME||{},GAME.EnemyBullet=function(){PIXI.Sprite.call(this,PIXI.Texture.fromFrameId("bad_bullet.png")),this.anchor.x=.5,this.anchor.y=.5,this.speedY=this.speedX=0,this.radius=12},GAME.EnemyBullet.constructor=GAME.EnemyBullet,GAME.EnemyBullet.prototype=Object.create(PIXI.Sprite.prototype),GAME=GAME||{},laserCount=0,GAME.EnemyBulletManager=function(t){this.engine=t,this.bullets=[],this.fireCount=0,this.spawnRate=80,this.spawnUpgradeCount=0,this.spawnRateUpgrade=400,this.chainLength=3,this.chainCount=this.chainGap=this.chain=0,this.badBulletPool=new GAME.GameObjectPool(GAME.EnemyBullet)},GAME.EnemyBulletManager.constructor=GAME.EnemyBulletManager,GAME.EnemyBulletManager.prototype.update=function(){if(this.engine.canSpawn){if(this.spawnUpgradeCount+=GAME.time.DELTA_TIME,this.spawnRateUpgrade==this.spawnUpgradeCount&&(this.spawnUpgradeCount=0,this.spawnRate-=.75,78>this.spawnRate&&(0==this.spawnRate%10&&this.chainLength++,15<this.chainLength&&(this.chainLength=15)),5>this.spawnRate&&(this.spawnRate=5)),this.fireCount+=GAME.time.DELTA_TIME,0<this.engine.enemyManager.enemies.length){var t=this.engine.enemyManager.enemies[this.engine.enemyManager.enemies.length-1],e=2.5+2*Math.random();75<this.spawnRate&&(e*=.5),this.fireCount>this.spawnRate&&this.fire(t,e)}this.chainCount+=GAME.time.DELTA_TIME,150<this.chainCount&&(this.chainCount=0,0!=this.engine.enemyManager.enemies.length&&(this.chainTarget=this.engine.enemyManager.enemies[this.engine.enemyManager.enemies.length-1],this.chainGap=5,this.chain=this.chainLength)),0<this.chain&&(this.chainGap-=GAME.time.DELTA_TIME,0>=this.chainGap&&(this.chain-=GAME.time.DELTA_TIME,this.chainGap=5,this.chainTarget&&(this.chainTarget.isDead||this.fire(this.chainTarget,3.5))))}for(t=this.bullets,e=0;e<t.length;e++){var i=t[e];i.position.x-=i.speedX*GAME.time.DELTA_TIME,i.position.y-=i.speedY*GAME.time.DELTA_TIME,i.scale.x=i.scale.y=1+.1*Math.sin(.05*i.position.y),(850<i.position.y||-50>i.position.x||650<i.position.x)&&(t.splice(e,1),e--,this.badBulletPool.returnObject(i),this.engine.view.enemyBulletContainer.removeChild(i))}},GAME.EnemyBulletManager.prototype.update2=function(){this.spawnUpgradeCount+=GAME.time.DELTA_TIME,this.spawnRateUpgrade==this.spawnUpgradeCount&&(this.spawnUpgradeCount=0,this.spawnRate--),this.fireCount+=GAME.time.DELTA_TIME,this.fireCount>this.spawnRate&&this.fire();for(var t=this.bullets,e=0;e<t.length;e++){var i=t[e];i.position.x-=i.speedX*GAME.time.DELTA_TIME,i.position.y-=i.speedY*GAME.time.DELTA_TIME,i.scale.x=i.scale.y=1+.1*Math.sin(.05*i.position.y),(850<i.position.y||-50>i.position.x||650<i.position.x)&&(t.splice(e,1),e--,this.badBulletPool.returnObject(i),this.engine.view.enemyBulletContainer.removeChild(i))}},GAME.EnemyBulletManager.prototype.fire=function(t,e){this.fireCount=0;var i=this.badBulletPool.getObject();this.engine.view.enemyBulletContainer.addChild(i),this.bullets.push(i),i.position.x=t.position.x,i.position.y=t.position.y;var s=i.position.x-this.engine.player.position.x,n=i.position.y-this.engine.player.position.y,o=Math.sqrt(s*s+n*n);i.speedX=s/o*e,i.speedY=n/o*e},GAME.EnemyBulletManager.prototype.destroyBullet=function(t){for(var e=0;e<this.bullets.length;e++)if(this.bullets[e]==t){this.bullets.splice(e,1),this.badBulletPool.returnObject(t),this.engine.view.enemyBulletContainer.removeChild(t);break}},GAME.EnemyBulletManager.prototype.removeAll=function(){for(var t=0;t<this.bullets.length;t++)this.bullets[t].position.y=1e3;this.bullets=[]};var explosionFrames,debris=[];GAME.Explosion=function(){if(!explosionFrames){(debris=[]).push("shipDebris_1.png","shipDebris_2.png","shipDebris_3.png","shipDebris_4.png","shipDebris_5.png","shipDebris_6.png"),explosionFrames=[];for(var t=1;27>t;t++)explosionFrames.push(PIXI.Texture.fromFrameId("Explosion_Sequence_A "+t+".png"))}if(PIXI.MovieClip.call(this,explosionFrames),this.debrisPool=new GAME.GameObjectPool(GAME.Debris),this.origin={x:0,y:0},this.anchor.x=.5,this.anchor.y=.5,this.life=25,this.particals=[],GAME.HIGH_MODE)for(t=0;6>t;t++){var e=this.debrisPool.getObject();e.alpha=1,e.rotationSpeed=.8*(Math.random()-.5),e.speed.x=30*Math.random()-15,e.speed.y=5+5*Math.random(),this.particals.push(e),this.addChild(e)}},GAME.Explosion.constructor=GAME.Explosion,GAME.Explosion.prototype=Object.create(PIXI.MovieClip.prototype),GAME.Explosion.prototype.init=function(){explosion=this,explosion.rotation=2*Math.random()*Math.PI,explosion.position.x=this.origin.x,explosion.position.y=this.origin.y,this.isDead=!1},GAME.Explosion.prototype.update=function(){var t=this.particals;if(25==this.currentFrame&&(this.alpha=0),GAME.HIGH_MODE)for(var e=0;e<t.length;e++){var i=t[e];i.life--,i.speed.x*=.96,i.position.x+=i.speed.x,i.position.y+=i.speed.y,i.rotation+=i.rotationSpeed,i.scale.x*=.96,i.scale.y*=.96,0==i.life&&(i.alpha=0)}this.life-=GAME.time.DELTA_TIME,0>this.life&&(this.isDead=!0)},GAME.Debris=function(){PIXI.Sprite.call(this,PIXI.Texture.fromFrameId("shipDebris_1.png")),this.anchor.x=.5,this.anchor.y=.5,this.speed={x:0,y:0}},GAME.Debris.constructor=GAME.Debris,GAME.Debris.prototype=Object.create(PIXI.Sprite.prototype),laserCount=0,GAME.ExplosionManager=function(t){this.engine=t,this.explosions=[],this.explosionPool=new GAME.GameObjectPool(GAME.Explosion)},GAME.ExplosionManager.constructor=GAME.ExplosionManager,GAME.ExplosionManager.prototype.update=function(){for(var t=this.explosions,e=0;e<t.length;e++){var i=t[e];i.update(),i.isDead&&(t.splice(e,1),this.engine.view.actionContainer.removeChild(i),this.explosionPool.returnObject(i),e--)}},GAME.ExplosionManager.prototype.addExplosion=function(t,e){var i=this.explosionPool.getObject();i.origin.x=t,i.origin.y=e,i.init(),this.engine.view.actionContainer.addChild(i),this.explosions.push(i)},GAME.PickupManager=function(t){this.engine=t,this.pickups=[],this.pickupPool=new GAME.GameObjectPool(GAME.Pickup),this.dropCount=0},GAME.PickupManager.constructor=GAME.PickupManager,GAME.PickupManager.prototype.update=function(){this.dropCount+=GAME.time.DELTA_TIME,500<this.dropCount&&(this.dropPickup(),this.dropCount=0);for(var t=this.pickups,e=0;e<t.length;e++){var i=t[e];i.isPickedUp?(i.ratio+=.2*(1-i.ratio),i.scale.x=1-i.ratio,i.scale.y=1-i.ratio,i.position.x=i.pickupPosition.x+(this.engine.player.position.x-i.pickupPosition.x)*i.ratio,i.position.y=i.pickupPosition.y+(this.engine.player.position.y-i.pickupPosition.y)*i.ratio,.99<i.ratio&&this.destroyPickup(i)):(i.position.y+=3*GAME.time.DELTA_TIME,820<i.position.y&&(this.destroyPickup(i),e--))}},GAME.PickupManager.prototype.dropPickup=function(){if(this.engine.canSpawn){var t,e=this.pickupPool.getObject();switch(32==this.engine.multiplier?t=Math2.randomInt(0,2):2<(t=Math2.randomInt(0,4))&&(t=3),this.engine.view.actionContainer.addChild(e),t){case 0:GAME.HIGH_MODE?e.setToLaser():e.setToRocket();break;case 1:e.setToRocket();break;case 2:e.setToShield();break;case 3:e.setToMultiply()}this.pickups.push(e),e.position.x=Math2.random(100,500),e.position.y=-100}},GAME.PickupManager.prototype.pickup=function(t){if(!t.isPickedUp)switch(t.isPickedUp=!0,t.pickupPosition={x:t.position.x,y:t.position.y},t.ratio=0,t.id){case GAME.Pickup.LASER:this.engine.setLaser();break;case GAME.Pickup.ROCKET:this.engine.setRockets();break;case GAME.Pickup.MULTIPLY:this.engine.increaseMultiplier();break;case GAME.Pickup.SHIELD:this.engine.setShield()}},GAME.PickupManager.prototype.removeAll=function(){for(var t=0;t<this.pickups.length;t++){var e=this.pickups[t];this.pickupPool.returnObject(e),this.engine.view.actionContainer.removeChild(e)}this.pickups.length=0},GAME.PickupManager.prototype.destroyPickup=function(t){for(var e=this.pickups.length,i=0;i<e;i++)if(this.pickups[i]==t){this.pickups.splice(i,1),this.pickupPool.returnObject(t),this.engine.view.actionContainer.removeChild(t);break}},GAME.Pickup=function(){PIXI.Sprite.call(this,PIXI.Texture.fromFrameId("pickup_rocket.png")),this.origin={x:0,y:0},this.anchor.x=.5,this.anchor.y=.5,this.scale.y=-1,this.life=29,this.radius=40},GAME.Pickup.constructor=GAME.Pickup,GAME.Pickup.prototype=Object.create(PIXI.Sprite.prototype),GAME.Pickup.prototype.reset=function(t){this.rotation=Math.PI,this.acceleration.y=-2,this.speed.y=5+5*Math.random(0,1),this.turn=Math2.random(-.01,.01),this.count=0,this.speed.x=5*t*Math2.randomPlusMinus(),this.engineCountdown=10},GAME.Pickup.prototype.setToRocket=function(){this.id=GAME.Pickup.ROCKET,this.ratio=0,this.scale.x=this.scale.y=1,isPickedUp=!1,this.setTexture(PIXI.Texture.fromFrameId("pickup_rocket.png"))},GAME.Pickup.prototype.setToLaser=function(){this.id=GAME.Pickup.LASER,this.ratio=0,this.scale.x=this.scale.y=1,this.isPickedUp=!1,this.setTexture(PIXI.Texture.fromFrameId("pickup_megalaser.png"))},GAME.Pickup.prototype.setToShield=function(){this.id=GAME.Pickup.SHIELD,this.ratio=0,this.scale.x=this.scale.y=1,this.isPickedUp=!1,this.setTexture(PIXI.Texture.fromFrameId("pickup_shield.png"))},GAME.Pickup.prototype.setToMultiply=function(){this.id=GAME.Pickup.MULTIPLY,this.ratio=0,this.scale.x=this.scale.y=1,this.isPickedUp=!1,this.setTexture(PIXI.Texture.fromFrameId("pickup_X2.png"))},GAME.Pickup.ROCKET=4,GAME.Pickup.LASER=1,GAME.Pickup.MULTIPLY=2,GAME.Pickup.SHIELD=3,GAME.EMP=function(){PIXI.Sprite.call(this,PIXI.Texture.fromImage("static/FlashVHtml/img/EMP.png")),this.blendMode=PIXI.blendModes.SCREEN,this.firstPhase=!0,this.isDead=!1,this.anchor.x=.5,this.anchor.y=.5},GAME.EMP.constructor=GAME.EMP,GAME.EMP.prototype=Object.create(PIXI.Sprite.prototype),GAME.EMP.prototype.update=function(){this.firstPhase?(this.rotation+=.2,this.scale.x+=.1*(2-this.scale.y),1.99<this.scale.x&&(this.firstPhase=!1)):(this.scale.x+=.3*(4-this.scale.x),this.alpha*=.8,.1>this.alpha&&(this.alpha=0,this.isDead=!0)),this.scale.y=this.scale.x},laserCount=0,GAME.EMPManager=function(t){this.engine=t,this.emps=[],this.empCount=3},GAME.EMPManager.constructor=GAME.EMPManager,GAME.EMPManager.prototype.update=function(){for(var t=this.emps,e=0;e<t.length;e++){var i=t[e];i.update(),i.isDead&&(t.splice(e,1),this.engine.view.empContainer.removeChild(i),e--)}},GAME.EMPManager.prototype.fire=function(){(t=new GAME.EMP).name="EMP",this.engine.pickupManager.removeAll(),this.engine.view.empContainer.addChild(t),this.emps.push(t),this.engine.gameCount=0,this.engine.gunMode=0,this.engine.resetMultiplier(),t.position.x=this.engine.player.position.x,t.position.y=this.engine.player.position.y;for(var t=this.engine.enemyManager.enemies,e=0;e<t.length;e++)this.engine.enemyManager.hitEnemy(t[e],1e4);this.engine.enemyBulletManager.removeAll(),this.empCount--,0==this.empCount&&this.engine.gameover()},GAME.Rocket=function(){this.acceleration={x:0,y:0},this.speed={x:0,y:0},this.engineCountdown,this.turn=0,this.rotation=-Math.PI/2,this.count,PIXI.Sprite.call(this,PIXI.Texture.fromFrameId("rocket_on1.png")),this.origin={x:0,y:0},this.anchor.x=.5,this.anchor.y=.5,this.scale.y=-1,this.life=29,this.radius=20},GAME.Rocket.constructor=GAME.Rocket,GAME.Rocket.prototype=Object.create(PIXI.Sprite.prototype),GAME.Rocket.prototype.reset=function(t){this.rotation=Math.PI,this.acceleration.y=-2,this.speed.y=5+5*Math.random(0,1),this.turn=Math2.random(-.01,.01),this.count=0,this.speed.x=5*t*Math2.randomPlusMinus(),this.engineCountdown=10},GAME.Rocket.prototype.update=function(){0==this.engineCountdown?(this.count+=.4,this.speed.y+=this.acceleration.y):(this.rotation+=this.turn,this.acceleration.x=2*Math.sin(this.rotation),this.acceleration.y=2*Math.cos(this.rotation),this.engineCountdown--),this.speed.x+=this.acceleration.x,this.speed.x*=.95,this.position.x+=this.speed.x*GAME.time.DELTA_TIME,this.position.y+=this.speed.y*GAME.time.DELTA_TIME},GAME.RocketManager=function(t){this.engine=t,this.rockets=[],this.smoke=[],this.rocketPool=new GAME.GameObjectPool(GAME.Rocket),this.smokePool=new GAME.GameObjectPool(GAME.Smoke),this.fireCount=0},GAME.RocketManager.constructor=GAME.RocketManager,GAME.RocketManager.prototype.update=function(){this.fireCount++;for(var t=this.rockets,e=t.length,i=0;i<e;i++){var s=t[i];if(s.update(),-50>s.position.y&&(t.splice(i,1),i--,e--,this.rocketPool.returnObject(s),this.engine.view.actionContainer.removeChild(s)),GAME.HIGH_MODE&&this.fireCount%2&&0==s.engineCountdown){var n=this.smokePool.getObject();n.position.x=s.position.x,n.position.y=s.position.y,n.scale.x=n.scale.y=.2,n.alpha=.8,n.rotationSpeed=.2*Math.random()-.1,n.speed.x=0,n.speed.y=11.25,this.smoke.push(n),this.engine.view.actionContainer.addChild(n)}}for(e=this.smoke.length,i=0;i<e;i++)(n=this.smoke[i]).position.x+=n.speed.x*GAME.time.DELTA_TIME,n.position.y+=n.speed.y*GAME.time.DELTA_TIME,n.rotation+=n.rotationSpeed,n.scale.x+=.04,n.scale.y+=.04,n.alpha-=.03,.1>n.alpha&&(this.engine.view.actionContainer.removeChild(n),this.smokePool.returnObject(n),this.smoke.splice(i,1),i--,e--)},GAME.RocketManager.prototype.addCloud=function(){},GAME.RocketManager.prototype.fire=function(){if(!(40>this.fireCount))for(var t=0;10>t;t++){this.fireCount=0;var e=this.rocketPool.getObject();e.reset((t+1)/10),this.engine.view.actionContainer.addChild(e),this.rockets.push(e),e.position.x=this.engine.player.position.x,e.position.y=this.engine.player.position.y}},GAME.RocketManager.prototype.destroyRocket=function(t){for(var e=this.rockets.length,i=0;i<e;i++)if(this.rockets[i]==t){this.rockets.splice(i,1),this.rocketPool.returnObject(t),this.engine.view.actionContainer.removeChild(t);break}},GAME.Smoke=function(){PIXI.Sprite.call(this,PIXI.Texture.fromFrameId("smoke.png")),this.anchor.x=.5,this.anchor.y=.5,this.speed={x:0,y:0}},GAME.Smoke.constructor=GAME.Smoke,GAME.Smoke.prototype=Object.create(PIXI.Sprite.prototype),GAME.CollisionManager=function(t){this.engine=t,this.count=0},GAME.CollisionManager.constructor=GAME.CollisionManager,GAME.CollisionManager.prototype.update=function(){this.hitTestSuperLaserVsEnemy(),0==this.count?this.hitTestLaserVsEnemy():1==this.count?(this.hitTestPlayerVsPickups(),this.hitTestRocketsVsEnemy()):2==this.count&&this.hitTestPlayerVsEnemy(),this.hitTestPlayerVsEnemyBullet(),this.count++,this.count%=3},GAME.CollisionManager.prototype.hitTestLaserVsEnemy=function(){for(var t=this.engine.bulletManager.bullets,e=this.engine.enemyManager.enemies,i=t.length,s=0;s<i;s++)for(var n=t[s],o=e.length,a=0;a<o;a++){var r=e[a],h=n.position.x-r.position.x,p=n.position.y-r.position.y,l=n.radius+r.radius;if(h*h+p*p<l*l){this.engine.bulletManager.destroyBullet(n),this.engine.enemyManager.hitEnemy(r),s--,i--;break}}},GAME.CollisionManager.prototype.hitTestSuperLaserVsEnemy=function(){for(var t=this.engine.laserManager.bullets,e=this.engine.enemyManager.enemies,i=t.length,s=0;s<i;s++)for(var n=t[s],o=e.length,a=0;a<o;a++){var r=e[a],h=n.position.x-r.position.x,p=n.position.y-r.position.y,l=n.radius+r.radius;if(h*h+p*p<l*l){this.engine.enemyManager.hitEnemy(r),s--,i--;break}}},GAME.CollisionManager.prototype.hitTestRocketsVsEnemy=function(){for(var t=this.engine.rocketManager.rockets,e=this.engine.enemyManager.enemies,i=t.length,s=0;s<i;s++)for(var n=t[s],o=e.length,a=0;a<o;a++){var r=e[a],h=n.position.x-r.position.x,p=n.position.y-r.position.y,l=n.radius+r.radius;if(h*h+p*p<l*l){this.engine.rocketManager.destroyRocket(n),this.engine.enemyManager.hitEnemy(r),s--,i--;break}}},GAME.CollisionManager.prototype.hitTestPlayerVsPickups=function(){for(var t=this.engine.player,e=this.engine.pickupManager.pickups,i=e.length,s=0;s<i;s++){var n=e[s],o=t.position.x-n.position.x,a=t.position.y-n.position.y,r=t.radius+n.radius;if(o*o+a*a<r*r){this.engine.pickupManager.pickup(n);break}}},GAME.CollisionManager.prototype.hitTestPlayerVsEnemy=function(){for(var t=this.engine.player,e=this.engine.enemyManager.enemies,i=e.length,s=0;s<i;s++){var n=e[s],o=t.position.x-n.position.x,a=t.position.y-28-1-n.position.y,r=t.radius+n.radius;if(o*o+a*a<r*r){if(this.engine.enemyManager.hitEnemy(n),t.shieldActivated)break;this.engine.empManager.fire();break}}},GAME.CollisionManager.prototype.hitTestPlayerVsEnemyBullet=function(){for(var t=this.engine.player,e=this.engine.enemyBulletManager.bullets,i=e.length,s=0;s<i;s++){var n=e[s],o=t.position.x-n.position.x,a=t.position.y-19-n.position.y,r=t.radius+n.radius;if(o*o+a*a<r*r){if(this.engine.enemyBulletManager.destroyBullet(n),t.shieldActivated)break;this.engine.empManager.fire();break}}},GAME.ShootyView=function(t){this.engine=t,this.renderer=window.renderer,GAME.HIGH_MODE=this.renderer instanceof PIXI.WebGLRenderer,this.stage=stage,this.background=new GAME.Background,this.stage.addChild(this.background),this.scoreView=document.createElement("div"),this.scoreView.onmousedown=function(){return!1},this.scoreView.className="scoreView",this.actionContainer=new PIXI.DisplayObjectContainer,this.enemyBulletContainer=new PIXI.DisplayObjectContainer,this.empContainer=new PIXI.DisplayObjectContainer,this.stage.addChild(this.actionContainer),this.stage.addChild(this.enemyBulletContainer),this.stage.addChild(this.empContainer),this.vignette=PIXI.Sprite.fromImage("static/FlashVHtml/img/vignette.png"),GAME.HIGH_MODE&&this.stage.addChild(this.vignette),this.vignette.visible=!1,this.vignette.alpha=0,(t=document.getElementById("app")).appendChild(this.scoreView),this.multiplyerTextures={},this.multiplyerTextures[1]=PIXI.Texture.fromFrameId("combo_HUD_none.png"),this.multiplyerTextures[2]=PIXI.Texture.fromFrameId("combo_HUD_x2.png"),this.multiplyerTextures[4]=PIXI.Texture.fromFrameId("combo_HUD_x4.png"),this.multiplyerTextures[8]=PIXI.Texture.fromFrameId("combo_HUD_x8.png"),this.multiplyerTextures[16]=PIXI.Texture.fromFrameId("combo_HUD_x16.png"),this.multiplyerTextures[32]=PIXI.Texture.fromFrameId("combo_HUD_x32.png"),this.multiplyerSprite=new PIXI.Sprite(this.multiplyerTextures[1]),this.stage.addChild(this.multiplyerSprite),this.lives=[PIXI.Sprite.fromFrame("EMP_life_icon.png"),PIXI.Sprite.fromFrame("EMP_life_icon.png"),PIXI.Sprite.fromFrame("EMP_life_icon.png")];for(var e=0;3>e;e++)this.lives[e].position.x=555,this.lives[e].position.y=40*e+108,this.stage.addChild(this.lives[e]);this.gameoverScreen=document.createElement("div"),this.gameoverScreen.className="gameoverView",this.gameoverScreen.style.display="none",t.appendChild(this.gameoverScreen),this.multiplyerSprite.position.x=600-this.multiplyerSprite.width},GAME.ShootyView.constructor=GAME.ShootyView,GAME.ShootyView.prototype.update=function(){if(this.cachMultiplyer!=this.engine.multiplier&&(this.cachMultiplyer=this.engine.multiplier,this.multiplyerSprite.setTexture(this.multiplyerTextures[this.engine.multiplier])),this.cachEmpCount!=this.engine.empManager.empCount){this.cachEmpCount=this.engine.empManager.empCount;for(var t=0;3>t;t++)this.lives[t].position.x=t<this.cachEmpCount?555:600}if(this.cacheScore!=this.engine.score){this.cacheScore=this.engine.score;var e=this.engine.score.toString().split(""),i="",s=e.length,n=s%3-1;for(t=0;t<s;t++)i+=e[t],0==(t-n)%3&&t!=s-1&&(i+=",");this.scoreView.innerHTML=""+i}this.renderer.render(this.stage)},GAME.ShootyView.prototype.tick=function(){this.renderer.render(this.stage)},GAME.ShootyView.prototype.showGameover=function(){$(this.gameoverScreen).fadeIn()},GAME.ShootyView.prototype.hideGameover=function(){$(this.gameoverScreen).fadeOut()},GAME.ShootyView.prototype.resize=function(t,e){this.scoreView.style.top=.005*e+"px",this.scoreView.style.left="0px",this.scoreView.style.width=.8*t+"px",this.scoreView.style.fontSize=e/800*80+"px",this.gameoverScreen.style.width=t/600*439+"px",this.gameoverScreen.style.height=t/600*240+"px",this.gameoverScreen.style.left=t/2-t/600*439/2+"px",this.gameoverScreen.style.top=e/2-t/600*240/2+"px"},GAME.HIGH_MODE=!0,GAME.ShootyEngine=function(){this.view=new GAME.ShootyView(this),this.mouse={x:0,y:0},this.player=new GAME.PlayerShip(this),this.bulletManager=new GAME.BulletManager(this),this.laserManager=new GAME.LaserManager(this),this.enemyBulletManager=new GAME.EnemyBulletManager(this),this.rocketManager=new GAME.RocketManager(this),this.pickupManager=new GAME.PickupManager(this),this.enemyManager=new GAME.EnemyManager(this),this.empManager=new GAME.EMPManager(this),this.collisionManger=new GAME.CollisionManager(this),this.explosionManager=new GAME.ExplosionManager(this),this.gunMode=0,this.isFiring=!1,this.player.booster.position=this.player.position,this.view.actionContainer.addChild(this.player.booster),this.view.actionContainer.addChild(this.player),this.canSpawn=!0,this.enemyManager.reset(),this.multiplier=1,this.gameCount=this.score=0,this.canSpawn=this.gamePlaying=this.canSpawn=!1,this.player.visible=!1,this.gunMode=0},GAME.ShootyEngine.constructor=GAME.ShootyEngine,GAME.ShootyEngine.prototype.update=function(){this.gamePlaying&&(this.gameCount+=GAME.time.DELTA_TIME,this.canSpawn=250<this.gameCount),0==this.gunMode||this.gunMode==GAME.Pickup.SHIELD?this.isFiring&&this.gamePlaying&&this.bulletManager.fire():this.gunMode==GAME.Pickup.ROCKET?this.isFiring&&(this.bulletManager.fire(),this.rocketManager.fire()):this.gunMode==GAME.Pickup.LASER&&(this.isFiring?(this.laserManager.fire(),this.view.vignette.alpha+=.1*(1-this.view.vignette.alpha)):this.view.vignette.alpha+=.1*(0-this.view.vignette.alpha)),this.powerUpCountdown-=GAME.time.DELTA_TIME,0>=this.powerUpCountdown&&(this.gunMode=this.powerUpCountdown=0,.01>this.view.vignette.alpha?(this.view.vignette.alpha=0,this.view.vignette.visible=!1):this.view.vignette.alpha+=.1*(0-this.view.vignette.alpha)),this.player.targetPosition.x=this.mouse.x,this.player.targetPosition.y=this.mouse.y,this.bulletManager.update(),this.laserManager.update(),this.enemyBulletManager.update(),this.rocketManager.update(),this.pickupManager.update(),this.enemyManager.update(),this.empManager.update(),this.collisionManger.update(),this.explosionManager.update(),this.view.update()},GAME.addHitArea=function(t){var e=PIXI.Sprite.fromImage("static/FlashVHtml/img/hitTest.png");e.anchor.x=.5,e.anchor.y=.5,e.scale.x=t.radius/20*2,e.scale.y=t.radius/20*2,e.alpha=.5,t.addChild(e)},GAME.ShootyEngine.prototype.gameover=function(){this.view.showGameover(),this.canSpawn=this.gamePlaying=!1,this.player.visible=!1,this.player.booster.visible=!1,this.gunMode=0},GAME.ShootyEngine.prototype.increaseMultiplier=function(){this.multiplier*=2,32<this.multiplier&&(this.multiplier=32)},GAME.ShootyEngine.prototype.resetMultiplier=function(){this.multiplier=1},GAME.ShootyEngine.prototype.restart=function(){this.gamePlaying=!0,this.empManager.empCount=3,this.score=0,this.enemyManager.reset(),this.player.visible=!0,this.player.booster.visible=!0,this.view.hideGameover()},GAME.ShootyEngine.prototype.setLaser=function(){this.powerUpCountdown=600,this.gunMode=GAME.Pickup.LASER,this.view.vignette.visible=!0},GAME.ShootyEngine.prototype.setRockets=function(){this.powerUpCountdown=600,this.gunMode=GAME.Pickup.ROCKET},GAME.ShootyEngine.prototype.setShield=function(){powerUpCountdown=600,this.gunMode=GAME.Pickup.SHIELD,this.player.shieldOn()};