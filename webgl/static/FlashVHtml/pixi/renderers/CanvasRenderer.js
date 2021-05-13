/**
 * @author Mat Groves
 */
var PIXI = window.PIXI;

PIXI.CanvasRenderer = function(width, height)
{
  this.width = width ? width : 800;
  this.height = height ? height : 600;

  this.refresh = true;

  this.view = document.createElement( 'canvas' );
  this.view.width = this.width;
  this.view.height = this.height;
  this.view.background = "#FF0000";
  this.count = 0;
  this.context = this.view.getContext("2d");
}

// constructor
PIXI.CanvasRenderer.constructor = PIXI.CanvasRenderer;


PIXI.CanvasRenderer.prototype.render = function(stage)
{
  // update children if need be

  stage.__childrenAdded = [];
  stage.__childrenRemoved = [];

  // update textures if need be
  PIXI.texturesToUpdate = [];


  this.context.setTransform(1,0,0,1,0,0);
  stage.updateTransform();

  this.context.setTransform(1,0,0,1,0,0);
  this.context.clearRect(0, 0, this.width, this.height)
  this.renderDisplayObject(stage);
}

PIXI.CanvasRenderer.prototype.renderDisplayObject = function(displayObject)
{
  var transform = displayObject.worldTransform;
  var context = this.context;
  context.globalCompositeOperation = "source-over"
  var blit = false;

  if(!displayObject.visible)return;

  if(displayObject instanceof PIXI.Sprite)
  {
    var frame = displayObject.texture.frame;

    if(frame)
    {
      context.globalAlpha = displayObject.worldAlpha;

      // BLITZ!!!
      /*
       * if the rotation is 0 then we can blitz it
       * meaning we dont need to do a transform and also we
       * can round to the nearest round number for a little extra speed!
       */
      if(displayObject.rotation == 0)
      {
        if(!blit)this.context.setTransform(1,0,0,1,0,0);
        blit = true;
        context.drawImage(displayObject.texture.baseTexture.image,
          frame.x,
          frame.y,
          frame.width,
          frame.height,
          (transform[2]+displayObject.anchor.x * -frame.width + 0.5) | 0,
          (transform[5]+displayObject.anchor.y * -frame.height + 0.5) | 0,
          (frame.width * transform[0]),
          (frame.height * transform[4]));

        //console.log("BLITS")
      }
      else
      {
        blit = false;
        context.setTransform(transform[0], transform[3], transform[1], transform[4], transform[2], transform[5])
        context.drawImage(displayObject.texture.baseTexture.image,
          frame.x,
          frame.y,
          frame.width,
          frame.height,
          displayObject.anchor.x * -frame.width,
          displayObject.anchor.y * -frame.height,
          frame.width,
          frame.height);
      }
    }
  }
  else if(displayObject instanceof PIXI.Strip)
  {
    context.setTransform(transform[0], transform[3], transform[1], transform[4], transform[2], transform[5])
    this.renderStrip(displayObject)
  }

  // render!
  for (var i=0; i < displayObject.children.length; i++)
  {
    this.renderDisplayObject(displayObject.children[i]);
  }
}

PIXI.CanvasRenderer.prototype.renderStripFlat = function(strip)
{
  var context = this.context;
  var verticies = strip.verticies;
  var uvs = strip.uvs;

  var length = verticies.length/2;
  this.count++;

  context.beginPath();
  for (var i=1; i < length-2; i++)
  {

    // draw some triangles!
    var index = i*2;

    var x0 = verticies[index],   x1 = verticies[index+2], x2 = verticies[index+4];
    var y0 = verticies[index+1], y1 = verticies[index+3], y2 = verticies[index+5];

    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.lineTo(x2, y2);

  };

//	context.globalCompositeOperation = 'lighter';
  context.fillStyle = "#FF0000";
  context.fill();
  context.closePath();
  //context.globalCompositeOperation = 'source-over';
}


PIXI.CanvasRenderer.prototype.renderStrip = function(strip)
{
  var context = this.context;
  //context.globalCompositeOperation = 'lighter';
  // draw triangles!!
  var verticies = strip.verticies;
  var uvs = strip.uvs;

  var length = verticies.length/2;
  this.count++;
  for (var i=1; i < length-2; i++)
  {

    // draw some triangles!
    var index = i*2;

    var x0 = verticies[index],   x1 = verticies[index+2], x2 = verticies[index+4];
    var y0 = verticies[index+1], y1 = verticies[index+3], y2 = verticies[index+5];

    var u0 = uvs[index] * strip.texture.width,   u1 = uvs[index+2]* strip.texture.width, u2 = uvs[index+4]* strip.texture.width;
    var v0 = uvs[index+1]* strip.texture.height, v1 = uvs[index+3]* strip.texture.height, v2 = uvs[index+5]* strip.texture.height;


    context.save();
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.lineTo(x2, y2);
    context.closePath();

    //	context.fillStyle = "white"//rgb(1, 1, 1,1));
    //	context.fill();
    context.clip();


    // Compute matrix transform
    var delta = u0*v1 + v0*u2 + u1*v2 - v1*u2 - v0*u1 - u0*v2;
    var delta_a = x0*v1 + v0*x2 + x1*v2 - v1*x2 - v0*x1 - x0*v2;
    var delta_b = u0*x1 + x0*u2 + u1*x2 - x1*u2 - x0*u1 - u0*x2;
    var delta_c = u0*v1*x2 + v0*x1*u2 + x0*u1*v2 - x0*v1*u2 - v0*u1*x2 - u0*x1*v2;
    var delta_d = y0*v1 + v0*y2 + y1*v2 - v1*y2 - v0*y1 - y0*v2;
    var delta_e = u0*y1 + y0*u2 + u1*y2 - y1*u2 - y0*u1 - u0*y2;
    var delta_f = u0*v1*y2 + v0*y1*u2 + y0*u1*v2 - y0*v1*u2 - v0*u1*y2 - u0*y1*v2;




    context.transform(delta_a/delta, delta_d/delta,
      delta_b/delta, delta_e/delta,
      delta_c/delta, delta_f/delta);

    context.drawImage(strip.texture.baseTexture.image, 0, 0);
    context.restore();
  };

//	context.globalCompositeOperation = 'source-over';
}

PIXI.CanvasRenderer.prototype.resize = function(width, height)
{
  this.width = width;
  this.height = height;

  this.view.width = width;
  this.view.height = height;
}





