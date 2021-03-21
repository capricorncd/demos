/**
 * @author Mat Groves
 */
var PIXI = window.PIXI;

PIXI.TextureCache = {};
PIXI.FrameCache = {};


PIXI.Texture = function(baseTexture, frame)
{
  PIXI.EventTarget.call( this );

  this.baseTexture = baseTexture;

  if(!frame)
  {
    this.noFrame = true;
    frame = {x:0, y:0, width:1, height:1}
  }

  this.frame = frame;
  this.scope = this;

  if(baseTexture.hasLoaded)
  {
    if(!frame)frame = {x:0, y:0, width:baseTexture.width, height:baseTexture.height};
    this.setFrame(frame);
  }

  // once texture is loaded we need to update the frame!
  if(!baseTexture.hasLoaded)
  {
    //	this.onLoaded = this.onBaseTextureLoaded.bind(this);
    var scope = this;
    baseTexture.addEventListener( 'loaded', function(){ scope.onBaseTextureLoaded()} );
  }
}

PIXI.Texture.constructor = PIXI.Texture;

PIXI.Texture.prototype.onBaseTextureLoaded = function(event)
{
  var baseTexture = this.baseTexture;
  baseTexture.removeEventListener( 'loaded', this.onLoaded );

  if(this.noFrame)this.frame = {x:0, y:0, width:baseTexture.width, height:baseTexture.height};
  this.noFrame = false;
  this.width = this.frame.width;
  this.height = this.frame.height;

  this.scope.dispatchEvent( { type: 'update', content: this } );
}

PIXI.Texture.prototype.setFrame = function(frame)
{
  this.frame = frame;
  this.width = frame.width;
  this.height = frame.height;
  //this.updateFrame = true;
}

// tools for getting images!
PIXI.Texture.fromImage = function(imageUrl)
{
  var texture = PIXI.TextureCache[imageUrl];

  if(!texture)
  {
    var baseTexture = PIXI.BaseTextureCache[imageUrl];
    if(!baseTexture) baseTexture = new PIXI.BaseTexture(imageUrl);
    texture = new PIXI.Texture(baseTexture);
    PIXI.TextureCache[imageUrl] = texture;
  }
  return texture;
}

PIXI.Texture.fromTexture = function(texture, frame)
{

}

PIXI.Texture.fromFrameId = function(frameId)
{
  return PIXI.TextureCache[frameId];
}

