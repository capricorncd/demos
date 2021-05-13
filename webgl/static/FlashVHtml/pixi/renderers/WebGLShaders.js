
/**
 * @author Mat Groves
 */
var PIXI = window.PIXI;

PIXI.shaderFragmentSrc = [	"precision mediump float;",
  "varying vec2 vTextureCoord;",
  "varying float vColor;",
  "uniform sampler2D uSampler;",
  "void main(void) {",
  "gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y));",
  "gl_FragColor = gl_FragColor * vColor;",
  "}"];

PIXI.shaderVertexSrc = [	"attribute vec2 aVertexPosition;",
  "attribute vec2 aTextureCoord;",
  "attribute float aColor;",
  "uniform mat4 uMVMatrix;",
  "varying vec2 vTextureCoord;",
  "varying float vColor;",
  "void main(void) {",
  "gl_Position = uMVMatrix * vec4(aVertexPosition, 1.0, 1.0);",
  "vTextureCoord = aTextureCoord;",
  "vColor = aColor;",
  "}"]

PIXI.CompileVertexShader = function(gl, shaderSrc)
{
  var src = "";

  for (var i=0; i < shaderSrc.length; i++) {
    src += shaderSrc[i];
  };

  var shader;
  shader = gl.createShader(gl.VERTEX_SHADER);

  gl.shaderSource(shader, src);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(gl.getShaderInfoLog(shader));
    return null;
  }

  return shader;
}

PIXI.CompileFragmentShader = function(gl, shaderSrc)
{
  var src = "";

  for (var i=0; i < shaderSrc.length; i++) {
    src += shaderSrc[i];
  };

  var shader;
  shader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(shader, src);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(gl.getShaderInfoLog(shader));
    return null;
  }

  return shader;
}
