import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'

let camera: THREE.PerspectiveCamera
let scene: THREE.Scene
let renderer: THREE.WebGLRenderer
let stats: Stats
let parameters: [color: [r: number, g: number, b: number], sprite: THREE.Texture, size: number][]
const materials: THREE.PointsMaterial[] = []

let windowHalfX: number = window.innerWidth / 2
let windowHalfY: number = window.innerHeight / 2
let mouseX = 0
let mouseY = 0

function onPointerMove(e: PointerEvent) {
  if (!e.isPrimary) {
    return
  }

  mouseX = e.clientX - windowHalfX
  mouseY = e.clientY - windowHalfY
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2
  windowHalfY = window.innerHeight / 2

  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}

function init() {
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000)
  camera.position.z = 1000

  scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x000000, 0.0008)

  // particle geometry
  const geometry = new THREE.BufferGeometry()
  const vertices: number[] = [] // [x: number, y: number, z: number] item size 3 attributes

  const textureLoader = new THREE.TextureLoader()

  const sprite1 = textureLoader.load('../textures/sprites/snowflake1.png')
  const sprite2 = textureLoader.load('../textures/sprites/snowflake2.png')
  const sprite3 = textureLoader.load('../textures/sprites/snowflake3.png')
  const sprite4 = textureLoader.load('../textures/sprites/snowflake4.png')
  const sprite5 = textureLoader.load('../textures/sprites/snowflake5.png')

  for (let i = 0; i < 10000; i++) {
    const x = Math.random() * 2000 - 1000
    const y = Math.random() * 2000 - 1000
    const z = Math.random() * 2000 - 1000
    vertices.push(x, y, z)
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))

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

  //
  document.body.style.touchAction = 'none'
  document.body.addEventListener('pointermove', onPointerMove)

  window.addEventListener('resize', onWindowResize)
}

function render() {
  const time = Date.now() * 0.00005

  camera.position.x += (mouseX - camera.position.x) * 0.05
  camera.position.y += (-mouseY - camera.position.y) * 0.05

  camera.lookAt(scene.position)

  for (let i = 0; i < scene.children.length; i++) {
    const object = scene.children[i]

    if (object instanceof THREE.Points) {
      object.rotation.y = time * (i < 4 ? i + 1 : -(i + 1))
    }
  }

  for (let i = 0; i < materials.length; i++) {
    const color = parameters[i][0]

    const h = (360 * (color[0] + time) % 360) / 360
    materials[i].color.setHSL(h, color[1], color[2])
  }

  renderer.render(scene, camera)
}

function animate() {
  requestAnimationFrame(animate)

  render()
  stats.update()
}

init()
animate()
