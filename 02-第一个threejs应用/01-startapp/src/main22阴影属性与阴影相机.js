import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
// 导入hdr加载器
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
// 导入gltf加载器
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// 导入tween动画库
import * as TWEEN from 'three/examples/jsm/libs/tween.module.js'
// 导入顶点法向量辅助器
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper.js'
// 导入 dracloader
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'

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

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
const material = new THREE.MeshStandardMaterial({})
const sphere = new THREE.Mesh(sphereGeometry, material)
// srgb转线性

scene.add(sphere)

const planeGeometry = new THREE.PlaneGeometry(10, 10)
const plane = new THREE.Mesh(planeGeometry, material)
plane.rotation.x = -Math.PI / 2
plane.position.y = -1
scene.add(plane)

// 环境光
const light = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(light)

// 直线光源
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.position.set(10, 10, 10)
scene.add(directionalLight)

renderer.shadowMap.enabled = true
directionalLight.castShadow = true
plane.receiveShadow = true
sphere.castShadow = true

// 设置阴影贴图模糊度
directionalLight.shadow.radius = 20
// 设置阴影贴图分辨率
directionalLight.shadow.mapSize.set(2048, 2048)

// 设置直线光源相机的属性
directionalLight.shadow.camera.near = 18
directionalLight.shadow.camera.far = 500
directionalLight.shadow.camera.top = 5
directionalLight.shadow.camera.bottom = -5
directionalLight.shadow.camera.left = -5
directionalLight.shadow.camera.right = 5

gui
  .add(directionalLight.shadow.camera, 'near')
  .min(10)
  .max(20)
  .step(0.1)
  .onChange(() => {
    directionalLight.shadow.camera.updateProjectionMatrix()
  })
