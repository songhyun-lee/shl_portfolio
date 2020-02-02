import * as THREE from 'https://threejs.org/build/three.module.js';
import {GLTFLoader} from 'https://threejs.org/examples/jsm/loaders/GLTFLoader.js';


function main() {

  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({ canvas:canvas, alpha: true });
  renderer.setClearColor(0x333342, 0);
  const camera = new THREE.PerspectiveCamera(65, 2, 100, 500);
  camera.position.set(0, 0, 900);
  const scene = new THREE.Scene();

  {
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xeeeeee, 0.9);
    const dirLight = new THREE.DirectionalLight(0xE1DEE3, 0.05);
    const pointLight = new THREE.PointLight(0xFFECAC, .8, 5000);
    pointLight.position.set(-300, 100, -1000);
    scene.add(pointLight);
    const backLight = new THREE.DirectionalLight(0xFFECAC, .9);
    scene.add(backLight);
    
    dirLight.position.set(50, 0, 300);

    scene.add(hemiLight);
    scene.add(dirLight);
  }

  let root;
  let horn = new THREE.Object3D();
  const gltfLoader = new GLTFLoader();
  gltfLoader.load('../resources/horn.gltf', (gltf) => {
    root = gltf.scene;
    root.position.set(0, -300, 400);
    
    horn.add(root);
    scene.add(horn);
  })

  let mouse = {
    x: 0,
    y: 0
  }

  canvas.addEventListener('mousemove', handleMousemove, false);
  function handleMousemove(e){
    mouse.x = e.clientX - canvas.clientWidth/2;
    mouse.y = -(e.clientY - canvas.clientHeight/2);
  }
  canvas.addEventListener('touchmove', handleTouchmove, false);
  function handleTouchmove(e){
    e.preventDefault();
    mouse.x = e.touches[0].clientX - canvas.clientWidth/2;
    mouse.y = -(e.touches[0].clientY - canvas.clientHeight/2);
  }

  function hornRotate(speed){
    const hornRY = calc(mouse.x, -400, 400, -Math.PI/5, Math.PI/5);
    horn.rotation.y += (hornRY - horn.rotation.y) / speed;
    const hornRX = calc(mouse.y, -400, 400, Math.PI/20, -Math.PI/20);
    horn.rotation.x += (hornRX - horn.rotation.x) / speed;
  }

  // function dumpObject(obj, lines = [], isLast = true, prefix = '') {
  //   const localPrefix = isLast ? '└─' : '├─';
  //   lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
  //   const newPrefix = prefix + (isLast ? '  ' : '│ ');
  //   const lastNdx = obj.children.length - 1;
  //   obj.children.forEach((child, ndx) => {
  //     const isLast = ndx === lastNdx;
  //     dumpObject(child, lines, isLast, newPrefix);
  //   });
  //   return lines;
  // }

  function calc(vc, vmin, vmax, dmin, dmax){
    const vil = Math.max(Math.min(vc, vmax), vmin);
    const vs = vmax - vmin;
    const vr = (vil - vmin) / vs;
    const ds = dmax - dmin;
    const d = ds*vr + dmin;
    return d;
  }

  function resizeRenderer(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function loop() {
    hornRotate(20);
    if (resizeRenderer(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
  }
  loop();
}
main();
