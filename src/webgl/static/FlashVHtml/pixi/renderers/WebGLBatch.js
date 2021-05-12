/**
 * @author Mat Groves
 */

var PIXI = window.PIXI;

//
PIXI._batchs = [];

PIXI._getBatch = function(gl)
{
  if(PIXI._batchs.length == 0)
  {
    return new PIXI.WebGLBatch(gl);
  }
  else
  {
    return PIXI._batchs.pop();
  }
}

PIXI._returnBatch = function(batch)
{
  batch.clean();
  PIXI._batchs.push(batch);
}

PIXI._restoreBatchs = function(gl)
{
  for (var i=0; i < PIXI._batchs.length; i++)
  {
    PIXI._batchs[i].restoreLostContext(gl);
  };
}

PIXI.WebGLBatch = function(gl)
{
  this.gl = gl;

  this.size = 0;

  this.vertexBuffer =  gl.createBuffer();
  this.indexBuffer =  gl.createBuffer();
  this.uvBuffer =  gl.createBuffer();
  this.colorBuffer =  gl.createBuffer();
  this.blendMode = PIXI.blendModes.NORMAL;
  this.dynamicSize = 1;
}


// constructor
PIXI.WebGLBatch.constructor = PIXI.WebGLBatch;


PIXI.WebGLBatch.prototype.clean = function()
{
  this.verticies = [];
  this.uvs = [];
  this.indices = [];
  this.colors = [];
  //this.sprites = [];
  this.dynamicSize = 1;
  this.texture = null;
  this.last = null;
  this.size = 0;

  this.head;
  this.tail;
}

PIXI.WebGLBatch.prototype.restoreLostContext = function(gl)
{
  this.gl = gl;
  this.vertexBuffer =  gl.createBuffer();
  this.indexBuffer =  gl.createBuffer();
  this.uvBuffer =  gl.createBuffer();
  this.colorBuffer =  gl.createBuffer();
}


PIXI.WebGLBatch.prototype.init = function(sprite)
{
  sprite.batch = this;
  this.dirty = true;
  this.blendMode = sprite.blendMode;
  this.texture = sprite.texture.baseTexture;
//	this.sprites.push(sprite);
  this.head = sprite;
  this.tail = sprite;
  this.size = 1;

  this.growBatch();
}

PIXI.WebGLBatch.prototype.insertBefore = function(sprite, nextSprite)
{
  this.size++;

  sprite.batch = this;
  this.dirty = true;
  var tempPrev = nextSprite.__prev;
  nextSprite.__prev = sprite;
  sprite.__next = nextSprite;

  if(tempPrev)
  {
    sprite.__prev = tempPrev;
    tempPrev.__next = sprite;
  }
  else
  {
    this.head = sprite;
    //this.head.__prev = null
  }
}

PIXI.WebGLBatch.prototype.insertAfter = function(sprite, previousSprite)
{
  this.size++;


  sprite.batch = this;
  this.dirty = true;

  var tempNext = previousSprite.__next;
  previousSprite.__next = sprite;
  sprite.__prev = previousSprite;

  if(tempNext)
  {
    sprite.__next = tempNext;
    tempNext.__prev = sprite;
  }
  else
  {
    this.tail = sprite
  }

}

PIXI.WebGLBatch.prototype.remove = function(sprite)
{
  this.size--;

  if(this.size == 0)
  {
    sprite.__prev = null;
    sprite.__next = null;
    return;
  }

  if(sprite.__prev)
  {
    sprite.__prev.__next = sprite.__next;
  }
  else
  {
    this.head = sprite.__next;
    //this.head.__prev = null;
  }

  if(sprite.__next)
  {
    sprite.__next.__prev = sprite.__prev;
  }
  else
  {
    this.tail = sprite.__prev;
    //this.tail.__next = null
  }

  sprite.batch = null;
  sprite.__next = null;
  sprite.__prev = null;
  this.dirty = true;
}


