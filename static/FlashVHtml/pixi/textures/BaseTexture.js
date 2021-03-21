/**
 * @author Mat Groves
 */
var PIXI = window.PIXI;

PIXI.BaseTextureCache = {};
PIXI.texturesToUpdate = [];


PIXI.BaseTexture = function(imageUrl)
{
  PIXI.EventTarget.call( this );

  this.imageUrl = imageUrl;

  this.frame = {x:0, y:0, width:1, height:1};

  this.image = new Image();
  //REMOVE JQUERY!!
  this.image.onload = $.proxy(this.onImageLoaded, this);
  this.image.src = imageUrl;

  this.width = 100;
  this.height = 100;

  PIXI.BaseTextureCache[imageUrl] = this;
}

PIXI.BaseTexture.constructor = PIXI.BaseTexture;

PIXI.BaseTexture.prototype.onImageLoaded = function(image)
{
  this.hasLoaded = true;
  this.width = this.image.width;
  this.height = this.image.height;

  // add it to somewhere...
  PIXI.texturesToUpdate.push(this);
  this.dispatchEvent( { type: 'loaded', content: this } );
}

