import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

let camera: THREE.PerspectiveCamera
let scene: THREE.Scene
let renderer: THREE.WebGLRenderer
let stats: Stats
let parameters: [color: [r: number, g: number, b: number], sprite: THREE.Texture, size: number][]
const materials: THREE.PointsMaterial[] = []
let controls: OrbitControls
let geometry: THREE.BufferGeometry

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}

function init() {
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000)
  camera.position.z = 1000

  scene = new THREE.Scene()

  // axes helper
  const axesHelper = new THREE.AxesHelper(2000)
  scene.add(axesHelper)

  // particle geometry
  geometry = new THREE.BufferGeometry()
  const vertices: number[] = [] // [x: number, y: number, z: number] item size 3 attributes
  const velocities: number[] = [] // [x: number, y: number] item size 2 attributes offset

  const textureLoader = new THREE.TextureLoader()

  const sprite1 = textureLoader.load('../textures/sprites/raindrop1.png')
  const sprite2 = textureLoader.load('../textures/sprites/raindrop2.png')
  const sprite3 = textureLoader.load('../textures/sprites/raindrop3.png')
  const sprite4 = textureLoader.load('../textures/sprites/raindrop4.png')
  const sprite5 = textureLoader.load('../textures/sprites/raindrop5.png')

  for (let i = 0; i < 10000; i++) {
    const x = Math.random() * 2000 - 1000
    const y = Math.random() * 2000 - 1000
    const z = Math.random() * 2000 - 1000
    vertices.push(x, y, z)

    velocities.push(
      (Math.random() - 0.5) / 3,
      0.1 + Math.random() / 5,
    )
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
  geometry.setAttribute('velocity', new THREE.Float32BufferAttribute(velocities, 2))

  parameters = [
    [[1.0, 0.2, 0.5], sprite2, 20],
    [[0.95, 0.1, 0.5], sprite3, 15],
    [[0.90, 0.05, 0.5], sprite1, 10],
    [[0.85, 0, 0.5], sprite5, 8],
    [[0.80, 0, 0.5], sprite4, 5],
  ]

  for (let i = 0; i < parameters.length; i++) {
    const color = parameters[i][0]
    const sprite = parameters[i][1]
    const size = parameters[i][2]

    materials[i] = new THREE.PointsMaterial({ size, map: sprite, blending: THREE.AdditiveBlending, depthTest: false, transparent: true })
    materials[i].color.setHSL(...color)
    const particles = new THREE.Points(geometry, materials[i])

    particles.rotation.x = Math.random() * 6
    particles.rotation.y = Math.random() * 6
    particles.rotation.z = Math.random() * 6

    scene.add(particles)
  }

  // renderer
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  // stats
  stats = Stats()
  document.body.appendChild(stats.dom)

  // controls
  controls = new OrbitControls(camera, renderer.domElement)
  controls.update()

  //
  document.body.style.touchAction = 'none'

  window.addEventListener('resize', onWindowResize)
}

function render() {
  const position = geometry.getAttribute('position') as THREE.BufferAttribute
  const velocities = geometry.getAttribute('velocity') as THREE.BufferAttribute

  for (let i = 0; i < position.count; i++) {
    const positionX = position.getX(i) - velocities.getX(i)
    const positionY = position.getY(i) - velocities.getY(i)

    position.setX(i, positionX)
    position.setY(i, positionY)
  }

  position.needsUpdate = true
  velocities.needsUpdate = true
  renderer.render(scene, camera)
}

function animate() {
  requestAnimationFrame(animate)

  render()
  controls.update()
  stats.update()
}

init()
animate()