PIXI.WebGLBatch.prototype.split = function(sprite)
{

  //console.log("Splitting batch :" + this.size)
//	console.log(sprite)
//	console.log("-------")
  this.dirty = true;

  //var val = (this.tail == this.head)
  //console.log(val + " SAME?");
  var batch = new PIXI.WebGLBatch(this.gl)//PIXI._getBatch(this.gl);
  batch.init(sprite);
  batch.tail = this.tail;
  //console.log("id is " +batcheee.id)

  this.tail = sprite.__prev;
  this.tail.__next = null;

  sprite.__prev = null;
  // return a splite batch!
  //sprite.__prev.__next = null;
  //sprite.__prev = null;


  // TODO this size is wrong!
  // need to recalculate :/ problem with a linked list!
  // unless it gets calculated in the "clean"?

  // need to loop through items as there is no way to know the length on a linked list :/
  var tempSize = 0;
  while(sprite)
  {
    tempSize++;
    sprite.batch = batch;
    sprite = sprite.__next;
  }

  batch.size = tempSize;
  this.size -= tempSize;

  return batch;
}

PIXI.WebGLBatch.prototype.merge = function(batch)
{
  this.dirty = true;

  this.tail.__next = batch.head;
  batch.head.__prev = this.tail;

  this.size += batch.size;

  this.tail = batch.tail;

  var sprite = batch.head;
  while(sprite)
  {
    sprite.batch = this;
    sprite = sprite.__next;
  }

}


PIXI.WebGLBatch.prototype.growBatch = function()
{
  var gl = this.gl;
  if( this.size == 1)
  {
    this.dynamicSize = 1;
  }
  else
  {
    this.dynamicSize = this.size * 1.5
  }
  // grow verts
  this.verticies = new Float32Array(this.dynamicSize * 8);

  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER,this.verticies , gl.DYNAMIC_DRAW);

  this.uvs  = new Float32Array( this.dynamicSize * 8 )
  gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, this.uvs , gl.DYNAMIC_DRAW);

  this.dirtyUVS = true;

  this.colors  = new Float32Array( this.dynamicSize * 4 )
  gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, this.colors , gl.DYNAMIC_DRAW);

  this.dirtyColors = true;

  this.indices = new Uint16Array(this.dynamicSize * 6);
  var length = this.indices.length/6;

  for (var i=0; i < length; i++)
  {
    var index2 = i * 6;
    var index3 = i * 4;
    this.indices[index2 + 0] = index3 + 0;
    this.indices[index2 + 1] = index3 + 1;
    this.indices[index2 + 2] = index3 + 2;
    this.indices[index2 + 3] = index3 + 0;
    this.indices[index2 + 4] = index3 + 2;
    this.indices[index2 + 5] = index3 + 3;
  };

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);

}

PIXI.WebGLBatch.prototype.refresh = function()
{
  var gl = this.gl;

  if (this.dynamicSize < this.size)
  {
    this.growBatch();
  }

  var indexRun = 0;
  var worldTransform, width, height, aX, aY, w0, w1, h0, h1, index
  var a, b, c, d, tx, ty

  var displayObject = this.head

  while(displayObject)
  {
    index = indexRun * 8;

    var texture = displayObject.texture;

    var frame = texture.frame;
    var tw = texture.baseTexture.width;
    var th = texture.baseTexture.height;

    this.uvs[index + 0] = frame.x / tw;
    this.uvs[index +1] = frame.y / th;

    this.uvs[index +2] = (frame.x + frame.width) / tw;
    this.uvs[index +3] = frame.y / th;

    this.uvs[index +4] = (frame.x + frame.width) / tw;
    this.uvs[index +5] = (frame.y + frame.height) / th;

    this.uvs[index +6] = frame.x / tw;
    this.uvs[index +7] = (frame.y + frame.height) / th;

    displayObject.updateFrame = false;

    colorIndex = indexRun * 4;
    this.colors[colorIndex] = this.colors[colorIndex + 1] = this.colors[colorIndex + 2] = this.colors[colorIndex + 3] = displayObject.worldAlpha;

    displayObject = displayObject.__next;

    indexRun ++;
  }

  this.dirtyUVS = true;
  this.dirtyColors = true;
}

