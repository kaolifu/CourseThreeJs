import * as THREE from 'three'
// 导入轨道控制器，用于鼠标操作旋转，缩放，平移相机
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 导入lil.gui
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

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
const parentMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// 设置父元素材质为线框模式
parentMaterial.wireframe = true

// 创建网格
// 由几何体与材质组成
let parentCube = new THREE.Mesh(geometry, parentMaterial)
const cube = new THREE.Mesh(geometry, material)
parentCube.add(cube) // 将子网格添加到父网格中

parentCube.position.set(-3, 0, 0)
// parentCube.scale.set(2, 2, 1)

// cube.position.x = 2
cube.position.set(3, 0, 0)
// 设置立方体的放大
// 局部缩放，相对父元素的缩放
// cube.scale.set(2, 1, 1)
// 绕着x轴旋转
cube.rotation.x = Math.PI / 4

// 将网格添加到场景中
scene.add(parentCube)

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
// controls.autoRotate = true

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

// 监听窗口大小变化，更新渲染器大小和相机宽高比
window.addEventListener('resize', () => {
  // 更新渲染器大小
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 更新相机宽高比
  camera.aspect = window.innerWidth / window.innerHeight
  // 更新相机投影矩阵
  camera.updateProjectionMatrix()
})

// 创建点击全屏按钮
// var btn = document.createElement('button')
// btn.innerHTML = '点击全屏'
// btn.style = 'position: fixed; top: 10px; right: 10px; z-index: 9999;'
// btn.onclick = () => {
//   // 全屏
//   renderer.domElement.requestFullscreen()
// }
// document.body.appendChild(btn)

let eventObj = {
  Fullscreen: function () {
    // 全屏
    document.body.requestFullscreen()
    console.log('全屏')
  },
  ExitFullscreen: function () {
    // 退出全屏
    document.exitFullscreen()
    console.log('退出全屏')
  },
}
// 创建GUI
const gui = new GUI()
gui.add(eventObj, 'Fullscreen').name('全屏')
gui.add(eventObj, 'ExitFullscreen').name('退出全屏')
// 控制立方体的位置
let folder = gui.addFolder('立方体位置')
folder
  .add(cube.position, 'x')
  .min(-5)
  .max(5)
  .step(0.1)
  .name('立方体x轴位置')
  .onChange((val) => {
    console.log(val)
  })
folder
  .add(cube.position, 'y')
  .min(-5)
  .max(5)
  .step(0.1)
  .name('立方体y轴位置')
  .onFinishChange((val) => {
    console.log(val)
  })
folder.add(cube.position, 'z').min(-5).max(5).step(0.1).name('立方体z轴位置')

gui.add(parentMaterial, 'wireframe').name('线框模式')

let colorParams = {
  cubeColor: '#000000',
}
gui
  .addColor(colorParams, 'cubeColor')
  .name('立方体颜色')
  .onChange((val) => {
    cube.material.color.set(val)
  })
