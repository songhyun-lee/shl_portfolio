// arms, legs, shoes (253 line)

import * as THREE from './node_modules/three/build/three.module.js';
import {OrbitControls} from './node_modules/three/examples/jsm/controls/OrbitControls.js';


var camera, scene, renderer;
var world, pinoccio;
var hemiLight, dirLight, backLight, isUp, frrrr, isMove;

var container = {
  width: 0,
  height: 0
}
var mouse = {
  x: {
    current:0,
    previous: 0,
    calc:0
  },
  y:{
    current:0,
    previous: 0,
    calc:0
  }
}

function init() {
  
  container.width = window.innerWidth;
  container.height = window.innerHeight;
  
  camera = new THREE.PerspectiveCamera(45, container.width / container.height, 1, 2000);
  camera.position.z = 2000;
  camera.position.y = 300;
  camera.position.x = -500;
  camera.lookAt(new THREE.Vector3(0,0,0));
  
  scene = new THREE.Scene();
  
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialiasing: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  renderer.shadowMap.enabled = true;
  
  //orbit controls
  // const controls = new OrbitControls(camera, renderer.domElement);
  // controls.target.set(0, 5, 400);
  // controls.update();

  world = document.querySelector('.container');
  world.appendChild(renderer.domElement);
  
  window.addEventListener('load', function(){
    document.addEventListener('mousemove', mousemove, false);
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mouseup', mouseup, false);
    document.addEventListener('mousedown', mousedown, false);
    document.addEventListener('touchend', touchend, false);
    document.addEventListener('touchmove', touchmove, false);
  });
}

