/**
 * @author Mat Groves
 */
var PIXI = window.PIXI;

PIXI.AssetLoader = function(assetURLs)
{
  PIXI.EventTarget.call( this );
  this.assetURLs = assetURLs;
  this.assets = [];
}

// constructor
PIXI.AssetLoader.constructor = PIXI.AssetLoader;

PIXI.AssetLoader.prototype.load = function()
{
  this.loadCount = this.assetURLs.length;
  var imageTypes = ["jpeg", "jpg", "png", "gif"];

  var spriteSheetTypes = ["json"];

  for (var i=0; i < this.assetURLs.length; i++)
  {
    var filename = this.assetURLs[i];
    var fileType = filename.split('.').pop().toLowerCase();
    // what are we loading?
    var type;

    for (var j=0; j < imageTypes.length; j++)
    {
      if(fileType == imageTypes[j])
      {
        type = "img";
        break;
      }
    }

    if(!type)
    {
      for (var j=0; j < spriteSheetTypes.length; j++)
      {
        if(fileType == spriteSheetTypes[j])
        {
          type = "atlas";
          break;
        }
      }
    }

    if(type == "img")
    {
      var texture = PIXI.Texture.fromImage(filename);
      if(!texture.hasLoaded)
      {

        var scope = this;
        texture.baseTexture.addEventListener( 'loaded', function ( event )
        {
          scope.onAssetLoaded();
        });

        this.assets.push(texture);
      }
      else
      {

        // already loaded!
        this.loadCount--;
      }

    }
    else if(type == "atlas")
    {
      var spriteSheetLoader = new PIXI.SpriteSheetLoader(filename);
      this.assets.push(spriteSheetLoader);

      var scope = this;
      spriteSheetLoader.addEventListener( 'loaded', function ( event )
      {
        scope.onAssetLoaded();
      });

      spriteSheetLoader.load();
    }
    else
    {
      // dont know what the file is! :/
      this.loadCount--;

    }

    //this.assets[i].load();
  };
}

PIXI.AssetLoader.prototype.onAssetLoaded = function()
{
  this.loadCount--;
  this.dispatchEvent( { type: 'progress', content: this } );

  if(this.loadCount == 0)
  {
    this.dispatchEvent( { type: 'loaded', content: this } );
  }
}

