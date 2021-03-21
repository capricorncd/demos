/**
 * @author Mat Groves
 */

var PIXI = window.PIXI;

/**
 * @class The DisplayObject class is the base class for all objects that are rendered on the screen.
 * @constructor
 * @return A new DisplayObject.
 */
PIXI.DisplayObject = function()
{
  /**
   * The coordinate of the object relative to the local coordinates of the parent.
   * @type Point
   */
  this.position = new PIXI.Point();

  /**
   * The scale factor of the object.
   * @type Point
   */
  this.scale = new PIXI.Point(1,1);//{x:1, y:1};

  /**
   * The rotation of the object in radians.
   * @type Number
   */
  this.rotation = 0;

  /**
   * The opacity of the object.
   * @type Number
   */
  this.alpha = 1;

  /**
   * The visibility of the object.
   * @type Number
   */
  this.visible = true;

  /**
   * [read-only] The display object container that contains this display object.
   * @type DisplayObjectContainer
   */
  this.parent = null;

  /**
   * [read-only] The stage the display object is connected to, or undefined if it is not connected to the stage.
   * @type #DisplayObjectContainer
   */
  this.stage = null;

  this.worldAlpha = 1;
  this.color = [];

  this.worldTransform = mat3.identity();
  this.localTransform = mat3.identity();

  this.dynamic = true;
  // chach that puppy!
  this._sr = 0;
  this._cr = 1;

  this.renderable = false;
}

// constructor
PIXI.DisplayObject.constructor = PIXI.DisplayObject;

/**
 * @private
 */
PIXI.DisplayObject.prototype.updateTransform = function()
{
  // TODO OPTIMIZE THIS!! with dirty
  if(this.rotation != this.rotationCache)
  {
    this.rotationCach = this.rotation;
    this._sr =  Math.sin(this.rotation);
    this._cr =  Math.cos(this.rotation);
  }

  this.localTransform[0] = this._cr * this.scale.x;
  this.localTransform[1] = -this._sr * this.scale.y
  this.localTransform[3] = this._sr * this.scale.x;
  this.localTransform[4] = this._cr * this.scale.y;

  ///AAARR GETTER SETTTER!

  this.localTransform[2] = this.position.x;
  this.localTransform[5] = this.position.y;


  // TODO optimize?
  mat3.multiply(this.localTransform, this.parent.worldTransform, this.worldTransform);
  this.worldAlpha = this.alpha * this.parent.worldAlpha;
}
