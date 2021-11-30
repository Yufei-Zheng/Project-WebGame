/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index.css */ \"./src/index.css\");\n\n\n //canvas is the background\n\nvar canvas = document.getElementById('canvas'),\n    ctx = canvas.getContext('2d'),\n    w = canvas.width = window.innerWidth,\n    h = canvas.height = window.innerHeight,\n    hue = 217,\n    stars = [],\n    count = 0,\n    maxStars = 1600; //canvas2 is the star\n\nvar canvas2 = document.createElement('canvas'),\n    ctx2 = canvas2.getContext('2d');\ncanvas2.width = 100;\ncanvas2.height = 100;\nvar half = canvas2.width / 2,\n    gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half); //中心渐变\n\ngradient2.addColorStop(0.025, '#fff');\n/*gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');\ngradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');*/\n\ngradient2.addColorStop(0.1, 'rgba(33, 73, 136,0.9)');\ngradient2.addColorStop(0.25, 'rgba(33, 73, 136,0.05)');\ngradient2.addColorStop(1, 'transparent');\nctx2.fillStyle = gradient2;\nctx2.beginPath();\nctx2.arc(half, half, half, 0, Math.PI * 2);\nctx2.fill(); // End cache\n\nfunction random(min, max) {\n  if (arguments.length < 2) {\n    max = min;\n    min = 0;\n  }\n\n  if (min > max) {\n    var hold = max;\n    max = min;\n    min = hold;\n  }\n\n  return Math.floor(Math.random() * (max - min + 1)) + min;\n}\n\nfunction maxOrbit(x, y) {\n  var max = Math.max(x, y),\n      diameter = Math.round(Math.sqrt(max * max + max * max));\n  return diameter / 2;\n}\n\nvar Star = function () {\n  this.orbitRadius = random(maxOrbit(w, h)); //the radius of the movement of the star\n\n  this.radius = random(60, this.orbitRadius) / 12; //the radius of the star\n\n  this.orbitX = w / 2;\n  this.orbitY = h / 2;\n  this.timePassed = random(0, maxStars);\n  this.speed = random(this.orbitRadius) / 900000;\n  this.alpha = random(2, 10) / 10;\n  count++;\n  stars[count] = this;\n};\n\nStar.prototype.draw = function () {\n  var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,\n      y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,\n      twinkle = random(10); //twinkle\n\n  if (twinkle === 1 && this.alpha > 0) {\n    this.alpha -= 0.05;\n  } else if (twinkle === 2 && this.alpha < 1) {\n    this.alpha += 0.05;\n  }\n\n  ctx.globalAlpha = this.alpha;\n  ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);\n  this.timePassed += this.speed;\n};\n\nfor (var i = 0; i < maxStars; i++) {\n  new Star();\n}\n\nfunction animation() {\n  //ctx.globalCompositeOperation = 'source-over';\n  //ctx.globalAlpha = 1;\n  //ctx.fillStyle = 'hsla(' + 217 + ', 64%, 6%, 1)';\n  //ctx.fillRect(0, 0, w, h);\n  ctx.clearRect(0, 0, w, h);\n  ctx.globalCompositeOperation = 'lighter';\n\n  for (var i = 1, l = stars.length; i < l; i++) {\n    stars[i].draw();\n  }\n\n  ; //drawText();\n\n  window.requestAnimationFrame(animation);\n}\n/*function drawChat(WhichCanvas,chat){}*/\n\n\nanimation(); //input color[ r: g: b]\n\nwindow.changeColorOfCanvas2 = function changeColorOfCanvas2(colorR, colorG, colorB) {\n  //hue = color || 0;\n  ctx2 = canvas2.getContext('2d');\n  canvas2.width = 100;\n  canvas2.height = 100;\n  var half = canvas2.width / 2,\n      gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half); //中心渐变\n\n  gradient2.addColorStop(0.025, '#fff');\n  gradient2.addColorStop(0.1, 'rgba(' + colorR + ',' + colorG + ', ' + colorB + ',0.9)');\n  gradient2.addColorStop(0.25, 'rgba(' + colorR + ', ' + colorG + ',' + colorB + ',0.05)');\n  gradient2.addColorStop(1, 'transparent');\n  ctx2.fillStyle = gradient2;\n  ctx2.beginPath();\n  ctx2.arc(half, half, half, 0, Math.PI * 2);\n  ctx2.fill();\n};\n\nvar colors = [{\n  \"r\": 100,\n  \"g\": 0,\n  \"b\": 0\n}, {\n  \"r\": 0,\n  \"g\": 200,\n  \"b\": 0\n}, {\n  \"r\": 0,\n  \"g\": 200,\n  \"b\": 200\n}, {\n  \"r\": 200,\n  \"g\": 0,\n  \"b\": 200\n}];\n\nfunction randomNum(min, max) {\n  var num = Math.floor(Math.random() * (max + 1 - min) + min);\n  return num;\n}\n\nvar currentColor = {\n  \"r\": 33,\n  \"g\": 73,\n  \"b\": 136\n};\n/*changeColorOfCanvas2(colors[0]);*/\n\nfunction animateColor(targetColor) {\n  var colorR = (targetColor.r - currentColor.r) / 30;\n  var colorG = (targetColor.g - currentColor.g) / 30;\n  var colorB = (targetColor.b - currentColor.b) / 30;\n\n  for (var i = 1; i <= 30; i++) {\n    var colorstep = {\n      \"r\": Math.floor(currentColor.r + colorR * i),\n      \"g\": Math.floor(currentColor.g + colorG * i),\n      \"b\": Math.floor(currentColor.b + colorB * i)\n    };\n    setTimeout(\"changeColorOfCanvas2(\" + colorstep.r + \",\" + colorstep.g + \",\" + colorstep.b + \")\", i * (1000 / 30));\n  }\n\n  currentColor = targetColor;\n}\n\nfunction animateColors(colors) {\n  var randomindex = randomNum(0, colors.length - 1);\n  var randomColor = colors[randomindex];\n  animateColor(randomColor);\n  return randomColor;\n}\n\nanimateColors(colors);\n\nfunction fadeinMessage(dataObj) {\n  $(\"#message\").css({\n    \"opacity\": 0\n  });\n  $(\"#message\").animate({\n    opacity: 1\n  }, 1000);\n  $(\"#message .word\").text(dataObj.word);\n  $(\"#from\").text(dataObj.by);\n}\n\nvar currentMeto = \"\",\n    currentAuthor = \"\";\n$(\".account\").on(\"click\", function () {\n  $(\"#homepage\").animate({\n    opacity: 0\n  }, 400);\n  $(\"#playPage\").animate({\n    opacity: 0\n  }, 400);\n  $(\"#rankingPage\").animate({\n    opacity: 0\n  }, 400);\n  $(\"#friendsPage\").animate({\n    opacity: 0\n  }, 400);\n  $(\"#assetsPage\").animate({\n    opacity: 0\n  }, 400);\n  $(\"#message\").animate({\n    opacity: 0\n  }, 400, // callback function to be executed after the animation completes\n  function () {\n    $(this).animate({\n      opacity: 1\n    }, 400);\n  });\n});\n$(\".play\").on(\"click\", function () {\n  $(\"#homepage\").animate({\n    opacity: 0\n  }, 400);\n  $(\"#playPage\").animate({\n    opacity: 1\n  }, 400);\n  $(\"#rankingPage\").animate({\n    opacity: 0\n  }, 400);\n  $(\"#friendsPage\").animate({\n    opacity: 0\n  }, 400);\n  $(\"#assetsPage\").animate({\n    opacity: 0\n  }, 400);\n  $(\"#message\").animate({\n    opacity: 0\n  }, 400);\n});\n$(\".ranking\").on(\"click\", function () {\n  $(\"#homepage\").animate({\n    opacity: 0\n  }, 400);\n  $(\"#playPage\").animate({\n    opacity: 0\n  }, 400);\n  $(\"#rankingPage\").animate({\n    opacity: 1\n  }, 400);\n  $(\"#friendsPage\").animate({\n    opacity: 0\n  }, 400);\n  $(\"#assetsPage\").animate({\n    opacity: 0\n  }, 400);\n  $(\"#message\").animate({\n    opacity: 0\n  }, 400);\n});\n$(\".friends\").on(\"click\", function () {\n  $(\"#homepage\").animate({\n    opacity: 0\n  }, 400);\n  $(\"#playPage\").animate({\n    opacity: 0\n  }, 400);\n  $(\"#rankingPage\").animate({\n    opacity: 0\n  }, 400);\n  $(\"#friendsPage\").animate({\n    opacity: 1\n  }, 400);\n  $(\"#assetsPage\").animate({\n    opacity: 0\n  }, 400);\n  $(\"#message\").animate({\n    opacity: 0\n  }, 400);\n});\n$(\".assets\").on(\"click\", function () {\n  $(\"#homepage\").animate({\n    opacity: 0\n  }, 400);\n  $(\"#playPage\").animate({\n    opacity: 0\n  }, 400);\n  $(\"#rankingPage\").animate({\n    opacity: 0\n  }, 400);\n  $(\"#friendsPage\").animate({\n    opacity: 0\n  }, 400);\n  $(\"#assetsPage\").animate({\n    opacity: 1\n  }, 400);\n  $(\"#message\").animate({\n    opacity: 0\n  }, 400);\n});\n\nfunction sleep(d) {\n  for (var t = Date.now(); Date.now() - t <= d;);\n}\n\n$(\".login\").on(\"click\", function () {\n  var un = document.getElementById(\"username\");\n  var pwd = document.getElementById(\"password\");\n\n  if (un.value.length == 0 || pwd.value.length == 0) {\n    alert(\"Please enter your username and password.\");\n  } else {\n    alert(\"Log in successfully.\");\n    document.getElementById(\"mainWindow\").innerHTML = null;\n    window.location.assign('interfaces.html');\n  }\n});\n\nfunction playMode2() {\n  $(\"#playPage\").animate({\n    opacity: 0\n  }, 400);\n  $(\"#friendsPage\").animate({\n    opacity: 1\n  }, 400);\n}\n\nwindow.logout = function logout() {\n  window.location.assign('mainpage.html');\n};\n\nwindow.signup = function signup() {\n  window.location.assign('signup.html');\n}; //Performance Evaluation\n\n\nperformance.getEntriesByType('navigation').forEach(navigation => {\n  console.dir(navigation);\n});\nperformance.getEntriesByType('resource').forEach(resource => {\n  console.dir(resource);\n});\nlet time = window.performance.timing;\nlet pageloadtime = time.loadEventStart - time.navigationStart;\nconsole.log('pageloadtime', pageloadtime);\n\n//# sourceURL=webpack://it5007-project-game/./src/js/index.js?");

/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://it5007-project-game/./src/index.css?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/index.js");
/******/ 	
/******/ })()
;