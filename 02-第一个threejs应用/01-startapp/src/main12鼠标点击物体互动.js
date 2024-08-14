import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
// 导入hdr加载器
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
// 导入gltf加载器
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

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
}
animate()
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
})

const gui = new GUI()

// 创建三个球
const sphere1 = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)
sphere1.position.x = -3
scene.add(sphere1)
const sphere2 = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
)
scene.add(sphere2)
const sphere3 = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0xff00ff })
)
sphere3.position.x = 3
scene.add(sphere3)

// 创建射线，用于检测鼠标点击的物体
const raycaster = new THREE.Raycaster()
// 创建鼠标位置变量，用于存储鼠标位置
const mouse = new THREE.Vector2()
window.addEventListener('click', (event) => {
  // 将鼠标位置归一化到-1到1之间
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

  // 通过鼠标位置和相机计算射线
  raycaster.setFromCamera(mouse, camera)
  // 计算物体与射线的交点
  const intersects = raycaster.intersectObjects([sphere1, sphere2, sphere3])
  if (intersects.length > 0) {
    if (intersects[0].object._isSelected) {
      intersects[0].object.material.color.set(intersects[0].object._originColor)
      intersects[0].object._isSelected = false
      return
    }
    intersects[0].object._isSelected = true
    intersects[0].object._originColor = intersects[0].object.material.color.getHex()
    intersects[0].object.material.color.set(0xff0000)
  }
})
