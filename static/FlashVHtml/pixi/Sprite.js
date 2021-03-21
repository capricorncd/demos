/**
 * @author Mat Groves
 */
var PIXI = window.PIXI;

PIXI.blendModes = {};
PIXI.blendModes.NORMAL = 0
PIXI.blendModes.SCREEN = 1

/**
 * @class A Sprite
 * @augments PIXI.DisplayObjectContainer
 * @constructor
 * @param {PIXI.Texture} texture {@link PIXI.Texture}
 * @return A new Sprite.
 */

PIXI.Sprite = function(texture)
{
  PIXI.DisplayObjectContainer.call( this );
  this.anchor = new PIXI.Point();
  this.texture = texture;

  this.blendMode = PIXI.blendModes.NORMAL;
  this.width = 1;
  this.height = 1;

  if(texture.baseTexture.hasLoaded) {
    this.width   = this.texture.frame.width;
    this.height  = this.texture.frame.height;
    this.updateFrame = true;
  } else {
    this.onTextureUpdateBind = this.onTextureUpdate.bind(this);
    this.texture.addEventListener( 'update', this.onTextureUpdateBind );
  }
  this.renderable = true;
}

// constructor
PIXI.Sprite.constructor = PIXI.Sprite;
PIXI.Sprite.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );

PIXI.Sprite.prototype.setTexture = function(texture)
{
  // stop current texture;
  if(this.texture.baseTexture != texture.baseTexture)
  {
    this.textureChange = true;
  }

  this.texture = texture;
  this.width   = texture.frame.width;
  this.height  = texture.frame.height;
  this.updateFrame = true;

}

PIXI.Sprite.prototype.onTextureUpdate = function(event)
{
  this.width   = this.texture.frame.width;
  this.height  = this.texture.frame.height;
  this.updateFrame = true;


}

// some helper functions..

PIXI.Sprite.fromFrame = function(frameId)
{
  var texture = PIXI.TextureCache[frameId];
  return new PIXI.Sprite(texture);
}


PIXI.Sprite.fromImage = function(imageId)
{
  var texture = PIXI.Texture.fromImage(imageId);
  return new PIXI.Sprite(texture);
}

