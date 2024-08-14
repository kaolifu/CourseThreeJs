import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
// 导入hdr加载器
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
// 导入gltf加载器
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// 导入tween动画库
import * as TWEEN from 'three/examples/jsm/libs/tween.module.js'

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
camera.position.z = 10
camera.position.y = 2
camera.position.x = 2
camera.lookAt(0, 0, 0)
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)
const controls = new OrbitControls(camera, renderer.domElement)

function animate() {
  controls.update()
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  // 更新tween动画
  TWEEN.update()
}
animate()
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
})

const gui = new GUI()

const uvTexture = new THREE.TextureLoader().load('/textures/uv_grid_opengl.jpg')
const planeMaterial = new THREE.MeshBasicMaterial({ map: uvTexture })

const planeGeometry = new THREE.PlaneGeometry(2, 2)

const plane = new THREE.Mesh(planeGeometry, planeMaterial)
scene.add(plane)
console.log(plane)

// 最原始的 geometry 是没有 uv 坐标的，所以需要手动添加
const geometry = new THREE.BufferGeometry()
const vertices = new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0])
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
const indices = new Uint16Array([0, 1, 2, 2, 3, 0])
geometry.setIndex(new THREE.BufferAttribute(indices, 1))

// 设置uv坐标
const uvs = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1])
geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2))

const plane2 = new THREE.Mesh(geometry, planeMaterial)
plane2.position.x = 3
scene.add(plane2)
console.log(plane2)
