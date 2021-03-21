/**
 * @author Mat Groves
 */
var PIXI = window.PIXI;


PIXI.Point = function(x, y)
{
  this.x = x ? x : 0;
  this.y = y ? y : 0;
}


// constructor
PIXI.Point.constructor = PIXI.Point;

