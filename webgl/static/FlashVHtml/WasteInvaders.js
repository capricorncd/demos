const PIXI = window.PIXI
const GAME = window.GAME
document.addEventListener('DOMContentLoaded', onReady)

window.addEventListener('resize', resize)
window.onorientationchange = resize;

window.scrollTo(0, 1);

function createEl(tag, attrs) {
  const el = document.createElement('div')
  if (attrs) {
    for (let [key, value] of Object.entries(attrs)) {
      el.setAttribute(key, value)
    }
  }
  return el
}

var width = 800;
var height = 600;

var isAdding = false;
var loader;
var game;

var mouseX = 0;
var mouseY = 0;
var ratio;
var offsetX;
var offsetY;
var holder;
var loaderView =  createEl('div',{ id: 'loader' });
var loaderText = createEl('img', { id: loaderText });

loaderView.appendChild(loaderText)
document.querySelector('body').appendChild(loaderView)

var loadInterval
var loadCount = 0;
var hasLoaded = false;

var renderer = PIXI.autoDetectRenderer(600, 800);

window.renderer = renderer

var stage = new PIXI.Stage();
window.stage = stage


var wasteLogo = new Image();
wasteLogo.src = "FlashVHtml/img/wasteLogo.png";
wasteLogo.style.position = "absolute"
wasteLogo.style.top = "0px";
wasteLogo.style.left = "0px";
wasteLogo.style.display = "none";
wasteLogo.style.zIndex = 20;

var intro = new Image();
intro.src = "FlashVHtml/img/gameStartPanel.png";
intro.style.position = "absolute"
intro.style.top =  -240 + "px";
intro.style.left = "0px";
intro.style.display = "none";
intro.style.zIndex = 200;

var html5icon = new Image();
html5icon.src = "FlashVHtml/img/html5Logo.png"
html5icon.style.position = "absolute";

var fullScreenIcon = new Image();
fullScreenIcon.src = "FlashVHtml/img/fullscreen_ON.png"
fullScreenIcon.style.position = "absolute";
fullScreenIcon.style.cursor = "pointer";
fullScreenIcon.setAttribute("type", "button");
fullScreenIcon.onmouseover = function(){fullScreenIcon.style.opacity = 0.5};
fullScreenIcon.onmouseout = function(){fullScreenIcon.style.opacity = 1};
var canFullScreen = false;

if(document.body.mozRequestFullScreen)
{
  canFullScreen = true;
}
else if(document.body.webkitRequestFullScreen)
{
  canFullScreen = true;
}



fullScreenIcon.onclick = function()
{
  if (document.body.mozRequestFullScreen) {
    // This is how to go into fullscren mode in Firefox
    // Note the "moz" prefix, which is short for Mozilla.
    document.body.mozRequestFullScreen();
  } else if (document.body.webkitRequestFullScreen) {
    // This is how to go into fullscreen mode in Chrome and Safari
    // Both of those browsers are based on the Webkit project, hence the same prefix.
    document.body.webkitRequestFullScreen();
  }
}

function onReady()
{
  holder = document.getElementById("app");


  holder.appendChild(renderer.view);
  renderer.render(stage);

  //holder.style.display = "none";
  document.body.scroll = "no";
  loader = new PIXI.AssetLoader(["FlashVHtml/img/floor.json", "FlashVHtml/img/ActionAssets.json",  "FlashVHtml/img/hudAssets.json",  "FlashVHtml/img/vignette.png", "FlashVHtml/img/EMP.png"])

  loader.addEventListener( 'loaded', function ( event ) {

    hasLoaded = true;
    $(loaderView).fadeOut('slow', function(){
      clearInterval(loadInterval)
      $(wasteLogo).fadeIn('slow', function(){
        init();
        $(wasteLogo).fadeOut('slow', function(){
          //		$(holder).fadeIn('slow');
        });
      })
    });


  } );

  document.body.appendChild(wasteLogo);
  holder.appendChild(intro);
  document.body.appendChild(html5icon);

  if(canFullScreen)
  {
    document.body.appendChild(fullScreenIcon);
  }

//	var photo = document.getElementById("photo"); //or use jQuery's $("#photo")
  this.firstRun = true;

  requestAnimFrame(loaderUpdate);
  loader.load();
  $(loaderView).fadeIn()
  resize();
}

function loaderUpdate()
{
  loadCount+=0.3;
  loadCount %= 4;

  var round = Math.floor(loadCount);

  if(round == 0)
  {
    loaderText.src = "FlashVHtml/img/gameLoading01.png"
  }
  else if(round == 1)
  {
    loaderText.src = "FlashVHtml/img/gameLoading02.png"
  }
  else if(round == 2)
  {
    loaderText.src = "FlashVHtml/img/gameLoading03.png"
  }
  else if(round == 3)
  {
    loaderText.src = "FlashVHtml/img/gameLoading04.png"
  }

  if(!hasLoaded)requestAnimFrame(loaderUpdate);
}


