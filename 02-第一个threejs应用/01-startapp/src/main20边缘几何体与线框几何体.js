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

// // 导入gltf模型
// const gltfLoader = new GLTFLoader()
// gltfLoader.load('./model/Duck.glb', (gltf) => {
//   const duck = gltf.scene.getObjectByName('LOD3spShape')

//   // 获取 mesh 的几何体
//   const geometry = duck.geometry

//   // 获取边缘几何体
//   // const edgesGeometry = new THREE.EdgesGeometry(geometry)

//   // 获取线框几何体
//   const wireframeGeometry = new THREE.WireframeGeometry(geometry)

//   // 创建线条材质
//   const edgesMaterial = new THREE.LineBasicMaterial({ color: 0xffffff })
//   // 创建线条
//   const edges = new THREE.LineSegments(wireframeGeometry, edgesMaterial)

//   // 更新 duck 世界转换矩阵
//   duck.updateWorldMatrix(true,true)
//   edges.matrix.copy(duck.matrixWorld)
//   edges.matrix.decompose(edges.position, edges.quaternion, edges.scale)

//   // 将线条添加到场景中
//   scene.add(edges)
// })

// 实例化 dracoLoader draco加载器
const dracoLoader = new DRACOLoader()
// 设置 draco 路径
dracoLoader.setDecoderPath('./draco/')

const gltfLoader = new GLTFLoader()
// gltf 加载器设置 dracoLoader
gltfLoader.setDRACOLoader(dracoLoader)
gltfLoader.load('./model/city.glb', (gltf) => {
  // 遍历场景中的所有子物体
  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      const building = child
      const geometry = building.geometry

      // 获取边缘几何体
      const edgesGeometry = new THREE.EdgesGeometry(geometry)
      // 创建线条材质
      const edgesMaterial = new THREE.LineBasicMaterial({ color: 0xffffff })
      // 创建线条
      const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial)

      building.updateWorldMatrix(true, true)
      edges.matrix.copy(building.matrixWorld)
      edges.matrix.decompose(edges.position, edges.quaternion, edges.scale)

      // 将线条添加到场景中
      scene.add(edges)
    }
  })
})

// 导入hdr环境贴图
// const rgbeLoader = new RGBELoader()
// rgbeLoader.load('./textures/hdr/brown_photostudio_02_4k.hdr', (texture) => {
//   texture.mapping = THREE.EquirectangularReflectionMapping
//   scene.background = texture
//   scene.environment = texture
// })
