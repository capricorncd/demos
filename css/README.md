# CSS(Cascading Style Sheets)

## radio

<details>
<summary>
https://codepen.io/AngelaVelasquez/pen/DGeErL
</summary>


```html
<div class="alert">
	<h2>Hey! Read Me...</h2>
	<p>This is an example of what you can do with pure css to style radio buttons or checkboxes. If you are looking a more flexible & mordern way to style radio buttons on forms, take a look at this <a target="_blank"  href="https://codepen.io/AngelaVelasquez/details/BWXbxP" title="SVG radio buttons">version with SVG icons</a>. I also wrote a <a target="_blank" href="https://codepen.io/AngelaVelasquez/post/css-styling-radio-button">post</a> about it.</p>
</div>

<div class="container">
	
	<h2>Your favorite thing in the world:</h2>
	
  <ul>
  <li>
    <input type="radio" id="f-option" name="selector">
    <label for="f-option">Pizza</label>
    
    <div class="check"></div>
  </li>
  
  <li>
    <input type="radio" id="s-option" name="selector">
    <label for="s-option">Bacon</label>
    
    <div class="check"><div class="inside"></div></div>
  </li>
  
  <li>
    <input type="radio" id="t-option" name="selector">
    <label for="t-option">Cats</label>
    
    <div class="check"><div class="inside"></div></div>
  </li>
</ul>
</div>

<div class="signature">
	<p>Made with <i class="much-heart"></i> by <a href="https://codepen.io/AngelaVelasquez">Angela Velasquez</a></p>
</div>
```

```css
@import url('https://fonts.googleapis.com/css?family=Lato');

body, html{
  height: 100%;
  background: #222222;
	font-family: 'Lato', sans-serif;
}

.container{
  display: block;
  position: relative;
  margin: 40px auto;
  height: auto;
  width: 500px;
  padding: 20px;
}

h2 {
	color: #AAAAAA;
}

.container ul{
  list-style: none;
  margin: 0;
  padding: 0;
	overflow: auto;
}

ul li{
  color: #AAAAAA;
  display: block;
  position: relative;
  float: left;
  width: 100%;
  height: 100px;
	border-bottom: 1px solid #333;
}

ul li input[type=radio]{
  position: absolute;
  visibility: hidden;
}

ul li label{
  display: block;
  position: relative;
  font-weight: 300;
  font-size: 1.35em;
  padding: 25px 25px 25px 80px;
  margin: 10px auto;
  height: 30px;
  z-index: 9;
  cursor: pointer;
  -webkit-transition: all 0.25s linear;
}

ul li:hover label{
	color: #FFFFFF;
}

ul li .check{
  display: block;
  position: absolute;
  border: 5px solid #AAAAAA;
  border-radius: 100%;
  height: 25px;
  width: 25px;
  top: 30px;
  left: 20px;
	z-index: 5;
	transition: border .25s linear;
	-webkit-transition: border .25s linear;
}

ul li:hover .check {
  border: 5px solid #FFFFFF;
}

ul li .check::before {
  display: block;
  position: absolute;
	content: '';
  border-radius: 100%;
  height: 15px;
  width: 15px;
  top: 5px;
	left: 5px;
  margin: auto;
	transition: background 0.25s linear;
	-webkit-transition: background 0.25s linear;
}

input[type=radio]:checked ~ .check {
  border: 5px solid #0DFF92;
}

input[type=radio]:checked ~ .check::before{
  background: #0DFF92;
}

input[type=radio]:checked ~ label{
  color: #0DFF92;
}

.signature {
	margin: 10px auto;
	padding: 10px 0;
	width: 100%;
}

.signature p{
	text-align: center;
	font-family: Helvetica, Arial, Sans-Serif;
	font-size: 0.85em;
	color: #AAAAAA;
}

.signature .much-heart{
	display: inline-block;
	position: relative;
	margin: 0 4px;
	height: 10px;
	width: 10px;
	background: #AC1D3F;
	border-radius: 4px;
	-ms-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
}

.signature .much-heart::before, 
.signature .much-heart::after {
	  display: block;
  content: '';
  position: absolute;
  margin: auto;
  height: 10px;
  width: 10px;
  border-radius: 5px;
  background: #AC1D3F;
  top: -4px;
}

.signature .much-heart::after {
	bottom: 0;
	top: auto;
	left: -4px;
}

.signature a {
	color: #AAAAAA;
	text-decoration: none;
	font-weight: bold;
}


/* Styles for alert... 
by the way it is so weird when you look at your code a couple of years after you wrote it XD */

.alert {
	box-sizing: border-box;
	background-color: #BDFFE1;
	width: 100%;
	position: relative; 
	top: 0;
	left: 0;
	z-index: 300;
	padding: 20px 40px;
	color: #333;
}

.alert h2 {
	font-size: 22px;
	color: #232323;
	margin-top: 0;
}

.alert p {
	line-height: 1.6em;
	font-size:18px;
}

.alert a {
	color: #232323;
	font-weight: bold;
}
```

