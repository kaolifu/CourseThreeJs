import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
// 导入hdr加载器
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

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

// 创建纹理加载器
const textureLoader = new THREE.TextureLoader()
// 加载纹理
const texture = textureLoader.load(
  './textures/rock/dry_riverbed_rock_diff_4k.jpg'
)
// 加载ao贴图，ao贴图是环境遮挡贴图，用于模拟环境对物体的影响
const aoMap = textureLoader.load(
  './textures/rock/dry_riverbed_rock_disp_4k.jpg'
)

// rgbeloader
const rgbeLoader = new RGBELoader()
rgbeLoader.load('./textures/hdr/brown_photostudio_02_4k.hdr', (envMap) => {
  // 设置球形映射
  envMap.mapping = THREE.EquirectangularReflectionMapping
  scene.background = envMap
  // 设置plane的环境贴图，环境贴图用于模拟环境对物体的影响，类似反光，反射
  planeMaterial.envMap = envMap
})

let planeGeometry = new THREE.PlaneGeometry(1, 1)
let planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  map: texture,
  transparent: true,
  // 设置ao贴图
  aoMap: aoMap,
  aoMapIntensity: 0.5,
  // 设置反射强度
  reflectivity: 0.2,
})
// 可以在构造函数里设置贴图，也可以通过材质的map属性设置贴图
// planeMaterial.map = texture
let plane = new THREE.Mesh(planeGeometry, planeMaterial)
scene.add(plane)

// 加载gui
const gui = new GUI()
gui
  .add(planeMaterial, 'aoMapIntensity')
  .min(0)
  .max(1)
  .step(0.01)
  .name('ao贴图强度')