function init()
{
  game = new GAME.ShootyEngine();

  var view = game.view.renderer.view;

  view.style.position = "absolute";
  stats = new Stats();

  //holder.appendChild( stats.domElement );
  stats.domElement.style.position = "absolute";
  stats.domElement.style.top = "0px";

  requestAnimFrame(update);
//	setInterval(update, 1000/30);
  var scope =  this;
  $(holder).mousedown(function(event){
    event.preventDefault()
    isAdding = true;

    if(!game.gamePlaying)
    {
      if(firstRun)
      {
        $(intro).fadeOut(300);
      }
      game.restart();
    }
  });

  $(holder).mouseup(function(event){
    event.preventDefault()
    isAdding = false;
  })

  view.addEventListener("touchstart", onTouchStart, true);
  view.addEventListener("touchend", onTouchEnd, true);
  view.addEventListener("touchmove", onTouchMove, true);

  $(holder).mousemove(function(e){
    mouseX = (e.pageX -offsetX)/ ratio;
    mouseY = (e.pageY-offsetY) / ratio;
  });

  resize();
  firstRun = true;
  $(intro).delay(1000).fadeIn(300);

  //intro.style.
}

function onTouchStart(event)
{

  event.preventDefault();
  isAdding = true;
  mouseX = (event.touches[0].clientX -offsetX)/ ratio;
  mouseY = (event.touches[0].clientY-offsetY - 30) / ratio;



  if(!game.gamePlaying)
  {
    if(firstRun)
    {
      $(intro).fadeOut(300);
    }
    game.restart();
  }
}

function onTouchEnd(event)
{
  event.preventDefault();
  isAdding = false
}

function onTouchMove(event)
{
  event.preventDefault();
  mouseX = (event.touches[0].clientX -offsetX)/ ratio;
  mouseY = (event.touches[0].clientY-offsetY - 30) / ratio;
}

function resize()
{
  var width = $(window).width();
  var height = $(window).height();
//	width -= 50;
//	height -= 50;
  var ratioX = width / 600;
  var ratioY = height / 800;

  ratio = Math.min(ratioX, ratioY);
  offsetX = width/2 - (600 * ratio)/2;
  offsetY = height/2 - (800 * ratio)/2;
  if(game)
  {


    //	holder.style.left = width/2 - (600 * ratio)/2 + "px"//(width / 2) - (600 * ratio) + "px";
    //	holder.style.top =  height/2 - (800 * ratio)/2 + "px"
    game.view.resize(600 * ratio,800 * ratio);
  }

  var view = renderer.view;
  view.style.width = 600 * ratio +"px"
  view.style.height = 800 * ratio +"px"
  holder.style.left = width/2 - (600 * ratio)/2 + "px"//(width / 2) - (600 * ratio) + "px";
  holder.style.top =  height/2 - (800 * ratio)/2 + "px"

  loaderView.style.left = width/2 - 40 + "px";
  loaderView.style.top = height/2 + "px";
  //â€†Ã—â€†72

  wasteLogo.width = 287 * ratio;
  wasteLogo.height = 72 * ratio;

  wasteLogo.style.left = width/2 - wasteLogo.width/2 + "px";
  wasteLogo.style.top = height/2 -wasteLogo.height/2+ "px";

  intro.width = 439 * ratio;
  intro.height = 240 * ratio;

  intro.style.left =  (600*ratio)/2- intro.width/2 + "px";
  intro.style.top = 800*ratio/2 -intro.height/2+ "px";

  html5icon.width = 41 * ratio;
  html5icon.height = 46 * ratio;
  html5icon.style.left = width/2 - (600 * ratio)/2 + (10 * ratio) + "px";
  html5icon.style.top = 10 * ratio + "px"//10+"px"//height/2 -intro.height/2+ "px";
  html5icon.style.zIndex = 100;

  fullScreenIcon.width = 142 * ratio;
  fullScreenIcon.height = 26 * ratio;
  fullScreenIcon.style.left = width/2 - (600 * ratio)/2 + (10 * ratio) + "px";
  fullScreenIcon.style.top = (800 -26-10)  * ratio + "px"//10+"px"//height/2 -intro.height/2+ "px";
  fullScreenIcon.style.zIndex = 100;

  //renderer.resize(width, height);
}

function update()
{
  GAME.time.update();
  //stats.begin();

  game.mouse.x = mouseX;
  game.mouse.y = mouseY;
  game.isFiring = isAdding;
  game.update();

  requestAnimFrame(update);
  //stats.end();
}

/*
 *  little time class!
 */
Time = function()
{
  this.deltaTime = 1;
  this.lastTime = 0;
}

Time.constructor = Time;

Time.prototype.update = function()
{
  var time = Date.now();
  var currentTime =  time;
  var passedTime = currentTime - this.lastTime;

  if(passedTime > 100)passedTime = 100;

  ///this.DELTA_TIME = passedTime ;

//			1 = 17  // 60??
  this.DELTA_TIME = (passedTime * 0.06);
  //console.log(this.DELTA_TIME);
//		trace(DELTA_TIME);
  // 60 ---> 1
  // 30 ---> 2
  this.lastTime = currentTime;
}

// create an instance!
GAME.time = new Time();
