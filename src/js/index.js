"use strict";
import "../index.css"

//canvas is the background
var canvas = document.getElementById('canvas'),
  ctx = canvas.getContext('2d'),
  w = canvas.width = window.innerWidth,
  h = canvas.height = window.innerHeight,

  hue = 217,
  stars = [],
  count = 0,
  maxStars = 1600;

//canvas2 is the star
var canvas2 = document.createElement('canvas'),
ctx2 = canvas2.getContext('2d');
canvas2.width = 100;
canvas2.height = 100;
var half = canvas2.width / 2,
gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);//中心渐变
gradient2.addColorStop(0.025, '#fff');
/*gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');*/
gradient2.addColorStop(0.1,'rgba(33, 73, 136,0.9)');
gradient2.addColorStop(0.25,'rgba(33, 73, 136,0.05)');
gradient2.addColorStop(1, 'transparent');

ctx2.fillStyle = gradient2;
ctx2.beginPath();
ctx2.arc(half, half, half, 0, Math.PI * 2);
ctx2.fill();

// End cache

function random(min, max) {
  if (arguments.length < 2) {
    max = min;
    min = 0;
  }

  if (min > max) {
    var hold = max;
    max = min;
    min = hold;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function maxOrbit(x, y) {
  var max = Math.max(x, y),
    diameter = Math.round(Math.sqrt(max * max + max * max));
  return diameter / 2;
}

var Star = function() {
  this.orbitRadius = random(maxOrbit(w, h));//the radius of the movement of the star
  this.radius = random(60, this.orbitRadius) / 12;//the radius of the star
  this.orbitX = w / 2;
  this.orbitY = h / 2;
  this.timePassed = random(0, maxStars);
  this.speed = random(this.orbitRadius) / 900000;
  this.alpha = random(2, 10) / 10;

  count++;
  stars[count] = this;
}

Star.prototype.draw = function() {
  var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
    y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
    twinkle = random(10);
//twinkle
  if (twinkle === 1 && this.alpha > 0) {
    this.alpha -= 0.05;
  } else if (twinkle === 2 && this.alpha < 1) {
    this.alpha += 0.05;
  }

  ctx.globalAlpha = this.alpha;
  ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
  this.timePassed += this.speed;
}

for (var i = 0; i < maxStars; i++) {
  new Star();
}

function animation() {
  //ctx.globalCompositeOperation = 'source-over';
  //ctx.globalAlpha = 1;
  //ctx.fillStyle = 'hsla(' + 217 + ', 64%, 6%, 1)';
  //ctx.fillRect(0, 0, w, h);
  ctx.clearRect(0,0,w,h);

  ctx.globalCompositeOperation = 'lighter';
  for (var i = 1, l = stars.length; i < l; i++) {
    stars[i].draw();
  };
	//drawText();
  window.requestAnimationFrame(animation);
}


/*function drawChat(WhichCanvas,chat){}*/

animation();
//input color[ r: g: b]
window.changeColorOfCanvas2 = function changeColorOfCanvas2(colorR,colorG,colorB){
	//hue = color || 0;
	ctx2 = canvas2.getContext('2d');
	canvas2.width = 100;
	canvas2.height = 100;
	var half = canvas2.width / 2,
	gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);//中心渐变
	gradient2.addColorStop(0.025, '#fff');
	gradient2.addColorStop(0.1, 'rgba(' + colorR + ','+colorG+', '+colorB+',0.9)');
	gradient2.addColorStop(0.25, 'rgba(' + colorR + ', '+colorG+','+colorB+',0.05)');
	gradient2.addColorStop(1, 'transparent');

	ctx2.fillStyle = gradient2;
	ctx2.beginPath();
	ctx2.arc(half, half, half, 0, Math.PI * 2);
	ctx2.fill();
}

var colors = [
	{"r":100,"g":0,"b":0},
	{"r":0,"g":200,"b":0},
	{"r":0,"g":200,"b":200},
	{"r":200,"g":0,"b":200},
]
function randomNum(min,max){
	var num = Math.floor(Math.random()*(max+1-min) + min);
	return num;
}

var currentColor = {
	"r":33,"g":73,"b":136
}
/*changeColorOfCanvas2(colors[0]);*/
function animateColor(targetColor){
	var colorR = (targetColor.r - currentColor.r)/30;
	var colorG = (targetColor.g - currentColor.g)/30;
	var colorB = (targetColor.b - currentColor.b)/30;
	for(var i = 1;i <= 30 ; i ++ ){
		var colorstep = {
			"r":Math.floor(currentColor.r + colorR*i),
			"g":Math.floor(currentColor.g + colorG*i),
			"b":Math.floor(currentColor.b + colorB*i)
		};
		setTimeout("changeColorOfCanvas2("+colorstep.r+","+colorstep.g+","+colorstep.b+")",i*(1000/30));
	}
	currentColor = targetColor;
}

function animateColors(colors){
	var randomindex = randomNum(0,colors.length-1);
	var randomColor = colors[randomindex];
	animateColor(randomColor);
	return randomColor;
}
animateColors(colors);


function fadeinMessage(dataObj){
	$("#message").css({"opacity":0});
	$("#message").animate({
						opacity:1
					},1000);
	$("#message .word").text(dataObj.word);
	$("#from").text(dataObj.by);
}

var currentMeto = "",currentAuthor="";

$(".account").on("click",function(){
	$("#homepage").animate({opacity:0,},400,)
	$("#playPage").animate({opacity:0,},400,)
	$("#rankingPage").animate({opacity:0,},400,)
	$("#friendsPage").animate({opacity:0,},400,)
	$("#assetsPage").animate({opacity:0,},400,)
	
	$("#message").animate({
		opacity:0, 
	},400,
		// callback function to be executed after the animation completes
		function(){
			$(this).animate({
				opacity:1,
			},400);
		}
	);
});

$(".play").on("click",function(){
	$("#homepage").animate({opacity:0,},400,)
	$("#playPage").animate({opacity:1,},400,)
	$("#rankingPage").animate({opacity:0,},400,)
	$("#friendsPage").animate({opacity:0,},400,)
	$("#assetsPage").animate({opacity:0,},400,)
	$("#message").animate({opacity:0,},400,)
});

$(".ranking").on("click",function(){
	$("#homepage").animate({opacity:0,},400,)
	$("#playPage").animate({opacity:0,},400,)
	$("#rankingPage").animate({opacity:1,},400,)
	$("#friendsPage").animate({opacity:0,},400,)
	$("#assetsPage").animate({opacity:0,},400,)
	$("#message").animate({opacity:0,},400,)
});

$(".friends").on("click",function(){
	$("#homepage").animate({opacity:0,},400,)
	$("#playPage").animate({opacity:0,},400,)
	$("#rankingPage").animate({opacity:0,},400,)
	$("#friendsPage").animate({opacity:1,},400,)
	$("#assetsPage").animate({opacity:0,},400,)
	$("#message").animate({opacity:0,},400,)
});

$(".assets").on("click",function(){
	$("#homepage").animate({opacity:0,},400,)
	$("#playPage").animate({opacity:0,},400,)
	$("#rankingPage").animate({opacity:0,},400,)
	$("#friendsPage").animate({opacity:0,},400,)
	$("#assetsPage").animate({opacity:1,},400,)
	$("#message").animate({opacity:0,},400,)
});

function sleep(d) {
	for(var t = Date.now(); Date.now() - t <= d;);
}

$(".login").on("click",function(){
	var un = document.getElementById("username");
    var pwd = document.getElementById("password");
    if(un.value.length==0||pwd.value.length==0){
		alert("Please enter your username and password.")
	}
	else{
		alert("Log in successfully.");
		document.getElementById("mainWindow").innerHTML = null;
		window.location.assign('interfaces.html');
	}
});

function playMode2(){
	$("#playPage").animate({opacity:0,},400,)
	$("#friendsPage").animate({opacity:1,},400,)
}

window.logout = function logout(){
	window.location.assign('mainpage.html');
}

window.signup = function signup(){
	window.location.assign('signup.html');
}

//Performance Evaluation

performance.getEntriesByType('navigation').forEach((navigation) => {
	console.dir(navigation);
});
  
performance.getEntriesByType('resource').forEach((resource) => {
	console.dir(resource);
});

let time = window.performance.timing
let pageloadtime = time.loadEventStart - time.navigationStart;
console.log('pageloadtime', pageloadtime)

  