/**
 * @author Mat Groves
 */
var PIXI = window.PIXI;

PIXI._defaultFrame = {x:0, y:0, width:1, height:1};

PIXI.DOMRenderer = function(width, height)
{
  this.width = width ? width : 800;
  this.height = height ? height : 600;

  this.view = document.createElement( 'div' );
  this.view.style.width = this.width + "px";
  this.view.style.height = this.height + "px";
  this.view.style.background = "#FF0000";
  this.view.style["-webkit-transform"] = "translateZ(0)";
  this.resize(this.width, this.height)
}

// constructor
PIXI.DOMRenderer.constructor = PIXI.DOMRenderer;


PIXI.DOMRenderer.prototype.render = function(stage)
{
  // update children if need be

  // best to remove first!
  for (var i=0; i < stage.__childrenRemoved.length; i++) this.removeDisplayObject(stage.__childrenRemoved[i]);
  // no add all new sprites
  for (var i=0; i < stage.__childrenAdded.length; i++) this.addDisplayObject(stage.__childrenAdded[i]);
  // update any textures
  for (var i=0; i < PIXI.texturesToUpdate.length; i++) this.updateTexture(PIXI.texturesToUpdate[i]);

  // empty out the arrays
  stage.__childrenRemoved = [];
  stage.__childrenAdded = [];
  PIXI.texturesToUpdate = [];

  // update the scen graph
  stage.updateTransform();

  // update the verts of the display objects to reflect their transformations
  this.renderDisplayObject(stage);
  // render all the batchs!
}

PIXI.DOMRenderer.prototype.updateTexture = function(texture)
{

}

PIXI.DOMRenderer.prototype.renderDisplayObject = function(displayObject)
{
  if(!displayObject.visible)return;

  if(displayObject.sprite)
  {
    var transform = displayObject.worldTransform;
    var frame = displayObject.frame;

    if(frame)
    {
//			this.context.globalAlpha = displayObject.worldAlpha;
      //		this.context.setTransform(transform[0], transform[3], transform[1], transform[4], transform[2], transform[5])
      //	this.context.drawImage(displayObject.texture.image,
      //					   frame.x,
      //				   frame.y,
      //			   frame.width,
      //		   frame.height,
      //	   displayObject.anchor.x * -frame.width,
      //   displayObject.anchor.y * -frame.height,
      // frame.width,
      //frame.height);
      //	console.log("matrix(" + transform + ")")
      displayObject._div.style["-webkit-transform"] = "matrix(" + transform[0] + ", " +transform[3]+","+ transform[1] + "," +
        transform[4] +"," + transform[2] + "," + transform[5] + ")";

    }
  }

  // render!
  for (var i=0; i < displayObject.children.length; i++)
  {
    this.renderDisplayObject(displayObject.children[i]);
  }
}


PIXI.DOMRenderer.prototype.addDisplayObject = function(displayObject)
{
  if(!displayObject.sprite)return;
  if(displayObject._div)return;
  var div = document.createElement("img");
  div.src = displayObject.texture.imageUrl;
  div.style.cssText = 'position:absolute;';
  displayObject._div = div;
  this.view.appendChild(div);
}

PIXI.DOMRenderer.prototype.removeDisplayObject = function(displayObject)
{
}

PIXI.DOMRenderer.prototype.resize = function(width, height)
{
  this.width = width;
  this.height = height;

  this.view.style.width = this.width + "px";
  this.view.style.height = this.height + "px";


}
