var PIXI=window.PIXI;Tentacle=function(t){for(var e=[],o=0;o<20;o++)e.push(new PIXI.Point(669*o/20,100*o));this.count=100*Math.random(),this.speed=1+2*Math.random(),PIXI.Rope.call(this,t,e)},Tentacle.constructor=Tentacle,Tentacle.prototype=Object.create(PIXI.Rope.prototype),Tentacle.prototype.updateTransform=function(){PIXI.Rope.prototype.updateTransform.call(this),this.count+=this.speed;for(var t=this.points,e=0;e<t.length;e++)t[e].y=20*Math.sin(.05*(this.count+10*e))};