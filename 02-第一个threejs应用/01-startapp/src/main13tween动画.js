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

// 创建1个球体
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
sphere.position.x = -4
scene.add(sphere)

const tween = new TWEEN.Tween(sphere.position)
tween.to({ x: 4 }, 1000).onUpdate(() => {
  // console.log(sphere.position.x)
})
// 链式调用或者使用属性都是可以的
// tween.onUpdate(() => {
//   console.log(sphere.position.x)
// })
// tween.repeat(Infinity)
// 循环往复
// tween.yoyo(true)
// 延迟
// tween.delay(1000)
// 设置缓动函数
tween.easing(TWEEN.Easing.Quadratic.InOut)

const tween2 = new TWEEN.Tween(sphere.position)
tween2.to({ y: -4 }, 1000)
// 链接两个动画
tween.chain(tween2)

tween.start()

// tween的回调函数
tween.onStart(() => {
  console.log('动画开始')
})
tween.onComplete(() => {
  console.log('动画完成')
})
tween.onStop(() => {
  console.log('动画停止')
})

const params = {
  stop: function () {
    tween.stop()
  },
}
gui.add(params, 'stop').name('停止动画')
