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

scene.add(sphere)

const planeGeometry = new THREE.PlaneGeometry(100, 100)
const plane = new THREE.Mesh(planeGeometry, material)
plane.rotation.x = -Math.PI / 2
plane.position.y = -1
scene.add(plane)

// 环境光
const light = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(light)

// 聚光灯
const spotLight = new THREE.SpotLight(0xffffff, 0.5)
spotLight.position.set(5, 5, 5)
spotLight.castShadow = true
// 设置 spotLight 的目标
spotLight.target = sphere
// 设置角度
spotLight.angle = Math.PI / 6
// 设置聚光灯模糊度
spotLight.penumbra = 0
// 设置聚光灯的衰减
spotLight.decay = 0
// 要实现 decay 效果，需要设置 renderer.physicallyCorrectLights 为 true
// renderer.physicallyCorrectLights = true

scene.add(spotLight)

renderer.shadowMap.enabled = true
plane.receiveShadow = true
sphere.castShadow = true

// 设置阴影贴图模糊度
spotLight.shadow.radius = 20
// 设置阴影贴图分辨率
spotLight.shadow.mapSize.set(4096, 4096)

gui.add(sphere.position, 'x').min(-5).max(5).step(0.1).name('球体x')
gui.add(spotLight, 'penumbra').min(0).max(1).step(0.1).name('聚光灯模糊度')
gui.add(spotLight, 'decay').min(0).max(5).step(0.1).name('聚光灯衰减')