/******/ (function(modules) { // webpackBootstrap
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
/***/ (function(module, exports) {

	if (typeof AFRAME === 'undefined') {
	    throw new Error('Component attempted to register before AFRAME was available.');
	}

	/**
	 * Location Persistance component for A-Frame.
	 * Camera listener updates camera position and rotation as you move.
	 * Stores data into browser localStorage using key cameraPosRot.
	 * This component is intended to be used in the <a-camera> tag.
	 */
	AFRAME.registerComponent('location-persistance', {

	    // Set if component needs multiple instancing.
	    multiple: false,

	    init: function () {
	        var newPosRot = {pos: null, rot: null};
	         
	        // Check if localStorage key exist first
	        if ('cameraPosRot' in localStorage) {
	            var posRot = JSON.parse(localStorage.getItem('cameraPosRot'));

	            this.el.setAttribute('position', posRot.pos);
	            this.el.setAttribute('rotation', posRot.rot);
	        }

	        // Run these checks every time component changes
	        this.el.addEventListener('componentchanged', function (event) {
	            if ((event.detail.name === 'position') || (event.detail.name === 'rotation')) {
	                newPosRot.pos = event.target.getAttribute('position');
	                newPosRot.rot = event.target.getAttribute('rotation');
	                
	                localStorage.setItem('cameraPosRot', JSON.stringify(newPosRot));
	            }
	        });
	    }
	});


	/**
	 * Reset camera position if we fall off world
	 * takes optional attributes fall-arrest="floor: 0; home: 0 1.7 0"
	 * Resets to home location if entity travels below floor
	 * Component is intended to be added to <a-camera> tag but will work with any
	 * falling object.
	 */
	AFRAME.registerComponent('fall-arrest', {
	    schema: {
	        floor: {default: 0},
	        home: {type: 'vec3', default: {x: 0, y: 1.7, z: 0}}
	    },

	    // Set if component needs multiple instancing.
	    multiple: false,

	    init: function () {
	        var entityFloor = this.data.floor;
	        var entityHome = this.data.home;

	        this.el.addEventListener('componentchanged', function (event) {
	            // Catch changes in positioning
	            if ((event.detail.name === 'position') && (event.target.getAttribute('position').y < entityFloor)) {
	                event.target.setAttribute('position', entityHome);
	                event.target.setAttribute('velocity', {x: 0, y: 0, z: 0}); // Prevents clipping through floor at high velocity
	            }
	        });
	    }
	});


/***/ })
/******/ ]);