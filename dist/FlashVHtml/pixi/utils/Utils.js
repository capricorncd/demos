window.requestAnimFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e,t){window.setTimeout(e,1e3/60)},window.PIXI={},window.AjaxRequest=function(){var e=["Msxml2.XMLHTTP","Microsoft.XMLHTTP"];if(!window.ActiveXObject)return!!window.XMLHttpRequest&&new XMLHttpRequest;for(var t=0;t<e.length;t++)try{return new ActiveXObject(e[t])}catch(e){}};