</details>

## fold-out menu

<details>
<summary>
https://codepen.io/erikterwan/pen/EVzeRP
</summary>

```html
<!--    Made by Erik Terwan    -->
<!--   24th of November 2015   -->
<!--        MIT License        -->
<nav role="navigation">
  <div id="menuToggle">
    <!--
    A fake / hidden checkbox is used as click reciever,
    so you can use the :checked selector on it.
    -->
    <input type="checkbox" />
    
    <!--
    Some spans to act as a hamburger.
    
    They are acting like a real hamburger,
    not that McDonalds stuff.
    -->
    <span></span>
    <span></span>
    <span></span>
    
    <!--
    Too bad the menu has to be inside of the button
    but hey, it's pure CSS magic.
    -->
    <ul id="menu">
      <a href="#"><li>Home</li></a>
      <a href="#"><li>About</li></a>
      <a href="#"><li>Info</li></a>
      <a href="#"><li>Contact</li></a>
      <a href="https://erikterwan.com/" target="_blank"><li>Show me more</li></a>
    </ul>
  </div>
</nav>
```

```css
/*
 * Made by Erik Terwan
 * 24th of November 2015
 * MIT License
 *
 *
 * If you are thinking of using this in
 * production code, beware of the browser
 * prefixes.
 */

body
{
  margin: 0;
  padding: 0;
  
  /* make it look decent enough */
  background: #232323;
  color: #cdcdcd;
  font-family: "Avenir Next", "Avenir", sans-serif;
}

#menuToggle
{
  display: block;
  position: relative;
  top: 50px;
  left: 50px;
  
  z-index: 1;
  
  -webkit-user-select: none;
  user-select: none;
}

#menuToggle a
{
  text-decoration: none;
  color: #232323;
  
  transition: color 0.3s ease;
}

#menuToggle a:hover
{
  color: tomato;
}


#menuToggle input
{
  display: block;
  width: 40px;
  height: 32px;
  position: absolute;
  top: -7px;
  left: -5px;
  
  cursor: pointer;
  
  opacity: 0; /* hide this */
  z-index: 2; /* and place it over the hamburger */
  
  -webkit-touch-callout: none;
}

/*
 * Just a quick hamburger
 */
#menuToggle span
{
  display: block;
  width: 33px;
  height: 4px;
  margin-bottom: 5px;
  position: relative;
  
  background: #cdcdcd;
  border-radius: 3px;
  
  z-index: 1;
  
  transform-origin: 4px 0px;
  
  transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
              background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
              opacity 0.55s ease;
}

#menuToggle span:first-child
{
  transform-origin: 0% 0%;
}

#menuToggle span:nth-last-child(2)
{
  transform-origin: 0% 100%;
}

/* 
 * Transform all the slices of hamburger
 * into a crossmark.
 */
#menuToggle input:checked ~ span
{
  opacity: 1;
  transform: rotate(45deg) translate(-2px, -1px);
  background: #232323;
}

/*
 * But let's hide the middle one.
 */
#menuToggle input:checked ~ span:nth-last-child(3)
{
  opacity: 0;
  transform: rotate(0deg) scale(0.2, 0.2);
}

/*
 * Ohyeah and the last one should go the other direction
 */
#menuToggle input:checked ~ span:nth-last-child(2)
{
  transform: rotate(-45deg) translate(0, -1px);
}

/*
 * Make this absolute positioned
 * at the top left of the screen
 */
#menu
{
  position: absolute;
  width: 300px;
  margin: -100px 0 0 -50px;
  padding: 50px;
  padding-top: 125px;
  
  background: #ededed;
  list-style-type: none;
  -webkit-font-smoothing: antialiased;
  /* to stop flickering of text in safari */
  
  transform-origin: 0% 0%;
  transform: translate(-100%, 0);
  
  transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
}

#menu li
{
  padding: 10px 0;
  font-size: 22px;
}

/*
 * And let's slide it in from the left
 */
#menuToggle input:checked ~ ul
{
  transform: none;
}
```
</details>

