/**
 * @author Mat Groves
 */

var PIXI = window.PIXI;

/**
 * @class A Stage represents the root of the display tree. Everything connected to the stage is rendered
 * @augments PIXI.DisplayObjectContainer
 * @constructor
 * @return A new Stage.
 */
PIXI.Stage = function()
{
  PIXI.DisplayObjectContainer.call( this );


  this.worldTransform = mat3.identity();
  this.__childrenAdded = [];
  this.__childrenRemoved = [];
  this.childIndex = 0;
  this.stage=  this;
}

// constructor
PIXI.Stage.constructor = PIXI.Stage;

PIXI.Stage.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );

PIXI.Stage.prototype.updateTransform = function()
{
  this.worldAlpha = 1;

  for(var i=0,j=this.children.length; i<j; i++)
  {
    this.children[i].updateTransform();
  }
}
/*
PIXI.Stage.prototype.setFilter = function(filters)
{
	this.filters = filters;
}*/

PIXI.Stage.prototype.__addChild = function(child)
{
  this.__childrenAdded.push(child);

  child.stage = this;

  if(child.children)
  {
    for (var i=0; i < child.children.length; i++)
    {
      this.__addChild(child.children[i]);
    };
  }

}

PIXI.Stage.prototype.__removeChild = function(child)
{
  this.__childrenRemoved.push(child);

  child.stage = undefined;

  if(child.children)
  {
    for(var i=0,j=child.children.length; i<j; i++)
    {
      this.__removeChild(child.children[i])
    }
  }
}
