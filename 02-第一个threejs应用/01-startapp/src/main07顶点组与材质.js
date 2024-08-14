import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
camera.position.z = 5
camera.position.y = 2
camera.position.x = 2
camera.lookAt(0, 0, 0)
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)
const controls = new OrbitControls(camera, renderer.domElement)

const geometry = new THREE.BufferGeometry()
const vertices = new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0])
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
const indices = new Uint16Array([0, 1, 2, 2, 3, 0])
geometry.setIndex(new THREE.BufferAttribute(indices, 1))

// 设置2个顶点组
// addGroup() 第一个参数是是从第几个索引开始，第二个参数是顶点数量，第三个参数是第几个材质
geometry.addGroup(0, 3, 0)
geometry.addGroup(3, 3, 1)

const material0 = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  // side: THREE.DoubleSide,
  // wireframe: true,
})
const material1 = new THREE.MeshBasicMaterial({
  color: 0xff0000,
})

// 材质代入一个数组，数组中每个材质对应一个顶点组
const plane = new THREE.Mesh(geometry, [material0, material1])

scene.add(plane)

const cubegeometry = new THREE.BoxGeometry(1, 1, 1)
const cubematerial0 = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const cubematerial1 = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const cubematerial2 = new THREE.MeshBasicMaterial({ color: 0x0000ff })
const cubematerial3 = new THREE.MeshBasicMaterial({ color: 0x00ffff })
const cubematerial4 = new THREE.MeshBasicMaterial({ color: 0xff00ff })
const cubematerial5 = new THREE.MeshBasicMaterial({ color: 0xffff00 })
const cube = new THREE.Mesh(cubegeometry, [
  cubematerial0,
  cubematerial1,
  cubematerial2,
  cubematerial3,
  cubematerial4,
  cubematerial5,
])
cube.position.set(2, 0, 0)
scene.add(cube)

function animate() {
  controls.update()
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
animate()
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
})