## checkbox

<details>
<summary>
https://codepen.io/Vestride/pen/AwaMNg
</summary>

```html
<h1 class="title">Pure CSS Custom Checkboxes</h1>

<ul class="unstyled centered">
  <li>
    <input class="styled-checkbox" id="styled-checkbox-1" type="checkbox" value="value1">
    <label for="styled-checkbox-1">Checkbox</label>
  </li>
  <li>
    <input class="styled-checkbox" id="styled-checkbox-2" type="checkbox" value="value2" checked>
    <label for="styled-checkbox-2">CSS Only</label>
  </li>
  <li>
    <input class="styled-checkbox" id="styled-checkbox-3" type="checkbox" value="value3" disabled>
    <label for="styled-checkbox-3">A disabled checkbox</label>
  </li>
  <li>
    <input class="styled-checkbox" id="styled-checkbox-4" type="checkbox" value="value4">
    <label for="styled-checkbox-4">Fourth option</label>
  </li>
</ul>
```

```scss
.styled-checkbox {
  position: absolute; // take it out of document flow
  opacity: 0; // hide it

  & + label {
    position: relative;
    cursor: pointer;
    padding: 0;
  }

  // Box.
  & + label:before {
    content: '';
    margin-right: 10px;
    display: inline-block;
    vertical-align: text-top;
    width: 20px;
    height: 20px;
    background: white;
  }

  // Box hover
  &:hover + label:before {
    background: #f35429;
  }
  
  // Box focus
  &:focus + label:before {
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.12);
  }

  // Box checked
  &:checked + label:before {
    background: #f35429;
  }
  
  // Disabled state label.
  &:disabled + label {
    color: #b8b8b8;
    cursor: auto;
  }

  // Disabled box.
  &:disabled + label:before {
    box-shadow: none;
    background: #ddd;
  }

  // Checkmark. Could be replaced with an image
  &:checked + label:after {
    content: '';
    position: absolute;
    left: 5px;
    top: 9px;
    background: white;
    width: 2px;
    height: 2px;
    box-shadow: 
      2px 0 0 white,
      4px 0 0 white,
      4px -2px 0 white,
      4px -4px 0 white,
      4px -6px 0 white,
      4px -8px 0 white;
    transform: rotate(45deg);
  }
}
```

// Demo-only styles
// --------------

```scss
html {
  background: lightgray;
}

body {
  font-family: 'Source Sans Pro', sans-serif;
}

.unstyled {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

li {
  margin: 20px 0;
}

.centered {
  width: 300px;
  margin: auto;
}

.title {
  text-align: center;
  color: rgb(69, 113, 236);
}
```
</details>

## popup box

<details>
<summary>
https://codepen.io/imprakash/pen/GgNMXO
</summary>

```html
<h1>Popup/Modal Windows without JavaScript</h1>
<div class="box">
	<a class="button" href="#popup1">Let me Pop up</a>
</div>

<div id="popup1" class="overlay">
	<div class="popup">
		<h2>Here i am</h2>
		<a class="close" href="#">&times;</a>
		<div class="content">
			Thank to pop me out of that button, but now i'm done so you can close this window.
		</div>
	</div>
</div>
```

