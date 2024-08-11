import * as THREE from 'three'
// 导入轨道控制器，用于鼠标操作旋转，缩放，平移相机
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(
  45, // 视角
  window.innerWidth / window.innerHeight, // 宽高比
  0.1, // 近截面，相机最近能看到的距离
  1000 // 远截面，相机最远能看到的距离
)

// 创建渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// 创建几何体
const geometry = new THREE.BoxGeometry(1, 1, 1)
// 创建材质
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// 创建网格
// 由几何体与材质组成
const cube = new THREE.Mesh(geometry, material)

// 将网格添加到场景中
scene.add(cube)

// 设置相机位置
camera.position.z = 5
camera.position.y = 2
camera.position.x = 2
camera.lookAt(0, 0, 0)

// 添加世界坐标辅助器
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 设置带阻尼，让控制器更真实
controls.enableDamping = true
// 设置阻尼系数
controls.dampingFactor = 0.05
// 设置自动旋转
controls.autoRotate = true

// 渲染循环
function animate() {
  controls.update()
  requestAnimationFrame(animate) // 递归调用animate函数，实现动画效果

  // 旋转网格
  // cube.rotation.x += 0.01
  // cube.rotation.y += 0.01

  // 渲染场景
  renderer.render(scene, camera)
}
animate()