function onWindowResize(){
  container.width = window.innerWidth;
  container.height = window.innerHeight;
  camera.aspect = container.width / container.height;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function mousemove(e){
  mouse.x.current = e.clientX;
  mouse.y.current = e.clientY;
  mouse.x.calc = mouse.x.current - (container.width/2);
  mouse.y.calc = mouse.y.current - (container.height/2);
}

function touchend(e){ //이게 무슨 작동을 하는거지?
  if (isUp) {
    isUp = false;
  } else {
    mousedown(e);
  }
}

function touchmove(e){
  if (e.touches.length === 1){
    mouse.x.current = e.touches[0].pageX,
      mouse.y.current = e.touches[0].pageY;
      mouse.x.calc = mouse.x.currnet - (container.width / 2);
      mouse.y.calc = mouse.y.currnet - (container.height / 2);
  }
}

function mouseup(e){
  isUp = false;
  console.log(isUp)
}

function mousedown(e) {
  isUp = true;
  console.log(isUp)
}

function addLights(){
  hemiLight = new THREE.HemisphereLight(0xffdbca, 0xbbcef8, 0.6);

  dirLight = new THREE.DirectionalLight(0xffffff, .6);
  dirLight.position.set(200, 200, 200);
  dirLight.castShadow = true;
  dirLight.shadowDarkness = .1;

  backLight = new THREE.DirectionalLight(0xffffff, .3);
  backLight.position.set(-200, 200, 50);
  backLight.castShadow = true;
  backLight.shadowDarkness = .1;

  scene.add(hemiLight);
  scene.add(dirLight);
  scene.add(backLight);
}

function createPinoccio() {
  pinoccio = new Pinoccio();
  scene.add(pinoccio.threeGroup);
}

function Pinoccio(){

  this.threeGroup = new THREE.Group();

  //mat
  this.skinMat = new THREE.MeshLambertMaterial({
    color: 0xFEDAA6
  });

  this.hairMat = new THREE.MeshLambertMaterial({
    color: 0x000000
  });

  this.whiteMat = new THREE.MeshLambertMaterial({
    color: 0xffffff
  });

  this.hatMat = new THREE.MeshLambertMaterial({
    color: 0xFBCA4A
  });

  this.hatRibbonMat = new THREE.MeshLambertMaterial({
    color: 0x9abddd
  });

  this.eyeMat = new THREE.MeshLambertMaterial({
    color: 0x4b92b2
  });

  this.noseMat = new THREE.MeshLambertMaterial({
    color: 0xef8053
  });

  this.topMat = new THREE.MeshLambertMaterial({
    color: 0xfdf2a2
  });

  this.bottomMat = new THREE.MeshLambertMaterial({
    color: 0xf54248
  });

  this.shoesMat = new THREE.MeshLambertMaterial({
    color: 0xac523a
  });

  //head
  var head = new THREE.BoxGeometry(160, 180, 160);
  this.head = new THREE.Mesh(head, this.skinMat);
  this.head.position.set(0, 160, 400);

  var hair = new THREE.BoxGeometry(170, 30, 170);
  this.hair = new THREE.Mesh(hair, this.hairMat);
  this.hair.position.set(0, 85, 0);

  var hatBase = new THREE.BoxGeometry(190, 15, 190);
  this.hatBase = new THREE.Mesh(hatBase, this.hatMat);
  this.hatBase.position.set(0, 100, 0);

  var hatRibbon = new THREE.BoxGeometry(140, 20, 140);
  this.hatRibbon = new THREE.Mesh(hatRibbon, this.hatRibbonMat);
  this.hatRibbon.position.set(0, 15, 0);
  
  var hatTop = new THREE.BoxGeometry(120, 30, 120);
  this.hatTop = new THREE.Mesh(hatTop, this.hatMat);
  this.hatTop.position.set(0, 20, 0);

  var eye = new THREE.BoxGeometry(45, 60, 5);
  this.eyeLeft = new THREE.Mesh(eye, this.whiteMat);
  this.eyeLeft.position.set(-40, 10, 80);

  this.eyeRight = new THREE.Mesh(eye, this.whiteMat);
  this.eyeRight.position.set(40, 10, 80);

  var retina = new THREE.BoxGeometry(25, 30, 3);
  this.retinaLeft = new THREE.Mesh(retina, this.eyeMat);
  this.retinaLeft.position.set(0, -15, 2.5);

  this.retinaRight = new THREE.Mesh(retina, this.eyeMat);
  this.retinaRight.position.set(0, -15, 2.5);

  var eyeApple = new THREE.BoxGeometry(15, 15, 3);
  this.eyeAppleLeft = new THREE.Mesh(eyeApple, this.hairMat);
  this.eyeAppleLeft.position.set(0, -5, 1.5);

  this.eyeAppleRight = new THREE.Mesh(eyeApple, this.hairMat);
  this.eyeAppleRight.position.set(0, -5, 1.5);

  var eyeGlow = new THREE.BoxGeometry(5, 5, 2);
  this.eyeGlowLeft = new THREE.Mesh(eyeGlow, this.whiteMat);
  this.eyeGlowLeft.position.set(7, 7, 3);

  this.eyeGlowRight = new THREE.Mesh(eyeGlow, this.whiteMat);
  this.eyeGlowRight.position.set(7, 7, 3);

  var nose = new THREE.BoxGeometry(15, 15, 30);
  this.nose = new THREE.Mesh(nose, this.noseMat);
  this.nose.position.set(0, -35, 95);

  var mouth = new THREE.BoxGeometry(30, 10, 3);
  this.mouth = new THREE.Mesh(mouth, this.hairMat);
  this.mouth.position.set(0, -65, 82);

  //body
  var body = new THREE.BoxGeometry(100, 80, 80);
  this.body = new THREE.Mesh(body, this.topMat);
  this.body.position.set(0, 40, 380);

  var pants = new THREE.BoxGeometry(110, 60, 90);
  this.pants = new THREE.Mesh(pants, this.bottomMat);
  this.pants.position.set(0, -60, 0);

  var pantsZip = new THREE.BoxGeometry(7, 30, 2);
  this.pantsZip = new THREE.Mesh(pantsZip, this.shoesMat);
  this.pantsZip.position.set(0, -15, 45);

  var shoulder = new THREE.BoxGeometry(30, 30, 30);
  this.shoulderLeft = new THREE.Mesh(shoulder, this.topMat);
  this.shoulderLeft.position.set(-65, 10, 0);
  
  this.shoulderRight = new THREE.Mesh(shoulder, this.topMat);
  this.shoulderRight.position.set(65, 10, 0);

  var upperarm = new THREE.BoxGeometry(25, 50, 25);
  this.upperarmLeft = new THREE.Mesh(upperarm, this.skinMat);
  this.upperarmLeft.position.set(0, -40, 0);
  
  this.upperarmRight = new THREE.Mesh(upperarm, this.skinMat);
  this.upperarmRight.position.set(0, -40, 0);

  var forearm = new THREE.BoxGeometry(25, 40, 25);
  this.forearmLeft = new THREE.Mesh(forearm, this.skinMat);
  this.forearmLeft.position.set(0, -45, 0);

  this.forearmRight = new THREE.Mesh(forearm, this.skinMat);
  this.forearmRight.position.set(0, -45, 0);

  var hand = new THREE.BoxGeometry(30, 30, 30);
  this.handLeft = new THREE.Mesh(hand, this.whiteMat);
  this.handLeft.position.set(0, -35, 0);

  this.handRight = new THREE.Mesh(hand, this.whiteMat);
  this.handRight.position.set(0, -35, 0);

  var leg = new THREE.BoxGeometry(25, 80, 25);
  this.legLeft = new THREE.Mesh(leg, this.skinMat);
  this.legLeft.position.set(-27, -70, 5);

  this.legRight = new THREE.Mesh(leg, this.skinMat);
  this.legRight.position.set(27, -70, 5);

  var shoe = new THREE.BoxGeometry(40, 25, 70);
  this.shoeLeft = new THREE.Mesh(shoe, this.shoesMat);
  this.shoeLeft.position.set(0, -52, 15);
  this.shoeLeft.rotation.y = Math.PI / -20;

  this.shoeRight = new THREE.Mesh(shoe, this.shoesMat);
  this.shoeRight.position.set(0, -52, 15);
  this.shoeRight.rotation.y = Math.PI / 20;

  // group position
  this.threeGroup.position.set(-100, -40, 0);

  // head group
  this.head.add(this.hair);
  this.head.add(this.hatBase);
  this.head.add(this.eyeLeft);
  this.head.add(this.eyeRight);
  this.head.add(this.nose);
  this.head.add(this.mouth);

  this.eyeLeft.add(this.retinaLeft);
  this.eyeRight.add(this.retinaRight);
  this.retinaLeft.add(this.eyeAppleLeft);
  this.retinaRight.add(this.eyeAppleRight);
  this.eyeAppleLeft.add(this.eyeGlowLeft);
  this.eyeAppleRight.add(this.eyeGlowRight);

  this.hatBase.add(this.hatRibbon);
  this.hatRibbon.add(this.hatTop);

  // body group
  this.body.add(this.pants);
  this.body.add(this.shoulderLeft);
  this.body.add(this.shoulderRight);
  
  this.shoulderLeft.add(this.upperarmLeft);
  this.shoulderRight.add(this.upperarmRight);

  this.upperarmLeft.add(this.forearmLeft);
  this.upperarmRight.add(this.forearmRight);

  this.forearmLeft.add(this.handLeft);
  this.forearmRight.add(this.handRight);

  this.pants.add(this.pantsZip);
  this.pants.add(this.legLeft);
  this.pants.add(this.legRight);
  this.legLeft.add(this.shoeLeft);
  this.legRight.add(this.shoeRight);
  
  // add head and body to threeGroup
  this.threeGroup.add(this.head);
  this.threeGroup.add(this.body);

  this.update = function() {
    this.headRY = calc(mouse.x.calc, -200, 200, -Math.PI / 4, Math.PI / 4);
    this.headRX = calc(mouse.y.calc, -200, 200, -Math.PI / 8, Math.PI / 8);

    this.bodyRY = calc(mouse.x.calc, -400, 400, -Math.PI / 20, Math.PI / 20);
    this.bodyRX = calc(mouse.y.calc, -400, 400, -Math.PI / 90, Math.PI / 90);

    this.rotate(5);
  }

  this.rotate = function(speed){

    if(isUp) {
      if (this.nose.scale.z < 10) {
        this.nose.scale.z += 0.25;
        this.nose.position.z += 0.2;
        this.retinaLeft.position.x += 0.2;
        this.retinaRight.position.x += -0.2;
      }
      world.classList.add('noseGrow');
      this.mouth.scale.x = 0.4;
    } else {
      this.nose.scale.z = 1;
      this.nose.position.set(0, -35, 95);
      this.mouth.scale.x = 1;
      this.retinaLeft.position.x = 0;
      this.retinaRight.position.x = 0;
      world.classList.remove('noseGrow');
    }

    this.head.rotation.x += (this.headRX - this.head.rotation.x) / speed;
    this.head.rotation.y += (this.headRY - this.head.rotation.y) / speed;
    this.body.rotation.x += (this.bodyRX - this.body.rotation.x) / speed;
    this.body.rotation.y += (this.bodyRY - this.body.rotation.y) / speed;
  }// rotate() end
}// createPinoccio end

function calc(v, vmin, vmax, tmin, tmax){
  var mouseInLim = Math.min(Math.max(v, vmin), vmax);
  var mouseLimTot = vmax - vmin;
  var mouseRegPos = (mouseInLim - vmin) / mouseLimTot;
  var degLimTot = tmax - tmin;
  var deg = (mouseRegPos*degLimTot) + tmin;
  
  return deg;
}

function loop(){
  renderer.render(scene, camera);
  pinoccio.update();
  requestAnimationFrame(loop);
}

init();
addLights();
createPinoccio();
loop();