```scss
body {
  font-family: Arial, sans-serif;
  background: url(http://www.shukatsu-note.com/wp-content/uploads/2014/12/computer-564136_1280.jpg) no-repeat;
  background-size: cover;
  height: 100vh;
}

h1 {
  text-align: center;
  font-family: Tahoma, Arial, sans-serif;
  color: #06D85F;
  margin: 80px 0;
}

.box {
  width: 40%;
  margin: 0 auto;
  background: rgba(255,255,255,0.2);
  padding: 35px;
  border: 2px solid #fff;
  border-radius: 20px/50px;
  background-clip: padding-box;
  text-align: center;
}

.button {
  font-size: 1em;
  padding: 10px;
  color: #fff;
  border: 2px solid #06D85F;
  border-radius: 20px/50px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease-out;
}
.button:hover {
  background: #06D85F;
}

.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 500ms;
  visibility: hidden;
  opacity: 0;
}
.overlay:target {
  visibility: visible;
  opacity: 1;
}

.popup {
  margin: 70px auto;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  width: 30%;
  position: relative;
  transition: all 5s ease-in-out;
}

.popup h2 {
  margin-top: 0;
  color: #333;
  font-family: Tahoma, Arial, sans-serif;
}
.popup .close {
  position: absolute;
  top: 20px;
  right: 30px;
  transition: all 200ms;
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
  color: #333;
}
.popup .close:hover {
  color: #06D85F;
}
.popup .content {
  max-height: 30%;
  overflow: auto;
}

@media screen and (max-width: 700px){
  .box{
    width: 70%;
  }
  .popup{
    width: 70%;
  }
}
```
</details>

## Animated Gradient Ghost Button Concept

<details>
<summary>
https://codepen.io/ARS/pen/vEwEPP
</summary>

```html
<a href="https://codepen.io/ARS" target="_blank"><span>button</span></a>
```

```scss
/*
Pure CSS experiment with gradient borders and text on transparent background.
Background photo by http://unsplash.com
*/
@import "compass/css3";

$width:  220px;
$height: 70px;
$border: 4px;

$violet: #6559ae;
$orange: #ff7159;

$deg:  120deg;
$size: 400%;
$dur:  3s;

@mixin clip-frame($width, $height, $border) {
  -webkit-clip-path: polygon(0% 100%, $border 100%, $border $border, $width - $border $border, $width - $border $height - $border, $border $height - $border, $border 100%, 100% 100%, 100% 0%, 0% 0%);
}

@import url(https://fonts.googleapis.com/css?family=Squada+One);

body {
  background: #344557 url(https://unsplash.imgix.net/photo-1423683249427-8ca22bd873e0?fit=crop&fm=jpg&h=700&q=75&w=1050) 0 0 no-repeat;
  background-size: cover;
  &:after {
    content: '';
    @extend .absolute-centering;
    background: rgba(#344557, .85);
  }
}

a {
  display: block;
  @extend .absolute-centering;
  width: $width;
  height: $height;
  @extend .text-formatting;
  z-index: 1;
 
  &:after {
    content: '';
    @extend .absolute-centering;
    background: linear-gradient($deg, $violet, $orange, $violet);
    background-size: $size $size;
    @include clip-frame($width, $height, $border);
    @include animation(gradient $dur ease-in-out infinite, border 1s forwards ease-in-out reverse);
  }
  
  & > span {
    display: block;
    background: linear-gradient($deg, $violet, $orange, $violet);
    background-size: $size $size;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
     @include animation(gradient $dur ease-in-out infinite);
  }
}

/* helpers */

.absolute-centering {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

.text-formatting {
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  letter-spacing: 2px;
  line-height: 70px;
  font-family: 'Squada One', cursive;
  font-size: 28px;
}

/* motion */

@include keyframes(gradient) { 
    0%   { background-position: 14% 0%; }
    50%  { background-position: 87% 100%; }
    100% { background-position: 14% 0%; }
}

@include keyframes(border) {
  0% { -webkit-clip-path: polygon(/*1*/ 0% 100%, /*2*/ $border 100%, /*3*/ $border $border, /*4*/ $width - $border $border, /*5*/ $width - $border $height - $border, /*6*/ $border $height - $border, /*7*/ $border 100%, /*8*/ 100% 100%, /*9*/ 100% 0%, /*10*/ 0% 0%); }
  25% { -webkit-clip-path: polygon(/*1*/ 0% 100%, /*2*/ $border 100%, /*3*/ $border $border, /*4*/ $width - $border $border, /*5*/ $width - $border $height - $border, /*6*/ $width - $border $height - $border, /*7*/ $width - $border 100%, /*8*/ 100% 100%, /*9*/ 100% 0%, /*10*/ 0% 0%); }
  50% { -webkit-clip-path: polygon(/*1*/ 0% 100%, /*2*/ $border 100%, /*3*/ $border $border, /*4*/ $width - $border $border, /*5*/ $width - $border $border, /*6*/ $width - $border $border, /*7*/ $width - $border $border, /*8*/ $width - $border $border, /*9*/ 100% 0%, /*10*/ 0% 0%); }
  75% { -webkit-clip-path: polygon(/*1*/ 0% 100%, /*2*/ $border 100%, /*3*/ $border $border, /*4*/ $border $border, /*5*/ $border $border, /*6*/ $border $border, /*7*/ $border $border, /*8*/ $border $border, /*9*/ $border 0%, /*10*/ 0% 0%); }
  100%  { -webkit-clip-path: polygon(/*1*/ 0% 100%, /*2*/ $border 100%, /*3*/ $border 100%, /*4*/ $border 100%, /*5*/ $border 100%, /*6*/ $border 100%, /*7*/ $border 100%, /*8*/ $border 100%, /*9*/ $border 100%, /*10*/ 0% 100%); }
}
```
</details>

