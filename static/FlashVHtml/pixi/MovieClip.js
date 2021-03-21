/**
 * @author Mat Groves
 */
var PIXI = window.PIXI;

PIXI.MovieClip = function(textures)
{
  PIXI.Sprite.call( this, textures[0]);

  this.textures = textures;
  this.currentFrame = 0;
  this.animationSpeed = 1
}

// constructor
PIXI.MovieClip.constructor = PIXI.MovieClip;
PIXI.MovieClip.prototype = Object.create( PIXI.Sprite.prototype );

PIXI.MovieClip.prototype.updateTransform = function()
{
  PIXI.Sprite.prototype.updateTransform.call(this);
  this.currentFrame += this.animationSpeed// * GAME.time.DELTA_TIME;
  var round = (this.currentFrame + 0.5) | 0;
  //Math.round(this.currentFrame)
  this.setTexture(this.textures[round % this.textures.length]);
}
