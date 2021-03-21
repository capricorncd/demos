/**
 * @author Mat Groves
 */
var PIXI = window.PIXI;


PIXI.autoDetectRenderer = function(width, height)
{
  // BORROWED from Mr Doob (mrdoob.com)
  var webgl = ( function () { try { return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' ); } catch( e ) { return false; } } )()

  console.log(webgl);
  if( webgl )
  {
    return new PIXI.WebGLRenderer(width, height)
  }

  return	new PIXI.CanvasRenderer(width, height);
}