## Select

<details>
<summary>
https://codepen.io/raubaca/pen/VejpQP
</summary>

```html
<div class="select">
  <select>
    <option value="1">Pure CSS Select</option>
    <option value="2">No JS</option>
    <option value="3">Nice!</option>
  </select>
</div>
<p>New version 2.0 without a div wrapper <a href="https://codepen.io/raubaca/pen/bGWmZje" target="_blank">here!</a></p>
```

```scss
:root {
  --background-gradient: linear-gradient(30deg, #f39c12 30%, #f1c40f);
  --gray: #34495e;
  --darkgray: #2c3e50;
}

select {
  /* Reset Select */
  appearance: none;
  outline: 0;
  border: 0;
  box-shadow: none;
  /* Personalize */
  flex: 1;
  padding: 0 1em;
  color: #fff;
  background-color: var(--darkgray);
  background-image: none;
  cursor: pointer;
}
/* Remove IE arrow */
select::-ms-expand {
  display: none;
}
/* Custom Select wrapper */
.select {
  position: relative;
  display: flex;
  width: 20em;
  height: 3em;
  border-radius: .25em;
  overflow: hidden;
}
/* Arrow */
.select::after {
  content: '\25BC';
  position: absolute;
  top: 0;
  right: 0;
  padding: 1em;
  background-color: #34495e;
  transition: .25s all ease;
  pointer-events: none;
}
/* Transition */
.select:hover::after {
  color: #f39c12;
}

/* Other styles*/
body {
  color: #fff;
  background: var(--background-gradient);
}
h1 {
  margin: 0 0 0.25em;
}
a {
  font-weight: bold;
  color: var(--gray);
  text-decoration: none;
  padding: .25em;
  border-radius: .25em;
  background: white;
}
```

</details>

## Tabs

<details>
<summary>
https://codepen.io/wallaceerick/pen/nRyxPz
</summary>

```html
<h1>Pure CSS Tabs <span>Just CSS, No JS!</span></h1>
<ul class="tabs" role="tablist">
    <li>
        <input type="radio" name="tabs" id="tab1" checked />
        <label for="tab1" 
               role="tab" 
               aria-selected="true" 
               aria-controls="panel1" 
               tabindex="0">Description</label>
        <div id="tab-content1" 
             class="tab-content" 
             role="tabpanel" 
             aria-labelledby="description" 
             aria-hidden="false">
          <p>"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
        </div>
    </li>
  
    <li>
        <input type="radio" name="tabs" id="tab2" />
        <label for="tab2"
               role="tab" 
               aria-selected="false" 
               aria-controls="panel2" 
               tabindex="0">Specification</label>
        <div id="tab-content2" 
             class="tab-content"
             role="tabpanel" 
             aria-labelledby="specification" 
             aria-hidden="true">
          <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla?</p>
        </div>
    </li>
</ul>

<br style="clear: both;" />

<p class="link">See the <a href="https://codepen.io/wallaceerick/pen/IGxim">3D Box</a> demo!</p>
```

