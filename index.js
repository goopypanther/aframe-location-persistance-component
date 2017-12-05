if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
}

/**
 * Location Persistance component for A-Frame.
 * Camera listener updates camera position and rotation as you move.
 * Stores data into browser localStorage using key cameraPosRot-*, where * is
 * the current url path.
 * This component is intended to be used in the <a-camera> tag.
 */
AFRAME.registerComponent('location-persistance', {

    // Set if component needs multiple instancing.
    multiple: false,

    init: function () {
        var newPosRot = {pos: null, rot: null};
         
        // Check if localStorage key exist first
        if ('cameraPosRot-' + window.location.pathname in localStorage) {
            var posRot = JSON.parse(localStorage.getItem('cameraPosRot-' + window.location.pathname));

                this.el.setAttribute('position', posRot.pos);
                this.el.setAttribute('rotation', posRot.rot);
        }

        // Run these checks every time component changes
        this.el.addEventListener('componentchanged', function (event) {
            if ((event.detail.name === 'position') || (event.detail.name === 'rotation')) {
                newPosRot.pos = event.target.getAttribute('position');
                newPosRot.rot = event.target.getAttribute('rotation');
                
                localStorage.setItem('cameraPosRot-' + window.location.pathname, JSON.stringify(newPosRot));
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
