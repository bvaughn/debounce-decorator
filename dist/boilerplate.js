(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Boilerplate"] = factory();
	else
		root["Boilerplate"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
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
	
	function _interopExportWildcard(obj, defaults) { var newObj = defaults({}, obj); delete newObj['default']; return newObj; }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _DebounceJs = __webpack_require__(1);
	
	var _DebounceJs2 = _interopRequireDefault(_DebounceJs);

	exports['default'] = _DebounceJs2['default'];

	_defaults(exports, _interopExportWildcard(_DebounceJs, _defaults));

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = Debounce;
	var DEFAULT_DEBOUNCE_DURATION = 500;
	
	exports.DEFAULT_DEBOUNCE_DURATION = DEFAULT_DEBOUNCE_DURATION;
	/**
	 * Decorates a class method so that it is debounced by the specified duration.
	 */
	
	function Debounce() {
	  var duration = arguments.length <= 0 || arguments[0] === undefined ? 500 : arguments[0];
	
	  return function debouncedDecorator(target, key, descriptor) {
	    var method = descriptor.value;
	    var setTimeoutId = undefined;
	
	    descriptor.value = function () {
	      var _this = this,
	          _arguments = arguments;
	
	      if (setTimeoutId) {
	        clearTimeout(setTimeoutId);
	      }
	
	      setTimeoutId = setTimeout(function () {
	        setTimeoutId = undefined;
	        method.apply(_this, _arguments);
	      }, duration);
	    };
	
	    return descriptor;
	  };
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=boilerplate.js.map