```scss
@import "compass/css3";

@import url("https://fonts.googleapis.com/css?family=Lato");

$background: #9b59b6;
$tabs-base-color: #8e44ad;
* {
  margin: 0;
  padding: 0; 
  @include box-sizing(border-box);
}
body {
  padding: 20px;
  text-align: left;
  font-family: Lato;
  color: #fff; 
  background: $background;  
}
h1 {
  font-weight: normal;
  font-size: 40px;
  font-weight: normal;
  text-transform: uppercase;
  float: left;
  margin: 20px 0 100px 10px; 
  span { 
    font-size: 13px;
    display: block;
    padding-left: 4px;
  }
}
.tabs {
  width: 650px;  
  float: none;
  list-style: none;
  position: relative;
  margin: 80px 0 0 10px;
  text-align: left;
  li {
    float: left;
    display: block;
  }
  input[type="radio"] {
    position: absolute;
    top: 0;
    left: -9999px;
  }
  label {
    display: block;
    padding: 14px 21px;
    border-radius: 2px 2px 0 0;
    font-size: 20px;
    font-weight: normal;
    text-transform: uppercase;
    background: $tabs-base-color;
    cursor: pointer;
    position: relative;
    top: 4px; 
    @include transition(all 0.2s ease-in-out);
    &:hover {
      background: darken($tabs-base-color, 10);
    }
  }
  .tab-content{
    z-index: 2;
    display: none; 
    overflow: hidden;
    width: 100%;
    font-size: 17px;
    line-height: 25px;
    padding: 25px;  
    position: absolute;
    top: 53px;
    left: 0; 
    background: darken($tabs-base-color, 15);
  }
  //The Magic
  [id^="tab"]:checked + label { 
    top: 0;
    padding-top: 17px; 
    background: darken($tabs-base-color, 15); 
  }
  [id^="tab"]:checked ~ [id^="tab-content"] {
    display: block;
  }
}
p.link {
  clear: both;
  margin: 380px 0 0 15px;
  a {
    text-transform: uppercase;
    text-decoration: none;
    display: inline-block;
    color: #fff;
    padding: 5px 10px;
    margin: 0 5px;
    background-color: darken($tabs-base-color, 15);
    @include transition(all 0.2s ease-in);
    &:hover {
      background-color: darken($tabs-base-color, 20);
    }
  }
} 
```
</details>

## Pure CSS DropDown Menu

<details>
<summary>
https://codepen.io/andornagy/pen/ALbdbJ
</summary>

```html

<div id="container">
    <nav>
        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">WordPress</a>
            <!-- First Tier Drop Down -->
            <ul>
                <li><a href="#">Themes</a></li>
                <li><a href="#">Plugins</a></li>
                <li><a href="#">Tutorials</a></li>
            </ul>        
            </li>
            <li><a href="#">Web Design</a>
            <!-- First Tier Drop Down -->
            <ul>
                <li><a href="#">Resources</a></li>
                <li><a href="#">Links</a></li>
                <li><a href="#">Tutorials</a>
            	<!-- Second Tier Drop Down -->
                <ul>
                    <li><a href="#">HTML/CSS</a></li>
                    <li><a href="#">jQuery</a></li>
                    <li><a href="#">Other</a>
                        <!-- Third Tier Drop Down -->
                        <ul>
                            <li><a href="#">Stuff</a></li>
                            <li><a href="#">Things</a></li>
                            <li><a href="#">Other Stuff</a></li>
                        </ul>
                    </li>
                </ul>
                </li>
            </ul>
            </li>
            <li><a href="#">Graphic Design</a></li>
            <li><a href="#">Inspiration</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">About</a></li>
        </ul>
    </nav>
  <h1>Pure CSS Drop Down Menu</h1>
<p> A simple dropdown navigation menu made with CSS Only. Dropdowns are marked with a plus sign ( + )</p>
</div>
```

