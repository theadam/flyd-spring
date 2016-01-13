(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("flyd"), require("raf-loop"));
	else if(typeof define === 'function' && define.amd)
		define(["flyd", "raf-loop"], factory);
	else if(typeof exports === 'object')
		exports["flydSpring"] = factory(require("flyd"), require("raf-loop"));
	else
		root["flydSpring"] = factory(root["flyd"], root["rafLoop"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	exports.spring = spring;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _flyd = __webpack_require__(3);

	var _stepper3 = __webpack_require__(2);

	var _stepper4 = _interopRequireDefault(_stepper3);

	var _presets = __webpack_require__(1);

	var _presets2 = _interopRequireDefault(_presets);

	var loop = __webpack_require__(4);
	exports.presets = _presets2['default'];

	var engine = loop();

	function spring(val$) {
	  var _ref = arguments.length <= 1 || arguments[1] === undefined ? _presets2['default'].noWobble : arguments[1];

	  var _ref2 = _slicedToArray(_ref, 2);

	  var k = _ref2[0];
	  var b = _ref2[1];

	  var vel = 0;
	  var x = val$() || 0;
	  var k$ = (0, _flyd.isStream)(k) ? k : (0, _flyd.stream)(k);
	  var b$ = (0, _flyd.isStream)(b) ? b : (0, _flyd.stream)(b);

	  var output$ = (0, _flyd.stream)();
	  engine.on('tick', function (delta) {
	    var destX = val$() || 0;
	    if (destX === x) return;

	    var _stepper = (0, _stepper4['default'])(delta / 1000, x, vel, destX, k$(), b$());

	    var _stepper2 = _slicedToArray(_stepper, 2);

	    var newX = _stepper2[0];
	    var newV = _stepper2[1];

	    vel = newV;
	    x = newX;
	    output$(newX);
	  });
	  engine.start();
	  return output$;
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = {
	  noWobble: [170, 26], // the default
	  gentle: [120, 14],
	  wobbly: [180, 12],
	  stiff: [210, 20]
	};
	module.exports = exports["default"];

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = stepper;
	var errorMargin = 0.001;

	function stepper(frameRate, x, v, destX, k, b) {
	  // Spring stiffness, in kg / s^2

	  // for animations, destX is really spring length (spring at rest). initial
	  // position is considered as the stretched/compressed position of a spring
	  var Fspring = -k * (x - destX);

	  // Damping, in kg / s
	  var Fdamper = -b * v;

	  // usually we put mass here, but for animation purposes, specifying mass is a
	  // bit redundant. you could simply adjust k and b accordingly
	  // let a = (Fspring + Fdamper) / mass;
	  var a = Fspring + Fdamper;

	  var newV = v + a * frameRate;
	  var newX = x + newV * frameRate;

	  if (Math.abs(newV) < errorMargin && Math.abs(newX - destX) < errorMargin) {
	    return [destX, 0];
	  }

	  return [newX, newV];
	}

	module.exports = exports["default"];

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }
/******/ ])
});
;