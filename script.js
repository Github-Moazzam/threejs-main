// import * as THREE  from 'three'
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import imageSource from './image.png'   
// console.log(imageSource)

// const image = new Image()
// const texture = new THREE.Texture(image)
// image.addEventListener('load', () =>
// {
//     texture.needsUpdate = true
// })
// image.src = 'image.png'
// texture.colorSpace = THREE.SRGBColorSpace   

// const canvas = document.querySelector('canvas.canvas1')

// const scene = new THREE.Scene()
// const geometry = new THREE.SphereGeometry(2 ,2,2,2,2,2)
// const material = new THREE.MeshBasicMaterial({ color:'red', wireframe:true})
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)
// const sizes = {
//     width: window.innerWidth,
//     height:window.innerHeight
// }

// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
// camera.position.z=4
// scene.add(camera)

// const controls = new OrbitControls( camera,canvas);
// controls.autoRotate=true


// // Renderer
// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas,
//     antialias:true

// })
// renderer.setSize(sizes.width, sizes.height)

// renderer.render(scene, camera)
// controls.update();

// const tick =()=>{


//     mesh.rotation.y += 0.01
//     mesh.rotation.x += 0.01
//     controls.update();
//     renderer.render(scene, camera)
//     window.requestAnimationFrame(tick)
// }

// tick()


import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

const group = new THREE.Group();
scene.add(group);

// Create Cubes
const box1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "red" })
);
group.add(box1);
box1.position.x = 1.2;

const box2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "green" })
);
box2.position.x = -1.2;
group.add(box2);

const box3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "yellow" })
);
group.add(box3);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});

const controls = new OrbitControls(camera, canvas);
controls.autoRotate = true;

renderer.setSize(sizes.width, sizes.height);

// Clock
const clock = new THREE.Clock();

// Raycaster and mouse for cube interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Get the info div
const infoDiv = document.getElementById("infoDiv");

const tick = () => {
//   const elapsedTime = clock.getElapsedTime();
//   box1.position.y = Math.sin(2 * elapsedTime);
  camera.lookAt(box1.position);

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

// Handle mouse click
const onClick = (event) => {
  // Calculate mouse position in normalized device coordinates (-1 to +1)
  mouse.x = (event.clientX / sizes.width) * 2 - 1;
  mouse.y = -(event.clientY / sizes.height) * 2 + 1;

  // Update raycaster
  raycaster.setFromCamera(mouse, camera);

  // Find intersected objects
  const intersects = raycaster.intersectObjects(group.children);

  if (intersects.length > 0) {
    const intersectedObject = intersects[0].object;
    const { width, height, depth } = intersectedObject.geometry.parameters;
    const color = intersectedObject.material.color.getStyle();

    // Display cube properties
    infoDiv.innerHTML = `
      <strong>Cube Properties:</strong><br>
      Width: ${width}<br>
      Height: ${height}<br>
      Depth: ${depth}<br>
      Color: ${color}
    `;
    infoDiv.style.display = "block";
    infoDiv.style.left = `${event.clientX}px`;
    infoDiv.style.top = `${event.clientY}px`;
  } else {
    infoDiv.style.display = "none";
  }
};

// Add event listener for click
window.addEventListener("click", onClick);

tick();
