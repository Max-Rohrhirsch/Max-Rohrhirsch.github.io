# TreeJS

### Installation

```bash
```javascript
sudo npm init vite

cd ...
sudo npm install
npm install three
```

### Run
```bash
npm run dev
```

### HTML
```html
<body>
    <canvas id="bg"> <-- bevore mainJs--!>

    </canvas>
    <script type="module" src="/main.js"></script>
</body>
```

### main.js
```javascript
// Simple geometry
import './style.css'
import * as THREE from 'three'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)


const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshBasicMaterial({ color: 0xFF6347, wireframe: true })
const torus = new THREE.Mesh(geometry, material)

scene.add(torus)

function animate() {
    requestAnimationFrame(animate)

    torus.rotation.x += 0.01
    torus.rotation.y += 0.005
    torus.rotation.z += 0.01

    renderer.render(scene, camera)
}

animate()

// like one light source
const material2 = new THREE.MeshStandardMaterial({ color: 0xFF6347 })
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5)
scene.add(pointLight)


// floodlight, light EVERYTHING
const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(ambientLight)

// Helper Objects
const lightHelper = new THREE.PointLightHelper(pointLight) // shows wher pointlight is
const gridHelper = new THREE.GridHelper(200, 50) // shows grid to scene


import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
const controls = new OrbitControls(camera, renderer.domElement)
controlls.update() // Has to be in Render Loop


// create random position
const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))
```