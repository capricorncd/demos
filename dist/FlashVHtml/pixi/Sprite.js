var PIXI=window.PIXI;PIXI.blendModes={},PIXI.blendModes.NORMAL=0,PIXI.blendModes.SCREEN=1,PIXI.Sprite=function(t){PIXI.DisplayObjectContainer.call(this),this.anchor=new PIXI.Point,this.texture=t,this.blendMode=PIXI.blendModes.NORMAL,this.width=1,this.height=1,t.baseTexture.hasLoaded?(this.width=this.texture.frame.width,this.height=this.texture.frame.height,this.updateFrame=!0):(this.onTextureUpdateBind=this.onTextureUpdate.bind(this),this.texture.addEventListener("update",this.onTextureUpdateBind)),this.renderable=!0},PIXI.Sprite.constructor=PIXI.Sprite,PIXI.Sprite.prototype=Object.create(PIXI.DisplayObjectContainer.prototype),PIXI.Sprite.prototype.setTexture=function(t){this.texture.baseTexture!=t.baseTexture&&(this.textureChange=!0),this.texture=t,this.width=t.frame.width,this.height=t.frame.height,this.updateFrame=!0},PIXI.Sprite.prototype.onTextureUpdate=function(t){this.width=this.texture.frame.width,this.height=this.texture.frame.height,this.updateFrame=!0},PIXI.Sprite.fromFrame=function(t){var e=PIXI.TextureCache[t];return new PIXI.Sprite(e)},PIXI.Sprite.fromImage=function(t){var e=PIXI.Texture.fromImage(t);return new PIXI.Sprite(e)};