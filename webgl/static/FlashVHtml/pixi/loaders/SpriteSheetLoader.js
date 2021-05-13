/**
 * @author Mat Groves
 */
var PIXI = window.PIXI;

PIXI.SpriteSheetLoader = function(url)
{
  /*
   * i use texture packer to load the assets..
   * http://www.codeandweb.com/texturepacker
   * make sure to set the format as "JSON"
   */
  PIXI.EventTarget.call( this );
  this.url = url;

  this.baseUrl = url.replace(/[^\/]*$/, '');

  this.texture;
  this.frames = {};
}

// constructor
PIXI.SpriteSheetLoader.constructor = PIXI.SpriteSheetLoader;

PIXI.SpriteSheetLoader.prototype.load = function()
{
  this.ajaxRequest = new AjaxRequest();
  var scope = this;
  this.ajaxRequest.onreadystatechange=function()
  {
    scope.onLoaded();
  }

  this.ajaxRequest.open("GET", this.url, true)
  this.ajaxRequest.send(null)
}

PIXI.SpriteSheetLoader.prototype.onLoaded = function()
{
  if (this.ajaxRequest.readyState==4)
  {
    if (this.ajaxRequest.status==200 || window.location.href.indexOf("http")==-1)
    {
      var jsondata = eval("("+this.ajaxRequest.responseText+")");

      var textureUrl = this.baseUrl + jsondata.meta.image;

      this.texture = PIXI.Texture.fromImage(textureUrl).baseTexture;

      //	if(!this.texture)this.texture = new PIXI.Texture(textureUrl);

      var frameData = jsondata.frames;
      for (var i in frameData)
      {
        var rect = frameData[i].frame;
//				this.frames[i] = ;
        PIXI.TextureCache[i] = new PIXI.Texture(this.texture, {x:rect.x, y:rect.y, width:rect.w, height:rect.h})
      }

      if(this.texture.hasLoaded)
      {
        this.dispatchEvent( { type: 'loaded', content: this } );
      }
      else
      {
        var scope = this;
        // wait for the texture to load..
        this.texture.addEventListener('loaded', function(){

          scope.dispatchEvent( { type: 'loaded', content: scope } );

        });
      }
    }
  }

}