PIXI.WebGLBatch.prototype.update = function()
{
  var gl = this.gl;
  var worldTransform, width, height, aX, aY, w0, w1, h0, h1, index, index2, index3

  var a, b, c, d, tx, ty;

  var indexRun = 0;

  var displayObject = this.head;

  while(displayObject)
  {
    width = displayObject.width;
    height = displayObject.height;

    aX = displayObject.anchor.x;
    aY = displayObject.anchor.y;

    w0 = width * (1-aX);
    w1 = width * -aX;

    h0 = height * (1-aY);
    h1 = height * -aY;

    index = indexRun * 8;

    worldTransform = displayObject.worldTransform;

    a = worldTransform[0];
    b = worldTransform[3];
    c = worldTransform[1];
    d = worldTransform[4];
    tx = worldTransform[2];
    ty = worldTransform[5];

    this.verticies[index + 0 ] = a * w1 + c * h1 + tx;
    this.verticies[index + 1 ] = d * h1 + b * w1 + ty;

    this.verticies[index + 2 ] = a * w0 + c * h1 + tx;
    this.verticies[index + 3 ] = d * h1 + b * w0 + ty;

    this.verticies[index + 4 ] = a * w0 + c * h0 + tx;
    this.verticies[index + 5 ] = d * h0 + b * w0 + ty;

    this.verticies[index + 6] =  a * w1 + c * h0 + tx;
    this.verticies[index + 7] =  d * h0 + b * w1 + ty;

    if(displayObject.updateFrame)
    {
      this.dirtyUVS = true;

      var texture = displayObject.texture;

      var frame = texture.frame;
      var tw = texture.baseTexture.width;
      var th = texture.baseTexture.height;

      this.uvs[index + 0] = frame.x / tw;
      this.uvs[index +1] = frame.y / th;

      this.uvs[index +2] = (frame.x + frame.width) / tw;
      this.uvs[index +3] = frame.y / th;

      this.uvs[index +4] = (frame.x + frame.width) / tw;
      this.uvs[index +5] = (frame.y + frame.height) / th;

      this.uvs[index +6] = frame.x / tw;
      this.uvs[index +7] = (frame.y + frame.height) / th;

      displayObject.updateFrame = false;
    }

    // TODO this probably could do with some optimisation....
    if(displayObject.cacheAlpha != displayObject.alpha)
    {
      displayObject.cacheAlpha = displayObject.alpha;

      var colorIndex = indexRun * 4;
      this.colors[colorIndex] = this.colors[colorIndex + 1] = this.colors[colorIndex + 2] = this.colors[colorIndex + 3] = displayObject.worldAlpha;
      this.dirtyColors = true;
    }

    indexRun++;
    displayObject = displayObject.__next;
  }
}

PIXI.WebGLBatch.prototype.render = function()
{
  if(this.dirty)
  {
    this.refresh();
    this.dirty = false;
  }

  if (this.size == 0)return;

  this.update();
  var gl = this.gl;

  //TODO optimize this!
  if(this.blendMode == PIXI.blendModes.NORMAL)
  {
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  }
  else
  {
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_COLOR);
  }

  var shaderProgram = PIXI.shaderProgram;

  // update the verts..
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
  // ok..
  gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.verticies)
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 2, gl.FLOAT, false, 0, 0);

  // update the uvs
  gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);

  if(this.dirtyUVS)
  {
    this.dirtyUVS = false;
    gl.bufferSubData(gl.ARRAY_BUFFER,  0, this.uvs);
  }

  gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, this.texture._glTexture);

  // update color!
  gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);

  if(this.dirtyColors)
  {
    this.dirtyColors = false;
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.colors);
  }

  gl.vertexAttribPointer(shaderProgram.colorAttribute, 1, gl.FLOAT, false, 0, 0);

  // dont need to upload!
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

  // DRAW THAT this!
  gl.drawElements(gl.TRIANGLES, this.size * 6, gl.UNSIGNED_SHORT, 0);
}

