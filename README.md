## aframe-location-persistance-component

[![Version](http://img.shields.io/npm/v/aframe-location-persistance-component.svg?style=flat-square)](https://npmjs.org/package/aframe-location-persistance-component)
[![License](http://img.shields.io/npm/l/aframe-location-persistance-component.svg?style=flat-square)](https://npmjs.org/package/aframe-location-persistance-component)

Persist camera location between refreshes or visits by storing data in localStorage.

For [A-Frame](https://aframe.io).

Check out the examples here: https://jeremyruhland.github.io/aframe-location-persistance-component/

### API

#### location-persistance
| Property | Description | Default Value |
| -------- | ----------- | ------------- |
| N/A      |             |               |

#### fall-arrest

If your scene has physics/gravity and you fall off the edge you'll end up trapped until you clear your browser localStorage. To solve this use fall-arrest which will reset the camera position if it travels below a specific y coordinate.

| Property | Description | Default Value |
| -------- | ----------- | ------------- |
| floor    | Passing below this y coordinate triggers location reset | 0 |
| home     | Location to reset to | {x: 0, y: 1.7, z: 0} |

### Installation

#### Browser

Install and use by directly including the [browser files](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.6.0/aframe.min.js"></script>
  <script src="https://unpkg.com/aframe-location-persistance-component/dist/aframe-location-persistance-component.min.js"></script>
</head>
```

For location-persistance:

```html
<body>
  <a-scene>
    <a-entity camera
              position="0 1.7 0"
              location-persistance>
  </a-scene>
</body>
```

To use fall-arrest:

```html
<body>
  <a-scene>
    <a-entity camera
              universal-controls
              kinematic-body
              position="0 1.7 0"
              location-persistance
              fall-arrest="floor: -20; home: 0 2.1 0">
  </a-scene>
</body>
```