```scss
/* CSS Document */

@import url(https://fonts.googleapis.com/css?family=Open+Sans);
@import url(https://fonts.googleapis.com/css?family=Bree+Serif);

body {
	background: #212121;
	font-size:22px;
	line-height: 32px;
	color: #ffffff;
	word-wrap:break-word !important;
	font-family: 'Open Sans', sans-serif;
	}

h1 {
	font-size: 60px;
	text-align: center;
	color: #FFF;
}	

h3 {
	font-size: 30px;
	text-align: center;
	color: #FFF;
}

h3 a {
	color: #FFF;
}

a {
	color: #FFF;
}

h1 {
	margin-top: 100px;
	text-align:center;
	font-size:60px;
	font-family: 'Bree Serif', 'serif';
	}

#container {
	margin: 0 auto;
}

p {
	text-align: center;
}

nav {
	margin: 50px 0;
	background-color: #E64A19;
}

nav ul {
	padding: 0;
  margin: 0;
	list-style: none;
	position: relative;
	}
	
nav ul li {
	display:inline-block;
	background-color: #E64A19;
	}

nav a {
	display:block;
	padding:0 10px;	
	color:#FFF;
	font-size:20px;
	line-height: 60px;
	text-decoration:none;
}

nav a:hover { 
	background-color: #000000; 
}

/* Hide Dropdowns by Default */
nav ul ul {
	display: none;
	position: absolute; 
	top: 60px; /* the height of the main nav */
}
	
/* Display Dropdowns on Hover */
nav ul li:hover > ul {
	display:inherit;
}
	
/* Fisrt Tier Dropdown */
nav ul ul li {
	width:170px;
	float:none;
	display:list-item;
	position: relative;
}

/* Second, Third and more Tiers	*/
nav ul ul ul li {
	position: relative;
	top:-60px; 
	left:170px;
}

	
/* Change this in order to change the Dropdown symbol */
li > a:after { content:  ' +'; }
li > a:only-child:after { content: ''; }
```

</details>

## Pure CSS Accordion

<details>
<summary>
https://codepen.io/raubaca/pen/PZzpVe
</summary>

```html
<h1>Pure CSS Accordion <sup>2.0</sup></h1>
<div class="row">
  <div class="col">
    <h2>Open <b>multiple</b></h2>
    <div class="tabs">
      <div class="tab">
        <input type="checkbox" id="chck1">
        <label class="tab-label" for="chck1">Item 1</label>
        <div class="tab-content">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum, reiciendis!
        </div>
      </div>
      <div class="tab">
        <input type="checkbox" id="chck2">
        <label class="tab-label" for="chck2">Item 2</label>
        <div class="tab-content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A, in!
        </div>
      </div>
    </div>
  </div>
  <div class="col">
    <h2>Open <b>one</b></h2>
    <div class="tabs">
      <div class="tab">
        <input type="radio" id="rd1" name="rd">
        <label class="tab-label" for="rd1">Item 1</label>
        <div class="tab-content">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos, facilis.
        </div>
      </div>
      <div class="tab">
        <input type="radio" id="rd2" name="rd">
        <label class="tab-label" for="rd2">Item 2</label>
        <div class="tab-content">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil, aut.
        </div>
      </div>
      <div class="tab">
        <input type="radio" id="rd3" name="rd">
        <label for="rd3" class="tab-close">Close others &times;</label>
      </div>
    </div>
  </div>
</div>
```

```scss
$midnight: #2c3e50;
$clouds: #ecf0f1;
// General
body {
  color: $midnight;
  background: $clouds;
  padding: 0 1em 1em;
}
h1 {
  margin: 0;
  line-height: 2;
  text-align: center;
}
h2 {
  margin: 0 0 .5em;
  font-weight: normal;
}
input {
  position: absolute;
  opacity: 0;
  z-index: -1;
}
// Layout
.row {
  display:flex;
  .col {
    flex:1;
    &:last-child {
      margin-left: 1em;
    }
  }
}
/* Accordion styles */
.tabs {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 4px -2px rgba(0,0,0,0.5);
}
.tab {
  width: 100%;
  color: white;
  overflow: hidden;
  &-label {
    display: flex;
    justify-content: space-between;
    padding: 1em;
    background: $midnight;
    font-weight: bold;
    cursor: pointer;
    /* Icon */
    &:hover {
      background: darken($midnight, 10%);
    }
    &::after {
      content: "\276F";
      width: 1em;
      height: 1em;
      text-align: center;
      transition: all .35s;
    }
  }
  &-content {
    max-height: 0;
    padding: 0 1em;
    color: $midnight;
    background: white;
    transition: all .35s;
  }
  &-close {
    display: flex;
    justify-content: flex-end;
    padding: 1em;
    font-size: 0.75em;
    background: $midnight;
    cursor: pointer;
    &:hover {
      background: darken($midnight, 10%);
    }
  }
}

// :checked
input:checked {
  + .tab-label {
    background: darken($midnight, 10%);
    &::after {
      transform: rotate(90deg);
    }
  }
  ~ .tab-content {
    max-height: 100vh;
    padding: 1em;
  }
}
```

</details>