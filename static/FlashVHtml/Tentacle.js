/**
 * @author Mat Groves
 */
var PIXI = window.PIXI;

/**
 * @class A Sprite
 * @augments PIXI.DisplayObjectContainer
 * @constructor
 * @param {PIXI.Texture} texture {@link PIXI.Texture}
 * @param frame
 * @return A new Sprite.
 */
Tentacle = function(texture)
{
  var points = [];
  for (var i=0; i < 20; i++) {
    points.push(new PIXI.Point(i * 669/20, i * 100));
  };
  this.count = Math.random() * 100;
  this.speed =1 + Math.random() * 2;
  PIXI.Rope.call( this, texture, points);
}


// constructor
Tentacle.constructor = Tentacle;
Tentacle.prototype = Object.create( PIXI.Rope.prototype );

Tentacle.prototype.updateTransform = function()
{
  PIXI.Rope.prototype.updateTransform.call(this);

  this.count += this.speed;
  var points = this.points;

  for (var i=0; i < points.length; i++) {
    points[i].y = Math.sin((this.count+(i*10)) * 0.05) * 20;
  }

}
