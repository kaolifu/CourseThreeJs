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

// 创建几何体
// BufferGeometry 是最基础的几何体，可以用来创建各种几何体
const geometry = new THREE.BufferGeometry()
// 创建顶点数据
// Float32Array 是一个包含32位浮点数的数组，每个顶点有三个坐标，所以这里使用Float32Array(9)
// 逆时针顺序定义三角形的三个顶点为正面
const vertices = new Float32Array([
  -1, -1, 0, 1, -1, 0, 1, 1, 0, 1, 1, 0, -1, 1, 0, -1, -1, 0,
])
// 创建顶点属性
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))

// 使用索引绘制
const geometry2 = new THREE.BufferGeometry()
const vertices2 = new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0])
geometry2.setAttribute('position', new THREE.BufferAttribute(vertices2, 3))
// 创建索引
const indices = new Uint16Array([0, 1, 2, 2, 3, 0])
geometry2.setIndex(new THREE.BufferAttribute(indices, 1))

// 创建材质
// side: THREE.DoubleSide 代表两面都显示，默认是THREE.FrontSide，只显示正面
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  // side: THREE.DoubleSide,
  wireframe: true,
})
const plane = new THREE.Mesh(geometry, material)
const plane2 = new THREE.Mesh(geometry2, material)

plane2.position.x = 3
scene.add(plane, plane2)

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
