(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("flyd"));
	else if(typeof define === 'function' && define.amd)
		define(["flyd"], factory);
	else if(typeof exports === 'object')
		exports["flydSpring"] = factory(require("flyd"));
	else
		root["flydSpring"] = factory(root["flyd"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_10__) {
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

	exports.springable = springable;
	exports.spring = spring;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _rafLoop = __webpack_require__(5);

	var _rafLoop2 = _interopRequireDefault(_rafLoop);

	var _flyd = __webpack_require__(10);

	var _reactMotionLibStepper = __webpack_require__(8);

	var _reactMotionLibStepper2 = _interopRequireDefault(_reactMotionLibStepper);

	var _reactMotionLibPresets = __webpack_require__(7);

	var _reactMotionLibPresets2 = _interopRequireDefault(_reactMotionLibPresets);

	exports.presets = _reactMotionLibPresets2['default'];

	var engine = (0, _rafLoop2['default'])();

	var isSpring = function isSpring(value) {
	  return value.__spring === true;
	};
	function wrapSpring(dest, config) {
	  return {
	    __spring: true,
	    dest: dest,
	    config: config,
	    vel: 0
	  };
	}

	function updateInput(_x2, _x3, _x4, _x5) {
	  var _again = true;

	  _function: while (_again) {
	    var vals = _x2,
	        springs = _x3,
	        input = _x4,
	        config = _x5;
	    _again = false;

	    if (Array.isArray(input)) {
	      var _ret = (function () {
	        var newSprings = springs || [];
	        var newVals = vals || [];
	        input.forEach(function (v, k) {
	          var _updateInput = updateInput(newVals[k], newSprings[k], v, config);

	          var _updateInput2 = _slicedToArray(_updateInput, 2);

	          var nv = _updateInput2[0];
	          var ns = _updateInput2[1];

	          if (ns === false) {
	            delete newSprings[k];
	            newVals[k] = nv;
	          } else {
	            delete newVals[k];
	            newSprings[k] = ns;
	          }
	        });
	        return {
	          v: [newVals.length === 0 ? false : newVals, newSprings.length === 0 ? false : newSprings]
	        };
	      })();

	      if (typeof _ret === 'object') return _ret.v;
	    }
	    if (isSpring(input)) {
	      if (typeof input.dest === 'object') {
	        _x2 = vals;
	        _x3 = springs;
	        _x4 = input.dest;
	        _x5 = input.config;
	        _again = true;
	        _ret = undefined;
	        continue _function;
	      }
	      if (springs && isSpring(springs)) {
	        springs.dest = input.dest;
	        springs.config = input.config;
	        return [false, springs];
	      }
	      return [false, input];
	    }
	    if (typeof input === 'object') {
	      var _ret2 = (function () {
	        var newSprings = springs || {};
	        var newVals = vals || {};
	        Object.keys(input).forEach(function (k) {
	          var _updateInput3 = updateInput(newVals[k], newSprings[k], input[k], config);

	          var _updateInput32 = _slicedToArray(_updateInput3, 2);

	          var nv = _updateInput32[0];
	          var ns = _updateInput32[1];

	          if (ns === false) {
	            delete newSprings[k];
	            newVals[k] = nv;
	          } else {
	            delete newVals[k];
	            newSprings[k] = ns;
	          }
	        });
	        return {
	          v: [Object.keys(newVals).length === 0 ? false : newVals, Object.keys(newSprings).length === 0 ? false : newSprings]
	        };
	      })();

	      if (typeof _ret2 === 'object') return _ret2.v;
	    }
	    if (config) {
	      _x2 = vals;
	      _x3 = springs;
	      _x4 = wrapSpring(input, config);
	      _x5 = config;
	      _again = true;
	      _ret = _ret2 = undefined;
	      continue _function;
	    }
	    return [input, false];
	  }
	}

	var baseObj = function baseObj(from) {
	  return Array.isArray(from) ? [] : {};
	};
	var base = function base(from) {
	  return typeof from === 'object' ? baseObj(from) : undefined;
	};

	function stepSprings(springs, values, last, delta) {
	  if (!isSpring(springs)) {
	    var updateCount = 0;
	    for (var k in springs) {
	      if (springs.hasOwnProperty(k)) {
	        var _stepSprings = stepSprings(springs[k], values[k] || base(last[k]), last[k], delta);

	        var _stepSprings2 = _slicedToArray(_stepSprings, 2);

	        var val = _stepSprings2[0];
	        var updated = _stepSprings2[1];

	        if (updated === false) {
	          delete springs[k];
	        } else {
	          updateCount += 1;
	        }
	        values[k] = val;
	      }
	    }
	    return [values, updateCount > 0];
	  }
	  if (last === springs.dest && springs.vel === 0) return [last, false];

	  var _stepper = (0, _reactMotionLibStepper2['default'])(delta / 1000, last, springs.vel, springs.dest, springs.config[0], springs.config[1]);

	  var _stepper2 = _slicedToArray(_stepper, 2);

	  var newX = _stepper2[0];
	  var newV = _stepper2[1];

	  springs.vel = newV;
	  return [newX, true];
	}

	function stepVals(vals, values) {
	  if (typeof vals === 'object') {
	    for (var k in vals) {
	      if (vals.hasOwnProperty(k)) {
	        var val = stepVals(vals[k], values[k] || base(vals[k]));
	        delete vals[k];
	        values[k] = val;
	      }
	    }
	    return values;
	  }
	  return vals;
	}

	function springable(input$, config) {
	  var output$ = (0, _flyd.stream)(input$());
	  output$.moving = (0, _flyd.stream)(false);
	  var springs = undefined;
	  var vals = undefined;

	  (0, _flyd.on)(function (v) {
	    var updateInfo = updateInput(vals, springs, v, config);
	    vals = updateInfo[0];
	    springs = updateInfo[1];
	  }, input$);

	  engine.on('tick', function (delta) {
	    if (delta > 1000) return;
	    if (springs === false && vals === false) return;
	    var next = base(output$());

	    if (springs) {
	      var _stepSprings3 = stepSprings(springs, next, output$(), delta);

	      var _stepSprings32 = _slicedToArray(_stepSprings3, 2);

	      var val = _stepSprings32[0];
	      var updated = _stepSprings32[1];

	      if (updated === false) {
	        springs = false;
	        if (output$.moving() === true) output$.moving(false);
	      } else {
	        if (output$.moving() === false) output$.moving(true);
	      }
	      next = val;
	    }
	    if (springs === false && vals === false) return;
	    if (vals !== false) {
	      next = stepVals(vals, next);
	      vals = false;
	    }
	    output$(next);
	  });
	  engine.start();
	  return output$;
	}

	function spring(val$) {
	  var config = arguments.length <= 1 || arguments[1] === undefined ? _reactMotionLibPresets2['default'].noWobble : arguments[1];

	  if ((0, _flyd.isStream)(val$)) {
	    var _ret3 = (function () {
	      var input$ = (0, _flyd.stream)(val$() || 0);
	      var skip = true;
	      (0, _flyd.on)(function (v) {
	        if (skip) {
	          skip = false;
	          return;
	        }
	        input$(v);
	      }, val$);
	      return {
	        v: springable(input$, config)
	      };
	    })();

	    if (typeof _ret3 === 'object') return _ret3.v;
	  }
	  return wrapSpring(val$, config);
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 2 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.7.1
	(function() {
	  var getNanoSeconds, hrtime, loadTime;

	  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
	    module.exports = function() {
	      return performance.now();
	    };
	  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
	    module.exports = function() {
	      return (getNanoSeconds() - loadTime) / 1e6;
	    };
	    hrtime = process.hrtime;
	    getNanoSeconds = function() {
	      var hr;
	      hr = hrtime();
	      return hr[0] * 1e9 + hr[1];
	    };
	    loadTime = getNanoSeconds();
	  } else if (Date.now) {
	    module.exports = function() {
	      return Date.now() - loadTime;
	    };
	    loadTime = Date.now();
	  } else {
	    module.exports = function() {
	      return new Date().getTime() - loadTime;
	    };
	    loadTime = new Date().getTime();
	  }

	}).call(this);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 4 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var inherits = __webpack_require__(2)
	var EventEmitter = __webpack_require__(1).EventEmitter
	var now = __webpack_require__(9)
	var raf = __webpack_require__(6)

	module.exports = Engine
	function Engine(fn) {
	    if (!(this instanceof Engine)) 
	        return new Engine(fn)
	    this.running = false
	    this.last = now()
	    this._frame = 0
	    this._tick = this.tick.bind(this)

	    if (fn)
	        this.on('tick', fn)
	}

	inherits(Engine, EventEmitter)

	Engine.prototype.start = function() {
	    if (this.running) 
	        return
	    this.running = true
	    this.last = now()
	    this._frame = raf(this._tick)
	    return this
	}

	Engine.prototype.stop = function() {
	    this.running = false
	    if (this._frame !== 0)
	        raf.cancel(this._frame)
	    this._frame = 0
	    return this
	}

	Engine.prototype.tick = function() {
	    this._frame = raf(this._tick)
	    var time = now()
	    var dt = time - this.last
	    this.emit('tick', dt)
	    this.last = time
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var now = __webpack_require__(3)
	  , global = typeof window === 'undefined' ? {} : window
	  , vendors = ['moz', 'webkit']
	  , suffix = 'AnimationFrame'
	  , raf = global['request' + suffix]
	  , caf = global['cancel' + suffix] || global['cancelRequest' + suffix]

	for(var i = 0; i < vendors.length && !raf; i++) {
	  raf = global[vendors[i] + 'Request' + suffix]
	  caf = global[vendors[i] + 'Cancel' + suffix]
	      || global[vendors[i] + 'CancelRequest' + suffix]
	}

	// Some versions of FF have rAF but not cAF
	if(!raf || !caf) {
	  var last = 0
	    , id = 0
	    , queue = []
	    , frameDuration = 1000 / 60

	  raf = function(callback) {
	    if(queue.length === 0) {
	      var _now = now()
	        , next = Math.max(0, frameDuration - (_now - last))
	      last = next + _now
	      setTimeout(function() {
	        var cp = queue.slice(0)
	        // Clear queue here to prevent
	        // callbacks from appending listeners
	        // to the current frame's queue
	        queue.length = 0
	        for(var i = 0; i < cp.length; i++) {
	          if(!cp[i].cancelled) {
	            try{
	              cp[i].callback(last)
	            } catch(e) {
	              setTimeout(function() { throw e }, 0)
	            }
	          }
	        }
	      }, Math.round(next))
	    }
	    queue.push({
	      handle: ++id,
	      callback: callback,
	      cancelled: false
	    })
	    return id
	  }

	  caf = function(handle) {
	    for(var i = 0; i < queue.length; i++) {
	      if(queue[i].handle === handle) {
	        queue[i].cancelled = true
	      }
	    }
	  }
	}

	module.exports = function(fn) {
	  // Wrap in a new function to prevent
	  // `cancel` potentially being assigned
	  // to the native rAF function
	  return raf.call(global, fn)
	}
	module.exports.cancel = function() {
	  caf.apply(global, arguments)
	}


/***/ },
/* 7 */
/***/ function(module, exports) {

	
	// [stiffness, damping]
	"use strict";

	exports.__esModule = true;
	exports["default"] = {
	  noWobble: [170, 26], // the default
	  gentle: [120, 14],
	  wobbly: [180, 12],
	  stiff: [210, 20]
	};
	module.exports = exports["default"];

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports["default"] = stepper;

	var errorMargin = 0.0001;

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

	  if (Math.abs(newV - v) < errorMargin && Math.abs(newX - x) < errorMargin) {
	    return [destX, 0];
	  }

	  return [newX, newV];
	}

	module.exports = exports["default"];

/***/ },
/* 9 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports =
	  global.performance &&
	  global.performance.now ? function now() {
	    return performance.now()
	  } : Date.now || function now() {
	    return +new Date
	  }

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ }
/******/ ])
});
;