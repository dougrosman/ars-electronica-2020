import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/examples/jsm/controls/OrbitControls.js';
import { FlyControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/examples/jsm/controls/FlyControls.js';

// declare global variables
let canvas, scene, camera, renderer, controls;
let layers = [];

let scrollAmount = 0;
let initialZ = 0;

let layerURLs = [
  "assets/images/layers/sml/1_ozone.png",
  "assets/images/layers/sml/2_population.png",
  "assets/images/layers/sml/3_dem2.png",
  "assets/images/layers/sml/4_forestcanopy.png",
  "assets/images/layers/sml/5_humanmodification.png"  
];

let displacementURLs = [
  "assets/images/layers/displacement_maps/sml/1_ozone.png",
  "assets/images/layers/displacement_maps/sml/2_population.png",
  "assets/images/layers/displacement_maps/sml/3_dem2.png",
  "assets/images/layers/displacement_maps/sml/4_forestcanopy.png",
  "assets/images/layers/displacement_maps/sml/5_humanmodification.png"  
];



// akin to the setup() function in p5.js
function init() {
  
  // create the scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color('black');
  
  // set up the camera
  const fov = 75;
  const aspect = window.innerWidth/window.innerHeight;
  const near = 0.1;
  const far = 1000;
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.set(0, 0, 10);
  
  // initialize the renderer
  canvas = document.querySelector('#c');
  renderer = new THREE.WebGLRenderer({canvas});
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // initialize light
  const light = new THREE.PointLight(0xffffff, 1);
  light.position.set(0, 5, 10);
  scene.add(light);
  
  for(let i = 1; i < 6; i++) {
    let randomX = 6-Math.random() * 12;
    let randomY = 6-Math.random() * 12;
    let randomZ = 6-Math.random() * 12;
    let randomCol = Math.random() * 0xffffff;
    let layer = layerURLs[i-1];
    let d = displacementURLs[i-1];
    
    
    layers.push(makeInstance(layer, d, 0, 0, i*-10, 14.4, 9));
  }
  
  // makeInstance('red', 0, 0, -10);
  // makeInstance('green', 0, 10, -10);
  
  window.addEventListener('resize', onWindowResize, false);
  canvas.addEventListener('wheel', function(e){
    
    if(e.deltaY < 0) {
      scrollAmount-=(e.deltaY/e.deltaY);
    } else {
      scrollAmount+=(e.deltaY/e.deltaY); 
    }
    // console.log(scrollAmount);
  })

  // initialize fly controls
  
  // set up the controls
  
  controls = new OrbitControls( camera, renderer.domElement );
  controls.enableDamping = true;
  controls.enableZoom = false;
  // controls.enableKeys = false;
  
  // controls.zoomSpeed = 0;
  
}

// akin to the draw() function in p5.js
function animate() {
  //controls.update();

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  for(let i = 0; i < layers.length; i++) {
    //layers[i].material.displacementScale+=.01;
    layers[i].material.wireframe = true;
    layers[i].material.depthTest = true;
    // layers[i].material.transparent = true;
    // layers[i].material.opacity = 0.5;

  }
  
  
  easeZoom(0.05);
}

// utility functions

function makeInstance(url, displacement, x, y, z, w, h) {
  
  // create a geometry
  const geometry = new THREE.PlaneGeometry(w, h, w*10, h*10);
  
  // create a material
  const texture = new THREE.TextureLoader().load(url);
  const dMap = new THREE.TextureLoader().load(displacement);
  // const material = new THREE.MeshStandardMaterial({map: texture, side: THREE.DoubleSide});
  const material = new THREE.MeshPhongMaterial({map: texture, displacementMap: dMap});
  material.displacementScale = 5;
  
  // create a plane mesh
  const plane = new THREE.Mesh(geometry, material);
  
  scene.add(plane);
  
  plane.position.set(x, y, z);
  
  return plane;
  
}

function easeZoom(easing) {
  let targetZ = scrollAmount;
  let dz = targetZ - initialZ;
  initialZ+=dz * easing;
  //console.log(initialZ/10);
  camera.position.z = initialZ*6;
    //camera.updateProjectionMatrix();
   // console.log(camera.position.z);
}


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// actually calling the functions

init();
animate();