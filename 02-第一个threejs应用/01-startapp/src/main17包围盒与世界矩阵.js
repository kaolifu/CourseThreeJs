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

const rgbeLoader = new RGBELoader()
rgbeLoader.load('./textures/Alex_Hart-Nature_Lab_Bones_2k.hdr', (envMap) => {
  envMap.mapping = THREE.EquirectangularReflectionMapping
  scene.background = envMap
  scene.environment = envMap
})

// 加载gltf模型
const gltfLoader = new GLTFLoader()
gltfLoader.load('./model/Duck.glb', (gltf) => {
  scene.add(gltf.scene)
  console.log(gltf)

  // 获取模型中的某个对象
  const duckMesh = gltf.scene.getObjectByName('LOD3spShape')
  // 获取 mesh 的 geometry
  const duckGeometry = duckMesh.geometry
  // 计算包围盒(其实不用计算，该模型本身有包围盒)
  duckGeometry.computeBoundingBox()
  // 获取 duckGeometry 的包围盒
  const duckBox = duckGeometry.boundingBox

  // 更新世界矩阵
  duckMesh.updateWorldMatrix(true, true)
  // 更新包围盒
  // duckBox.applyMatrix4(duckMesh.matrixWorld)

  // 创建包围盒辅助器
  const duckBoxHelper = new THREE.BoxHelper(duckMesh, 0xffff00)
  // 将包围盒辅助器添加到场景中
  scene.add(duckBoxHelper)
  console.log(duckBox)
  console.log(duckMesh)
})
