/**
 * Created by dev3cli.
 * https://github.com/capricorncd/dev3cli
 * Date: 2021-05-30 15:16:57
 */
import './style.scss'
import * as PIXI from 'pixi.js'
// import { Slime } from '@/Slime'
import { SpineBoyPro } from '@/SpineBoyPro'

function init() {
  let width = 0
  let height = 0

  function resize() {
    width = window.innerWidth
    height = window.innerHeight
  }

  resize()

  window.addEventListener('resize', resize)

  const el = document.querySelector('#app') as HTMLElement
  const app = new PIXI.Application({
    width,
    height,
    resolution: window.devicePixelRatio || 1
  })
  el.append(app.view)

  /* eslint-disable no-new */
  // new Slime(app)

  /* eslint-disable no-new */
  new SpineBoyPro(app)

  const geometry = new PIXI.Geometry()
    .addAttribute('aVertexPosition', // the attribute name
      [0, 0, // x, y
        width, 0, // x, y
        width, height,
        0, height], // x, y
      2) // the size of the attribute
    .addAttribute('aUvs', // the attribute name
      [0, 0, // u, v
        1, 0, // u, v
        1, 1,
        0, 1], // u, v
      2) // the size of the attribute
    .addIndex([0, 1, 2, 0, 2, 3])

  const vertexSrc = `
    precision mediump float;
    attribute vec2 aVertexPosition;
    attribute vec2 aUvs;
    uniform mat3 translationMatrix;
    uniform mat3 projectionMatrix;
    varying vec2 vUvs;
    void main() {
        vUvs = aUvs;
        gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    }`

  const fragmentWaveSrc = `
precision mediump float;
varying vec2 vUvs;
uniform float amplitude;
uniform float time;

void main()
{
    //Offset uv so that center is 0,0 and edges are -1,1
    vec2 uv = (vUvs-vec2(0.5))*2.0;

    vec3 outColor = vec3(0.);

    //Simple wavefunctions inversed and with small offsets.
    outColor += 5./length(uv.y*200. - 50.0*sin( uv.x*0.25+ time*0.25)*amplitude);
    outColor += 4./length(uv.y*300. - 100.0*sin(uv.x*0.5+time*0.5)*amplitude*1.2);
    outColor += 3./length(uv.y*400. - 150.0*sin(uv.x*0.75+time*0.75)*amplitude*1.4);
    outColor += 2./length(uv.y*500. - 200.0*sin(uv.x+time)*amplitude*1.6);

    gl_FragColor = vec4(outColor,1.0);
}`
  const waveUniforms = {
    amplitude: 0.75,
    time: 0
  }
  const waveShader = PIXI.Shader.from(vertexSrc, fragmentWaveSrc, waveUniforms)
  const waveTexture = PIXI.RenderTexture.create(200, 200)
  const waveQuad = new PIXI.Mesh(geometry, waveShader)
  const waveContainer = new PIXI.Container()
  waveContainer.addChild(waveQuad)

  waveContainer.position.set(0, 0)

  app.stage.addChild(waveContainer)

  const text = new PIXI.Text('ようこそ、slime.plusへ', {
    fontFamily: 'Arial',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#42b4e6'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440,
    lineJoin: 'round'
  })
  text.anchor.set(0.5)
  text.x = width / 2
  text.y = 100
  app.stage.addChild(text)

  // start the animation..
  let time = 0
  app.ticker.add(() => {
    time += 1 / 60
    waveQuad.shader.uniforms.time = time

    // @ts-ignore
    app.renderer.render(waveQuad, waveTexture)
  })
}

init()
